import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, Trophy, ShieldAlert, ChevronRight, Clock, Snowflake, Info, User as UserIcon, Sparkles } from 'lucide-react';
import { cn } from '../components/Layout';
import mockDataRaw from '../mock-data.json';
import { MockData, DayProgress } from '../types';

const mockData = mockDataRaw as unknown as MockData;

export default function Dashboard() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const stateParam = (searchParams.get('state') || 'active') as keyof typeof mockData.students;

  const [studentData, setStudentData] = useState(mockData.students[stateParam] || mockData.students['active']);
  const [freezes, setFreezes] = useState(studentData.user.freezes);
  const [streakFrozen, setStreakFrozen] = useState(false);

  useEffect(() => {
    const newData = mockData.students[stateParam] || mockData.students['active'];
    setStudentData(newData);
    setFreezes(newData.user.freezes);
    setStreakFrozen(false);
  }, [stateParam]);

  const { user, progress } = studentData;
  const completedDays = progress.filter(p => p.status === 'completed').length;
  const totalDays = 60;
  const progressPercentage = Math.round((completedDays / totalDays) * 100) || 0;
  const todayTask = progress.find(p => p.status === 'pending' || p.status === 'missed') || progress[0];

  const handleUseFreeze = () => {
    if (freezes > 0) {
      setFreezes(f => f - 1);
      setStreakFrozen(true);
    }
  };

  const handleResetStreak = () => {
    setStreakFrozen(true);
  };

  const renderHeatmapSquare = (day: DayProgress | null, index: number) => {
    if (!day) {
      return <div key={`empty-${index}`} className="w-3 h-3 rounded-sm bg-white/5 border border-white/5 shadow-inner"></div>;
    }
    let bgClass = "bg-white/5 border-white/10";
    if (day.status === 'completed') bgClass = "bg-green-500 border-green-400 shadow-[0_0_10px_rgba(34,197,94,0.4)]";
    if (day.status === 'missed') bgClass = "bg-red-500 border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.4)]";
    if (streakFrozen && day.status === 'missed') bgClass = "bg-blue-500 border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.4)]";
    if (day.status === 'pending') bgClass = "bg-white/10 border-white/20 animate-pulse";
    return (
      <Link
        key={day.id}
        to={day.status !== 'locked' ? `/day/${day.id}` : '#'}
        className={cn("w-3 h-3 rounded-sm border transition-all cursor-pointer hover:scale-125 hover:z-10", bgClass, day.status === 'locked' && "cursor-not-allowed hover:scale-100")}
        title={`Day ${day.id}: ${day.status}`}
      />
    );
  };

  const heatmapSquares = Array.from({ length: 60 }).map((_, i) => {
    const day = progress.find(p => p.id === i + 1);
    return day || null;
  });

  if (stateParam === 'empty') {
    return (
      <div className="flex-1 flex flex-col bg-background pb-10 min-h-screen text-gray-100 items-center justify-center p-6 text-center relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/20 rounded-full blur-[80px]"></div>
        <div className="w-24 h-24 glass-dark rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_30px_rgba(59,130,246,0.15)] relative z-10">
          <UserIcon size={40} className="text-gray-400" />
        </div>
        <h2 className="text-3xl font-bold mb-2 text-white relative z-10">Welcome to AB<span className="text-primary">Talks</span></h2>
        <p className="text-gray-400 text-sm mb-8 max-w-xs font-light relative z-10">Your 60-day coding journey hasn't started yet. Set up your profile to unlock the roadmap.</p>
        <button className="bg-gradient-to-r from-primary to-accent hover:from-blue-400 hover:to-indigo-500 text-white font-bold py-4 px-8 rounded-2xl w-full min-h-[56px] shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all relative z-10">
          Complete Profile
        </button>
      </div>
    );
  }

  const displayStreak = (user.needsComeback && !streakFrozen) ? 0 : user.currentStreak;

  return (
    <div className="flex-1 flex flex-col bg-background pb-10 min-h-screen text-gray-100 selection:bg-primary/30 relative">

      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] bg-primary/20 rounded-full blur-[80px]"></div>
      </div>

      {/* Top Section */}
      <div className={cn(
        "px-6 pt-6 pb-10 rounded-b-[2.5rem] relative z-10 transition-colors duration-500 border-b border-white/5",
        user.isFirstTime ? "bg-gradient-to-b from-blue-900/40 to-background" :
        (user.needsComeback && !streakFrozen) ? "bg-gradient-to-b from-red-900/40 to-background" :
        "bg-gradient-to-b from-surface to-background"
      )}>
        <div className="max-w-[1040px] mx-auto flex flex-col gap-6">

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {user.avatar ? (
                <div className="relative">
                  <div className="absolute inset-0 bg-primary/50 rounded-full blur-md"></div>
                  <img src={user.avatar} alt="Profile" className="relative w-12 h-12 rounded-full border border-white/20 shadow-lg object-cover" />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                  <UserIcon size={24} className="text-gray-400" />
                </div>
              )}
              <div>
                <p className="text-gray-400 text-xs font-semibold tracking-wide uppercase">Welcome back,</p>
                <h2 className="text-white font-bold text-xl tracking-tight">{user.name}</h2>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="glass-dark px-3 py-1.5 rounded-full flex items-center gap-1.5">
                <Trophy size={14} className="text-yellow-400" />
                <span className="text-white font-semibold text-xs">#420</span>
              </div>
            </div>
          </div>

          {/* Hero Card */}
          {user.isFirstTime ? (
            <div className="glass-dark rounded-3xl p-6 border border-primary/20 shadow-[0_0_30px_rgba(59,130,246,0.1)] relative overflow-hidden">
              <div className="absolute -right-4 -bottom-4 opacity-10 text-primary">
                <Sparkles size={120} />
              </div>
              <h3 className="font-bold text-2xl mb-1 text-white relative z-10">Ready to begin?</h3>
              <p className="text-gray-400 text-sm mb-6 font-light relative z-10">Start your 60-day journey today. Consistency is key.</p>
              <div className="flex items-center gap-3 font-extrabold text-4xl text-gray-700 relative z-10">
                <Flame size={32} /> 0 <span className="text-lg text-gray-500 font-medium">Day Streak</span>
              </div>
            </div>
          ) : (user.needsComeback && !streakFrozen) ? (
            <div className="glass-dark rounded-3xl p-6 border border-red-500/30 relative overflow-hidden shadow-[0_0_30px_rgba(239,68,68,0.15)]">
              <ShieldAlert className="absolute -right-4 -bottom-4 w-32 h-32 text-red-500 opacity-5" />
              <div className="inline-block px-2 py-1 bg-red-500/20 rounded text-xs font-bold uppercase tracking-wider mb-3 text-red-300 border border-red-500/20">
                Streak At Risk
              </div>
              <h3 className="font-bold text-2xl mb-1 text-white relative z-10">You missed Day {todayTask ? (todayTask.id - 1 || 'yesterday') : 'yesterday'}.</h3>
              <p className="text-gray-300 text-sm mb-6 font-light relative z-10">Use a Streak Freeze to protect your <span className="font-bold text-red-400">{user.currentStreak}-day</span> streak?</p>
              {freezes > 0 ? (
                <div className="flex gap-3 relative z-10">
                  <button onClick={handleUseFreeze} className="flex-1 bg-gradient-to-r from-blue-600 to-primary text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all min-h-[44px]">
                    <Snowflake size={16} /> Use Freeze
                  </button>
                  <button onClick={handleResetStreak} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-semibold py-3 px-4 rounded-xl text-sm transition-all min-h-[44px]">
                    Let it reset
                  </button>
                </div>
              ) : (
                <div className="bg-red-950/40 p-4 rounded-xl border border-red-900/50 backdrop-blur-md relative z-10">
                  <p className="text-sm text-red-200 font-medium leading-relaxed">You have 0 freezes left. Your streak has reset to 0. Start a new one today!</p>
                </div>
              )}
            </div>
          ) : (
            <div className="glass-dark rounded-3xl p-6 border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-colors duration-700"></div>
              <div className="flex justify-between items-start mb-2 relative z-10">
                <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold">Current Streak</p>
                <div className="flex items-center gap-1.5 bg-blue-900/40 px-2.5 py-1 rounded-md border border-blue-500/20 backdrop-blur-md">
                  <Snowflake size={12} className="text-blue-400" />
                  <span className="text-[10px] font-bold text-blue-300 uppercase tracking-wider">{freezes} left</span>
                </div>
              </div>
              <div className="flex items-end gap-2 mb-5 relative z-10">
                <span className="font-bold text-6xl leading-none flex items-center gap-2 tracking-tighter">
                  <Flame className={cn("transition-colors duration-500 filter drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]", displayStreak > 0 ? "text-orange-500 animate-pulse-glow" : "text-gray-700 drop-shadow-none")} size={44} />
                  <span className={cn(displayStreak > 0 ? "text-white" : "text-gray-700")}>{displayStreak}</span>
                </span>
                <span className="text-gray-500 mb-2 font-medium">days</span>
              </div>
              <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden relative z-10 shadow-inner">
                <div className="bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-300 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${Math.min((displayStreak / 60) * 100, 100)}%` }}></div>
              </div>
              <p className="text-xs text-gray-500 mt-3 text-right font-medium relative z-10">Personal best: <span className="text-gray-300">{user.longestStreak} days</span></p>
            </div>
          )}

        </div>
      </div>

      {/* Today's Task */}
      <div className="px-6 -mt-8 relative z-20">
        <div className="max-w-[1040px] mx-auto">
          <Link
            to={todayTask ? `/day/${todayTask.id}` : '#'}
            className={cn(
              "glass-dark rounded-3xl p-6 flex flex-col transition-all duration-300 group hover:-translate-y-1 shadow-[0_20px_60px_rgba(0,0,0,0.25)]",
              !todayTask ? "opacity-50 cursor-not-allowed" : "hover:border-primary/40 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
            )}
          >
            {todayTask ? (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-primary/10 text-primary text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border border-primary/20 backdrop-blur-sm">
                    Day {todayTask.id} • Today
                  </div>
                  {todayTask.status === 'missed' && (
                    <div className="bg-red-500/10 text-red-400 text-[10px] font-bold px-2.5 py-1 rounded-md flex items-center gap-1 border border-red-500/20 backdrop-blur-sm">
                      <Clock size={12} /> Pending Rescue
                    </div>
                  )}
                </div>
                <h3 className="font-bold text-white text-xl mb-2 leading-tight">{todayTask.taskTitle}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-5 font-light leading-relaxed">{todayTask.taskDescription}</p>
                <div className="w-full bg-white/5 border border-white/10 text-white rounded-xl py-3.5 flex items-center justify-center font-bold text-sm group-hover:bg-primary/20 group-hover:border-primary/30 transition-colors min-h-[44px]">
                  {(user.needsComeback && !streakFrozen) ? "Rescue Streak Now" : "Start Today's Task"} <ChevronRight size={18} className="ml-1 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </>
            ) : (
              <div className="text-center py-6 text-gray-500 font-medium">No tasks available</div>
            )}
          </Link>
        </div>
      </div>

      {/* Heatmap */}
      <div className="px-6 mt-10 relative z-10">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-white text-xl tracking-tight">Your Journey</h3>
          <span className="text-primary font-bold text-xs bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">{progressPercentage}% Done</span>
        </div>
        <div className="glass-dark rounded-3xl p-6">
          <div className="flex flex-wrap gap-[6px]">
            {heatmapSquares.map((day, index) => renderHeatmapSquare(day, index))}
          </div>
          <div className="mt-6 flex items-center justify-center gap-5 text-xs text-gray-400 font-medium">
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-green-500"></div> Completed</div>
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-blue-500"></div> Frozen</div>
            <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-sm bg-red-500"></div> Missed</div>
          </div>
          <div className="mt-6 flex items-start gap-3 bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
            <div className="bg-primary/20 p-1.5 rounded-lg shrink-0">
              <Info size={16} className="text-primary" />
            </div>
            <p className="text-xs text-gray-400 leading-relaxed font-light mt-0.5">
              <strong className="text-gray-200 font-semibold">Streak Freeze:</strong> Protects your streak if you miss a day. You get 2 per challenge. Use them wisely!
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
