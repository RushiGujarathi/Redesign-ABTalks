import { ReactNode, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Monitor, Smartphone } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ✏️ PASTE THE ABTALKS LOGO URL HERE — it will apply to all pages automatically
export const LOGO_URL = 'https://www.abtalks.in/abtalks-logo.png';

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === '/';
  const [isDesktopView, setIsDesktopView] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center w-full relative z-0">
      
      {/* Desktop Background */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white/80 to-purple-50/90 backdrop-blur-3xl -z-10" />

      {/* View Toggle - Fixed at top-right */}
      <div className="fixed top-2 right-6 md:top-4 md:right-6 flex items-center gap-2 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-sm border border-gray-200 z-[100]">
        <button 
          onClick={() => setIsDesktopView(false)}
          className={cn("p-2 rounded-full transition-colors flex items-center justify-center", !isDesktopView ? "bg-white shadow-md text-blue-600" : "text-gray-500 hover:text-gray-900")}
          title="Mobile View"
        >
          <Smartphone size={20} />
        </button>
        <button 
          onClick={() => setIsDesktopView(true)}
          className={cn("p-2 rounded-full transition-colors flex items-center justify-center", isDesktopView ? "bg-white shadow-md text-blue-600" : "text-gray-500 hover:text-gray-900")}
          title="Desktop View"
        >
          <Monitor size={20} />
        </button>
      </div>

      {/* Main Container */}
      <div className="w-full h-full flex flex-col items-center justify-center px-4 py-6">
        
        {/* App container - centered */}
        <div className={cn(
          "relative overflow-x-hidden flex flex-col shrink-0 transition-all duration-500",
          isDesktopView
            ? "w-full max-w-[1240px] min-h-screen md:h-screen bg-background md:rounded-[3rem] md:border-[14px] md:border-gray-950 md:shadow-[0_20px_50px_rgba(0,0,0,0.4)] md:overflow-hidden ring-1 ring-white/10 my-4"
            : "w-full md:w-[390px] bg-background min-h-screen md:min-h-0 md:h-[844px] md:rounded-[3rem] md:border-[14px] md:border-gray-950 md:shadow-[0_20px_50px_rgba(0,0,0,0.4)] md:overflow-hidden ring-1 ring-white/10 my-auto"
        )}>
          
          {/* Scrollable Area inside the phone/desktop */}
          <div className="flex-1 flex flex-col overflow-y-auto hide-scrollbar w-full relative">
            {/* Simple Header */}
            {!isLanding && (
              <header className="px-5 pt-12 md:pt-6 pb-4 flex items-center justify-between sticky top-0 bg-background/92 backdrop-blur-md z-50 border-b border-white/5">
                <button
                  type="button"
                  onClick={handleBack}
                  className="text-gray-400 hover:text-white transition-colors flex items-center justify-center w-10 h-10 rounded-2xl bg-white/5 border border-white/10"
                  aria-label="Go back"
                >
                  <ArrowLeft size={20} />
                </button>
                {/* Logo — shows image if URL is set, falls back to styled text */}
                {LOGO_URL ? (
                  <img
                    src={LOGO_URL}
                    alt="ABTalks"
                    className="h-8 w-auto object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                  />
                ) : (
                  <h1 className="font-bold text-xl tracking-tight text-white">
                    AB<span className="text-primary">Talks</span>
                  </h1>
                )}
                <div className="w-10 h-10 rounded-2xl overflow-hidden">
                  {LOGO_URL ? (
                    <img src={LOGO_URL} alt="" className="w-full h-full object-contain" />
                  ) : (
                    <div className="w-full h-full rounded-2xl bg-gradient-to-tr from-primary to-accent" />
                  )}
                </div>
              </header>
            )}

            {/* Content Area */}
            <main className="flex-1 flex flex-col">
              {children}
            </main>
          </div>
        </div>

        {/* Out of Scope Card removed */}
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
