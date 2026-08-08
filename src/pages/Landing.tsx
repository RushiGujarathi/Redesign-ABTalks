import { Link } from 'react-router-dom';
import { Target, CheckCircle2, Briefcase, ChevronRight, Zap } from 'lucide-react';
import { LOGO_URL } from '../components/Layout';

const steps = [
  {
    icon: Target,
    step: '01',
    color: 'text-brand bg-blue-50 border-blue-100',
    title: 'Daily Tasks',
    desc: 'Get a curated, practical coding task every day — no fluff, no filler. Just real skills that matter.',
  },
  {
    icon: CheckCircle2,
    step: '02',
    color: 'text-brand-2 bg-violet-50 border-violet-100',
    title: 'Proof of Work',
    desc: 'Push to GitHub and post on LinkedIn. Build a public portfolio that speaks louder than your resume.',
  },
  {
    icon: Briefcase,
    step: '03',
    color: 'text-success bg-green-50 border-green-100',
    title: 'Get Hired',
    desc: 'Recruiters track consistency. 60 days of public commits is the most compelling thing on any resume.',
  },
];

export default function Landing() {
  return (
    <div className="flex-1 flex flex-col" style={{ backgroundColor: 'transparent' }}>

      {/* ── Landing Header ── */}
      <header className="flex items-center justify-between px-4 py-3 bg-white border-b" style={{ borderColor: '#E2E8F0' }}>
        <img
          src={LOGO_URL}
          alt="ABTalks"
          className="h-7 w-auto object-contain"
          style={{ filter: 'brightness(0)' }}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = 'flex';
          }}
        />
        {/* Fallback text logo if image fails */}
        <span className="font-extrabold text-lg tracking-tight hidden" style={{ color: '#0F172A' }}>
          AB<span style={{ color: '#4F6FE8' }}>Talks</span>
        </span>
        <span className="badge badge-brand text-[11px]">Beta</span>
      </header>

      {/* Hero */}
      <div className="px-6 pt-10 pb-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 badge badge-brand mb-5">
          <Zap size={12} />
          <span>60-Day Coding Challenge</span>
        </div>

        <div className="mb-4">
          <img
            src={LOGO_URL}
            alt="ABTalks"
            className="h-10 w-auto object-contain"
            style={{ filter: 'brightness(0)' }}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = 'block';
            }}
          />
          {/* Fallback */}
          <h1 className="text-4xl font-extrabold tracking-tight leading-tight hidden" style={{ color: '#0F172A' }}>
            AB<span style={{ color: '#4F6FE8' }}>Talks</span>
          </h1>
        </div>

        {/* Code-style accent */}
        <div className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-md font-mono text-[11px] font-semibold"
          style={{ backgroundColor: '#F0F4FF', color: '#4F6FE8', border: '1px solid #C7D3FB' }}>
          <span style={{ color: '#94A3B8' }}>$</span> abtalks start --journey
        </div>

        <h2 className="text-[1.75rem] font-extrabold leading-tight mb-4 tracking-tight" style={{ color: '#0F172A' }}>
          Transform from{' '}
          <span style={{ color: '#64748B' }}>student</span>
          <br />
          to{' '}
          <span style={{
            background: 'linear-gradient(135deg, #4F6FE8 0%, #7C3AED 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            developer
          </span>
          <span className="hero-cursor" style={{ color: '#4F6FE8' }}>_</span>
        </h2>

        <p className="text-text-secondary text-base leading-relaxed mb-8">
          Commit to <strong className="text-text-primary font-semibold">60 days of coding.</strong> Build real projects,
          push to GitHub, and share on LinkedIn to get noticed by top recruiters.
        </p>

        {/* CTA */}
        <Link
          to="/dashboard"
          className="btn-md btn-primary w-full justify-center text-base font-bold shadow-brand"
        >
          Accept the Challenge <ChevronRight size={18} />
        </Link>

        {/* Social Proof */}
        <div className="flex items-center justify-around mt-8 pt-6 border-t border-border">
          {[['10K+', 'Students'], ['60', 'Days'], ['∞', 'Projects']].map(([val, label]) => (
            <div key={label} className="text-center">
              <p className="text-xl font-extrabold text-text-primary">{val}</p>
              <p className="text-xs text-text-muted font-medium mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div className="px-6 pb-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1 bg-border" />
          <p className="text-xs text-text-muted font-semibold uppercase tracking-widest">How it works</p>
          <div className="h-px flex-1 bg-border" />
        </div>

        <div className="space-y-3">
          {steps.map(({ icon: Icon, step, color, title, desc }) => (
            <div key={step} className="card p-5 flex gap-4 hover:shadow-card-md transition-shadow duration-150">
              <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center border ${color}`}>
                <Icon size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-text-muted uppercase tracking-widest">Step {step}</span>
                </div>
                <h4 className="text-base font-semibold text-text-primary mb-1">{title}</h4>
                <p className="text-sm text-text-secondary leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
