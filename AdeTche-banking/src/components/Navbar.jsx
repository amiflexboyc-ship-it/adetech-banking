import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NotificationBell from './NotificationBell';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('adetech_token') || localStorage.getItem('adetech_auth_token');
    setIsLoggedIn(Boolean(token));
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#071527]/90 backdrop-blur-md border-b border-blue-900/40 shadow-lg shadow-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Best Logo for AdeTech Banking */}
        <Link to="/" className="flex items-center gap-3 cursor-pointer select-none">
          <div className="relative w-11 h-11 flex-shrink-0">
            <svg viewBox="0 0 48 48" fill="none" className="w-full h-full drop-shadow-[0_4px_12px_rgba(37,99,235,0.45)]">
              <defs>
                <linearGradient id="navyShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#2563eb" />
                  <stop offset="60%" stopColor="#1d4ed8" />
                  <stop offset="100%" stopColor="#0a1d36" />
                </linearGradient>
                <linearGradient id="silverAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="100%" stopColor="#93c5fd" />
                </linearGradient>
              </defs>
              <path
                d="M24 4L7 11V22C7 33.2 14.3 43.1 24 46C33.7 43.1 41 33.2 41 22V11L24 4Z"
                fill="url(#navyShieldGrad)"
                stroke="#3b82f6"
                strokeWidth="1.5"
              />
              <circle cx="24" cy="23" r="11" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
              <ellipse cx="24" cy="23" rx="5.5" ry="11" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6" fill="none" />
              <line x1="13" y1="23" x2="35" y2="23" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" />
              <path
                d="M24 14L18 29H21.5L22.8 25.5H25.2L26.5 29H30L24 14ZM23.4 22.8L24 20L24.6 22.8H23.4Z"
                fill="url(#silverAccent)"
              />
              <circle cx="24" cy="10" r="2.2" fill="#60a5fa" />
            </svg>
          </div>

          <div className="flex items-center tracking-tight leading-none">
            <span className="font-display font-bold text-lg sm:text-2xl text-white">Ade</span>
            <span className="font-display font-bold text-lg sm:text-2xl text-blue-500">Tech</span>
            <span className="font-display font-semibold text-lg sm:text-2xl text-slate-200 ml-1">Banking</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#home" className="text-white hover:text-blue-400 transition-colors">Home</a>
          <a href="#about" className="hover:text-blue-400 transition-colors">About</a>
          <a href="#why-choose" className="hover:text-blue-400 transition-colors">Why Us</a>
          <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
          <a href="#map" className="hover:text-blue-400 transition-colors">Locations</a>
          <a href="#crs" className="hover:text-blue-400 transition-colors">CRS</a>
          <a href="#customers" className="hover:text-blue-400 transition-colors">Customers</a>
          <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <NotificationBell />

          {isLoggedIn ? (
            <>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-md shadow-blue-600/30 border border-blue-400/40 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span>Dashboard</span>
              </Link>

              <Link
                to="/admin"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-cyan-300 bg-[#0a1d36] hover:bg-[#0d2545] border border-blue-900/60 rounded-lg transition-all"
              >
                <span>Admin</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:inline-flex items-center gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-slate-200 bg-[#0a1d36] hover:bg-[#0d2545] border border-blue-900/50 hover:border-blue-500/50 rounded-lg transition-all"
              >
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" strokeWidth="2" />
                </svg>
                <span>Login</span>
              </Link>

              <Link
                to="/register"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg shadow-lg shadow-blue-600/30 hover:shadow-blue-500/50 border border-blue-400/40 transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 8v6m3-3h-6" />
                </svg>
                <span>Open Account</span>
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 bg-[#0a1d36] border-b border-blue-900/50 space-y-2 animate-in slide-in-from-top-4 duration-200">
          <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-lg text-slate-200 hover:text-blue-400 hover:bg-[#071527] font-medium transition-colors">Home</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-lg text-slate-200 hover:text-blue-400 hover:bg-[#071527] font-medium transition-colors">About</a>
          <a href="#why-choose" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-lg text-slate-200 hover:text-blue-400 hover:bg-[#071527] font-medium transition-colors">Why Us</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-lg text-slate-200 hover:text-blue-400 hover:bg-[#071527] font-medium transition-colors">Services</a>
          <a href="#map" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-lg text-slate-200 hover:text-blue-400 hover:bg-[#071527] font-medium transition-colors">Locations & ATMs</a>
          <a href="#crs" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-lg text-slate-200 hover:text-blue-400 hover:bg-[#071527] font-medium transition-colors">CRS (Sustainability)</a>
          <a href="#customers" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-lg text-slate-200 hover:text-blue-400 hover:bg-[#071527] font-medium transition-colors">Customers</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-2.5 px-3 rounded-lg text-slate-200 hover:text-blue-400 hover:bg-[#071527] font-medium transition-colors">Contact</a>
          
          <div className="pt-3 border-t border-blue-900/40 flex flex-col gap-2">
            <Link to="/welcome" onClick={() => setMobileMenuOpen(false)} className="w-full py-2.5 text-center text-xs font-semibold bg-[#071527] border border-blue-900/60 rounded-lg text-blue-400 block">
              Mobile App Welcome Flow
            </Link>
            <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)} className="w-full py-2.5 text-center text-sm font-semibold bg-blue-600 rounded-lg text-white block">
              Customer Banking Portal
            </Link>
            <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="w-full py-2.5 text-center text-sm font-medium bg-[#071527] border border-blue-900/60 rounded-lg text-cyan-300 block">
              Central Admin Desk
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
