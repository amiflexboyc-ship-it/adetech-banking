import React, { useState, useEffect } from 'react';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import api from '../../api';
import NotificationBell from '../../components/NotificationBell';

function DashboardLayout() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: 'Adekunle Olawale',
    email: 'amiflexboyc@gmail.com',
    tier: 'Tier 3 (Unrestricted)',
    accountNumber: '0907710898',
    balance: 1450000.00
  });

  useEffect(() => {

    const stored = localStorage.getItem('adetech_user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUser((prev) => ({ ...prev, ...parsed }));
      } catch (e) {

      }
    }

    api.account.getDetails()
      .then((res) => {
        if (res && res.account) {
          setUser((prev) => ({
            ...prev,
            accountNumber: res.account.accountNumber || prev.accountNumber,
            balance: res.account.balance !== undefined ? res.account.balance : prev.balance
          }));
        }
      })
      .catch(() => {

      });
  }, []);

  const handleLogout = async () => {
    await api.auth.logout();
    navigate('/login');
  };

  const getNavLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
      isActive
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40'
        : 'text-slate-300 hover:text-white hover:bg-blue-900/40 border border-transparent'
    }`;

  return (
    <div className="min-h-screen bg-[#071527] text-white flex flex-col md:flex-row selection:bg-blue-600 selection:text-white">

      <aside className="hidden md:flex flex-col w-64 bg-[#0a1d36] border-r border-blue-900/50 flex-shrink-0">

        <div className="p-6 border-b border-blue-900/50">
          <Link to="/" className="flex items-center gap-3 select-none">
            <div className="relative w-9 h-9 flex-shrink-0">
              <svg viewBox="0 0 48 48" fill="none" className="w-full h-full drop-shadow-[0_4px_12px_rgba(37,99,235,0.45)]">
                <defs>
                  <linearGradient id="dashShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="60%" stopColor="#1d4ed8" />
                    <stop offset="100%" stopColor="#0a1d36" />
                  </linearGradient>
                  <linearGradient id="dashSilverAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#93c5fd" />
                  </linearGradient>
                </defs>
                <path
                  d="M24 4L7 11V22C7 33.2 14.3 43.1 24 46C33.7 43.1 41 33.2 41 22V11L24 4Z"
                  fill="url(#dashShieldGrad)"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                />
                <circle cx="24" cy="23" r="11" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
                <ellipse cx="24" cy="23" rx="5.5" ry="11" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6" fill="none" />
                <line x1="13" y1="23" x2="35" y2="23" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" />
                <path
                  d="M24 14L18 29H21.5L22.8 25.5H25.2L26.5 29H30L24 14ZM23.4 22.8L24 20L24.6 22.8H23.4Z"
                  fill="url(#dashSilverAccent)"
                />
                <circle cx="24" cy="10" r="2.2" fill="#60a5fa" />
              </svg>
            </div>
            <div className="flex items-center tracking-tight leading-none">
              <span className="font-display font-bold text-xl text-white">Ade</span>
              <span className="font-display font-bold text-xl text-blue-500">Tech</span>
            </div>
          </Link>
          <div className="mt-3 px-2 py-1 rounded-md bg-[#071527] border border-blue-900/60 flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Account NUBAN</span>
            <span className="font-mono font-bold text-cyan-400">{user.accountNumber}</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          <NavLink to="/dashboard/overview" className={getNavLinkClass}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span>Overview</span>
          </NavLink>

          <NavLink to="/dashboard/transfer" className={getNavLinkClass}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span>Send Money</span>
          </NavLink>

          <NavLink to="/dashboard/bills" className={getNavLinkClass}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Pay Bills</span>
          </NavLink>

          <NavLink to="/dashboard/cards" className={getNavLinkClass}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2" />
              <line x1="2" y1="10" x2="22" y2="10" strokeWidth="2" />
            </svg>
            <span>Virtual Cards</span>
          </NavLink>

          <NavLink to="/dashboard/transactions" className={getNavLinkClass}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>Statement & History</span>
          </NavLink>

          <NavLink to="/dashboard/profile" className={getNavLinkClass}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span>Profile & Security</span>
          </NavLink>
        </nav>

        <div className="p-4 border-t border-blue-900/50">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 bg-rose-950/30 border border-rose-900/40 hover:bg-rose-900/30 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">

        <header className="sticky top-0 z-30 bg-[#0a1d36]/90 backdrop-blur-md border-b border-blue-900/50 px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="md:hidden flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/50 flex items-center justify-center text-blue-400 font-bold text-sm">
                A
              </div>
            </Link>
            <div>
              <div className="text-xs text-slate-400">Welcome Back</div>
              <div className="font-display font-bold text-sm sm:text-base text-white">{user.name}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#071527] border border-blue-900/60 text-xs">
              <span className="text-slate-400">Available:</span>
              <span className="font-bold text-emerald-400 font-mono">
                ₦{Number(user.balance).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </span>
            </div>

            <NotificationBell />

            <Link
              to="/"
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white bg-[#071527] border border-blue-900/70 hover:border-blue-600 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Public Site</span>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
          <Outlet context={{ user, setUser }} />
        </main>
      </div>

      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0a1d36]/95 backdrop-blur-lg border-t border-blue-900/60 px-2 py-2 flex items-center justify-around">
        <NavLink to="/dashboard/overview" className={({ isActive }) => `flex flex-col items-center gap-1 p-1 text-[10px] font-bold ${isActive ? 'text-blue-400' : 'text-slate-400'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Home</span>
        </NavLink>

        <NavLink to="/dashboard/transfer" className={({ isActive }) => `flex flex-col items-center gap-1 p-1 text-[10px] font-bold ${isActive ? 'text-blue-400' : 'text-slate-400'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          <span>Transfer</span>
        </NavLink>

        <NavLink to="/dashboard/cards" className={({ isActive }) => `flex flex-col items-center gap-1 p-1 text-[10px] font-bold ${isActive ? 'text-blue-400' : 'text-slate-400'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2" />
          </svg>
          <span>Cards</span>
        </NavLink>

        <NavLink to="/dashboard/bills" className={({ isActive }) => `flex flex-col items-center gap-1 p-1 text-[10px] font-bold ${isActive ? 'text-blue-400' : 'text-slate-400'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Bills</span>
        </NavLink>

        <NavLink to="/dashboard/profile" className={({ isActive }) => `flex flex-col items-center gap-1 p-1 text-[10px] font-bold ${isActive ? 'text-blue-400' : 'text-slate-400'}`}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Profile</span>
        </NavLink>
      </div>

    </div>
  );
}

export default DashboardLayout;
