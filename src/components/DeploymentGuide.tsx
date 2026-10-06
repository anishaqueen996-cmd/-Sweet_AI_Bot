import React, { useState } from 'react';
import {
  Rocket,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Terminal,
  Shield,
  HelpCircle,
  AlertCircle,
  Key,
  Globe
} from 'lucide-react';
import { BotConfig } from '../data/defaultCode';

interface DeploymentGuideProps {
  config: BotConfig;
}

export const DeploymentGuide: React.FC<DeploymentGuideProps> = ({ config }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const gitCommands = `# 1. Initialize local repository
git init
git add main.py requirements.txt Procfile render.yaml .env.example README.md
git commit -m "Deploy Celestia AI Telegram Bot"

# 2. Link your GitHub repo and push
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/celestia-telegram-bot.git
git push -u origin main`;

  const envVars = [
    {
      name: 'TELEGRAM_BOT_TOKEN',
      value: config.botToken,
      desc: 'Bot Token obtained from @BotFather',
    },
    {
      name: 'GEMINI_API_KEY',
      value: config.geminiApiKey || 'AIzaSy...',
      desc: 'Google Gemini API Key from Google AI Studio',
    },
    {
      name: 'MINI_APP_URL',
      value: config.miniAppUrl,
      desc: 'URL of your deployed WebApp or AI Studio link',
    },
    {
      name: 'CHANNEL_URL',
      value: config.channelUrl,
      desc: 'Telegram Channel link for Subscribe button',
    },
    {
      name: 'VIP_GROUP_URL',
      value: config.vipGroupUrl,
      desc: 'Telegram VIP Group link for Join VIP button',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-blue-900/60 via-indigo-900/40 to-slate-900 border border-blue-500/30 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-blue-400 font-semibold text-xs tracking-wider uppercase mb-1">
              <Rocket className="w-4 h-4" />
              <span>100% Free Cloud Hosting</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
              Host Celestia AI on Render.com
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Follow this step-by-step walkthrough to deploy your Python bot with 24/7 uptime, Gemini 1.5 Flash connectivity, and Telegram WebApp button integration.
            </p>
          </div>
          <a
            href="https://render.com"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-lg shadow-blue-500/25 flex items-center space-x-1.5 transition shrink-0"
          >
            <span>Open Render.com</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Step 1: GitHub Push */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm">
            1
          </div>
          <h3 className="text-base font-bold text-white">Create a GitHub Repository & Push Files</h3>
        </div>
        <p className="text-xs text-slate-400">
          Render deploys directly from your GitHub repository. Push <code className="text-cyan-300 font-mono">main.py</code>, <code className="text-cyan-300 font-mono">requirements.txt</code>, and <code className="text-cyan-300 font-mono">Procfile</code> to your GitHub:
        </p>
        <div className="relative bg-slate-950 rounded-xl p-4 border border-slate-800">
          <button
            onClick={() => copyText(gitCommands, 'git')}
            className="absolute top-3 right-3 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs flex items-center space-x-1 transition"
          >
            {copiedKey === 'git' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copiedKey === 'git' ? 'Copied' : 'Copy'}</span>
          </button>
          <pre className="text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
            {gitCommands}
          </pre>
        </div>
      </div>

      {/* Step 2: Render Service Setup */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm">
            2
          </div>
          <h3 className="text-base font-bold text-white">Create Service on Render</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-semibold text-white text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Option A: Background Worker (Recommended)
            </h4>
            <p className="text-slate-400">
              Click <strong>New +</strong> → <strong>Background Worker</strong> on Render dashboard.
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li>Runtime: <strong>Python 3</strong></li>
              <li>Build Command: <code className="text-cyan-300">pip install -r requirements.txt</code></li>
              <li>Start Command: <code className="text-cyan-300">python main.py</code></li>
            </ul>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-semibold text-white text-sm flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-400" />
              Option B: Web Service
            </h4>
            <p className="text-slate-400">
              Click <strong>New +</strong> → <strong>Web Service</strong>.
            </p>
            <p className="text-slate-400">
              Our <code className="text-cyan-300">main.py</code> includes a background HTTP health check on <code className="text-cyan-300">$PORT</code>, so Render Web Service health checks will succeed immediately!
            </p>
          </div>
        </div>
      </div>

      {/* Step 3: Environment Variables */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm">
            3
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Configure Environment Variables</h3>
            <p className="text-xs text-slate-400">Add these keys in your Render service settings under "Environment"</p>
          </div>
        </div>

        <div className="divide-y divide-slate-800 rounded-xl border border-slate-800 overflow-hidden bg-slate-950">
          {envVars.map((v, i) => (
            <div key={i} className="p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold text-cyan-400">{v.name}</span>
                  <span className="text-[11px] text-slate-500">• {v.desc}</span>
                </div>
                <div className="font-mono text-xs text-slate-300 truncate max-w-sm sm:max-w-md">
                  {v.value}
                </div>
              </div>
              <button
                onClick={() => copyText(v.value, v.name)}
                className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs flex items-center space-x-1 transition shrink-0"
              >
                {copiedKey === v.name ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedKey === v.name ? 'Copied' : 'Copy Value'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Step 4: BotFather Configuration */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm">
            4
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Configure Telegram @BotFather Menu Button</h3>
            <p className="text-xs text-slate-400">Add the persistent Mini App button to your Telegram chat</p>
          </div>
        </div>

        <ol className="list-decimal list-inside space-y-2 text-xs text-slate-300">
          <li>Open <a href="https://t.me/BotFather" target="_blank" rel="noreferrer" className="text-cyan-400 underline">@BotFather</a> in Telegram.</li>
          <li>Send command <code className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300 font-mono">/mybots</code> and choose your {config.botName}.</li>
          <li>Select <strong>Bot Settings</strong> → <strong>Menu Button</strong> → <strong>Configure menu button</strong>.</li>
          <li>Enter your Mini App URL: <code className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300 font-mono">{config.miniAppUrl}</code></li>
          <li>Enter button title: <code className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300 font-mono">🚀 Open {config.botName} App</code></li>
        </ol>
      </div>

      {/* Step 5: Telegram Group Messages Setup */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
            5
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Enable Group Chat Messages (Group Auto-Reply)</h3>
            <p className="text-xs text-slate-400">Telegram limits group bots by default. Follow these 2 quick steps so {config.botName} answers EVERY message:</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-semibold text-cyan-400 text-sm">
              1. Turn OFF Group Privacy in @BotFather:
            </h4>
            <p className="text-slate-400">
              Open <a href="https://t.me/BotFather" target="_blank" rel="noreferrer" className="text-cyan-400 underline">@BotFather</a>:
            </p>
            <ol className="list-decimal list-inside space-y-1 text-slate-400">
              <li>Send <code className="text-cyan-300 font-mono">/mybots</code> → Select <strong className="text-white">{config.botName}</strong></li>
              <li>Click <strong>Bot Settings</strong> → <strong>Group Privacy</strong></li>
              <li>Click <strong>Turn off</strong> (Status will show: <em>Privacy mode is disabled</em>)</li>
            </ol>
            <p className="text-[11px] text-emerald-400 pt-1">
              ✨ Now the bot can read and answer every message sent in your group!
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
            <h4 className="font-semibold text-blue-400 text-sm">
              2. Add Bot as Group Admin:
            </h4>
            <ol className="list-decimal list-inside space-y-1 text-slate-400">
              <li>Open your Telegram Group</li>
              <li>Click <strong>Add Member</strong> → Search <code className="text-cyan-300 font-mono">@{config.botUsername}</code></li>
              <li>Promote the bot to <strong>Admin</strong></li>
              <li>Grant <strong>Delete Messages</strong> permission (for spam protection)</li>
            </ol>
            <p className="text-[11px] text-slate-400 pt-1">
              Members can now simply send questions in the group or type <code className="text-cyan-300">/ask &lt;question&gt;</code>!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
