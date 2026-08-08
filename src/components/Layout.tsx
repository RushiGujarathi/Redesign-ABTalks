import { ReactNode, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft, Monitor, Smartphone, CheckCircle2 } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const [isDesktopView, setIsDesktopView] = useState(false);
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center w-full relative z-0">
      
      {/* Desktop Background */}
      <div className="hidden md:block absolute inset-0 bg-gradient-to-br from-blue-50/90 via-white/80 to-purple-50/90 backdrop-blur-3xl -z-10" />

      {/* View Toggle - Fixed at top-left */}
      <div className="fixed top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-sm border border-gray-200 z-[100]">
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
      <div className="w-full h-full flex flex-col items-center justify-center">
        
        {/* App container - centered */}
        <div className={cn(
          "relative overflow-x-hidden flex flex-col shrink-0 transition-all duration-500",
          isDesktopView
            ? "w-full min-h-screen md:h-screen"
            : "w-full md:w-[390px] bg-background min-h-screen md:min-h-0 md:h-[844px] md:rounded-[3rem] md:border-[14px] md:border-gray-950 md:shadow-[0_20px_50px_rgba(0,0,0,0.4)] md:overflow-hidden ring-1 ring-white/10 my-auto"
        )}>
          
          {/* Scrollable Area inside the phone/desktop */}
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
