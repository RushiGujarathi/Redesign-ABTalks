import { useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowRight, Sparkles } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col bg-background relative pb-12 overflow-hidden selection:bg-primary/30">
      <div className="pt-20 px-6 pb-12 relative z-10 max-w-[900px] mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/[0.05] border border-white/10 rounded-full mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(59,130,246,0.15)]">
          <Sparkles className="text-primary w-4 h-4" />
          <span className="text-gray-300 text-xs font-semibold uppercase tracking-wider">Mock Login</span>
        </div>

        <h1 className="font-extrabold text-4xl tracking-tight text-white mb-4">Welcome back to ABTalks</h1>
        <p className="text-gray-400 text-lg mb-10 leading-relaxed font-light max-w-2xl">This is a mocked student login flow for the ABTalks redesign. Click below to continue to the student dashboard.</p>

        <div className="mb-6 max-w-sm">
          <button
            onClick={() => navigate('/dashboard')}
            className="group relative inline-flex w-full min-h-[56px] items-center justify-center rounded-2xl bg-gradient-to-r from-primary to-accent text-white font-semibold text-base overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_30px_rgba(59,130,246,0.25)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Student Login <ArrowRight size={18} />
            </span>
          </button>
        </div>

        <p className="text-sm text-gray-500 font-medium">
          Don&apos;t want to log in? <Link to="/" className="text-primary hover:text-white underline">Return to home</Link>.
        </p>
      </div>
    </div>
  );
}
