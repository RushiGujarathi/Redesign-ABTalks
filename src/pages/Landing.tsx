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
      <div className="pt-20 px-6 pb-12 relative z-10">
        
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s', opacity: 0 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.05] border border-white/10 rounded-full mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.15)]">
            <Sparkles className="text-primary w-4 h-4" />
            <span className="text-gray-300 text-xs font-semibold uppercase tracking-wider">The 60-Day Challenge</span>
          </div>
        </div>
        
        <h1 className="font-extrabold text-5xl tracking-tight text-white mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          AB<span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent text-glow-primary">Talks</span>
        </h1>
        
        <h2 className="text-3xl font-bold text-gray-100 leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
          Transform from student to <span className="relative inline-block">
            <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-400 text-glow">developer.</span>
          </span>
        </h2>
        
        <p className="text-gray-400 text-lg mb-10 leading-relaxed animate-fade-in-up font-light" style={{ animationDelay: '0.4s', opacity: 0 }}>
          Commit to 60 days of coding. Build real projects, push to GitHub, and share on LinkedIn to get noticed by top recruiters.
        </p>

        <div className="animate-fade-in-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
          <Link 
            to="/dashboard" 
            className="group relative flex w-full justify-center items-center py-4 px-6 rounded-2xl text-white font-bold text-lg overflow-hidden transition-all hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]"
          >
            {/* Button Background & Gradient Border */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent p-[1px]">
              <div className="absolute inset-0 bg-surface/80 backdrop-blur-sm group-hover:bg-transparent transition-colors duration-300"></div>
            </div>
            
            <span className="relative z-10 flex items-center">
              Accept the Challenge <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
          <p className="text-center text-xs text-gray-500 mt-5 tracking-wide font-medium">JOIN 10,000+ INDIAN STUDENTS.</p>
        </div>
      </div>

      {/* How it works - Bento Box Style */}
      <div className="px-6 relative z-10 flex-1 flex flex-col space-y-4 pb-8 animate-fade-in-up" style={{ animationDelay: '0.6s', opacity: 0 }}>
        
        <div className="glass-dark rounded-3xl p-6 relative overflow-hidden group hover:border-primary/30 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors"></div>
          <div className="flex gap-4 relative z-10">
            <div className="flex-shrink-0 w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-primary shadow-[0_0_15px_rgba(59,130,246,0.2)]">
              <Target size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-100 mb-1">1. Daily Tasks</h4>
              <p className="text-gray-400 text-sm leading-relaxed font-light">Get a curated, bite-sized coding task every single day. No fluff, just practical skills.</p>
            </div>
          </div>
        </div>

        <div className="glass-dark rounded-3xl p-6 relative overflow-hidden group hover:border-accent/30 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl group-hover:bg-accent/20 transition-colors"></div>
          <div className="flex gap-4 relative z-10">
            <div className="flex-shrink-0 w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-accent shadow-[0_0_15px_rgba(139,92,246,0.2)]">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-100 mb-1">2. Proof of Work</h4>
              <p className="text-gray-400 text-sm leading-relaxed font-light">Write the code, push it to GitHub, and post your learnings on LinkedIn. Build your public portfolio.</p>
            </div>
          </div>
        </div>

        <div className="glass-dark rounded-3xl p-6 relative overflow-hidden group hover:border-amber-500/30 transition-colors">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition-colors"></div>
          <div className="flex gap-4 relative z-10">
            <div className="flex-shrink-0 w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]">
              <Briefcase size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-100 mb-1">3. Get Hired</h4>
              <p className="text-gray-400 text-sm leading-relaxed font-light">Recruiters track consistency. A 60-day streak of public commits is better than any resume.</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
