import React from 'react';

function About() {
  return (
    <section id="about" className="relative py-24 bg-[#071527] text-white overflow-hidden border-t border-blue-900/40">

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-500/40 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            ABOUT US
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Welcome to AdeTech Digital Banking
          </h2>

          <p className="text-xl sm:text-2xl font-bold text-blue-400 mb-6">
            Banking Made Simple, Secure, and Smarter.
          </p>

          <div className="space-y-4 text-base sm:text-lg text-slate-300 leading-relaxed">
            <p>
              AdeTech Digital Banking is a modern digital banking platform designed to make financial services easier, faster, and more convenient. Our mission is to bring banking closer to everyone through innovative technology, simplicity, and security.
            </p>
            <p>
              With AdeTech, users can enjoy a seamless digital banking experience, manage their finances, monitor transactions, make transfers, pay bills, save money, and manage virtual cards — all from one convenient platform.
            </p>
          </div>
        </div>

        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1.5 h-7 bg-blue-500 rounded-full" />
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
              What We Offer
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="p-6 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/20 group">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="font-display font-bold text-lg text-white mb-2">Secure Account Registration</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Create and manage your personal banking account.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/20 group">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h4 className="font-display font-bold text-lg text-white mb-2">Smart Money Transfers</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Send and receive money conveniently.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/20 group">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-display font-bold text-lg text-white mb-2">Transaction History</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Keep track of your financial activities.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/20 group">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2" />
                  <line x1="2" y1="10" x2="22" y2="10" strokeWidth="2" />
                </svg>
              </div>
              <h4 className="font-display font-bold text-lg text-white mb-2">Virtual Cards</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Manage digital payment cards.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/20 group">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h4 className="font-display font-bold text-lg text-white mb-2">Bill Payments</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Pay essential bills with ease.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/20 group">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h4 className="font-display font-bold text-lg text-white mb-2">Savings Management</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Organize and monitor your savings.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/20 group">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h4 className="font-display font-bold text-lg text-white mb-2">Real-Time Notifications</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Stay updated on your account activities.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 shadow-lg shadow-black/20 group">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h4 className="font-display font-bold text-lg text-white mb-2">Personal Dashboard</h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                Manage your finances from one place.
              </p>
            </div>

          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0a1d36] to-[#0d2545] border border-blue-500/40 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">Our Vision</h3>
            </div>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              To become a trusted digital financial technology platform that makes financial management accessible, convenient, and efficient for everyone.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0a1d36] to-[#0d2545] border border-blue-500/40 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">Our Promise</h3>
            </div>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
              At AdeTech, we believe that the future of banking is digital. We are committed to building a smarter financial experience powered by technology, innovation, and customer-focused solutions.
            </p>
          </div>

        </div>

        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-blue-900/60 via-[#0a1d36] to-blue-950/70 border border-blue-400/40 text-center shadow-2xl backdrop-blur-md">
          <p className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            AdeTech Digital Banking — Your Money, Your Control, Your Future.
          </p>
        </div>

      </div>
    </section>
  );
}

export default About;
