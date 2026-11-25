import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MobileAppDock() {
  const [activeTab, setActiveTab] = useState('home');
  const [quickActionOpen, setQuickActionOpen] = useState(false);

  const handleNavClick = (tab, hash) => {
    setActiveTab(tab);
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>

      {quickActionOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end justify-center">

          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setQuickActionOpen(false)}
          />

          <div className="relative z-10 w-full max-w-lg bg-[#0a1d36] border-t border-blue-700/60 rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">

            <div className="w-12 h-1.5 bg-blue-800 rounded-full mx-auto mb-5" />

            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-display font-bold text-lg text-white">AdeTech Quick Actions</h3>
                <p className="text-xs text-slate-300">Fast access to essential banking operations</p>
              </div>
              <button
                type="button"
                onClick={() => setQuickActionOpen(false)}
                className="w-8 h-8 rounded-full bg-[#071527] border border-blue-900/60 flex items-center justify-center text-slate-400 hover:text-white"
                aria-label="Close Quick Actions"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">

              <Link
                to="/register"
                onClick={() => setQuickActionOpen(false)}
                className="p-3.5 rounded-2xl bg-[#071527] border border-blue-900/60 hover:border-blue-500/50 flex flex-col justify-between group active:scale-95 transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-2 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" strokeWidth="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 8v6m3-3h-6" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-blue-300">Open Account</div>
                  <div className="text-[10px] text-slate-400">Instant activation in 2 mins</div>
                </div>
              </Link>

              <Link
                to="/dashboard/transfer"
                onClick={() => setQuickActionOpen(false)}
                className="p-3.5 rounded-2xl bg-[#071527] border border-blue-900/60 hover:border-blue-500/50 flex flex-col justify-between group active:scale-95 transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-2 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-blue-300">Money Transfer</div>
                  <div className="text-[10px] text-slate-400">Zero fee instant rails</div>
                </div>
              </Link>

              <Link
                to="/dashboard/cards"
                onClick={() => setQuickActionOpen(false)}
                className="p-3.5 rounded-2xl bg-[#071527] border border-blue-900/60 hover:border-blue-500/50 flex flex-col justify-between group active:scale-95 transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-2 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2" />
                    <line x1="2" y1="10" x2="22" y2="10" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300">Virtual Cards</div>
                  <div className="text-[10px] text-slate-400">Global online payments</div>
                </div>
              </Link>

              <a
                href="https://wa.me/2349077108987?text=Hello%20AdeTech%20Banking"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setQuickActionOpen(false)}
                className="p-3.5 rounded-2xl bg-[#071527] border border-blue-900/60 hover:border-blue-500/50 flex flex-col justify-between group active:scale-95 transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-300">WhatsApp Chat</div>
                  <div className="text-[10px] text-slate-400">09077108987 live desk</div>
                </div>
              </a>

            </div>

            <Link
              to="/welcome"
              onClick={() => setQuickActionOpen(false)}
              className="w-full mb-3 py-2.5 px-4 rounded-xl bg-[#071527] border border-blue-900/60 hover:border-blue-500/50 flex items-center justify-between text-xs font-semibold text-cyan-300 hover:text-white transition-colors"
            >
              <span>Mobile App Welcome Onboarding</span>
              <span>&rarr;</span>
            </Link>

            <a
              href="tel:09077108987"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call Direct Banking Desk (09077108987)</span>
            </a>
          </div>
        </div>
      )}

      <nav
        aria-label="Mobile App Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#071527]/95 backdrop-blur-2xl border-t border-blue-900/60 pb-safe shadow-[0_-8px_30px_rgba(0,0,0,0.6)]"
      >
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-between">

          <button
            type="button"
            onClick={() => handleNavClick('home', '#home')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
              activeTab === 'home' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            <span className="text-[10px] tracking-tight">Home</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('services', '#services')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
              activeTab === 'services' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="text-[10px] tracking-tight">Services</span>
          </button>

          <div className="flex-1 flex justify-center -mt-6">
            <button
              type="button"
              onClick={() => setQuickActionOpen(true)}
              className="w-13 h-13 w-12 h-12 rounded-full bg-gradient-to-tr from-blue-700 via-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-xl shadow-blue-600/50 border-4 border-[#071527] active:scale-95 transition-transform"
              aria-label="Open Quick Actions"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          <button
            type="button"
            onClick={() => handleNavClick('map', '#map')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
              activeTab === 'map' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-[10px] tracking-tight">Locations</span>
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('contact', '#contact')}
            className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
              activeTab === 'contact' ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-[10px] tracking-tight">Contact</span>
          </button>

        </div>
      </nav>
    </>
  );
}

export default MobileAppDock;
