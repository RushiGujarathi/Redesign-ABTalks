import { ReactNode } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Layout({ children }: { children: ReactNode }) {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center w-full">
      {/* Mobile container - strictly max 390px for testing but centered */}
      <div className="w-full max-w-[390px] bg-white min-h-screen shadow-2xl relative overflow-x-hidden flex flex-col">
        
        {/* Simple Header */}
        {!isLanding && (
          <header className="px-5 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
            {location.pathname !== '/dashboard' ? (
              <Link to="/dashboard" className="text-gray-500 hover:text-gray-900 transition-colors">
                <ArrowLeft size={24} />
              </Link>
            ) : (
              <div className="w-6" /> // spacer
            )}
            <h1 className="font-bold text-xl tracking-tight text-gray-900">
              AB<span className="text-blue-600">Talks</span>
            </h1>
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
          </header>
        )}

        {/* Content Area */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>
      </div>
    </div>
  );
}
