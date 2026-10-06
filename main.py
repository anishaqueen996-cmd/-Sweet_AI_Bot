#!/usr/bin/env python3
"""
SWEET AI BOT - Telegram Group Moderator, AI Assistant & Mini App Backend
=========================================================================
A high-performance Python Telegram bot powered by Google Gemini 1.5 Flash,
featuring Group Chat Auto-Reply, Telegram WebApp integration, affiliate rewards,
and anti-spam moderation. Ready for 1-click deployment on Render.com.
"""

import os
import sys
import logging
import asyncio
from http.server import HTTPServer, BaseHTTPRequestHandler
import threading

import google.generativeai as genai
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Update, WebAppInfo
from telegram.constants import ParseMode, ChatAction, ChatType
from telegram.ext import (
    Application,
    CallbackQueryHandler,
    CommandHandler,
    ContextTypes,
    MessageHandler,
    filters,
)
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# ==========================================
# CONFIGURATION
# ==========================================
BOT_NAME = os.getenv("BOT_NAME", "SWEET AI BOT").strip()
BOT_USERNAME = os.getenv("BOT_USERNAME", "Sweet_AI_Bot").strip()
BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "8963842583:AAEiCZLMwOVfnQCpw7sW1W6lz2ThPOdbeok").strip()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "").strip()

MINI_APP_URL = os.getenv("MINI_APP_URL", "https://your-mini-app-url.com").strip()
CHANNEL_URL = os.getenv("CHANNEL_URL", "https://t.me/sweet_ai_official").strip()
VIP_GROUP_URL = os.getenv("VIP_GROUP_URL", "https://t.me/sweet_ai_vip").strip()
AFFILIATE_PERCENT = os.getenv("AFFILIATE_PERCENT", "50%").strip()

GROUP_REPLY_ALL = os.getenv("GROUP_REPLY_ALL", "true").strip().lower() in ("true", "1", "yes")

# Setup Logging
logging.basicConfig(
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
    level=logging.INFO,
)
logger = logging.getLogger(BOT_NAME)

# ==========================================
# GEMINI AI SETUP
# ==========================================
gemini_model = None
if GEMINI_API_KEY:
    try:
        genai.configure(api_key=GEMINI_API_KEY)
        gemini_model = genai.GenerativeModel(
            model_name="gemini-1.5-flash",
            system_instruction=(
                f"You are {BOT_NAME}, the intelligent Telegram AI assistant and moderator for this community group. "
                "You answer questions from group members concisely, politely, and accurately. "
                "Help with everyday questions, group discussion, crypto/rewards, coding, and general knowledge. "
                "Keep responses engaging, helpful, and concise (under 250 words) so group chats remain clean and readable."
            ),
        )
        logger.info(f"✅ Gemini 1.5 Flash initialized successfully for {BOT_NAME}.")
    except Exception as e:
        logger.error(f"❌ Error initializing Gemini AI: {e}")
else:
    logger.warning("⚠️ GEMINI_API_KEY is not set in environment variables.")

# ==========================================
# RENDER.COM HEALTH CHECK HTTP SERVER
# ==========================================
class HealthCheckHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header("Content-type", "application/json")
        self.end_headers()
        response = f'{{"status": "online", "bot": "{BOT_NAME}", "group_reply": {str(GROUP_REPLY_ALL).lower()}}}'
        self.wfile.write(response.encode("utf-8"))

    def log_message(self, format, *args):
        return

def start_health_server():
    port = int(os.environ.get("PORT", 10000))
    server = HTTPServer(("0.0.0.0", port), HealthCheckHandler)
    logger.info(f"🌐 Health server listening on port {port}")
    server.serve_forever()

# ==========================================
# KEYBOARDS
# ==========================================
def get_main_keyboard() -> InlineKeyboardMarkup:
    keyboard = [
        [
            InlineKeyboardButton(
                text="🚀 Open App",
                web_app=WebAppInfo(url=MINI_APP_URL),
            )
        ],
        [
            InlineKeyboardButton(text="📢 Subscribe Channel", url=CHANNEL_URL),
            InlineKeyboardButton(text="⭐ Join VIP Group", url=VIP_GROUP_URL),
        ],
        [
            InlineKeyboardButton(
                text=f"➕ Add {BOT_NAME} to Group",
                url=f"https://t.me/{BOT_USERNAME}?startgroup=true",
            )
        ],
        [
            InlineKeyboardButton(
                text=f"🔗 Affiliate Program (Earn {AFFILIATE_PERCENT})",
                callback_data="affiliate_info",
            )
        ],
    ]
    return InlineKeyboardMarkup(keyboard)

