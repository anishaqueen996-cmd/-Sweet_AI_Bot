import React, { useState } from 'react';
import {
  Send,
  Sparkles,
  Users,
  Video,
  Wallet,
  Coins,
  Flame,
  Shield,
  Gift,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  ChevronRight,
  Pin,
  Volume2,
  MoreVertical,
  ArrowLeft
} from 'lucide-react';
import { BotConfig } from '../data/defaultCode';

interface MiniAppViewProps {
  config: BotConfig;
  isModal?: boolean;
  onCloseModal?: () => void;
}

export const MiniAppView: React.FC<MiniAppViewProps> = ({
  config,
  isModal = false,
  onCloseModal,
}) => {
  const [activeTab, setActiveTab] = useState<'tasks' | 'rewards' | 'affiliate' | 'moderator'>('tasks');
  const [points, setPoints] = useState(2450);
  const [streakClaimed, setStreakClaimed] = useState(false);
  const [streakDays, setStreakDays] = useState(4);
  const [copiedRef, setCopiedRef] = useState(false);

  // Exact Tasks matching Screenshot 2
  const [taskList, setTaskList] = useState([
    {
      id: 1,
      title: 'Subscribe to Official Channel',
      iconType: 'telegram',
      points: 500,
      done: false,
      url: config.channelUrl,
    },
    {
      id: 2,
      title: 'Join VIP Group',
      iconType: 'telegram',
      points: 750,
      done: false,
      url: config.vipGroupUrl,
    },
    {
      id: 3,
      title: 'Watch Beginner Tutorial',
      iconType: 'video',
      points: 400,
      done: false,
      url: config.tutorialUrl,
    },
    {
      id: 4,
      title: 'Link Mobikwik',
      iconType: 'wallet',
      points: 600,
      done: false,
      url: '#',
    },
    {
      id: 5,
      title: 'Purchase 2000 IToken(0)',
      iconType: 'coin',
      points: 2000,
      done: false,
      url: '#',
    },
  ]);

  // Affiliate Calculator state
  const [referralsCount, setReferralsCount] = useState(15);
  const vipPrice = 20;
  const commissionRate = 0.5;
  const estimatedEarnings = referralsCount * vipPrice * commissionRate;

  // Moderation state
  const [modSettings, setModSettings] = useState({
    antiSpam: true,
    antiLinks: true,
    antiFlood: true,
    aiSentiment: true,
  });

  const handleTaskGo = (taskId: number, taskUrl: string, taskPoints: number) => {
    // If external URL, open it
    if (taskUrl && taskUrl.startsWith('http')) {
      window.open(taskUrl, '_blank');
    }
    // Mark task done and add points
    setTaskList((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, done: true } : t))
    );
    setPoints((prev) => prev + taskPoints);
  };

  const handleClaimStreak = () => {
    if (streakClaimed) return;
    setStreakClaimed(true);
    setPoints((prev) => prev + 250);
    setStreakDays((prev) => prev + 1);
  };

  const handleCopyReferral = () => {
    const link = `https://t.me/${config.botUsername}?start=ref_934682`;
    navigator.clipboard.writeText(link);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  return (
    <div className={`mx-auto ${isModal ? 'max-w-md w-full' : 'max-w-md px-2 py-4'}`}>
      {/* Phone Screen Container with Group Background matching Screenshot 2 */}
      <div className="bg-[#0e1621] rounded-3xl border-4 border-slate-800 shadow-2xl overflow-hidden flex flex-col min-h-[680px] relative text-white font-sans">
        {/* Group Header (matching Screenshot 2: "Buy Sell disscussion 1150 members, 62 online") */}
        <div className="bg-[#17212b] px-4 py-2.5 flex items-center justify-between border-b border-[#242f3d] z-10">
          <div className="flex items-center space-x-3">
            <button
              onClick={onCloseModal}
              className="text-slate-300 hover:text-white transition p-1"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center font-bold text-xs ring-1 ring-white/10 shadow-sm">
              TB
            </div>
            <div>
              <div className="flex items-center space-x-1">
                <span className="font-semibold text-sm">Buy Sell disscussion</span>
                <Volume2 className="w-3.5 h-3.5 text-slate-400" />
              </div>
              <p className="text-[11px] text-slate-400">1150 members, 62 online</p>
            </div>
          </div>
          <button className="text-slate-400 hover:text-white p-1">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Pinned Message Bar */}
        <div className="bg-[#1c2733] px-4 py-2 flex items-center justify-between text-xs border-b border-[#273545] z-10">
          <div className="flex items-center space-x-2 truncate">
            <Pin className="w-3.5 h-3.5 text-blue-400 rotate-45 shrink-0" />
            <div className="truncate text-slate-300 text-[11px]">
              <span className="text-blue-400 font-semibold">Pinned Message</span>: 🎉 SB Pay Officially Launched 💰 Sup...
            </div>
          </div>
        </div>

        {/* Background Group Chat simulation (visible beneath the task sheet) */}
        <div className="flex-1 p-4 space-y-3 bg-[#0e1621] text-xs text-slate-300 overflow-y-auto">
          {/* Authentic Telegram Mini App Overlay Sheet matching Screenshot 2 */}
          <div className="bg-white text-slate-900 rounded-3xl p-5 shadow-2xl space-y-4 my-2 border border-slate-200">
            {/* Sheet Sub-Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-md shadow-blue-500/20">
                  {config.botName.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 leading-tight">
                    {config.botName} Tasks & Rewards
                  </h3>
                  <p className="text-[11px] text-slate-500">Complete tasks to claim tokens</p>
                </div>
              </div>

              <div className="flex items-center space-x-1.5 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full">
                <Coins className="w-3.5 h-3.5 text-amber-500" />
                <span className="font-bold text-xs text-amber-700">{points.toLocaleString()}</span>
              </div>
            </div>

            {/* Task Tabs Pill Switcher */}
            <div className="grid grid-cols-3 gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setActiveTab('tasks')}
                className={`py-1.5 rounded-lg transition ${
                  activeTab === 'tasks' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Mission Tasks
              </button>
              <button
                onClick={() => setActiveTab('rewards')}
                className={`py-1.5 rounded-lg transition ${
                  activeTab === 'rewards' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Daily Streak
              </button>
              <button
                onClick={() => setActiveTab('affiliate')}
                className={`py-1.5 rounded-lg transition ${
                  activeTab === 'affiliate' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                50% Affiliate
              </button>
            </div>

            {/* TAB 1: SCREENSHOT 2 TASKS */}
            {activeTab === 'tasks' && (
              <div className="space-y-3 pt-1">
                {taskList.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0 hover:bg-slate-50/60 px-2 rounded-xl transition"
                  >
                    <div className="flex items-center space-x-3">
                      {/* Telegram Icon */}
                      {task.iconType === 'telegram' && (
                        <div className="w-8 h-8 rounded-full bg-[#29b6f6] flex items-center justify-center text-white shadow-sm shrink-0">
                          <Send className="w-4 h-4 -rotate-45 -translate-y-0.5 translate-x-0.5" />
                        </div>
                      )}
                      {/* Video Tutorial Icon */}
                      {task.iconType === 'video' && (
                        <div className="w-8 h-8 rounded-full bg-[#4fc3f7] flex items-center justify-center text-white shadow-sm shrink-0">
                          <Video className="w-4 h-4" />
                        </div>
                      )}
                      {/* Wallet Icon */}
                      {task.iconType === 'wallet' && (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-emerald-500 flex items-center justify-center text-white shadow-sm shrink-0">
                          <Wallet className="w-4 h-4" />
                        </div>
                      )}
                      {/* Coin Icon */}
                      {task.iconType === 'coin' && (
                        <div className="w-8 h-8 rounded-full bg-[#fbc02d] flex items-center justify-center text-white shadow-sm shrink-0">
                          <Coins className="w-4 h-4 text-amber-900" />
                        </div>
                      )}

                      <div>
                        <p className="text-xs font-medium text-slate-800 leading-snug">
                          {task.title}
                        </p>
                        <p className="text-[10px] text-emerald-600 font-semibold">
                          +{task.points} Points
                        </p>
                      </div>
                    </div>

                    {/* Screenshot 2 "Go" button matching style */}
                    <button
                      onClick={() => handleTaskGo(task.id, task.url, task.points)}
                      disabled={task.done}
                      className={`px-5 py-1.5 rounded-full text-xs font-semibold transition shadow-sm ${
                        task.done
                          ? 'bg-emerald-100 text-emerald-700 cursor-default'
                          : 'bg-[#29b6f6] hover:bg-[#039be5] text-white active:scale-95'
                      }`}
                    >
                      {task.done ? 'Done' : 'Go'}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* TAB 2: DAILY STREAK */}
            {activeTab === 'rewards' && (
              <div className="space-y-4 pt-1">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
                    <div>
                      <h4 className="font-bold text-xs text-amber-900">Day {streakDays} Streak</h4>
                      <p className="text-[10px] text-amber-700">+250 Points reward</p>
                    </div>
                  </div>
                  <button
                    onClick={handleClaimStreak}
                    disabled={streakClaimed}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition ${
                      streakClaimed
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-500 text-white hover:bg-amber-600 shadow'
                    }`}
                  >
                    {streakClaimed ? 'Claimed' : 'Claim Daily'}
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center">
                  {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                    <div
                      key={day}
                      className={`p-2 rounded-xl text-[10px] border font-medium ${
                        day <= streakDays
                          ? 'bg-amber-100 border-amber-300 text-amber-800'
                          : 'bg-slate-50 border-slate-200 text-slate-400'
                      }`}
                    >
                      <div>D{day}</div>
                      <div className="font-bold">+{day * 50}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: 50% AFFILIATE */}
            {activeTab === 'affiliate' && (
              <div className="space-y-3 pt-1">
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[11px] font-bold text-emerald-800 uppercase">Direct Commission</span>
                    <span className="px-2 py-0.5 bg-emerald-200 text-emerald-800 rounded-full text-[10px] font-extrabold">
                      {config.affiliatePercent}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700">
                    Invite group owners or friends to {config.botName} and earn {config.affiliatePercent} of their VIP spending!
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-600 block">
                    Your Referral Invite Link:
                  </label>
                  <div className="flex items-center space-x-1.5">
                    <input
                      type="text"
                      readOnly
                      value={`https://t.me/${config.botUsername}?start=ref_934682`}
                      className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-2.5 py-1.5 text-[11px] font-mono text-blue-700 outline-none"
                    />
                    <button
                      onClick={handleCopyReferral}
                      className="px-3 py-1.5 bg-[#29b6f6] hover:bg-[#039be5] text-white rounded-xl text-xs font-semibold shadow-sm transition"
                    >
                      {copiedRef ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
                  <span className="text-slate-600">Referred Members ({referralsCount}):</span>
                  <span className="font-extrabold text-emerald-600">${estimatedEarnings.toFixed(2)} USD</span>
                </div>
              </div>
            )}
          </div>

          {/* Group Chat Messages (as seen in Screenshot 2) */}
          <div className="bg-[#182533] p-3 rounded-2xl border border-[#243242] space-y-1.5 text-[11px]">
            <p className="font-semibold text-sky-400">Tivrapay 2k per 200 newbie reward</p>
            <p className="text-slate-300">101 my side upi</p>
            <p className="text-cyan-300 font-mono underline break-all">
              🌟 Link: https://web.tivrapay1.com/#/rs/thwXwJw6Y4
            </p>
          </div>

          <div className="bg-[#182533] p-3 rounded-2xl border border-[#243242] space-y-1.5 text-[11px]">
            <p className="font-semibold text-sky-400">Zippay 5k per 500 newbie reward</p>
            <p className="text-slate-300">101 my side upi</p>
            <p className="text-cyan-300 font-mono underline break-all">
              🌟 Link: https://web.zippay.wiki/#/rs/GVId78mveG
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
