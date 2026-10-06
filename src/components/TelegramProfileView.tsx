import React, { useState } from 'react';
import {
  ArrowLeft,
  MoreVertical,
  MessageSquare,
  Bell,
  BellOff,
  Share2,
  Ban,
  QrCode,
  Users,
  ChevronRight,
  UserPlus,
  Shield,
  Sparkles,
  ExternalLink,
  Check,
  Copy
} from 'lucide-react';
import { BotConfig } from '../data/defaultCode';

interface TelegramProfileViewProps {
  config: BotConfig;
  onOpenMiniApp: () => void;
  onOpenChat: () => void;
  onOpenAffiliate: () => void;
}

export const TelegramProfileView: React.FC<TelegramProfileViewProps> = ({
  config,
  onOpenMiniApp,
  onOpenChat,
  onOpenAffiliate,
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [copiedUsername, setCopiedUsername] = useState(false);
  const [addedToGroup, setAddedToGroup] = useState(false);

  const handleCopyUsername = () => {
    navigator.clipboard.writeText(`@${config.botUsername}`);
    setCopiedUsername(true);
    setTimeout(() => setCopiedUsername(false), 2000);
  };

  const handleShare = () => {
    const url = `https://t.me/${config.botUsername}`;
    if (navigator.share) {
      navigator.share({ title: config.botName, url });
    } else {
      navigator.clipboard.writeText(url);
      alert(`Copied link to clipboard: ${url}`);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-black text-white rounded-3xl border-4 border-slate-800 shadow-2xl overflow-hidden font-sans select-none">
      {/* Top Telegram Header Bar */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-white/5">
        <button
          onClick={onOpenChat}
          className="text-white hover:text-slate-300 transition p-1 rounded-full hover:bg-white/10"
          title="Back to chat"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <span className="text-xs text-slate-400 font-medium">Bot Profile</span>
        <button
          onClick={handleShare}
          className="text-white hover:text-slate-300 transition p-1 rounded-full hover:bg-white/10"
        >
          <MoreVertical className="w-6 h-6" />
        </button>
      </div>

      {/* Profile Avatar & Title Section */}
      <div className="p-6 flex flex-col items-center text-center">
        {/* Avatar with Badges */}
        <div className="relative mb-3">
          <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-white/10 shadow-2xl bg-gradient-to-tr from-amber-200 via-rose-300 to-indigo-400 flex items-center justify-center relative">
            {/* Elegant AI Avatar representation matching screenshot */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80"
              alt={config.botName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* AI Badge on Left */}
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 bg-[#00bcd4] text-black font-extrabold text-[9px] px-1.5 py-0.5 rounded-md shadow-md uppercase tracking-wider">
            AI
          </div>

          {/* Shield Badge on Right */}
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 bg-[#00e5ff]/20 border border-[#00e5ff] text-[#00e5ff] p-1 rounded-full shadow-md backdrop-blur-sm">
            <Shield className="w-3 h-3 fill-current" />
          </div>
        </div>

        {/* Bot Name & Monthly Users */}
        <h1 className="text-xl font-bold tracking-tight text-white mb-0.5">
          {config.botName}
        </h1>
        <p className="text-xs text-slate-400 font-medium">
          {config.monthlyUsers} monthly users
        </p>

        {/* 4 Action Buttons Row: Message, Mute, Share, Stop */}
        <div className="grid grid-cols-4 gap-3 w-full mt-6">
          <button
            onClick={onOpenChat}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#1c1c1e] hover:bg-[#2c2c2e] active:scale-95 transition"
          >
            <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center mb-1 shadow">
              <MessageSquare className="w-5 h-5 fill-current" />
            </div>
            <span className="text-[11px] text-slate-300 font-medium">Message</span>
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#1c1c1e] hover:bg-[#2c2c2e] active:scale-95 transition"
          >
            <div className="w-10 h-10 rounded-full bg-[#2c2c2e] text-white flex items-center justify-center mb-1">
              {isMuted ? <BellOff className="w-5 h-5 text-amber-400" /> : <Bell className="w-5 h-5" />}
            </div>
            <span className="text-[11px] text-slate-300 font-medium">{isMuted ? 'Unmute' : 'Mute'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#1c1c1e] hover:bg-[#2c2c2e] active:scale-95 transition"
          >
            <div className="w-10 h-10 rounded-full bg-[#2c2c2e] text-white flex items-center justify-center mb-1">
              <Share2 className="w-5 h-5" />
            </div>
            <span className="text-[11px] text-slate-300 font-medium">Share</span>
          </button>

          <button
            onClick={() => alert(`Bot ${config.botName} is active and running.`)}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-[#1c1c1e] hover:bg-[#2c2c2e] active:scale-95 transition"
          >
            <div className="w-10 h-10 rounded-full bg-[#2c2c2e] text-slate-400 hover:text-rose-400 flex items-center justify-center mb-1">
              <Ban className="w-5 h-5" />
            </div>
            <span className="text-[11px] text-slate-300 font-medium">Stop</span>
          </button>
        </div>
      </div>

      {/* Info Cards Container */}
      <div className="px-4 pb-6 space-y-3">
        {/* Bio Card */}
        <div className="bg-[#1c1c1e] rounded-2xl p-4">
          <p className="text-[13px] text-white leading-relaxed font-normal">
            {config.botBio}
          </p>
          <span className="text-[11px] text-slate-500 font-medium block mt-1.5">
            Bio
          </span>
        </div>

        {/* Username Card with QR Code */}
        <div
          onClick={handleCopyUsername}
          className="bg-[#1c1c1e] rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-[#242426] transition"
        >
          <div>
            <p className="text-[14px] text-white font-medium">
              @{config.botUsername}
            </p>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
              {copiedUsername ? 'Copied to clipboard!' : 'Username'}
            </span>
          </div>
          <div className="text-slate-400 p-1.5 rounded-lg bg-white/5">
            {copiedUsername ? <Check className="w-5 h-5 text-emerald-400" /> : <QrCode className="w-5 h-5" />}
          </div>
        </div>

        {/* Big Open App Button */}
        <div className="pt-2">
          <button
            onClick={onOpenMiniApp}
            className="w-full py-3.5 px-4 bg-[#2f80ed] hover:bg-[#256fd1] active:scale-[0.98] text-white font-semibold rounded-2xl text-sm shadow-lg shadow-blue-500/20 transition flex items-center justify-center space-x-2"
          >
            <span>Open App</span>
          </button>
          <p className="text-[11px] text-slate-500 text-center mt-2 px-2 leading-tight">
            By launching this mini app, you agree to the Terms of Service for Mini Apps.
          </p>
        </div>

        {/* Affiliate Program Card */}
        <div className="pt-2">
          <div
            onClick={onOpenAffiliate}
            className="bg-[#1c1c1e] hover:bg-[#242426] rounded-2xl p-3.5 flex items-center justify-between cursor-pointer transition"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
                <Users className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-white">
                Affiliate Program
              </span>
            </div>

            <div className="flex items-center space-x-1.5">
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded-md text-xs font-bold border border-emerald-500/30">
                {config.affiliatePercent}
              </span>
              <ChevronRight className="w-4 h-4 text-slate-500" />
            </div>
          </div>
          <p className="text-[11px] text-slate-500 mt-1.5 px-1 leading-snug">
            Share a link to {config.botName} with your friends and earn {config.affiliatePercent} of their spending there.
          </p>
        </div>

        {/* Add to Group or Channel Card */}
        <div className="pt-2">
          <button
            onClick={() => {
              setAddedToGroup(true);
              setTimeout(() => setAddedToGroup(false), 2500);
            }}
            className="w-full bg-[#1c1c1e] hover:bg-[#242426] rounded-2xl p-3.5 flex items-center justify-between transition text-left"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center">
                <UserPlus className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold text-white">
                {addedToGroup ? `Added ${config.botName} to Group!` : 'Add to Group or Channel'}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-500" />
          </button>
          <p className="text-[11px] text-slate-500 mt-1.5 px-1 leading-snug">
            This bot is able to manage a group or channel.
          </p>
        </div>
      </div>
    </div>
  );
};
