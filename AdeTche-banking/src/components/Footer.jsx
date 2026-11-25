import React from 'react';

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="relative bg-[#040d1a] text-slate-300 border-t border-blue-900/40 overflow-hidden">

      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-blue-950">

          <div className="lg:col-span-4 flex flex-col">

            <div className="flex items-center gap-3 cursor-pointer select-none mb-4" onClick={scrollToTop}>
              <div className="relative w-10 h-10 flex-shrink-0">
                <svg viewBox="0 0 48 48" fill="none" className="w-full h-full drop-shadow-[0_4px_12px_rgba(37,99,235,0.45)]">
                  <defs>
                    <linearGradient id="footerNavyShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#2563eb" />
                      <stop offset="60%" stopColor="#1d4ed8" />
                      <stop offset="100%" stopColor="#0a1d36" />
                    </linearGradient>
                    <linearGradient id="footerSilverAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#93c5fd" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M24 4L7 11V22C7 33.2 14.3 43.1 24 46C33.7 43.1 41 33.2 41 22V11L24 4Z"
                    fill="url(#footerNavyShieldGrad)"
                    stroke="#3b82f6"
                    strokeWidth="1.5"
                  />
                  <circle cx="24" cy="23" r="11" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
                  <ellipse cx="24" cy="23" rx="5.5" ry="11" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6" fill="none" />
                  <line x1="13" y1="23" x2="35" y2="23" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" />
                  <path
                    d="M24 14L18 29H21.5L22.8 25.5H25.2L26.5 29H30L24 14ZM23.4 22.8L24 20L24.6 22.8H23.4Z"
                    fill="url(#footerSilverAccent)"
                  />
                  <circle cx="24" cy="10" r="2.2" fill="#60a5fa" />
                </svg>
              </div>

              <div className="flex items-center tracking-tight leading-none">
                <span className="font-display font-bold text-2xl text-white">Ade</span>
                <span className="font-display font-bold text-2xl text-blue-500">Tech</span>
                <span className="font-display font-semibold text-2xl text-slate-200 ml-1.5">Banking</span>
              </div>
            </div>

            <div className="text-sm font-semibold text-cyan-400 mb-3 tracking-wide">
              Your Money, Your Control, Your Future.
            </div>

            <p className="text-sm text-slate-400 leading-relaxed mb-6 font-normal">
              AdeTech Banking provides secure, convenient, and modern digital banking infrastructure designed around your everyday personal and business financial needs.
            </p>

            <div className="space-y-2.5">

              <a
                href="https://wa.me/2349077108987"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0a1d36]/80 hover:bg-[#0d2545] border border-blue-900/50 hover:border-blue-500/50 text-xs text-slate-200 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-400">WhatsApp Chat</span>
                  <span className="font-semibold text-white">09077108987</span>
                </div>
              </a>

              <a
                href="mailto:amiflexboyc@gmail.com"
                className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0a1d36]/80 hover:bg-[#0d2545] border border-blue-900/50 hover:border-blue-500/50 text-xs text-slate-200 hover:text-white transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Official Email</span>
                  <span className="font-semibold text-white">amiflexboyc@gmail.com</span>
                </div>
              </a>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-[#0a1d36]/50 border border-blue-950 text-xs text-slate-300">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Head Office</span>
                  <span className="text-slate-300">AdeTech Tower, Lekki Phase 1, Lagos</span>
                </div>
              </div>

            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-sm"></span>
              Navigation
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-400 transition-colors">About Us</a>
              </li>
              <li>
                <a href="#why-choose" className="hover:text-blue-400 transition-colors">Why Choose Us</a>
              </li>
              <li>
                <a href="#services" className="hover:text-blue-400 transition-colors">Banking Services</a>
              </li>
              <li>
                <a href="#map" className="hover:text-blue-400 transition-colors">Nationwide Network</a>
              </li>
              <li>
                <a href="#csr" className="hover:text-blue-400 transition-colors">CSR & Impact</a>
              </li>
              <li>
                <a href="#customers" className="hover:text-blue-400 transition-colors">Customer Stories</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-400 transition-colors">Contact Support</a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 flex flex-col">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rounded-sm"></span>
              Solutions
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors">Personal Accounts</a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors">Corporate & SME Banking</a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors">High-Yield Wealth Vaults</a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors">Virtual & Physical Cards</a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors">Multi-Currency Transfers</a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors">Automated Bill Settlements</a>
              </li>
              <li>
                <a href="#services" className="hover:text-cyan-300 transition-colors">Developer Banking API</a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 flex flex-col">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-5 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-sm"></span>
              Security & Trust
            </h4>

            <div className="space-y-3">

              <div className="p-3 rounded-xl bg-[#0a1d36]/80 border border-blue-900/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-xs text-white">Central Bank Regulated</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Compliant with Central Bank of Nigeria guidelines.</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0a1d36]/80 border border-blue-900/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="2" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-xs text-white">NDIC Deposit Insurance</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">All customer deposits insured up to the maximum legal threshold.</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#0a1d36]/80 border border-blue-900/60 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-600/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div>
                  <div className="font-bold text-xs text-white">256-Bit Bank Encryption</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">ISO 27001 standard data protection and round-the-clock fraud surveillance.</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        <div className="py-6 border-b border-blue-950 text-xs text-slate-400 leading-relaxed font-normal">
          <p>
            AdeTech Banking Corporation operates as a modern digital financial technology institution. Banking and payment processing services are provided in full accordance with regulatory standards approved by the Central Bank of Nigeria (CBN). Customer funds deposited in AdeTech accounts are insured by the Nigeria Deposit Insurance Corporation (NDIC). Virtual payment cards and international settlements are powered in partnership with authorized global card payment schemes.
          </p>
        </div>

        <div className="pt-6 pb-20 md:pb-0 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>&copy; {new Date().getFullYear()} AdeTech Banking Corporation. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#security" className="hover:text-blue-400 transition-colors">Security Architecture</a>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a1d36] hover:bg-[#0d2545] border border-blue-900/60 hover:border-blue-500/60 text-slate-200 hover:text-white transition-all text-xs font-semibold focus:outline-none"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
