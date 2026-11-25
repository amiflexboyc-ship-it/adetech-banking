import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

const SLIDES = [
  {
    id: 1,
    headline: 'Welcome to AdeTech Banking',
    sub: 'Nigeria\'s most secure digital banking platform. Manage your money, transfer funds, and grow your wealth — all in one place.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-16 h-16">
        <defs>
          <linearGradient id="wg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#0a1d36" />
          </linearGradient>
        </defs>
        <path
          d="M24 4L7 11V22C7 33.2 14.3 43.1 24 46C33.7 43.1 41 33.2 41 22V11L24 4Z"
          fill="url(#wg1)"
          stroke="#3b82f6"
          strokeWidth="1.5"
        />
        <circle cx="24" cy="23" r="11" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
        <ellipse cx="24" cy="23" rx="5.5" ry="11" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6" fill="none" />
        <line x1="13" y1="23" x2="35" y2="23" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" />
        <path
          d="M24 14L18 29H21.5L22.8 25.5H25.2L26.5 29H30L24 14ZM23.4 22.8L24 20L24.6 22.8H23.4Z"
          fill="white"
          fillOpacity="0.9"
        />
      </svg>
    ),
    accent: 'from-blue-600/20 to-blue-900/10',
    border: 'border-blue-500/30',
  },
  {
    id: 2,
    headline: 'Instant Bank Transfers',
    sub: 'Send money to any Nigerian bank in seconds. Real-time NIP transfers with verified account name lookup before you send.',
    icon: (
      <svg className="w-16 h-16 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    accent: 'from-cyan-600/20 to-blue-900/10',
    border: 'border-cyan-500/30',
  },
  {
    id: 3,
    headline: 'Virtual Dollar Cards',
    sub: 'Get instant virtual USD and NGN cards. Shop globally, subscribe to services, and control your spend — all from your phone.',
    icon: (
      <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="1.5" />
        <line x1="2" y1="10" x2="22" y2="10" strokeWidth="1.5" />
        <circle cx="17" cy="15" r="1.5" fill="currentColor" strokeWidth="0" />
      </svg>
    ),
    accent: 'from-blue-500/20 to-indigo-900/10',
    border: 'border-blue-400/30',
  },
  {
    id: 4,
    headline: 'Wealth Vaults',
    sub: 'Grow your savings with up to 15.5% annual yield in AdeTech Wealth Vaults. Lock funds and earn — no risk, no market exposure.',
    icon: (
      <svg className="w-16 h-16 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    accent: 'from-emerald-600/20 to-blue-900/10',
    border: 'border-emerald-500/30',
  },
];

function DashboardWelcome() {
  const navigate = useNavigate();
  const context = useOutletContext();
  const user = context?.user || { name: 'Valued Customer' };

  const [slide, setSlide] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (idx) => {
    if (animating || idx === slide) return;
    setAnimating(true);
    setTimeout(() => {
      setSlide(idx);
      setAnimating(false);
    }, 200);
  };

  const handleOpenDashboard = () => {
    navigate('/dashboard/overview');
  };

  const current = SLIDES[slide];
  const firstName = user?.name ? user.name.split(' ')[0] : 'Customer';

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center px-4 py-10">

      <div className="w-full max-w-3xl mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/50 border border-blue-500/30 text-blue-300 text-xs font-bold uppercase tracking-widest mb-4">
          <span className="w-2 h-2 rounded-full bg-blue-400 inline-block"></span>
          <span>AdeTech Banking Portal</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-2">
          Welcome back, <span className="text-cyan-400">{firstName}</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          Your secure banking dashboard is ready. Explore what AdeTech has to offer.
        </p>
      </div>

      <div className="w-full max-w-3xl mb-8">
        <div
          className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${current.accent} border ${current.border} bg-[#0a1d36] p-8 sm:p-12 shadow-2xl transition-opacity duration-200 ${animating ? 'opacity-0' : 'opacity-100'}`}
        >

          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-8">

            <div className="flex-shrink-0 w-24 h-24 rounded-2xl bg-[#071527] border border-blue-900/70 flex items-center justify-center shadow-xl">
              {current.icon}
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-2">
                Feature {slide + 1} of {SLIDES.length}
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-tight">
                {current.headline}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
                {current.sub}
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-center sm:justify-start gap-2 mt-8">
            {SLIDES.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`transition-all rounded-full ${
                  idx === slide
                    ? 'w-6 h-2 bg-blue-400'
                    : 'w-2 h-2 bg-blue-900 hover:bg-blue-700'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-3xl grid grid-cols-3 gap-4 mb-10">
        <div className="rounded-2xl bg-[#0a1d36] border border-blue-900/50 p-4 text-center shadow">
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Instant Transfer</div>
          <div className="text-lg font-extrabold text-white font-mono">NIP</div>
          <div className="text-[11px] text-cyan-400 font-semibold mt-1">Real-time</div>
        </div>
        <div className="rounded-2xl bg-[#0a1d36] border border-blue-900/50 p-4 text-center shadow">
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Annual Yield</div>
          <div className="text-lg font-extrabold text-emerald-400 font-mono">15.5%</div>
          <div className="text-[11px] text-emerald-500 font-semibold mt-1">Wealth Vault</div>
        </div>
        <div className="rounded-2xl bg-[#0a1d36] border border-blue-900/50 p-4 text-center shadow">
          <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Account Tier</div>
          <div className="text-lg font-extrabold text-blue-400 font-mono">T-3</div>
          <div className="text-[11px] text-blue-300 font-semibold mt-1">Unrestricted</div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          type="button"
          onClick={handleOpenDashboard}
          className="inline-flex items-center gap-3 px-10 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-lg shadow-blue-600/40 border border-blue-400/40 transition-all group"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Open Your Account Dashboard</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        <span className="text-slate-500 text-xs">
          Your session is active and secured
        </span>
      </div>
    </div>
  );
}

export default DashboardWelcome;