# ==========================================
# BOT HANDLERS
# ==========================================
async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    user = update.effective_user
    chat = update.effective_chat
    first_name = user.first_name if user else "Friend"

    if chat.type in (ChatType.GROUP, ChatType.SUPERGROUP):
        welcome_group = (
            f"👋 Hello everyone in *{chat.title}*!\n\n"
            f"I am *{BOT_NAME}*, your AI assistant and group moderator powered by Google Gemini 1.5 Flash.\n\n"
            "💬 *I answer questions directly in this group!* Just send any message or mention me.\n"
            "🛡️ *Anti-Spam Active*: I help keep this community safe.\n\n"
            f"Tap below to add me to other groups or open the {BOT_NAME} Mini App:"
        )
        await update.message.reply_text(
            text=welcome_group,
            reply_markup=get_main_keyboard(),
            parse_mode=ParseMode.MARKDOWN,
        )
        return

    welcome_text = (
        f"Welcome to *{BOT_NAME}* - Group Moderator & Rewards Bot\n\n"
        f"Hello, *{first_name}*! 👋\n\n"
        "The best AI-powered group moderator with a powerful WebApp:\n"
        "• 🤖 *Group Chat AI*: Add me to your group, and I will answer every member's question!\n"
        "• 🛡️ *Group Moderator & Spam Shield*: Auto-deletes scam links & flood messages\n"
        f"• 💎 *Affiliate Program*: Earn *{AFFILIATE_PERCENT}* lifetime commission\n"
        "• 📱 *Mini App Tasks*: Complete community missions to earn rewards!\n\n"
        "Tap *Open App* below or add me to your group to get started:"
    )

    await update.message.reply_text(
        text=welcome_text,
        reply_markup=get_main_keyboard(),
        parse_mode=ParseMode.MARKDOWN,
    )

async def ask_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not context.args:
        await update.message.reply_text("💡 Usage: `/ask <your question>`\nExample: `/ask What is Bitcoin?`", parse_mode=ParseMode.MARKDOWN)
        return
    question = " ".join(context.args)
    await generate_and_reply_ai(update, context, question)

async def new_members_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not update.message or not update.message.new_chat_members:
        return

    for new_member in update.message.new_chat_members:
        if new_member.id == context.bot.id:
            await update.message.reply_text(
                f"🎉 Thanks for adding *{BOT_NAME}* to this group!\n\n"
                "To let me answer every message and protect the group:\n"
                "1. Make me an **Admin** with 'Delete Messages' permission.\n"
                "2. Turn off Group Privacy in @BotFather if you want me to read all messages.\n\n"
                "Ready to assist! Ask me anything.",
                parse_mode=ParseMode.MARKDOWN,
                reply_markup=get_main_keyboard(),
            )
            continue

        name = new_member.first_name or "New Member"
        welcome_msg = f"👋 Welcome to the group, *{name}*!\n\nI am *{BOT_NAME}*. Feel free to chat or ask me any question here!"
        await update.message.reply_text(welcome_msg, parse_mode=ParseMode.MARKDOWN)

