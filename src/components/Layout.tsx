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

  const handleBack = () => navigate(-1);

  return (
    <div className="min-h-screen flex items-center justify-center w-full relative overflow-hidden"
      style={{ backgroundColor: '#EEF2FF' }}>

      {/* ── Outer desktop animated background blobs ── */}
      <div className="hidden md:block absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="animate-blob absolute top-[-10%] left-[10%] w-[500px] h-[500px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #a5b4fc, transparent 70%)' }} />
        <div className="animate-blob animation-delay-2000 absolute top-[30%] right-[-5%] w-[450px] h-[450px] rounded-full opacity-25"
          style={{ background: 'radial-gradient(circle, #c4b5fd, transparent 70%)' }} />
        <div className="animate-blob animation-delay-4000 absolute bottom-[-10%] left-[30%] w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #93c5fd, transparent 70%)' }} />
        {/* subtle dot grid on top */}
        <div className="absolute inset-0 opacity-40"
          style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(79,111,232,0.10) 1px, transparent 0)', backgroundSize: '28px 28px' }} />
      </div>

      {/* ── View Toggle ── */}
      <div className="fixed top-4 right-5 flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-slate-200 p-1.5 rounded-[14px] shadow-sm z-[100] transition-all hover:shadow-md">
        <button
          onClick={() => setIsDesktopView(false)}
          className={cn(
            'flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-[10px] transition-all duration-200',
            !isDesktopView ? 'bg-[#4F6FE8] text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          )}
          title="Mobile View"
        >
          <Smartphone size={16} />
          <span className="hidden sm:inline">Mobile</span>
        </button>
        <button
          onClick={() => setIsDesktopView(true)}
          className={cn(
            'flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-[10px] transition-all duration-200',
            isDesktopView ? 'bg-[#4F6FE8] text-white shadow-sm' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
          )}
          title="Desktop View"
        >
          <Monitor size={16} />
          <span className="hidden sm:inline">Desktop</span>
        </button>
      </div>

      {/* ── App Shell ── */}
      <div className="w-full h-full flex flex-col items-center justify-center py-6">
        <div className={cn(
          'relative flex flex-col overflow-hidden transition-all duration-500',
          isDesktopView
            ? 'w-full max-w-[1200px] min-h-screen md:rounded-2xl md:border md:border-slate-200 md:shadow-lg my-4'
            : 'w-full md:w-[390px] md:min-h-0 md:h-[844px] md:rounded-[2.5rem] md:border-[12px] md:border-slate-800 md:shadow-2xl md:overflow-hidden my-auto'
        )}
          style={{ backgroundColor: '#F5F8FF' }}>

          {/* ── Inner animated motion background (behind cards) ── */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none -z-0">
            <div className="animate-blob absolute top-[-5%] right-[-5%] w-[280px] h-[280px] rounded-full opacity-40"
              style={{ background: 'radial-gradient(circle, #bfdbfe, transparent 70%)' }} />
            <div className="animate-blob animation-delay-2000 absolute bottom-[10%] left-[-10%] w-[240px] h-[240px] rounded-full opacity-30"
              style={{ background: 'radial-gradient(circle, #ddd6fe, transparent 70%)' }} />
            <div className="animate-blob animation-delay-4000 absolute top-[40%] right-[5%] w-[200px] h-[200px] rounded-full opacity-25"
              style={{ background: 'radial-gradient(circle, #a5f3fc, transparent 70%)' }} />
          </div>

          {/* Scrollable inner area */}
          <div className="flex-1 flex flex-col overflow-y-auto hide-scrollbar w-full relative z-10">

            {/* ── App Header ── */}
            {!isLanding && (
              <header className="flex items-center justify-between px-4 py-3 bg-surface border-b border-border sticky top-0 z-50">
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn-ghost btn-sm w-9 h-9 p-0 rounded-lg"
                  aria-label="Go back"
                >
                  <ArrowLeft size={18} />
                </button>

                {/* Logo — image only */}
                <div className="flex items-center gap-2 relative">
                  <img
                    src={LOGO_URL}
                    alt=""
                    aria-hidden="true"
                    className="h-7 w-auto object-contain"
                    style={{ filter: 'brightness(0) saturate(100%)' }}
                  />
                </div>

                {/* Right placeholder for symmetry */}
                <div className="w-9 h-9" />
              </header>
            )}

            <main className="flex-1 flex flex-col">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
