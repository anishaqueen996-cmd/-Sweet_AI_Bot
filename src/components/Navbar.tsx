import React from 'react';
import {
  Bot,
  Code2,
  Rocket,
  Smartphone,
  Settings2,
  User,
  ListTodo,
  Sparkles,
  Edit3
} from 'lucide-react';
import { BotConfig } from '../data/defaultCode';

interface NavbarProps {
  activeTab: 'profile' | 'miniapp' | 'simulator' | 'code' | 'deploy';
  setActiveTab: (tab: 'profile' | 'miniapp' | 'simulator' | 'code' | 'deploy') => void;
  onOpenConfig: () => void;
  config: BotConfig;
  onQuickRename: (newName: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenConfig,
  config,
  onQuickRename,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Brand + Name */}
          <div className="flex items-center space-x-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 font-bold text-base text-white">
              {config.botName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white">
                  {config.botName}
                </span>
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  @{config.botUsername}
                </span>
              </div>
              <div className="flex items-center space-x-1.5 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{config.monthlyUsers} users</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">{config.affiliatePercent} Affiliate</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/60">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'profile'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>1. Bot Profile UI</span>
            </button>

            <button
              onClick={() => setActiveTab('miniapp')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'miniapp'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <ListTodo className="w-3.5 h-3.5" />
              <span>2. Task Sheet (Go)</span>
            </button>

            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'simulator'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Chat Simulator</span>
            </button>

            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'code'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Python Code</span>
            </button>

            <button
              onClick={() => setActiveTab('deploy')}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'deploy'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Rocket className="w-3.5 h-3.5" />
              <span>Render Deploy</span>
            </button>
          </nav>

          {/* Right Action: Quick Rename & Full Settings */}
          <div className="flex items-center space-x-2">
            <div className="hidden sm:flex items-center bg-slate-800/80 border border-slate-700 rounded-xl px-2.5 py-1">
              <span className="text-[11px] text-slate-400 mr-1.5">Name:</span>
              <input
                type="text"
                value={config.botName}
                onChange={(e) => onQuickRename(e.target.value)}
                placeholder="Enter bot name..."
                className="bg-transparent text-xs font-bold text-cyan-300 w-24 sm:w-28 outline-none focus:text-white"
                title="Change bot name (updates all code and UI instantly)"
              />
              <Edit3 className="w-3 h-3 text-cyan-400 shrink-0" />
            </div>

            <button
              onClick={onOpenConfig}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-medium border border-slate-700 transition"
              title="Full Bot Settings"
            >
              <Settings2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">Settings</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Pills */}
        <div className="flex lg:hidden overflow-x-auto py-2 space-x-2 border-t border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1 rounded-lg whitespace-nowrap font-medium ${
              activeTab === 'profile' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            1. Profile UI
          </button>
          <button
            onClick={() => setActiveTab('miniapp')}
            className={`px-3 py-1 rounded-lg whitespace-nowrap font-medium ${
              activeTab === 'miniapp' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            2. Task Sheet
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1 rounded-lg whitespace-nowrap font-medium ${
              activeTab === 'simulator' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Chat Simulator
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1 rounded-lg whitespace-nowrap font-medium ${
              activeTab === 'code' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Python Code
          </button>
          <button
            onClick={() => setActiveTab('deploy')}
            className={`px-3 py-1 rounded-lg whitespace-nowrap font-medium ${
              activeTab === 'deploy' ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-300'
            }`}
          >
            Render Deploy
          </button>
        </div>
      </div>
    </header>
  );
};