async def callback_query_handler(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    query = update.callback_query
    await query.answer()

    if query.data == "affiliate_info":
        user_id = query.from_user.id
        ref_link = f"https://t.me/{BOT_USERNAME}?start=ref_{user_id}"

        affiliate_text = (
            f"💎 *{BOT_NAME} Affiliate Program (Earn {AFFILIATE_PERCENT} Commission)*\n\n"
            f"Share a link to {BOT_NAME} with your friends and earn {AFFILIATE_PERCENT} of their spending there!\n\n"
            "💰 *How it works:*\n"
            "1. Share your personal invite link.\n"
            f"2. When someone activates VIP or purchases bot credits, you receive *{AFFILIATE_PERCENT} direct commission*.\n"
            "3. Instant weekly payouts with zero threshold fees.\n\n"
            f"🔗 *Your Referral Link:*\n`{ref_link}`\n\n"
            "📊 *Your Statistics:*\n"
            "• Referrals: *0*\n"
            f"• Commission Rate: *{AFFILIATE_PERCENT}*\n"
            "• Total Earned: *$0.00 USD*\n\n"
            "Share your link now to start earning passive income!"
        )

        sub_keyboard = InlineKeyboardMarkup([
            [
                InlineKeyboardButton(
                    text="📤 Share Referral Link",
                    url=f"https://t.me/share/url?url={ref_link}&text=Join%20{BOT_NAME}%20and%20earn%20rewards!"
                )
            ],
            [
                InlineKeyboardButton(text="🔙 Back to Main Menu", callback_data="back_main")
            ]
        ])

        await query.edit_message_text(
            text=affiliate_text,
            reply_markup=sub_keyboard,
            parse_mode=ParseMode.MARKDOWN,
        )

    elif query.data == "back_main":
        user = query.from_user
        first_name = user.first_name if user else "Friend"
        welcome_text = (
            f"Welcome to *{BOT_NAME}* - Group Moderator & Rewards Bot\n\n"
            f"Hello, *{first_name}*! 👋\n\n"
            "Choose an action below or ask me any question:"
        )
        await query.edit_message_text(
            text=welcome_text,
            reply_markup=get_main_keyboard(),
            parse_mode=ParseMode.MARKDOWN,
        )

async def generate_and_reply_ai(update: Update, context: ContextTypes.DEFAULT_TYPE, user_text: str) -> None:
    chat = update.effective_chat
    user = update.effective_user

    await context.bot.send_chat_action(chat_id=chat.id, action=ChatAction.TYPING)

    if not gemini_model:
        await update.message.reply_text(
            f"⚠️ *Gemini AI is not configured yet.*\n\nPlease configure `GEMINI_API_KEY` on Render.com.",
            parse_mode=ParseMode.MARKDOWN,
            reply_to_message_id=update.message.message_id,
        )
        return

    try:
        loop = asyncio.get_running_loop()
        response = await loop.run_in_executor(
            None,
            lambda: gemini_model.generate_content(user_text)
        )

        reply_content = response.text if response and response.text else "Sorry, I could not generate an answer right now."

        try:
            await update.message.reply_text(
                reply_content,
                parse_mode=ParseMode.MARKDOWN,
                reply_to_message_id=update.message.message_id,
            )
        except Exception:
            await update.message.reply_text(
                reply_content,
                reply_to_message_id=update.message.message_id,
            )

        logger.info(f"Group answer sent in chat {chat.id} to user {user.id}")

    except Exception as e:
        logger.error(f"Error querying Gemini AI: {e}")
        await update.message.reply_text(
            f"⚠️ Error from {BOT_NAME}: {str(e)[:150]}",
            reply_to_message_id=update.message.message_id,
        )

async def handle_message(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    if not update.message or not update.message.text:
        return

    user_text = update.message.text.strip()
    chat = update.effective_chat

    if user_text.startswith("/"):
        return

    is_group = chat.type in (ChatType.GROUP, ChatType.SUPERGROUP)

    if is_group:
        clean_text = user_text.replace(f"@{BOT_USERNAME}", "").strip()

        bot_id = context.bot.id
        is_reply_to_bot = (
            update.message.reply_to_message
            and update.message.reply_to_message.from_user
            and update.message.reply_to_message.from_user.id == bot_id
        )
        is_mentioned = f"@{BOT_USERNAME.lower()}" in user_text.lower()

        if GROUP_REPLY_ALL or is_reply_to_bot or is_mentioned:
            await generate_and_reply_ai(update, context, clean_text or user_text)
    else:
        await generate_and_reply_ai(update, context, user_text)

async def error_handler(update: object, context: ContextTypes.DEFAULT_TYPE) -> None:
    logger.error(f"Update caused error: {context.error}", exc_info=context.error)

# ==========================================
# MAIN EXECUTION
# ==========================================
def main():
    if not BOT_TOKEN:
        logger.critical("❌ Missing TELEGRAM_BOT_TOKEN")
        sys.exit(1)

    # Web Service-এর জন্য Health Check Server চালু রাখা বাধ্যতামূলক
    server_thread = threading.Thread(target=start_health_server, daemon=True)
    server_thread.start()

    logger.info(f"🚀 Starting {BOT_NAME} Telegram Bot...")
    application = Application.builder().token(BOT_TOKEN).build()

    application.add_handler(CommandHandler("start", start_command))
    application.add_handler(CommandHandler("ask", ask_command))
    application.add_handler(CallbackQueryHandler(callback_query_handler))
    application.add_handler(MessageHandler(filters.StatusUpdate.NEW_CHAT_MEMBERS, new_members_handler))
    application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, handle_message))
    application.add_error_handler(error_handler)

    logger.info(f"✨ {BOT_NAME} polling active! Group Auto-Reply: {GROUP_REPLY_ALL}")
    application.run_polling(drop_pending_updates=True)

if __name__ == "__main__":
    main()
