import { Link } from 'react-router-dom';
import { Target, CheckCircle2, Briefcase, ChevronRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="flex-1 flex flex-col bg-gradient-to-b from-blue-950 to-gray-950 relative pb-12">
      {/* Hero Section */}
      <div className="pt-20 px-6 pb-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20"></div>
        <div className="absolute top-20 left-0 -ml-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-screen filter blur-[80px] opacity-20"></div>
        
        <h1 className="font-extrabold text-5xl tracking-tight text-white mb-2 relative z-10">
          AB<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Talks</span>
        </h1>
        <div className="inline-block px-3 py-1 bg-blue-900/50 text-blue-300 text-sm font-semibold rounded-full mb-6 shadow-sm border border-blue-800/50 relative z-10">
          60-Day Challenge
        </div>
        
        <h2 className="text-3xl font-bold text-white leading-tight mb-4 relative z-10">
          Transform from student to <span className="relative">
            <span className="relative z-10 text-yellow-300">developer.</span>
            <span className="absolute bottom-1 left-0 w-full h-3 bg-yellow-500/20 -z-10"></span>
          </span>
        </h2>
        
        <p className="text-gray-300 text-lg mb-8 leading-relaxed relative z-10">
          Commit to 60 days of coding. Build real projects, push to GitHub, and share on LinkedIn to get noticed by top recruiters.
        </p>

        <Link 
          to="/dashboard" 
          className="group relative flex w-full justify-center items-center py-4 px-6 border border-gray-700 text-lg font-bold rounded-2xl text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 focus:ring-offset-gray-950 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 overflow-hidden min-h-[56px] z-10"
        >
          <span className="relative z-10 flex items-center">
            Accept the Challenge <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </span>
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </Link>
        <p className="text-center text-xs text-gray-500 mt-4 relative z-10">Join 10,000+ Indian students.</p>
      </div>

      {/* How it works */}
      <div className="px-6 py-8 bg-gray-900 border-t border-gray-800 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.3)] z-10 relative flex-1">
        <h3 className="text-2xl font-bold text-white mb-8">How it works</h3>
        
        <div className="space-y-8">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-900/50 border border-blue-800/50 rounded-2xl flex items-center justify-center text-blue-400 shadow-inner">
              <Target size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">1. Daily Tasks</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Get a curated, bite-sized coding task every single day. No fluff, just practical skills.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-purple-900/50 border border-purple-800/50 rounded-2xl flex items-center justify-center text-purple-400 shadow-inner">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">2. Proof of Work</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Write the code, push it to GitHub, and post your learnings on LinkedIn. Build your public portfolio.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-yellow-900/30 border border-yellow-800/50 rounded-2xl flex items-center justify-center text-yellow-500 shadow-inner">
              <Briefcase size={24} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white mb-1">3. Get Hired</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Recruiters track consistency. A 60-day streak of public commits is better than any resume.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
