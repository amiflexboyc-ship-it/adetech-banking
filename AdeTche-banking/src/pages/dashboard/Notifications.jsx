import React, { useState } from 'react';

function Notifications() {
  const [allRead, setAllRead] = useState(false);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-blue-900/50">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-white">Notifications & Alerts</h1>
          <p className="text-xs text-slate-300 mt-0.5">Real-time alerts for transaction debits, credits, and security events.</p>
        </div>

        {!allRead && (
          <button
            type="button"
            onClick={() => setAllRead(true)}
            className="text-xs font-semibold text-blue-400 hover:text-white transition-colors"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="p-6 rounded-3xl bg-[#0a1d36]/90 border border-blue-900/50 shadow-xl divide-y divide-blue-900/40">
        
        {/* Notice 1 */}
        <div className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-cyan-950/60 border border-cyan-800/50 flex-shrink-0 flex items-center justify-center text-cyan-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="font-display font-bold text-sm text-white">Credit Inflow: ₦250,000.00</h4>
              <span className="text-[10px] text-slate-400">4 hours ago</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-2">
              Your account was credited with ₦250,000.00 from Chevron Nigeria Treasury via NIBSS NIP instant wire.
            </p>
            <span className="inline-block text-[10px] font-semibold text-cyan-400 bg-cyan-950/50 border border-cyan-800/40 px-2 py-0.5 rounded">
              Settlement Completed
            </span>
          </div>
        </div>

        {/* Notice 2 */}
        <div className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-950/60 border border-blue-800/50 flex-shrink-0 flex items-center justify-center text-blue-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="font-display font-bold text-sm text-white">Security Biometric 2FA Active</h4>
              <span className="text-[10px] text-slate-400">Yesterday</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-2">
              New login authenticated from Chrome browser (Lagos, Nigeria). 256-bit encryption verified.
            </p>
            <span className="inline-block text-[10px] font-semibold text-blue-300 bg-blue-950/50 border border-blue-800/40 px-2 py-0.5 rounded">
              Security Notice
            </span>
          </div>
        </div>

        {/* Notice 3 */}
        <div className="py-4 first:pt-0 last:pb-0 flex items-start gap-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-950/60 border border-blue-800/50 flex-shrink-0 flex items-center justify-center text-blue-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="font-display font-bold text-sm text-white">Virtual USD Card Activated</h4>
              <span className="text-[10px] text-slate-400">2 days ago</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-2">
              Your Virtual Visa Dollar card is ready for online international payments and subscriptions.
            </p>
            <span className="inline-block text-[10px] font-semibold text-slate-300 bg-slate-900 border border-slate-700 px-2 py-0.5 rounded">
              Card Services
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Notifications;
