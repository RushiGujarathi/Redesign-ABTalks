import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, Trophy, ShieldAlert, ChevronRight, Clock, Snowflake, Info, User as UserIcon, Sparkles } from 'lucide-react';
import { cn, LOGO_URL } from '../components/Layout';
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

  const handleResetStreak = () => setStreakFrozen(true);

  const renderHeatmapSquare = (day: DayProgress | null, index: number) => {
    if (!day) return (
      <div key={`empty-${index}`} className="w-3.5 h-3.5 rounded-sm bg-surface-2 border border-border" />
    );

    let cls = 'bg-surface-2 border-border';
    if (day.status === 'completed') cls = 'bg-success border-green-300';
    if (day.status === 'missed') cls = 'bg-error border-red-300';
    if (streakFrozen && day.status === 'missed') cls = 'bg-brand border-blue-300';
    if (day.status === 'pending') cls = 'bg-brand/30 border-brand/40';

    return (
      <Link
        key={day.id}
        to={day.status !== 'locked' ? `/day/${day.id}` : '#'}
        className={cn('w-3.5 h-3.5 rounded-sm border transition-all hover:scale-125 hover:z-10', cls,
          day.status === 'locked' && 'cursor-not-allowed hover:scale-100')}
        title={`Day ${day.id}: ${day.status}`}
      />
    );
  };

  const heatmapSquares = Array.from({ length: 60 }).map((_, i) => progress.find(p => p.id === i + 1) || null);

  /* ── Empty State ── */
  if (stateParam === 'empty') {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-bg min-h-screen">
        <div className="w-20 h-20 bg-surface-2 rounded-full flex items-center justify-center mb-5 border border-border">
          <UserIcon size={32} className="text-text-muted" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Welcome to ABTalks</h2>
        <p className="text-text-secondary text-sm mb-8 max-w-xs leading-relaxed">
          Your 60-day coding journey hasn't started yet. Complete your profile to unlock the challenge roadmap.
        </p>
        <button className="btn-lg btn-primary w-full">Complete Profile</button>
      </div>
    );
  }

  const displayStreak = user.needsComeback && !streakFrozen ? 0 : user.currentStreak;

  return (
    <div className="flex-1 flex flex-col pb-10 min-h-screen">

      {/* ── Profile Header ── */}
      <div className="px-4 py-4 bg-surface border-b border-border">
        <div className="max-w-[1040px] mx-auto flex items-center justify-between relative">
          <div className="flex items-center gap-3">
            {user.avatar ? (
              <img src={user.avatar} alt="Profile" className="w-10 h-10 rounded-full border border-border object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-surface-2 flex items-center justify-center border border-border">
                <UserIcon size={18} className="text-text-muted" />
              </div>
            )}
            <div>
              <h2 className="text-base font-bold text-text-primary">{user.name}</h2>
            </div>
          </div>



          <div className="flex items-center gap-2">
            <div className="badge badge-warning">
              <Trophy size={11} /> <span>#420</span>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-5 max-w-[1040px] mx-auto w-full space-y-4">

        {/* ── Streak / Alert Card ── */}
        {user.isFirstTime ? (
          <div className="card p-5 flex items-center gap-4">
            <div className="w-14 h-14 bg-surface-2 rounded-2xl flex items-center justify-center border border-border shrink-0">
              <Sparkles size={24} className="text-text-muted" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-primary">Ready to begin?</h3>
              <p className="text-sm text-text-secondary">Start your 60-day journey today. Consistency is key.</p>
            </div>
          </div>
        ) : user.needsComeback && !streakFrozen ? (
          <div className="bg-red-50 border border-red-100 rounded-2xl p-5 shadow-card">
            <div className="flex items-start gap-3 mb-4">
              <ShieldAlert size={20} className="text-error mt-0.5 shrink-0" />
              <div>
                <div className="badge badge-error mb-2">⚠ Streak At Risk</div>
                <h3 className="text-base font-bold text-text-primary">You missed a day.</h3>
                <p className="text-sm text-text-secondary mt-0.5">
                  Use a Streak Freeze to protect your <strong className="text-error">{user.currentStreak}-day streak</strong>?
                </p>
              </div>
            </div>
            {freezes > 0 ? (
              <div className="flex gap-2">
                <button onClick={handleUseFreeze} className="btn-md btn-primary flex-1">
                  <Snowflake size={15} /> Use Freeze
                </button>
                <button onClick={handleResetStreak} className="btn-md btn-secondary flex-1">
                  Let it reset
                </button>
              </div>
            ) : (
              <div className="bg-red-100 border border-red-200 rounded-xl p-3">
                <p className="text-sm text-error font-medium">You have 0 freezes left. Your streak has reset. Start fresh today!</p>
              </div>
            )}
          </div>
        ) : (
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-semibold text-text-muted uppercase tracking-widest">Current Streak</p>
              <div className="badge badge-brand">
                <Snowflake size={11} /> {freezes} freeze{freezes !== 1 ? 's' : ''} left
              </div>
            </div>
            <div className="flex items-end gap-2 mb-4">
              <Flame
                size={40}
                className={cn('shrink-0 transition-colors', displayStreak > 0 ? 'text-orange-500' : 'text-text-muted')}
              />
              <span className={cn('text-5xl font-extrabold leading-none tracking-tight', displayStreak > 0 ? 'text-text-primary' : 'text-text-muted')}>
                {displayStreak}
              </span>
              <span className="text-text-muted font-medium mb-1">days</span>
            </div>
            <div className="w-full bg-surface-2 h-2 rounded-full overflow-hidden border border-border">
              <div
                className="bg-gradient-to-r from-brand to-brand-2 h-full rounded-full transition-all duration-700"
                style={{ width: `${Math.min((displayStreak / 60) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-text-muted mt-2 text-right">
              Personal best: <span className="text-text-secondary font-medium">{user.longestStreak} days</span>
            </p>
          </div>
        )}

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { val: completedDays, label: 'Completed' },
            { val: totalDays - completedDays, label: 'Remaining' },
            { val: `${progressPercentage}%`, label: 'Progress' },
          ].map(({ val, label }) => (
            <div key={label} className="card p-3 text-center">
              <p className="text-xl font-extrabold text-text-primary">{val}</p>
              <p className="text-[11px] text-text-muted font-medium mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* ── Today's Task ── */}
        {todayTask && (
          <Link
            to={`/day/${todayTask.id}`}
            className="card p-5 flex flex-col gap-3 hover:shadow-card-md transition-shadow duration-150 group"
          >
            <div className="flex items-center justify-between">
              <span className="badge badge-brand">
                Day {todayTask.id} · Today
              </span>
              {todayTask.status === 'missed' && (
                <span className="badge badge-error">
                  <Clock size={10} /> Missed
                </span>
              )}
            </div>
            <div>
              <h3 className="text-base font-bold text-text-primary leading-snug">{todayTask.taskTitle}</h3>
              <p className="text-sm text-text-secondary mt-1 line-clamp-2 leading-relaxed">{todayTask.taskDescription}</p>
            </div>
            <div className="flex items-center justify-end text-brand text-sm font-semibold gap-1 group-hover:gap-2 transition-all">
              {user.needsComeback && !streakFrozen ? 'Rescue Streak' : 'Start Task'}
              <ChevronRight size={16} />
            </div>
          </Link>
        )}

        {/* ── 60-Day Heatmap ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-base font-bold text-text-primary">Your Journey</h3>
            <span className="badge badge-brand">{progressPercentage}% Done</span>
          </div>
          <div className="card p-5">
            <div className="flex flex-wrap gap-[5px]">
              {heatmapSquares.map((day, index) => renderHeatmapSquare(day, index))}
            </div>

            <div className="mt-5 flex items-center justify-center gap-4 text-xs text-text-muted font-medium flex-wrap">
              {[
                { color: 'bg-success', label: 'Completed' },
                { color: 'bg-brand', label: 'Frozen' },
                { color: 'bg-error', label: 'Missed' },
                { color: 'bg-surface-2 border border-border', label: 'Upcoming' },
              ].map(({ color, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div className={`w-3 h-3 rounded-sm ${color}`} />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-start gap-3 bg-blue-50 border border-blue-100 p-3 rounded-xl">
              <Info size={15} className="text-brand mt-0.5 shrink-0" />
              <p className="text-xs text-text-secondary leading-relaxed">
                <strong className="text-text-primary">Streak Freeze</strong> — Protects your streak if you miss a day.
                You get <span className="text-brand font-semibold">2 per challenge</span>. Use them wisely!
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
