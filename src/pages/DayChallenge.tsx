import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Github, Linkedin, CheckCircle2, ChevronRight, Share2, AlertCircle } from 'lucide-react';
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
  const [submitted, setSubmitted] = useState(day?.status === 'completed');

  if (!day) return <div className="p-6 text-white min-h-screen bg-background flex items-center justify-center">Day not found</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (githubUrl && linkedinUrl) {
      setSubmitted(true);
      
      const duration = 2500;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 8,
          angle: 60,
          spread: 60,
          origin: { x: 0 },
          colors: ['#3b82f6', '#8b5cf6', '#fbbf24', '#f87171']
        });
        confetti({
          particleCount: 8,
          angle: 120,
          spread: 60,
          origin: { x: 1 },
          colors: ['#3b82f6', '#8b5cf6', '#fbbf24', '#f87171']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  };

  const descriptionParts = day.taskDescription.split('. ').filter(Boolean);

  return (
    <div className="flex-1 flex flex-col bg-background pb-32 min-h-screen relative text-gray-100 selection:bg-primary/30">
      
      {/* Immersive Header Context */}
      <div className={cn(
        "px-6 pt-8 pb-10 rounded-b-[2.5rem] relative overflow-hidden transition-all duration-700",
        isComeback ? "bg-gradient-to-b from-red-950 via-red-900/40 to-background" : "bg-gradient-to-b from-surface-lighter via-surface to-background"
      )}>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay"></div>
        
        {isComeback && (
          <div className="absolute -top-10 -right-10 opacity-20 text-red-500 blur-sm">
            <AlertCircle size={150} />
          </div>
        )}
        
        <div className="flex items-center gap-2 mb-5 relative z-10">
          <div className={cn(
            "text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm backdrop-blur-md",
            isComeback ? "bg-red-500/10 text-red-300 border border-red-500/20" : "bg-primary/10 text-primary border border-primary/20"
          )}>
            Day {day.id}
          </div>
          {isComeback && (
            <div className="text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest bg-red-500/20 text-red-200 border border-red-500/30 animate-pulse">
              Rescue Mission
            </div>
          )}
        </div>
        
        <h1 className={cn(
          "text-3xl font-extrabold mb-5 relative z-10 tracking-tight leading-tight",
          isComeback ? "text-red-50" : "text-white"
        )}>
          {day.taskTitle}
        </h1>
        
        <div className="space-y-3 relative z-10">
          {descriptionParts.length > 1 ? (
            <ul className="space-y-3 text-gray-300 text-[15px] leading-relaxed font-light">
              {descriptionParts.map((part, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <div className={cn(
                    "mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 shadow-sm",
                    isComeback ? "bg-red-400 shadow-red-400/50" : "bg-primary shadow-primary/50"
                  )}></div>
                  <span className="flex-1">{part}{!part.endsWith('.') && '.'}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-300 text-[15px] leading-relaxed font-light">{day.taskDescription}</p>
          )}
        </div>
      </div>

      <div className="px-6 mt-6 flex-1 flex flex-col relative z-10">
        {submitted ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in-up py-10">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-green-500/30 rounded-full blur-2xl animate-pulse-glow"></div>
              <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30 backdrop-blur-md relative z-10 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                <CheckCircle2 size={48} className="text-green-400" />
              </div>
            </div>
            
            <h2 className="text-3xl font-extrabold text-white mb-3 tracking-tight">
              {isComeback ? "Streak Rescued!" : "Task Completed!"}
            </h2>
            <p className="text-gray-400 mb-10 max-w-[280px] text-base leading-relaxed font-light">
              {isComeback 
                ? "You've earned the Resilience Badge. Your streak is safe."
                : "Great job! Your proof of work is recorded. See you tomorrow."}
            </p>
            
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-full bg-white text-gray-950 font-bold py-4 rounded-2xl hover:bg-gray-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] min-h-[56px] text-lg hover:-translate-y-1"
            >
              Back to Dashboard
            </button>
            <button className="w-full mt-4 glass-dark text-gray-300 font-semibold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all min-h-[56px]">
              <Share2 size={18} /> Share your progress
            </button>
          </div>
        ) : (
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-bold text-white text-xl mb-6 tracking-tight">Submit Proof of Work</h3>
            <form id="submission-form" onSubmit={handleSubmit} className="space-y-6">
              
              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl blur opacity-30 group-focus-within:opacity-100 group-focus-within:from-primary group-focus-within:to-accent transition duration-500"></div>
                <div className="relative bg-surface rounded-2xl p-1 border border-white/5">
                  <label className="text-xs font-semibold text-gray-400 mb-1.5 flex items-center gap-2 px-3 pt-2 uppercase tracking-wider">
                    <Github size={14} className="text-gray-300" /> GitHub Repository
                  </label>
                  <input 
                    type="url" 
                    required
                    placeholder="https://github.com/username/repo"
                    className="w-full bg-transparent px-3 pb-3 pt-1 text-base focus:outline-none transition-all text-white placeholder-gray-600 min-h-[44px]"
                    value={githubUrl}
                    onChange={e => setGithubUrl(e.target.value)}
                  />
                </div>
                <p className="text-[11px] text-gray-500 mt-2 ml-2 font-medium tracking-wide">Must contain today's commit.</p>
              </div>

              <div className="group relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl blur opacity-30 group-focus-within:opacity-100 group-focus-within:from-blue-400 group-focus-within:to-blue-600 transition duration-500"></div>
                <div className="relative bg-surface rounded-2xl p-1 border border-white/5">
                  <label className="text-xs font-semibold text-gray-400 mb-1.5 flex items-center gap-2 px-3 pt-2 uppercase tracking-wider">
                    <Linkedin size={14} className="text-blue-400" /> LinkedIn Post
                  </label>
                  <input 
                    type="url" 
                    required
                    placeholder="https://linkedin.com/post/..."
                    className="w-full bg-transparent px-3 pb-3 pt-1 text-base focus:outline-none transition-all text-white placeholder-gray-600 min-h-[44px]"
                    value={linkedinUrl}
                    onChange={e => setLinkedinUrl(e.target.value)}
                  />
                </div>
                <p className="text-[11px] text-gray-500 mt-2 ml-2 font-medium tracking-wide">Tag #ABTalks #60DaysOfCode</p>
              </div>
            </form>

            {/* Sticky bottom button */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/95 to-transparent pb-8 z-50 md:absolute md:rounded-b-[2.5rem]">
              <button 
                type="submit"
                form="submission-form"
                className={cn(
                  "w-full text-white font-bold py-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_10px_50px_rgba(0,0,0,0.6)] transition-all flex items-center justify-center gap-2 min-h-[56px] text-lg hover:-translate-y-1 relative overflow-hidden group",
                  isComeback 
                    ? "bg-gradient-to-r from-orange-500 to-red-600 shadow-red-500/30" 
                    : "bg-gradient-to-r from-primary to-accent shadow-primary/30"
                )}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                <span className="relative z-10 flex items-center gap-2">
                  {isComeback ? "Rescue My Streak" : "Submit Work"} <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
