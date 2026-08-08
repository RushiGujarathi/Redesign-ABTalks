import { ReactNode } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Monitor, CheckCircle2, ExternalLink } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center w-full relative z-0">
      
      {/* Desktop Background */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white/80 to-purple-50/90 backdrop-blur-3xl -z-10" />

      {/* Main Container (Flex on desktop) */}
      <div className="w-full h-full md:h-auto flex flex-row items-center justify-center md:gap-16 lg:gap-24 md:p-8">
        
        {/* Mobile container - strictly max 390px for testing but centered */}
        <div className="w-full md:w-[390px] bg-background min-h-screen md:min-h-0 md:h-[844px] md:rounded-[3rem] md:border-[14px] md:border-gray-950 md:shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-x-hidden flex flex-col md:overflow-hidden shrink-0 ring-1 ring-white/10">
          
          {/* Scrollable Area inside the phone */}
          <div className="flex-1 flex flex-col overflow-y-auto hide-scrollbar w-full relative">
            {/* Simple Header */}
            {!isLanding && (
              <header className="px-5 pt-12 md:pt-6 pb-4 flex items-center justify-between sticky top-0 bg-background/80 backdrop-blur-md z-50 border-b border-white/5">
                {location.pathname !== '/dashboard' ? (
                  <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">
                    <ArrowLeft size={24} />
                  </Link>
                ) : (
                  <div className="w-6" /> // spacer
                )}
                <h1 className="font-bold text-xl tracking-tight text-white">
                  AB<span className="text-primary">Talks</span>
                </h1>
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-primary to-accent"></div>
              </header>
            )}

            {/* Content Area */}
            <main className="flex-1 flex flex-col">
              {children}
            </main>
          </div>
        </div>

        {/* Desktop Guidance Panel - Hidden on mobile */}
        <div className="hidden md:flex flex-col max-w-[420px] shrink-0">
          {/* Logo / Branding */}
          <div className="flex items-center gap-2 mb-10">
            <h1 className="font-bold text-3xl tracking-tight text-gray-900">
              AB<span className="text-blue-600">Talks</span>
            </h1>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
          </div>

          <div className="space-y-5">
            <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">
              Designed for Mobile
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed font-medium">
              This challenge is optimized for a mobile-first learning experience. Open it on your phone for the best experience, or continue using the centered preview.
            </p>
            
            <a 
              href="https://www.abtalks.in/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 mt-2 rounded-full border border-gray-200 bg-white/50 hover:bg-white text-gray-900 font-semibold transition-all shadow-sm hover:shadow-md"
            >
              Open ABTalks Website
              <ExternalLink size={18} />
            </a>
          </div>

          <div className="relative flex items-center gap-4 mt-12 mb-4">
            <div className="w-16 h-16 rounded-full border border-gray-200 bg-white/80 shadow-sm flex items-center justify-center shrink-0 relative z-10">
              <Monitor className="text-blue-600" size={32} />
            </div>
            
            {/* Curved Arrow SVG */}
            <div className="absolute -left-24 top-1/2 -translate-y-1/2 -translate-x-full text-gray-400 hidden lg:block">
              <svg width="80" height="60" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M80 30 C 50 30, 30 30, 5 30" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" fill="none"/>
                <path d="M15 20 L 5 30 L 15 40" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border border-gray-100 py-2 px-4 rounded-xl shadow-sm">
              <span className="text-sm font-semibold text-gray-700">← Live Mobile Preview</span>
            </div>
          </div>

          {/* Out of Scope Card */}
          <div className="mt-8 bg-white/60 backdrop-blur-xl border border-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Out of Scope</h3>
            <ul className="space-y-4">
              {[
                'Authentication',
                'Real User Accounts',
                'Production Database',
                'Recruiter Dashboard',
                'Admin Panel',
                'Matching ABTalks Internal Tech Stack'
              ].map(item => (
                <li key={item} className="flex items-center gap-3 text-gray-700">
                  <div className="bg-blue-100 rounded-full p-1">
                    <CheckCircle2 className="text-blue-600 shrink-0" size={16} />
                  </div>
                  <span className="font-semibold text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-gray-200/50">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                Mocked JSON data is intentionally used for demonstration.
              </p>
            </div>
          </div>

        </div>
      </div>
      
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
