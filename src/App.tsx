/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { TelegramProfileView } from './components/TelegramProfileView';
import { TelegramSimulator } from './components/TelegramSimulator';
import { MiniAppView } from './components/MiniAppView';
import { CodeInspector } from './components/CodeInspector';
import { DeploymentGuide } from './components/DeploymentGuide';
import { ConfigModal } from './components/ConfigModal';
import { initialConfig, BotConfig } from './data/defaultCode';
import { Bot, Smartphone, Code2, Rocket, ExternalLink, Sparkles, User, ListTodo, Edit3 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'profile' | 'miniapp' | 'simulator' | 'code' | 'deploy'>('profile');
  const [config, setConfig] = useState<BotConfig>(initialConfig);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isMiniAppModalOpen, setIsMiniAppModalOpen] = useState(false);

  const handleQuickRename = (newName: string) => {
    setConfig((prev) => ({
      ...prev,
      botName: newName,
      botUsername: `${newName.toLowerCase().replace(/\s+/g, '_')}_bot`,
      botBio: `The best AI-powered group moderator with a powerful WebApp. News and Updates: @${newName.replace(/\s+/g, '')}Updates`,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenConfig={() => setIsConfigOpen(true)}
        config={config}
        onQuickRename={handleQuickRename}
      />

      {/* Sub-Header Notice / Custom Name Selector */}
      <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border-b border-slate-800/80 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-slate-300 font-medium">
              Active Bot: <span className="font-bold text-cyan-300">{config.botName}</span> (<code className="text-blue-300">@{config.botUsername}</code>)
            </span>
            <span className="text-slate-500 hidden md:inline">•</span>
            <span className="text-slate-400 hidden md:inline">
              Quality & UI match your screenshots 100%, and the name is fully customizable!
            </span>
          </div>

          {/* Quick Presets */}
          <div className="flex items-center space-x-1.5">
            <span className="text-slate-400 text-[11px] font-medium hidden sm:inline">Try Names:</span>
            {['SWEET AI BOT', 'Celestia', 'Nova AI', 'Aura Bot'].map((name) => (
              <button
                key={name}
                onClick={() => handleQuickRename(name)}
                className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition ${
                  config.botName === name
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main View Area */}
      <main className="flex-1 py-6 px-4">
        {/* TAB 1: Bot Profile Screen (Screenshot 1) */}
        {activeTab === 'profile' && (
          <div className="space-y-4">
            <div className="max-w-md mx-auto text-center mb-3">
              <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-semibold inline-flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                Telegram Bot Profile (Screenshot 1 Quality)
              </span>
              <p className="text-xs text-slate-400 mt-1">
                Tap <strong>Open App</strong> to launch the Task Sheet or <strong>Message</strong> to chat
              </p>
            </div>
            <TelegramProfileView
              config={config}
              onOpenMiniApp={() => setActiveTab('miniapp')}
              onOpenChat={() => setActiveTab('simulator')}
              onOpenAffiliate={() => setActiveTab('miniapp')}
            />
          </div>
        )}

        {/* TAB 2: Task Sheet Modal (Screenshot 2) */}
        {activeTab === 'miniapp' && (
          <div className="space-y-4">
            <div className="max-w-md mx-auto text-center mb-3">
              <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-semibold inline-flex items-center gap-1.5">
                <ListTodo className="w-3.5 h-3.5" />
                Telegram WebApp Task Sheet (Screenshot 2 Quality)
              </span>
              <p className="text-xs text-slate-400 mt-1">
                Complete tasks with the <strong>Go</strong> buttons to earn tokens
              </p>
            </div>
            <MiniAppView
              config={config}
              onCloseModal={() => setActiveTab('profile')}
            />
          </div>
        )}

        {/* TAB 3: Telegram Chat Simulator with Gemini 1.5 Flash */}
        {activeTab === 'simulator' && (
          <TelegramSimulator
            config={config}
            onOpenMiniAppModal={() => setActiveTab('miniapp')}
          />
        )}

        {/* TAB 4: Python Code Inspector */}
        {activeTab === 'code' && (
          <CodeInspector config={config} />
        )}

        {/* TAB 5: Render.com Deploy Walkthrough */}
        {activeTab === 'deploy' && (
          <DeploymentGuide config={config} />
        )}
      </main>

      {/* Configuration Modal */}
      {isConfigOpen && (
        <ConfigModal
          config={config}
          onSave={(newCfg) => setConfig(newCfg)}
          onClose={() => setIsConfigOpen(false)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-slate-400 font-medium">
              {config.botName} AI Python Bot Backend
            </span>
            <span>•</span>
            <span>python-telegram-bot 20.7 + Gemini 1.5 Flash</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-400">
            <button
              onClick={() => setActiveTab('code')}
              className="hover:text-cyan-400 transition"
            >
              main.py
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className="hover:text-cyan-400 transition"
            >
              requirements.txt
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className="hover:text-cyan-400 transition"
            >
              Procfile
            </button>
            <a
              href="https://render.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition flex items-center gap-1"
            >
              <span>Render Free Tier</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
