import { Link } from 'react-router-dom';
import { Target, CheckCircle2, Briefcase, ChevronRight, Sparkles } from 'lucide-react';

export default function Landing() {
  return (
    <div className="flex-1 flex flex-col bg-background relative pb-12 overflow-hidden selection:bg-primary/30">
      
      {/* Animated Background Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-primary/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob"></div>
        <div className="absolute top-[20%] left-[-10%] w-[400px] h-[400px] bg-accent/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-blue-600/20 rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      {/* Hero Section */}
      <div className="pt-16 px-6 pb-10 relative z-10">
        
        {/* Top badge */}
        <div className="animate-fade-in-up flex justify-center" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/[0.06] border border-white/12 rounded-full mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.12)]">
            <Sparkles className="text-primary w-3.5 h-3.5" />
            <span className="text-blue-200 text-[11px] font-bold uppercase tracking-widest">The 60-Day Coding Challenge</span>
          </div>
        </div>
        
        {/* Main headline */}
        <h1
          className="font-black text-[3.25rem] leading-[1.05] tracking-tight mb-3 animate-fade-in-up"
          style={{ animationDelay: '0.2s', opacity: 0 }}
        >
          <span className="text-white">AB</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-indigo-400">Talks</span>
        </h1>

        {/* Sub-headline */}
        <h2
          className="text-[1.65rem] font-bold leading-snug mb-5 animate-fade-in-up"
          style={{ animationDelay: '0.3s', opacity: 0 }}
        >
          <span className="text-gray-100">Transform from student to </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-400">developer.</span>
        </h2>
        
        {/* Body text */}
        <p
          className="text-gray-400 text-[1rem] mb-10 leading-[1.75] font-light animate-fade-in-up"
          style={{ animationDelay: '0.4s', opacity: 0 }}
        >
          Commit to <span className="text-gray-200 font-semibold">60 days of coding.</span> Build real projects, push to GitHub, and share on LinkedIn to get noticed by top recruiters.
        </p>

        {/* CTA */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
          <Link
            to="/dashboard"
            className="group relative flex w-full justify-center items-center py-4 px-6 rounded-2xl text-white font-bold text-lg overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent p-[1px]">
              <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm group-hover:bg-transparent transition-colors duration-300"></div>
            </div>
            <span className="relative z-10 flex items-center gap-2">
              Accept the Challenge <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </span>
          </Link>

          <div className="flex items-center justify-center gap-3 mt-5">
            <div className="h-px flex-1 bg-white/5" />
            <p className="text-[11px] text-gray-500 tracking-widest font-semibold uppercase">Join 10,000+ Indian Students</p>
            <div className="h-px flex-1 bg-white/5" />
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="px-6 relative z-10 pb-10 animate-fade-in-up" style={{ animationDelay: '0.6s', opacity: 0 }}>

        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1 bg-white/5" />
          <p className="text-[11px] text-gray-500 tracking-widest font-bold uppercase">How it works</p>
          <div className="h-px flex-1 bg-white/5" />
        </div>

        <div className="grid grid-cols-1 gap-4">

          {/* Card 1 */}
          <div className="glass-dark relative overflow-hidden rounded-3xl p-6 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-all hover:border-primary/30 group">
            <div className="absolute top-4 right-4 w-28 h-28 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500"></div>
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center text-primary shadow-sm">
                  <Target size={22} />
                </div>
                <span className="text-[11px] font-black text-primary uppercase tracking-widest bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/15">Step 01</span>
              </div>
              <div>
                <h4 className="text-[1.1rem] font-bold text-white mb-1.5 tracking-tight">Daily Tasks</h4>
                <p className="text-[0.875rem] text-gray-400 leading-relaxed font-light">Get a curated, bite-sized coding task every single day. <span className="text-gray-300 font-medium">No fluff, just practical skills.</span></p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="glass-dark relative overflow-hidden rounded-3xl p-6 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-all hover:border-accent/30 group">
            <div className="absolute top-4 right-4 w-28 h-28 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-colors duration-500"></div>
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/10 border border-accent/20 rounded-2xl flex items-center justify-center text-accent shadow-sm">
                  <CheckCircle2 size={22} />
                </div>
                <span className="text-[11px] font-black text-accent uppercase tracking-widest bg-accent/10 px-2.5 py-1 rounded-lg border border-accent/15">Step 02</span>
              </div>
              <div>
                <h4 className="text-[1.1rem] font-bold text-white mb-1.5 tracking-tight">Proof of Work</h4>
                <p className="text-[0.875rem] text-gray-400 leading-relaxed font-light">Push to GitHub, post on LinkedIn. <span className="text-gray-300 font-medium">Build a public portfolio that speaks louder than your resume.</span></p>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="glass-dark relative overflow-hidden rounded-3xl p-6 border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.18)] transition-all hover:border-amber-500/30 group">
            <div className="absolute top-4 right-4 w-28 h-28 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-colors duration-500"></div>
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-400 shadow-sm">
                  <Briefcase size={22} />
                </div>
                <span className="text-[11px] font-black text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/15">Step 03</span>
              </div>
              <div>
                <h4 className="text-[1.1rem] font-bold text-white mb-1.5 tracking-tight">Get Hired</h4>
                <p className="text-[0.875rem] text-gray-400 leading-relaxed font-light">Recruiters track consistency. <span className="text-gray-300 font-medium">A 60-day streak of public commits is better than any certificate.</span></p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
