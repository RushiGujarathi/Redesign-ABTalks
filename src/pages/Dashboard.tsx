import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, Trophy, ShieldAlert, ChevronRight, Clock, Snowflake, Info, User as UserIcon } from 'lucide-react';
import { cn } from '../components/Layout';
import mockDataRaw from '../mock-data.json';
import { MockData, DayProgress } from '../types';

const mockData = mockDataRaw as unknown as MockData;

export default function Dashboard() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const stateParam = (searchParams.get('state') || 'active') as keyof typeof mockData.students;
  
  // Re-initialize state when query param changes
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
    setStreakFrozen(true); // Treat as decision made, but streak is 0
  };

  // Helper for rendering days grid (Heatmap)
  const renderHeatmapSquare = (day: DayProgress | null, index: number) => {
    if (!day) {
      // Future or empty days
      return <div key={`empty-${index}`} className="w-3 h-3 rounded-sm bg-gray-800 border border-gray-700"></div>;
    }

    let bgClass = "bg-gray-800 border-gray-700"; // Upcoming
    if (day.status === 'completed') bgClass = "bg-green-500 border-green-600";
    if (day.status === 'missed') bgClass = "bg-red-500 border-red-600";
    if (streakFrozen && day.status === 'missed') bgClass = "bg-blue-500 border-blue-600"; // Frozen day
    if (day.status === 'pending') bgClass = "bg-gray-700 border-gray-500 animate-pulse";

    return (
      <Link 
        key={day.id}
        to={day.status !== 'locked' ? `/day/${day.id}` : '#'}
        className={cn(
          "w-3 h-3 rounded-sm border transition-all cursor-pointer hover:ring-2 hover:ring-white",
          bgClass,
          day.status === 'locked' && "cursor-not-allowed"
        )}
        title={`Day ${day.id}: ${day.status}`}
      />
    );
  };

  // Generate 60 squares for heatmap
  const heatmapSquares = Array.from({ length: 60 }).map((_, i) => {
    const day = progress.find(p => p.id === i + 1);
    return day || null;
  });

  // Empty State UI
  if (stateParam === 'empty') {
    return (
      <div className="flex-1 flex flex-col bg-gray-950 pb-10 min-h-screen text-gray-100 items-center justify-center p-6 text-center">
        <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-6 border-4 border-gray-700">
          <UserIcon size={48} className="text-gray-500" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Welcome to ABTalks</h2>
        <p className="text-gray-400 text-sm mb-8">Your 60-day coding journey hasn't started yet. Set up your profile and join a track to begin.</p>
        <button className="bg-blue-600 text-white font-bold py-4 px-8 rounded-2xl w-full min-h-[44px]">
          Complete Profile
        </button>
      </div>
    );
  }

  const displayStreak = (user.needsComeback && !streakFrozen) ? 0 : user.currentStreak;

  return (
    <div className="flex-1 flex flex-col bg-gray-950 pb-10 min-h-screen text-gray-100">
      
      {/* Top Section */}
      <div className={cn(
        "px-6 pt-6 pb-8 rounded-b-3xl shadow-md transition-colors duration-500",
        user.isFirstTime ? "bg-gradient-to-br from-blue-900 to-indigo-950" :
        (user.needsComeback && !streakFrozen) ? "bg-gradient-to-br from-red-900 to-orange-950" :
        "bg-gradient-to-br from-gray-900 to-gray-800"
      )}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {user.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-12 h-12 rounded-full border-2 border-white/20 shadow-lg" />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center border-2 border-white/20">
                <UserIcon size={24} />
              </div>
            )}
            <div>
              <p className="text-white/60 text-sm font-medium">Welcome back,</p>
              <h2 className="text-white font-bold text-xl">{user.name}</h2>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Trophy size={16} className="text-yellow-300" />
            <span className="text-white font-bold text-sm">Rank: #420</span>
          </div>
        </div>

        {/* Dynamic Hero Card */}
        {user.isFirstTime ? (
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10">
            <h3 className="font-bold text-xl mb-2">Ready to begin?</h3>
            <p className="text-white/80 text-sm mb-4">Start your 60-day journey today. Consistency is key.</p>
            <div className="flex items-center gap-2 font-bold text-3xl">
              <Flame className="text-white opacity-50" size={28} />
              0 Day Streak
            </div>
          </div>
        ) : (user.needsComeback && !streakFrozen) ? (
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-red-500/30 relative overflow-hidden">
            <ShieldAlert className="absolute -right-4 -top-4 w-32 h-32 text-red-500 opacity-10" />
            <div className="inline-block px-2 py-1 bg-red-500/20 rounded text-xs font-bold uppercase tracking-wider mb-2 text-red-200">
              Streak At Risk
            </div>
            <h3 className="font-bold text-xl mb-1">You missed Day {todayTask?.id - 1 || 'yesterday'}.</h3>
            <p className="text-white/80 text-sm mb-4">Use a Streak Freeze to protect your {user.currentStreak}-day streak?</p>
            
            {freezes > 0 ? (
              <div className="flex gap-2">
                <button onClick={handleUseFreeze} className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl text-sm flex items-center justify-center gap-2 min-h-[44px]">
                  <Snowflake size={16} /> Use Freeze
                </button>
                <button onClick={handleResetStreak} className="flex-1 bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-xl text-sm min-h-[44px]">
                  Let it reset
                </button>
              </div>
            ) : (
              <div className="bg-red-950/50 p-3 rounded-xl border border-red-900">
                <p className="text-sm text-red-200 font-medium">You have 0 freezes left. Your streak has reset to 0. Start a new one today!</p>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10">
            <div className="flex justify-between items-start mb-1">
              <p className="text-white/60 text-sm uppercase tracking-wider font-semibold">Current Streak</p>
              <div className="flex items-center gap-1 bg-blue-900/50 px-2 py-1 rounded-md border border-blue-800" title="Streak Freezes">
                <Snowflake size={14} className="text-blue-300" />
                <span className="text-xs font-bold text-blue-200">{freezes} left</span>
              </div>
            </div>
            <div className="flex items-end gap-2 mb-4">
              <span className="font-bold text-5xl leading-none flex items-center gap-2">
                <Flame className={cn("drop-shadow-lg", displayStreak > 0 ? "text-orange-400" : "text-gray-600")} size={40} />
                {displayStreak}
              </span>
              <span className="text-white/60 mb-1">days</span>
            </div>
            <div className="w-full bg-gray-800 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-orange-400 to-yellow-300 h-full rounded-full transition-all duration-1000" style={{ width: `${Math.min((displayStreak/60)*100, 100)}%` }}></div>
            </div>
            <p className="text-xs text-white/50 mt-2 text-right">Personal best: {user.longestStreak} days</p>
          </div>
        )}
      </div>

      {/* Today's Task Action */}
      <div className="px-6 -mt-6 relative z-10">
        <Link 
          to={todayTask ? `/day/${todayTask.id}` : '#'}
          className={cn(
            "bg-gray-900 rounded-2xl p-5 shadow-xl border flex flex-col transition-all group min-h-[44px]",
            !todayTask ? "border-gray-800 opacity-50 cursor-not-allowed" : "border-gray-800 hover:border-gray-700"
          )}
        >
          {todayTask ? (
            <>
              <div className="flex justify-between items-start mb-3">
                <div className="bg-blue-900/50 text-blue-300 text-xs font-bold px-2 py-1 rounded-md uppercase border border-blue-800/50">
                  Day {todayTask.id} • Today
                </div>
                {todayTask.status === 'missed' && (
                  <div className="bg-red-900/50 text-red-300 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1 border border-red-800/50">
                    <Clock size={12} /> Pending Rescue
                  </div>
                )}
              </div>
              <h3 className="font-bold text-gray-100 text-lg mb-1">{todayTask.taskTitle}</h3>
              <p className="text-gray-400 text-sm line-clamp-2 mb-4">{todayTask.taskDescription}</p>
              
              <div className="w-full bg-gray-800 text-white rounded-xl py-3 flex items-center justify-center font-semibold text-sm group-hover:bg-gray-700 transition-colors min-h-[44px]">
                {(user.needsComeback && !streakFrozen) ? "Rescue Streak Now" : "Start Today's Task"} <ChevronRight size={18} className="ml-1" />
              </div>
            </>
          ) : (
            <div className="text-center py-4 text-gray-500 font-medium">No tasks available</div>
          )}
        </Link>
      </div>

      {/* 60-day Contribution Heatmap */}
      <div className="px-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-100 text-lg">Your Journey</h3>
          <span className="text-blue-300 font-bold text-sm bg-blue-900/30 px-3 py-1 rounded-full border border-blue-800/30">{progressPercentage}% Done</span>
        </div>
        
        <div className="bg-gray-900 rounded-3xl p-5 shadow-sm border border-gray-800">
          <div className="flex flex-wrap gap-[6px]">
            {heatmapSquares.map((day, index) => renderHeatmapSquare(day, index))}
          </div>
          
          <div className="mt-5 flex items-center justify-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-green-500"></div> Completed</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-blue-500"></div> Frozen</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-red-500"></div> Missed</div>
          </div>
          
          <div className="mt-4 flex items-start gap-2 bg-gray-800/50 p-3 rounded-xl border border-gray-700/50">
            <Info size={16} className="text-blue-400 shrink-0 mt-0.5" />
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-gray-300">Streak Freeze:</strong> Protects your streak if you miss a day. You get 2 per challenge. Use them wisely!
            </p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
