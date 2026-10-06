import React, { useState } from 'react';
import { Settings2, X, Save, RefreshCw, Key, Globe, Users, Shield, User, FileText, Sparkles } from 'lucide-react';
import { BotConfig, initialConfig } from '../data/defaultCode';

interface ConfigModalProps {
  config: BotConfig;
  onSave: (config: BotConfig) => void;
  onClose: () => void;
}

export const ConfigModal: React.FC<ConfigModalProps> = ({ config, onSave, onClose }) => {
  const [formData, setFormData] = useState<BotConfig>({ ...config });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const handleReset = () => {
    setFormData({ ...initialConfig });
  };

  const applyPreset = (name: string, username: string) => {
    setFormData((prev) => ({
      ...prev,
      botName: name,
      botUsername: username,
      botBio: `The best AI-powered group moderator with a powerful WebApp. News and Updates: @${name}Updates`,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center">
            <Settings2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-white">Bot Customization & Settings</h3>
            <p className="text-xs text-slate-400">Change bot name, username, tokens, and links</p>
          </div>
        </div>

        {/* Quick Name Presets */}
        <div className="mb-4 p-3 bg-slate-950 rounded-2xl border border-slate-800">
          <p className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Quick Name Presets:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {[
              { name: 'SWEET AI BOT', username: 'Sweet_AI_Bot' },
              { name: 'Celestia', username: 'AI_Celestia_bot' },
              { name: 'Nova AI', username: 'Nova_AI_bot' },
              { name: 'Aura Mod', username: 'Aura_Mod_bot' },
            ].map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => applyPreset(p.name, p.username)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium border transition ${
                  formData.botName === p.name
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
          {/* Bot Name and Username */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-cyan-400" />
                Bot Name:
              </label>
              <input
                type="text"
                required
                value={formData.botName}
                onChange={(e) => setFormData({ ...formData, botName: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-semibold text-white outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-blue-400" />
                Bot Username:
              </label>
              <input
                type="text"
                required
                value={formData.botUsername}
                onChange={(e) => setFormData({ ...formData, botUsername: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Monthly Users and Affiliate % */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                Monthly Users Badge:
              </label>
              <input
                type="text"
                value={formData.monthlyUsers}
                onChange={(e) => setFormData({ ...formData, monthlyUsers: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Affiliate Commission:
              </label>
              <input
                type="text"
                value={formData.affiliatePercent}
                onChange={(e) => setFormData({ ...formData, affiliatePercent: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-emerald-400 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-slate-400" />
              Bot Bio:
            </label>
            <textarea
              rows={2}
              value={formData.botBio}
              onChange={(e) => setFormData({ ...formData, botBio: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 outline-none focus:border-blue-500 resize-none"
            />
          </div>

          {/* Telegram Bot Token */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-cyan-400" />
              Telegram Bot Token:
            </label>
            <input
              type="text"
              required
              value={formData.botToken}
              onChange={(e) => setFormData({ ...formData, botToken: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300 outline-none focus:border-blue-500"
            />
          </div>

          {/* Google Gemini API Key */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-amber-400" />
              Google Gemini API Key:
            </label>
            <input
              type="text"
              value={formData.geminiApiKey}
              onChange={(e) => setFormData({ ...formData, geminiApiKey: e.target.value })}
              placeholder="GEMINI_API_KEY from environment"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-300 outline-none focus:border-blue-500"
            />
          </div>

          {/* WebApp URL */}
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              Mini App URL:
            </label>
            <input
              type="url"
              required
              value={formData.miniAppUrl}
              onChange={(e) => setFormData({ ...formData, miniAppUrl: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-300 outline-none focus:border-blue-500"
            />
          </div>

          {/* Community Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                Channel Link:
              </label>
              <input
                type="url"
                value={formData.channelUrl}
                onChange={(e) => setFormData({ ...formData, channelUrl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-300 outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1 flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-purple-400" />
                VIP Group Link:
              </label>
              <input
                type="url"
                value={formData.vipGroupUrl}
                onChange={(e) => setFormData({ ...formData, vipGroupUrl: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-300 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-between gap-3 border-t border-slate-800">
            <button
              type="button"
              onClick={handleReset}
              className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-xl text-xs font-medium transition flex items-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-md shadow-blue-500/20 transition flex items-center space-x-1.5"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save & Apply</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
