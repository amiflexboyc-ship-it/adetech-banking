import React from 'react';

function Services() {
  return (
    <section id="services" className="relative py-24 bg-[#071527] text-white overflow-hidden border-t border-blue-900/40">

      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-500/40 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            OUR SERVICES
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Banking Services Designed Around You
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Enjoy convenient, secure and reliable banking services designed to make managing your money easier. With AdeTech Banking, your financial needs are just a few clicks away.
          </p>
        </div>

        {/* =========================================================================
            FOUR SERVICE CARDS (DIRECT REACT JSX STRUCTURE - NO JSON ARRAY)
           ========================================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* ---------------- CARD 1: Money Transfer ---------------- */}
          <div className="p-7 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl shadow-black/20 flex flex-col justify-between group">
            <div>
              {/* Service Icon */}
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>

              {/* Service Title */}
              <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-blue-400 transition-colors">
                Money Transfer
              </h3>

              {/* Service Description */}
              <p className="text-sm text-slate-300 leading-relaxed">
                Send and receive money quickly and conveniently.
              </p>
            </div>

            {/* Bottom Action Pill */}
            <div className="pt-6 mt-6 border-t border-blue-900/40 flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-400">
                Instant Settlement
              </span>
              <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>


          <div className="p-7 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl shadow-black/20 flex flex-col justify-between group">
            <div>
              {/* Service Icon */}
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>

              {/* Service Title */}
              <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-blue-400 transition-colors">
                Bill Payments
              </h3>

              {/* Service Description */}
              <p className="text-sm text-slate-300 leading-relaxed">
                Pay electricity, internet, cable TV and other bills with ease.
              </p>
            </div>

            {/* Bottom Action Pill */}
            <div className="pt-6 mt-6 border-t border-blue-900/40 flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-400">
                Zero Convenience Fee
              </span>
              <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* ---------------- CARD 3: Airtime & Data ---------------- */}
          <div className="p-7 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl shadow-black/20 flex flex-col justify-between group">
            <div>
              {/* Service Icon */}
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>

              {/* Service Title */}
              <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-blue-400 transition-colors">
                Airtime & Data
              </h3>

              {/* Service Description */}
              <p className="text-sm text-slate-300 leading-relaxed">
                Recharge your phone and purchase mobile data anytime.
              </p>
            </div>

            {/* Bottom Action Pill */}
            <div className="pt-6 mt-6 border-t border-blue-900/40 flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-400">
                All Networks Supported
              </span>
              <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          {/* ---------------- CARD 4: Savings ---------------- */}
          <div className="p-7 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl shadow-black/20 flex flex-col justify-between group">
            <div>
              {/* Service Icon */}
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-md">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>

              {/* Service Title */}
              <h3 className="font-display font-bold text-xl text-white mb-3 group-hover:text-blue-400 transition-colors">
                Savings
              </h3>

              {/* Service Description */}
              <p className="text-sm text-slate-300 leading-relaxed">
                Build better financial habits and save towards your goals.
              </p>
            </div>

            {/* Bottom Action Pill */}
            <div className="pt-6 mt-6 border-t border-blue-900/40 flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-400">
                High-Interest Yield
              </span>
              <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Services;

