import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Award,
  Users,
  Copy,
  Check,
  ArrowLeft,
  Smartphone,
  Share2,
  Info
} from 'lucide-react';
import { BotConfig } from '../data/defaultCode';

interface TelegramSimulatorProps {
  config: BotConfig;
  onOpenMiniAppModal: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  time: string;
  buttons?: InlineButton[][];
}

interface InlineButton {
  text: string;
  type: 'webapp' | 'url' | 'callback';
  data?: string;
  url?: string;
}

export const TelegramSimulator: React.FC<TelegramSimulatorProps> = ({
  config,
  onOpenMiniAppModal,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [channelModal, setChannelModal] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getMainKeyboardButtons = (): InlineButton[][] => [
    [
      {
        text: '🚀 Open App',
        type: 'webapp',
        url: config.miniAppUrl,
      },
    ],
    [
      {
        text: '📢 Subscribe Channel',
        type: 'url',
        url: config.channelUrl,
      },
      {
        text: '⭐ Join VIP Group',
        type: 'url',
        url: config.vipGroupUrl,
      },
    ],
    [
      {
        text: `➕ Add ${config.botName} to Group`,
        type: 'url',
        url: `https://t.me/${config.botUsername}?startgroup=true`,
      },
    ],
    [
      {
        text: `🔗 Affiliate Program (Earn ${config.affiliatePercent})`,
        type: 'callback',
        data: 'affiliate_info',
      },
    ],
  ];

  const triggerStartCommand = () => {
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: '/start',
      time: getCurrentTime(),
    };

    setIsTyping(true);
    setMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      setIsTyping(false);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text:
          `Welcome to *${config.botName}* - Group Moderator & Rewards Bot\n\n` +
          "Hello, Explorer! 👋\n\n" +
          "I am your all-in-one AI community companion:\n" +
          "• 🤖 AI Chat Assistant (powered by Google Gemini 1.5 Flash)\n" +
          "• 🛡️ Group Moderation & Spam Shield\n" +
          `• 💎 Affiliate Rewards: Earn ${config.affiliatePercent} lifetime commission\n` +
          `• 📱 ${config.botName} Mini App: Tap below to launch your WebApp dashboard!\n\n` +
          "Select an option below or send me any message to chat with Gemini AI:",
        time: getCurrentTime(),
        buttons: getMainKeyboardButtons(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  // Initial load message or whenever botName changes
  useEffect(() => {
    setMessages([]);
    setTimeout(() => {
      triggerStartCommand();
    }, 50);
  }, [config.botName]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleButtonClick = (btn: InlineButton, messageId: string) => {
    if (btn.type === 'webapp') {
      onOpenMiniAppModal();
    } else if (btn.type === 'url') {
      setChannelModal(btn.text);
    } else if (btn.type === 'callback') {
      if (btn.data === 'affiliate_info') {
        const refLink = `https://t.me/${config.botUsername}?start=ref_934682`;
        const affiliateText =
          `💎 ${config.botName} Affiliate Program (Earn ${config.affiliatePercent} Commission)\n\n` +
          `Share a link to ${config.botName} with your friends and earn ${config.affiliatePercent} of their spending there!\n\n` +
          "💰 How it works:\n" +
          "1. Share your personal invite link.\n" +
          `2. When someone activates VIP or purchases bot tokens, you receive ${config.affiliatePercent} direct commission.\n` +
          "3. Instant weekly payouts with zero threshold fees.\n\n" +
          `🔗 Your Referral Link:\n${refLink}\n\n` +
          "📊 Your Statistics:\n" +
          "• Referrals: 0\n" +
          `• Commission Rate: ${config.affiliatePercent}\n` +
          "• Total Earned: $0.00 USD\n\n" +
          "Share your link now to start earning passive income!";

        const subButtons: InlineButton[][] = [
          [
            {
              text: '📤 Share Referral Link',
              type: 'url',
              url: `https://t.me/share/url?url=${encodeURIComponent(refLink)}&text=${encodeURIComponent(`Join ${config.botName} and earn rewards!`)}`,
            },
          ],
          [
            {
              text: '🔙 Back to Main Menu',
              type: 'callback',
              data: 'back_main',
            },
          ],
        ];

        // Update the message in place as Telegram's edit_message_text does
        setMessages((prev) =>
          prev.map((m) =>
            m.id === messageId
              ? {
                  ...m,
                  text: affiliateText,
                  buttons: subButtons,
                  time: getCurrentTime(),
                }
              : m
          )
        );
      } else if (btn.data === 'back_main') {
        const welcomeText =
          `Welcome to *${config.botName}* - Group Moderator & Rewards Bot\n\n` +
          "Hello, Explorer! 👋\n\n" +
          "Choose an action below or ask me any question:";

        setMessages((prev) =>
          prev.map((m) =>
            m.id === messageId
              ? {
                  ...m,
                  text: welcomeText,
                  buttons: getMainKeyboardButtons(),
                  time: getCurrentTime(),
                }
              : m
          )
        );
      }
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isTyping) return;

    const userText = inputText.trim();
    setInputText('');

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userText,
      time: getCurrentTime(),
    };
    setMessages((prev) => [...prev, userMsg]);

    if (userText.toLowerCase() === '/start') {
      triggerStartCommand();
      return;
    }

    setIsTyping(true);

    // Call Gemini 1.5 Flash simulation or API
    setTimeout(() => {
      setIsTyping(false);
      let reply = '';
      const lower = userText.toLowerCase();

      if (lower.includes('affiliate') || lower.includes('commission') || lower.includes('earn')) {
        reply =
          `✨ ${config.botName} Affiliate Program gives you a massive ${config.affiliatePercent} commission on every subscriber you refer! Share your link in groups or with fellow community managers to earn continuous rewards.`;
      } else if (lower.includes('moderator') || lower.includes('group') || lower.includes('spam')) {
        reply =
          `🛡️ ${config.botName} Group Moderator uses AI heuristics to detect spam, scam crypto links, toxic comments, and flood messages in real-time. Add the bot as an Admin in your group and grant 'Delete Messages' permission to activate.`;
      } else if (lower.includes('mini app') || lower.includes('app') || lower.includes('webapp')) {
        reply =
          `🚀 You can launch ${config.botName} Mini App by clicking the '🚀 Open App' button below! It lets you complete mission tasks, track daily streaks, and configure group moderation parameters.`;
      } else if (lower.includes('who are you') || lower.includes('what are you')) {
        reply =
          `🤖 I am ${config.botName}, your Telegram community manager and AI companion powered by Google Gemini 1.5 Flash. I help groups stay clean, award members, and answer questions 24/7!`;
      } else {
        reply =
          `✨ [Gemini 1.5 Flash Response]\n\nThank you for reaching out! In the production Python bot hosted on Render.com, this message triggers:
\`model.generate_content("${userText}")\`

As ${config.botName}, I am ready to moderate your groups, manage your rewards pool, and answer questions for your members!`;
      }

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: reply,
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  const resetChat = () => {
    setMessages([]);
    setTimeout(() => {
      triggerStartCommand();
    }, 100);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top Banner & Info */}
      <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 font-bold text-base">
            {config.botName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              {config.botName} Live Simulator
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
                v20.7 Async
              </span>
            </h2>
            <p className="text-xs text-slate-400">
              Interactive preview matching the Python backend logic in <code className="text-cyan-300 font-mono">main.py</code>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <button
            onClick={resetChat}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-medium border border-slate-700 transition"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Chat</span>
          </button>
          <button
            onClick={onOpenMiniAppModal}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-medium shadow-md shadow-blue-500/20 transition"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Launch WebApp</span>
          </button>
        </div>
      </div>

      {/* Telegram Phone Frame */}
      <div className="mx-auto max-w-md bg-[#0e1621] rounded-3xl border-4 border-slate-800 shadow-2xl overflow-hidden flex flex-col h-[650px] relative">
        {/* Telegram Header */}
        <div className="bg-[#17212b] px-4 py-3 border-b border-[#242f3d] flex items-center justify-between z-10 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center font-bold text-white shadow-md relative">
              {config.botName.slice(0, 2).toUpperCase()}
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#17212b]"></span>
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-sm">{config.botName}</span>
                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1 rounded font-medium">BOT</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {isTyping ? <span className="text-cyan-400 animate-pulse">typing...</span> : 'bot'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={triggerStartCommand}
              title="Restart with /start"
              className="text-xs bg-[#242f3d] hover:bg-[#2b394a] text-slate-300 px-2.5 py-1 rounded-md transition"
            >
              /start
            </button>
          </div>
        </div>

        {/* Telegram Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#0e1621] to-[#121c27]">
          {/* Welcome Info Box */}
          <div className="flex justify-center">
            <div className="bg-[#182533]/80 backdrop-blur border border-[#2b3a4c] rounded-xl px-3 py-1.5 text-center text-xs text-slate-400 max-w-[280px]">
              🔒 Protected by {config.botName} Shield
            </div>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 shadow-md relative ${
                  msg.sender === 'user'
                    ? 'bg-[#2b5278] text-white rounded-br-xs'
                    : 'bg-[#182533] text-slate-100 rounded-bl-xs border border-[#243242]'
                }`}
              >
                <div className="text-xs sm:text-[13px] leading-relaxed whitespace-pre-line break-words">
                  {msg.text}
                </div>

                <div className="flex items-center justify-end space-x-1 mt-1 text-[10px] text-slate-400">
                  <span>{msg.time}</span>
                  {msg.sender === 'user' && <span className="text-sky-300">✓✓</span>}
                </div>
              </div>

              {/* Inline Keyboard Buttons */}
              {msg.buttons && (
                <div className="w-[85%] mt-2 space-y-1.5">
                  {msg.buttons.map((row, rIdx) => (
                    <div key={rIdx} className="grid grid-flow-col gap-1.5 auto-cols-fr">
                      {row.map((btn, bIdx) => (
                        <button
                          key={bIdx}
                          onClick={() => handleButtonClick(btn, msg.id)}
                          className="flex items-center justify-center space-x-1.5 bg-[#242f3d] hover:bg-[#2e3c4e] active:scale-[0.98] text-sky-400 hover:text-sky-300 py-2 px-2.5 rounded-xl text-xs font-medium border border-[#313f52] shadow-sm transition-all"
                        >
                          <span className="truncate">{btn.text}</span>
                          {btn.type === 'webapp' && <Smartphone className="w-3 h-3 text-cyan-400 shrink-0" />}
                          {btn.type === 'url' && <ExternalLink className="w-3 h-3 text-slate-400 shrink-0" />}
                        </button>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center space-x-2 bg-[#182533] text-slate-400 px-3 py-2 rounded-2xl w-fit text-xs border border-[#243242]">
              <span className="flex space-x-1">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce"></span>
              </span>
              <span>Gemini 1.5 Flash is thinking...</span>
            </div>
          )}

          <div ref={chatBottomRef} />
        </div>

        {/* Telegram Input Bar */}
        <form
          onSubmit={handleSendMessage}
          className="bg-[#17212b] p-2.5 border-t border-[#242f3d] flex items-center space-x-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Send a message to ${config.botName}...`}
            className="flex-1 bg-[#242f3d] text-white placeholder-slate-400 text-xs sm:text-sm px-3.5 py-2.5 rounded-full outline-none focus:ring-1 focus:ring-sky-500 border border-transparent focus:border-sky-500/30"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white flex items-center justify-center transition shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Channel Link Modal Simulator */}
      {channelModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-blue-600/20 text-blue-400 mx-auto flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{channelModal}</h3>
            <p className="text-xs text-slate-400 mb-4">
              In real Telegram, clicking this opens your designated community destination:
            </p>
            <div className="p-3 bg-slate-800 rounded-xl font-mono text-xs text-cyan-300 break-all mb-4">
              {channelModal.includes('Channel') ? config.channelUrl : config.vipGroupUrl}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setChannelModal(null)}
                className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition"
              >
                Close
              </button>
              <a
                href={channelModal.includes('Channel') ? config.channelUrl : config.vipGroupUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-medium transition flex items-center justify-center gap-1"
              >
                <span>Visit Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
