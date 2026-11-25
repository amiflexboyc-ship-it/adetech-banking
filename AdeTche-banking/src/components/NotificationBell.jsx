import React, { useState, useEffect, useRef } from 'react';

function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const markAllAsRead = () => {
    setUnreadCount(0);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Banking Notifications"
        aria-expanded={isOpen}
        className="relative p-2.5 rounded-xl bg-[#0a1d36] hover:bg-[#0d2545] border border-blue-900/50 hover:border-blue-500/50 text-slate-200 hover:text-white transition-all focus:outline-none"
      >

        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center border border-[#071527] shadow-md">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-x-3 top-20 sm:absolute sm:inset-auto sm:right-0 sm:top-auto sm:mt-3 sm:w-96 max-h-[85vh] sm:max-h-[520px] rounded-2xl bg-[#0a1d36] border border-blue-800/60 shadow-2xl backdrop-blur-xl z-50 overflow-hidden flex flex-col animate-in fade-in duration-200">

          <div className="p-4 bg-gradient-to-r from-[#071527] to-[#0a1d36] border-b border-blue-900/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm text-white">Notifications</span>
              {unreadCount > 0 ? (
                <span className="px-2 py-0.5 rounded-md bg-blue-950 border border-blue-700/50 text-[10px] font-bold text-cyan-300">
                  {unreadCount} New
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-md bg-blue-950/40 border border-blue-900/40 text-[10px] font-medium text-slate-400">
                  All Caught Up
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="text-[11px] font-semibold text-blue-400 hover:text-white transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>

          <div className="max-h-[380px] overflow-y-auto divide-y divide-blue-900/40">

            <div className="p-4 hover:bg-blue-950/40 transition-colors flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-800/50 flex-shrink-0 flex items-center justify-center text-cyan-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <h4 className="font-display font-bold text-xs text-white truncate">
                    Credit Inflow: ₦250,000.00
                  </h4>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">2m ago</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-1.5">
                  Instant settlement received via NIBSS. Account balance has been updated.
                </p>
                <span className="inline-block text-[10px] font-semibold text-cyan-400 bg-cyan-950/50 border border-cyan-800/40 px-2 py-0.5 rounded">
                  Transaction Successful
                </span>
              </div>
            </div>

            <div className="p-4 hover:bg-blue-950/40 transition-colors flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-blue-950/60 border border-blue-800/50 flex-shrink-0 flex items-center justify-center text-blue-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <h4 className="font-display font-bold text-xs text-white truncate">
                    New Session Authorized
                  </h4>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">45m ago</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-1.5">
                  Portal login authenticated via biometric 2FA from Lagos Central Hub.
                </p>
                <span className="inline-block text-[10px] font-semibold text-blue-300 bg-blue-950/50 border border-blue-800/40 px-2 py-0.5 rounded">
                  Security Verified
                </span>
              </div>
            </div>

            <div className="p-4 hover:bg-blue-950/40 transition-colors flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-blue-950/60 border border-blue-800/50 flex-shrink-0 flex items-center justify-center text-blue-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2" />
                  <line x1="2" y1="10" x2="22" y2="10" strokeWidth="2" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <h4 className="font-display font-bold text-xs text-white truncate">
                    Virtual Dollar Card Ready
                  </h4>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">2h ago</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-1.5">
                  Your multi-currency card (8920) has been created and is ready for global subscriptions.
                </p>
                <span className="inline-block text-[10px] font-semibold text-blue-300 bg-blue-950/50 border border-blue-800/40 px-2 py-0.5 rounded">
                  Card Active
                </span>
              </div>
            </div>

            <div className="p-4 hover:bg-blue-950/40 transition-colors flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-950/60 border border-cyan-800/50 flex-shrink-0 flex items-center justify-center text-cyan-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-0.5">
                  <h4 className="font-display font-bold text-xs text-white truncate">
                    Wealth Vault Yield Credited
                  </h4>
                  <span className="text-[10px] text-slate-400 whitespace-nowrap">Yesterday</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-1.5">
                  Daily interest at 15.5% annual rate has been compounded into your savings account.
                </p>
                <span className="inline-block text-[10px] font-semibold text-cyan-400 bg-cyan-950/50 border border-cyan-800/40 px-2 py-0.5 rounded">
                  Interest Compounded
                </span>
              </div>
            </div>

          </div>

          <div className="p-3 bg-[#071527] border-t border-blue-900/60 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white font-medium transition-colors"
            >
              Close
            </button>
            <span className="text-[11px] font-semibold text-blue-400 hover:underline cursor-pointer">
              View All Activity &rarr;
            </span>
          </div>

        </div>
      )}
    </div>
  );
}

export default NotificationBell;
