import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Github, Linkedin, CheckCircle2, ChevronRight, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { cn } from '../components/Layout';
import mockDataRaw from '../mock-data.json';
import { MockData } from '../types';

const mockData = mockDataRaw as unknown as MockData;

export default function DayChallenge() {
  const { id } = useParams();
  const navigate = useNavigate();

  const allProgress = Object.values(mockData.students).flatMap(s => s.progress);
  const day = allProgress.find(p => p.id === Number(id));

  const isComeback = mockData.students.active.user.needsComeback && day?.status === 'missed';

  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [postDraft, setPostDraft] = useState('');
  const [submitted, setSubmitted] = useState(day?.status === 'completed');
  const [githubTouched, setGithubTouched] = useState(false);
  const [linkedinTouched, setLinkedinTouched] = useState(false);

  const isValidGithub = (url: string) => /^https?:\/\/(www\.)?github\.com\//.test(url.trim());
  const isValidLinkedin = (url: string) => /^https?:\/\/(www\.)?linkedin\.com\//.test(url.trim());

  const githubError = githubTouched
    ? !githubUrl
      ? 'GitHub repository URL is required.'
      : !isValidGithub(githubUrl)
      ? 'Must be a valid github.com URL (e.g. https://github.com/username/repo)'
      : ''
    : '';

  const linkedinError = linkedinTouched
    ? !linkedinUrl
      ? 'LinkedIn post URL is required.'
      : !isValidLinkedin(linkedinUrl)
      ? 'Must be a valid linkedin.com URL (e.g. https://linkedin.com/posts/...)'
      : ''
    : '';

  if (!day) {
    return (
      <div className="p-6 text-white min-h-screen bg-background flex items-center justify-center">
        Day not found
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mark both fields as touched to reveal any errors
    setGithubTouched(true);
    setLinkedinTouched(true);
    if (isValidGithub(githubUrl) && isValidLinkedin(linkedinUrl)) {
      setSubmitted(true);
      const duration = 2500;
      const end = Date.now() + duration;
      const frame = () => {
        confetti({ particleCount: 8, angle: 60, spread: 60, origin: { x: 0 }, colors: ['#3b82f6', '#8b5cf6', '#fbbf24', '#f87171'] });
        confetti({ particleCount: 8, angle: 120, spread: 60, origin: { x: 1 }, colors: ['#3b82f6', '#8b5cf6', '#fbbf24', '#f87171'] });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  };

  const descriptionParts = day.taskDescription.split('. ').filter(Boolean);

  const handleAutoDraft = () => {
    setPostDraft(`Day ${day.id} of #ABTalks: ${day.taskTitle}. ${day.taskDescription} \n\nToday I completed this challenge to keep building momentum on my career transition. #60DaysOfCode #StudentDeveloper #WebDev`);
  };

  return (
    <div className="flex-1 flex flex-col bg-background pb-40 min-h-screen relative text-gray-100 selection:bg-primary/30">

      {/* Header — hidden once task is completed */}
      {!submitted && <div className={cn(
        "relative overflow-hidden px-6 pt-10 pb-14 rounded-b-[2.5rem] transition-all duration-700",
        isComeback
          ? "bg-gradient-to-br from-red-950 via-red-900/50 to-background"
          : "bg-gradient-to-br from-[#0c1a3a] via-[#0f172a] to-background"
      )}>

        {/* Animated background orbs */}
        {!isComeback && <>
          <div className="absolute -top-10 -right-10 w-56 h-56 bg-primary/20 rounded-full blur-[80px] animate-pulse" />
          <div className="absolute top-20 -left-10 w-40 h-40 bg-accent/15 rounded-full blur-[60px]" />
        </>}
        {isComeback && <>
          <div className="absolute -top-10 -right-10 w-56 h-56 bg-red-600/25 rounded-full blur-[80px] animate-pulse" />
          <div className="absolute top-20 -left-10 w-40 h-40 bg-orange-600/15 rounded-full blur-[60px]" />
        </>}

        {/* Noise texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] mix-blend-overlay pointer-events-none" />

        <div className="relative z-10">
          {/* Top badges row */}
          <div className="flex items-center gap-2 mb-6">
            <div className={cn(
              "inline-flex items-center gap-2 text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border backdrop-blur-md",
              isComeback
                ? "bg-red-500/15 text-red-300 border-red-500/30"
                : "bg-primary/10 text-primary border-primary/25"
            )}>
              <span className={cn(
                "w-1.5 h-1.5 rounded-full",
                isComeback ? "bg-red-400 animate-pulse" : "bg-primary animate-pulse"
              )} />
              Today's Challenge
            </div>
            {isComeback && (
              <div className="text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest bg-orange-500/20 text-orange-200 border border-orange-500/30 animate-pulse">
                ⚡ Rescue Mission
              </div>
            )}
          </div>

          {/* Large day number + title */}
          <div className="flex items-start gap-4 mb-6">
            <div className={cn(
              "shrink-0 w-16 h-16 rounded-2xl flex flex-col items-center justify-center border shadow-lg",
              isComeback
                ? "bg-red-500/10 border-red-500/30 shadow-red-500/20"
                : "bg-primary/10 border-primary/25 shadow-primary/20"
            )}>
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Day</span>
              <span className={cn(
                "text-2xl font-black leading-none",
                isComeback ? "text-red-300" : "text-white"
              )}>{day.id}</span>
            </div>
            <div>
              <h1 className={cn(
                "text-2xl font-extrabold leading-tight tracking-tight",
                isComeback
                  ? "text-red-50"
                  : "bg-gradient-to-r from-white via-blue-100 to-indigo-200 bg-clip-text text-transparent"
              )}>
                {day.taskTitle}
              </h1>
              <p className="text-gray-500 text-xs font-medium mt-1 uppercase tracking-widest">
                ABTalks 60-Day Challenge
              </p>
            </div>
          </div>

          {/* Description as numbered step cards */}
          <div className="space-y-2.5">
            {descriptionParts.length > 1 ? (
              descriptionParts.map((part, i) => {
                const resourceUrl = day.resources?.[i];
                const content = (
                  <>
                    <div className={cn(
                      "shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black mt-0.5",
                      isComeback ? "bg-red-500/20 text-red-300" : "bg-primary/20 text-primary"
                    )}>
                      {i + 1}
                    </div>
                    <span className="text-gray-300 text-[14px] leading-relaxed font-light flex-1">
                      {part}{!part.endsWith('.') && '.'}
                    </span>
                    {resourceUrl && (
                      <span className="shrink-0 inline-flex items-center gap-1.5">
                        <span className={cn(
                          "inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg border transition-all",
                          isComeback
                            ? "bg-red-500/10 border-red-500/20 text-red-300 group-hover:bg-red-500/20"
                            : "bg-primary/10 border-primary/20 text-primary group-hover:bg-primary/20"
                        )}>
                          <svg viewBox="0 0 24 24" className="w-2.5 h-2.5 fill-current" xmlns="http://www.w3.org/2000/svg">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                          Watch
                        </span>
                        <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-green-500/15 border border-green-500/25 text-green-400">
                          Free
                        </span>
                      </span>
                    )}
                  </>
                );
                return resourceUrl ? (
                  <a
                    key={i}
                    href={resourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group flex items-start gap-3 p-3.5 rounded-2xl border backdrop-blur-sm transition-all cursor-pointer",
                      isComeback
                        ? "bg-red-500/5 border-red-500/15 hover:bg-red-500/10 hover:border-red-500/30"
                        : "bg-white/[0.04] border-white/8 hover:bg-primary/5 hover:border-primary/20"
                    )}
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={i}
                    className={cn(
                      "flex items-start gap-3 p-3.5 rounded-2xl border backdrop-blur-sm transition-all",
                      isComeback
                        ? "bg-red-500/5 border-red-500/15"
                        : "bg-white/[0.04] border-white/8"
                    )}
                  >
                    {content}
                  </div>
                );
              })
            ) : (
              <div className={cn(
                "p-4 rounded-2xl border backdrop-blur-sm",
                isComeback ? "bg-red-500/5 border-red-500/15" : "bg-white/[0.04] border-white/8"
              )}>
                <p className="text-gray-300 text-[14px] leading-relaxed font-light">{day.taskDescription}</p>
              </div>
            )}
          </div>
        </div>
      </div>}

      {/* Body */}
      <div className="px-6 mt-6 flex-1 flex flex-col relative z-10">
        <div className="max-w-[940px] mx-auto w-full">

          {submitted ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in-up py-10">
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-green-500/30 rounded-full blur-2xl animate-pulse-glow"></div>
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30 backdrop-blur-md relative z-10 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                  <CheckCircle2 size={48} className="text-green-400" />
                </div>
              </div>
              <h2 className={cn(
                "text-3xl font-black mb-3 tracking-tight",
                isComeback
                  ? "text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-red-300"
                  : "text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-400"
              )}>
                {isComeback ? "Streak Rescued! 🔥" : "Task Completed! ✅"}
              </h2>
              <p className="text-gray-400 mb-10 max-w-[280px] text-[0.95rem] leading-relaxed font-light">
                {isComeback
                  ? <><span className="text-orange-300 font-semibold">Resilience Badge earned.</span> Your streak is safe — keep going.</>
                  : <><span className="text-green-300 font-semibold">Proof of work recorded.</span> See you tomorrow for Day {(day.id + 1)}.</>}
              </p>
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full bg-white text-gray-950 font-bold py-4 rounded-2xl hover:bg-gray-100 transition-all min-h-[56px] text-lg hover:-translate-y-1"
              >
                Back to Dashboard
              </button>
            </div>
          ) : (
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>

              {/* Section header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={cn(
                  "w-8 h-8 rounded-xl flex items-center justify-center",
                  isComeback ? "bg-red-500/20" : "bg-primary/15"
                )}>
                  <ChevronRight size={18} className={isComeback ? "text-red-400" : "text-primary"} />
                </div>
                <div>
                  <h3 className="font-black text-white text-lg tracking-tight">Submit Proof of Work</h3>
                  <p className="text-gray-500 text-[11px] mt-0.5 font-medium tracking-wide">All links are <span className="text-gray-400">publicly verifiable</span></p>
                </div>
              </div>

              <form id="submission-form" onSubmit={handleSubmit} className="space-y-4 pb-36 md:pb-0">

                {/* GitHub */}
                <div className={cn(
                  "relative rounded-2xl border overflow-hidden transition-all duration-300",
                  githubError
                    ? "border-red-500/50 bg-red-500/5"
                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
                )}>
                  <div className={cn(
                    "absolute left-0 top-0 bottom-0 w-0.5",
                    githubError ? "bg-red-500" : "bg-gray-700 group-focus-within:bg-primary"
                  )} />
                  <div className="p-4">
                    <label className={cn(
                      "text-[11px] font-bold flex items-center gap-2 uppercase tracking-widest mb-2.5",
                      githubError ? "text-red-400" : "text-gray-500"
                    )}>
                      <Github size={12} className={githubError ? "text-red-400" : "text-gray-400"} />
                      GitHub Repository <span className="text-red-400 ml-0.5">*</span>
                    </label>
                    <input
                      type="url"
                      placeholder="https://github.com/username/repo"
                      className="w-full bg-transparent text-[15px] focus:outline-none text-white placeholder-gray-600 py-1"
                      value={githubUrl}
                      onChange={e => { setGithubUrl(e.target.value); setGithubTouched(true); }}
                      onBlur={() => setGithubTouched(true)}
                    />
                    {githubError ? (
                      <p className="text-[11px] text-red-400 mt-2.5 font-semibold flex items-center gap-1.5">
                        <AlertCircle size={11} /> {githubError}
                      </p>
                    ) : (
                      <p className="text-[11px] text-gray-600 mt-2.5">Must contain today's commit</p>
                    )}
                  </div>
                </div>

                {/* LinkedIn */}
                <div className={cn(
                  "relative rounded-2xl border overflow-hidden transition-all duration-300",
                  linkedinError
                    ? "border-red-500/50 bg-red-500/5"
                    : "border-white/10 bg-white/[0.03] hover:bg-white/[0.05]"
                )}>
                  <div className={cn(
                    "absolute left-0 top-0 bottom-0 w-0.5",
                    linkedinError ? "bg-red-500" : "bg-blue-600"
                  )} />
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2.5">
                      <label className={cn(
                        "text-[11px] font-bold flex items-center gap-2 uppercase tracking-widest",
                        linkedinError ? "text-red-400" : "text-gray-500"
                      )}>
                        <Linkedin size={12} className={linkedinError ? "text-red-400" : "text-blue-400"} />
                        LinkedIn Post <span className="text-red-400 ml-0.5">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={handleAutoDraft}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary hover:bg-primary/20 transition"
                      >
                        <Sparkles size={10} /> Auto-draft
                      </button>
                    </div>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/posts/..."
                      className="w-full bg-transparent text-[15px] focus:outline-none text-white placeholder-gray-600 py-1"
                      value={linkedinUrl}
                      onChange={e => { setLinkedinUrl(e.target.value); setLinkedinTouched(true); }}
                      onBlur={() => setLinkedinTouched(true)}
                    />
                    {linkedinError ? (
                      <p className="text-[11px] text-red-400 mt-2.5 font-semibold flex items-center gap-1.5">
                        <AlertCircle size={11} /> {linkedinError}
                      </p>
                    ) : (
                      <p className="text-[11px] text-gray-600 mt-2.5">Tag #ABTalks #60DaysOfCode</p>
                    )}
                  </div>
                </div>


                {/* LinkedIn Draft textarea */}
                <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-indigo-500/60" />
                  <div className="p-4">
                    <label className="text-[11px] font-bold text-gray-500 mb-2.5 uppercase tracking-widest block">Suggested LinkedIn Draft</label>
                    <textarea
                      value={postDraft}
                      onChange={e => setPostDraft(e.target.value)}
                      placeholder="Tap Auto-draft to generate a LinkedIn update ✨"
                      className="w-full min-h-[120px] resize-none bg-transparent text-[15px] focus:outline-none text-white placeholder-gray-600 py-1"
                    />
                    <p className="text-[11px] text-gray-600 mt-2.5">Copy this into your LinkedIn post box after submission.</p>
                  </div>
                </div>

                <div className="h-24" />

                {/* Sticky submit */}
                <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/95 to-transparent pb-8 z-50 md:absolute md:rounded-b-[2.5rem]">
                  <button
                    type="submit"
                    onClick={() => { setGithubTouched(true); setLinkedinTouched(true); }}
                    className={cn(
                      "w-full text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 min-h-[56px] text-lg hover:-translate-y-1 relative overflow-hidden group",
                      (!githubUrl || !linkedinUrl) ? "opacity-70 cursor-pointer" : "",
                      isComeback
                        ? "bg-gradient-to-r from-orange-500 to-red-600"
                        : "bg-gradient-to-r from-primary to-accent"
                    )}
                  >
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                    <span className="relative z-10 flex items-center gap-2">
                      {isComeback ? "Rescue My Streak" : "Submit Work"}
                      <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </div>

              </form>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
