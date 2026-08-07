import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Trophy, ShieldAlert, ChevronRight, Lock, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '../components/Layout';
import mockDataRaw from '../mock-data.json';
import { MockData, DayProgress } from '../types';

const mockData = mockDataRaw as unknown as MockData;

export default function Dashboard() {
  const [data, setData] = useState<MockData>(mockData);

  const { user, progress } = data;
  const completedDays = progress.filter(p => p.status === 'completed').length;
  const totalDays = 60;
  const progressPercentage = Math.round((completedDays / totalDays) * 100);

  const todayTask = progress.find(p => p.status === 'pending' || p.status === 'missed') || progress[0];

  // Helper for rendering days grid
  const renderDayCircle = (day: DayProgress) => {
    let bgClass = "bg-gray-100 border-gray-200 text-gray-400";
    if (day.status === 'completed') bgClass = "bg-green-100 border-green-500 text-green-700 font-bold shadow-inner";
    if (day.status === 'missed') bgClass = "bg-red-100 border-red-400 text-red-600";
    if (day.status === 'pending') bgClass = "bg-white border-blue-400 text-blue-600 font-bold shadow-sm ring-2 ring-blue-100 ring-offset-1";

    return (
      <Link 
        key={day.id}
        to={day.status !== 'locked' ? `/day/${day.id}` : '#'}
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center border text-sm transition-all",
          bgClass,
          day.status === 'locked' && "opacity-50 cursor-not-allowed"
        )}
      >
        {day.status === 'locked' ? <Lock size={14} /> : day.id}
      </Link>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 pb-10">
      
      {/* Top Section - Dynamic based on state */}
      <div className={cn(
        "px-6 pt-6 pb-8 rounded-b-3xl shadow-md transition-colors duration-500",
        user.isFirstTime ? "bg-gradient-to-br from-blue-500 to-indigo-600" :
        user.needsComeback ? "bg-gradient-to-br from-amber-500 to-orange-600" :
        "bg-gradient-to-br from-gray-900 to-gray-800"
      )}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <img src={user.avatar} alt="Profile" className="w-12 h-12 rounded-full border-2 border-white/20 shadow-lg" />
            <div>
              <p className="text-white/80 text-sm font-medium">Welcome back,</p>
              <h2 className="text-white font-bold text-xl">{user.name}</h2>
            </div>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Trophy size={16} className="text-yellow-300" />
            <span className="text-white font-bold text-sm">Rank: #420</span>
          </div>
        </div>

        {/* Dynamic Hero Card */}
        {user.isFirstTime ? (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-white">
            <h3 className="font-bold text-xl mb-2">Ready to begin?</h3>
            <p className="text-white/80 text-sm mb-4">Start your 60-day journey today. Consistency is key.</p>
            <div className="flex items-center gap-2 font-bold text-3xl">
              <Flame className="text-white opacity-50" size={28} />
              0 Day Streak
            </div>
          </div>
        ) : user.needsComeback ? (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-white relative overflow-hidden">
            <ShieldAlert className="absolute -right-4 -top-4 w-32 h-32 text-white opacity-5" />
            <div className="inline-block px-2 py-1 bg-white/20 rounded text-xs font-bold uppercase tracking-wider mb-2">
              Comeback Mode
            </div>
            <h3 className="font-bold text-2xl mb-1">Don't break the chain!</h3>
            <p className="text-white/90 text-sm mb-4">You missed yesterday. Complete today's task to rescue your {user.currentStreak}-day streak and earn a Resilience Badge.</p>
            <div className="flex items-center gap-2 font-bold text-3xl text-yellow-300 drop-shadow-md">
              <Flame size={28} className="animate-pulse" />
              {user.currentStreak} Days At Risk
            </div>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 text-white">
            <p className="text-white/80 text-sm mb-1 uppercase tracking-wider font-semibold">Current Streak</p>
            <div className="flex items-end gap-2 mb-4">
              <span className="font-bold text-5xl leading-none flex items-center gap-2">
                <Flame className="text-orange-400 drop-shadow-lg" size={40} />
                {user.currentStreak}
              </span>
              <span className="text-white/80 mb-1">days</span>
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-orange-400 to-yellow-300 h-full rounded-full" style={{ width: `${Math.min((user.currentStreak/60)*100, 100)}%` }}></div>
            </div>
            <p className="text-xs text-white/60 mt-2 text-right">Personal best: {user.longestStreak} days</p>
          </div>
        )}
      </div>

      {/* Today's Task Action */}
      <div className="px-6 -mt-6 relative z-10">
        <Link 
          to={`/day/${todayTask.id}`}
          className="bg-white rounded-2xl p-5 shadow-xl border border-gray-100 flex flex-col hover:shadow-2xl hover:-translate-y-0.5 transition-all group"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-md uppercase">
              Day {todayTask.id} • Today
            </div>
            {todayTask.status === 'missed' && (
              <div className="bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                <Clock size={12} /> Pending Rescue
              </div>
            )}
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-1">{todayTask.taskTitle}</h3>
          <p className="text-gray-500 text-sm line-clamp-2 mb-4">{todayTask.taskDescription}</p>
          
          <div className="w-full bg-gray-900 text-white rounded-xl py-3 flex items-center justify-center font-semibold text-sm group-hover:bg-gray-800 transition-colors">
            {user.needsComeback ? "Rescue Streak Now" : "Start Today's Task"} <ChevronRight size={18} className="ml-1" />
          </div>
        </Link>
      </div>

      {/* Progress Grid */}
      <div className="px-6 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900 text-lg">Your Journey</h3>
          <span className="text-blue-600 font-bold text-sm bg-blue-50 px-3 py-1 rounded-full">{progressPercentage}% Done</span>
        </div>
        
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="grid grid-cols-6 gap-y-4 gap-x-2 justify-items-center">
            {progress.slice(0, 30).map(renderDayCircle)}
          </div>
          {progress.length > 30 && (
             <div className="mt-6 text-center text-sm font-semibold text-gray-400 bg-gray-50 py-2 rounded-xl">
               Unlock more days by continuing...
             </div>
          )}
        </div>
      </div>
      
    </div>
  );
}
