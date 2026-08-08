import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Github, Linkedin, CheckCircle2, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../components/Layout';
import mockDataRaw from '../mock-data.json';
import { MockData } from '../types';

const mockData = mockDataRaw as unknown as MockData;

/* ── YouTube SVG icon ── */
const YTIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current" xmlns="http://www.w3.org/2000/svg">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

export default function DayChallenge() {
  const { id } = useParams();
  const navigate = useNavigate();

  const allProgress = Object.values(mockData.students).flatMap(s => s.progress);
  const day = allProgress.find(p => p.id === Number(id));

  const isComeback = mockData.students.active.user.needsComeback && day?.status === 'missed';

  const [githubUrl, setGithubUrl]       = useState('');
  const [linkedinUrl, setLinkedinUrl]   = useState('');
  const [postDraft, setPostDraft]       = useState('');
  const [submitted, setSubmitted]       = useState(day?.status === 'completed');
  const [githubTouched, setGithubTouched]     = useState(false);
  const [linkedinTouched, setLinkedinTouched] = useState(false);

  const isValidGithub  = (u: string) => /^https?:\/\/(www\.)?github\.com\//.test(u.trim());
  const isValidLinkedin = (u: string) => /^https?:\/\/(www\.)?linkedin\.com\//.test(u.trim());

  const githubError   = githubTouched   ? (!githubUrl   ? 'GitHub URL is required.' : !isValidGithub(githubUrl)   ? 'Must be a valid github.com URL' : '') : '';
  const linkedinError = linkedinTouched ? (!linkedinUrl ? 'LinkedIn URL is required.' : !isValidLinkedin(linkedinUrl) ? 'Must be a valid linkedin.com URL' : '') : '';

  if (!day) {
    return (
      <div className="p-6 flex items-center justify-center min-h-screen bg-bg">
        <p className="text-text-secondary">Day not found.</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setGithubTouched(true);
    setLinkedinTouched(true);
    if (isValidGithub(githubUrl) && isValidLinkedin(linkedinUrl)) {
      setSubmitted(true);
      const end = Date.now() + 2500;
      const frame = () => {
        confetti({ particleCount: 8, angle: 60,  spread: 60, origin: { x: 0 }, colors: ['#4F6FE8','#7C5CE7','#16A34A','#F59E0B'] });
        confetti({ particleCount: 8, angle: 120, spread: 60, origin: { x: 1 }, colors: ['#4F6FE8','#7C5CE7','#16A34A','#F59E0B'] });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  };

  const handleAutoDraft = () => {
    setPostDraft(`Day ${day.id} of #ABTalks: ${day.taskTitle}. ${day.taskDescription}\n\nToday I completed this challenge to keep building momentum on my career transition. #60DaysOfCode #StudentDeveloper #WebDev`);
  };

  const descriptionParts = day.taskDescription.split('. ').filter(Boolean);

  /* ── Success screen ── */
  if (submitted) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12 bg-bg min-h-screen">
        <div className="w-20 h-20 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mb-6 shadow-card">
          <CheckCircle2 size={40} className="text-success" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          {isComeback ? 'Streak Rescued! 🔥' : 'Task Completed! ✅'}
        </h2>
        <p className="text-text-secondary text-sm mb-8 max-w-xs leading-relaxed">
          {isComeback
            ? <><strong className="text-warning">Resilience Badge earned.</strong> Your streak is safe — keep going.</>
            : <><strong className="text-success">Proof of work recorded.</strong> See you tomorrow for Day {day.id + 1}.</>}
        </p>
        <button onClick={() => navigate('/dashboard')} className="btn-lg btn-primary w-full max-w-sm">
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col pb-32 min-h-screen">

      {/* ── Challenge Header ── */}
      <div className={cn(
        'px-4 pt-5 pb-6 border-b border-border',
        isComeback ? 'bg-red-50' : 'bg-surface'
      )}>
        <div className="max-w-[940px] mx-auto">
          {/* Status badges */}
          <div className="flex items-center gap-2 mb-4">
            <span className={cn('badge', isComeback ? 'badge-error' : 'badge-brand')}>
              <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
              Today's Challenge
            </span>
            {isComeback && <span className="badge badge-warning">⚡ Rescue Mission</span>}
          </div>

          {/* Day number + Title */}
          <div className="flex items-start gap-4">
            <div className={cn(
              'shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center border shadow-card text-center',
              isComeback ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-100'
            )}>
              <span className="text-[9px] font-bold uppercase tracking-widest text-text-muted">Day</span>
              <span className={cn('text-2xl font-extrabold leading-none', isComeback ? 'text-error' : 'text-brand')}>
                {day.id}
              </span>
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-text-primary leading-tight">{day.taskTitle}</h1>
              <p className="text-xs text-text-muted font-medium mt-1 uppercase tracking-widest">
                ABTalks 60-Day Challenge
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Task Cards ── */}
      <div className="px-4 pt-5 max-w-[940px] mx-auto w-full">
        <p className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-3">Challenge Tasks</p>
        <div className="space-y-2">
          {descriptionParts.length > 1 ? (
            descriptionParts.map((part, i) => {
              const resourceUrl = day.resources?.[i];
              const Inner = (
                <div className="flex items-start gap-3">
                  {/* Number */}
                  <div className={cn(
                    'shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold border',
                    isComeback ? 'bg-red-50 border-red-200 text-error' : 'bg-blue-50 border-blue-100 text-brand'
                  )}>
                    {i + 1}
                  </div>
                  <p className="flex-1 text-sm text-text-secondary leading-relaxed">
                    {part}{!part.endsWith('.') && '.'}
                  </p>
                  {resourceUrl && (
                    <div className="shrink-0 flex items-center gap-1.5">
                      <span className="btn-secondary btn-sm gap-1 text-xs">
                        <YTIcon /> Watch
                      </span>
                      <span className="badge badge-success text-[10px]">FREE</span>
                    </div>
                  )}
                </div>
              );

              return resourceUrl ? (
                <a
                  key={i}
                  href={resourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card p-4 flex hover:shadow-card-md transition-shadow duration-150 cursor-pointer"
                >
                  {Inner}
                </a>
              ) : (
                <div key={i} className="card p-4">
                  {Inner}
                </div>
              );
            })
          ) : (
            <div className="card p-4">
              <p className="text-sm text-text-secondary leading-relaxed">{day.taskDescription}</p>
            </div>
          )}
        </div>
      </div>

      {/* ── Submit Proof of Work ── */}
      <div className="px-4 pt-6 pb-4 max-w-[940px] mx-auto w-full">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="text-lg font-bold text-text-primary">Submit Proof of Work</h3>
        </div>
        <p className="text-sm text-text-muted mb-5">
          All links are <span className="text-text-secondary font-medium">publicly verifiable</span>
        </p>

        <form id="submission-form" onSubmit={handleSubmit} className="space-y-4">

          {/* GitHub */}
          <div>
            <label className="form-label flex items-center gap-1.5">
              <Github size={14} className="text-text-muted" />
              GitHub Repository <span className="text-error">*</span>
            </label>
            <input
              type="url"
              placeholder="https://github.com/username/repo"
              className={cn('input', githubError && 'input-error')}
              value={githubUrl}
              onChange={e => { setGithubUrl(e.target.value); setGithubTouched(true); }}
              onBlur={() => setGithubTouched(true)}
            />
            {githubError
              ? <p className="form-error-text flex items-center gap-1"><AlertCircle size={11} /> {githubError}</p>
              : <p className="form-helper">Must contain today's commit</p>}
          </div>

          {/* LinkedIn */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="form-label flex items-center gap-1.5 mb-0">
                <Linkedin size={14} className="text-[#0077B5]" />
                LinkedIn Post <span className="text-error">*</span>
              </label>
              <button
                type="button"
                onClick={handleAutoDraft}
                className="btn-secondary btn-sm gap-1"
              >
                <Sparkles size={11} /> Auto-Draft
              </button>
            </div>
            <input
              type="url"
              placeholder="https://linkedin.com/posts/..."
              className={cn('input', linkedinError && 'input-error')}
              value={linkedinUrl}
              onChange={e => { setLinkedinUrl(e.target.value); setLinkedinTouched(true); }}
              onBlur={() => setLinkedinTouched(true)}
            />
            {linkedinError
              ? <p className="form-error-text flex items-center gap-1"><AlertCircle size={11} /> {linkedinError}</p>
              : <p className="form-helper">Tag #ABTalks #60DaysOfCode</p>}
          </div>

          {/* LinkedIn Draft */}
          <div>
            <label className="form-label">Suggested LinkedIn Draft</label>
            <textarea
              value={postDraft}
              onChange={e => setPostDraft(e.target.value)}
              placeholder="Tap Auto-Draft above to generate a LinkedIn update ✨"
              className="textarea min-h-[120px]"
              rows={5}
            />
            <p className="form-helper">Copy this into your LinkedIn post box after submission.</p>
          </div>

        </form>
      </div>

      {/* ── Sticky Submit Button ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-white via-white/95 to-transparent pt-6 px-4 pb-6 md:absolute md:bottom-0">
        <div className="max-w-[940px] mx-auto">
          <button
            type="submit"
            form="submission-form"
            onClick={() => { setGithubTouched(true); setLinkedinTouched(true); }}
            className={cn(
              'btn-lg w-full justify-center text-base font-bold shadow-brand',
              isComeback ? 'bg-error text-white hover:bg-red-700' : 'btn-primary'
            )}
          >
            {isComeback ? 'Rescue My Streak' : 'Submit Work'} <ChevronRight size={18} />
          </button>
        </div>
      </div>

    </div>
  );
}
