# 🌌 Celestia AI - Telegram Bot & Mini App Backend

Celestia AI is an intelligent Telegram Bot and Mini App powered by Google Gemini 1.5 Flash. It includes a modern Telegram WebApp launcher, affiliate rewards referral system (50% commission), community channel/VIP access, and group moderation assistant.

---

## 📁 Project Structure

```
├── main.py              # Main Python Telegram Bot code with Gemini 1.5 Flash
├── requirements.txt     # Python dependencies (python-telegram-bot 20.7, google-generativeai)
├── Procfile             # Process file for Render.com deployment (worker / web)
├── render.yaml          # 1-Click Render Blueprint configuration
├── .env.example         # Example environment variables
└── README.md            # Deployment & configuration instructions
```

---

## ⚡ Quick Deployment on Render.com (100% Free)

### Step 1: Push Code to GitHub
1. Create a new GitHub repository (e.g. `celestia-telegram-bot`).
2. Push `main.py`, `requirements.txt`, `Procfile`, and `render.yaml` to your repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Celestia AI Bot"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/celestia-telegram-bot.git
   git push -u origin main
   ```

### Step 2: Create a Free Service on Render
1. Go to [Render.com](https://render.com) and log in.
2. Click **New +** -> **Background Worker** (or **Web Service**).
3. Connect your GitHub repository.
4. Fill in the settings:
   - **Name**: `celestia-ai-bot`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python main.py`
   - **Instance Type**: `Free`

### Step 3: Add Environment Variables on Render
Under **Environment Variables**, add the following keys:
- `TELEGRAM_BOT_TOKEN`: `8963842583:AAEiCZLMwOVfnQCpw7sW1W6lz2ThPOdbeok`
- `GEMINI_API_KEY`: Your Google Gemini API Key from [Google AI Studio](https://aistudio.google.com/app/apikey)
- `MINI_APP_URL`: Your Mini App URL (e.g., your deployed URL or `https://your-mini-app-url.com`)
- `CHANNEL_URL`: Your Telegram Channel link (e.g., `https://t.me/yourchannel`)
- `VIP_GROUP_URL`: Your VIP Group link (e.g., `https://t.me/yourvipgroup`)

### Step 4: Deploy!
Click **Create Web Service / Background Worker**. Render will automatically install packages and run `main.py`. Your bot will instantly go online!

---

## 🤖 Telegram BotFather WebApp Button Setup

To enable the permanent WebApp Menu button in Telegram:
1. Open [@BotFather](https://t.me/BotFather) in Telegram.
2. Send `/mybots` and select your bot (`8963842583:...`).
3. Click **Bot Settings** -> **Menu Button** -> **Configure menu button**.
4. Send your Mini App URL (e.g. `https://your-mini-app-url.com`).
5. Set the title: `🚀 Open Celestia App`.

---

## 🛠️ Local Testing

```bash
# 1. Create Python virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Create .env file
cp .env.example .env

# 4. Run the bot
python main.py
```
