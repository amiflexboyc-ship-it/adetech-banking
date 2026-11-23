import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function WelcomeDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  // If rendered under /dashboard, user is already authenticated — CTA goes to the banking overview
  const isAuthenticatedContext = location.pathname === '/dashboard';

  const [currentStep, setCurrentStep] = useState(1);
  const [themeMode, setThemeMode] = useState('navy'); // 'light' or 'navy' (brand dark)
  const [vaultDeposit, setVaultDeposit] = useState(100000);
  const [activeCardBrand, setActiveCardBrand] = useState('visa');
  const [receiptEjected, setReceiptEjected] = useState(false);

  // Keyboard navigation (Left / Right Arrow Keys)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' && currentStep < 5) {
        setCurrentStep((prev) => prev + 1);
      } else if (e.key === 'ArrowLeft' && currentStep > 1) {
        setCurrentStep((prev) => prev - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStep]);

  const handleOpenAccount = () => {
    // Authenticated users go to their banking dashboard overview; public visitors go to register
    navigate(isAuthenticatedContext ? '/dashboard/overview' : '/register');
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      handleOpenAccount();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    // Authenticated users skip straight to the banking overview; others go to login
    navigate(isAuthenticatedContext ? '/dashboard/overview' : '/login');
  };

  const calculatedYield = Math.round(vaultDeposit * 0.155);

  return (
    <div className="min-h-screen bg-[#071527] text-white flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* =========================================================================
          TOP COMMAND BAR & VIEW TOGGLES
         ========================================================================= */}
      <header className="border-b border-blue-900/50 bg-[#0a1d36]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div>
              <span className="font-display font-bold text-base text-white">AdeTech</span>
              <span className="text-xs text-blue-400 font-semibold ml-1.5 px-2 py-0.5 rounded bg-blue-950 border border-blue-800">
                Mobile Onboarding Experience
              </span>
            </div>
          </Link>
        </div>

        {/* Theme Toggle & Exit */}
        <div className="flex items-center gap-2.5 text-xs">

          <button
            type="button"
            onClick={() => setThemeMode(themeMode === 'light' ? 'navy' : 'light')}
            className="px-3 py-1.5 rounded-xl bg-[#071527] hover:bg-blue-950 border border-blue-900/60 text-slate-300 hover:text-white font-medium transition-colors"
          >
            {themeMode === 'light' ? 'Navy Theme' : 'Light Theme'}
          </button>

          <Link
            to="/"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-300 hover:text-white bg-[#071527] border border-blue-900/70 hover:border-blue-600 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Exit to Website</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 lg:p-12 relative overflow-hidden bg-gradient-to-b from-[#071527] via-[#091e38] to-[#071527]">
        
        {/* Soft Ambient Lighting Glows */}
        <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-10 right-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none" />

        {/* =========================================================================
            STRUCTURE: SINGLE MOBILE DEVICE PHONE SIMULATOR
           ========================================================================= */}
        <div className="w-full max-w-sm mx-auto flex flex-col items-center justify-center">
          
          {/* =====================================================================
              DEVICE: INTERACTIVE ONBOARDING DASHBOARD FLOW
             ===================================================================== */}
          <div className="w-[320px] sm:w-[350px] h-[670px] rounded-[44px] p-3.5 bg-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1)] border-4 border-slate-700/80 flex flex-col relative flex-shrink-0">
            
            {/* Inner Screen Bezel */}
            <div className={`w-full h-full rounded-[34px] overflow-hidden flex flex-col justify-between p-5 sm:p-6 relative transition-colors ${
              themeMode === 'light' ? 'bg-white text-slate-900' : 'bg-[#0a1d36] text-white border border-blue-900/60'
            }`}>
              
              {/* Top Section: Status Bar, Segmented Progress, Mini Logo & Skip */}
              <div>
                {/* iOS Status Bar */}
                <div className="flex items-center justify-between text-xs font-semibold px-1 pt-1 mb-3 select-none">
                  <span>9:41</span>
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <rect x="2" y="16" width="3" height="6" rx="1" />
                      <rect x="7.5" y="12" width="3" height="10" rx="1" />
                      <rect x="13" y="7" width="3" height="15" rx="1" />
                      <rect x="18.5" y="2" width="3" height="20" rx="1" />
                    </svg>
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4ZM12 8C14.76 8 17.26 9.12 19.12 10.98L12 18.1 4.88 10.98C6.74 9.12 9.24 8 12 8Z" />
                    </svg>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] font-bold">32</span>
                      <div className="w-5 h-2.5 rounded-sm border border-current p-0.5 flex items-center">
                        <div className="w-1.5 h-full bg-current rounded-2xs" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Indicators & Header Row (Matches Uploaded Screenshot) */}
                <div className="flex items-center justify-between pt-1 pb-2">
                  
                  {/* Segmented Progress Bars (Direct React JSX - Clickable to Jump) */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      title="Step 1: Welcome & POS"
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentStep === 1
                          ? themeMode === 'light' ? 'w-8 bg-slate-900' : 'w-8 bg-blue-500'
                          : themeMode === 'light' ? 'w-3 bg-slate-200 hover:bg-slate-300' : 'w-3 bg-blue-900/60 hover:bg-blue-800'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      title="Step 2: Instant Transfers"
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentStep === 2
                          ? themeMode === 'light' ? 'w-8 bg-slate-900' : 'w-8 bg-blue-500'
                          : themeMode === 'light' ? 'w-3 bg-slate-200 hover:bg-slate-300' : 'w-3 bg-blue-900/60 hover:bg-blue-800'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      title="Step 3: Virtual Cards"
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentStep === 3
                          ? themeMode === 'light' ? 'w-8 bg-slate-900' : 'w-8 bg-blue-500'
                          : themeMode === 'light' ? 'w-3 bg-slate-200 hover:bg-slate-300' : 'w-3 bg-blue-900/60 hover:bg-blue-800'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      title="Step 4: Wealth Vaults"
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentStep === 4
                          ? themeMode === 'light' ? 'w-8 bg-slate-900' : 'w-8 bg-blue-500'
                          : themeMode === 'light' ? 'w-3 bg-slate-200 hover:bg-slate-300' : 'w-3 bg-blue-900/60 hover:bg-blue-800'
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setCurrentStep(5)}
                      title="Step 5: Account Selection"
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        currentStep === 5
                          ? themeMode === 'light' ? 'w-8 bg-slate-900' : 'w-8 bg-blue-500'
                          : themeMode === 'light' ? 'w-3 bg-slate-200 hover:bg-slate-300' : 'w-3 bg-blue-900/60 hover:bg-blue-800'
                      }`}
                    />
                  </div>

                  {/* Centered Small Logo Monogram */}
                  <div className="w-7 h-7 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                      <path d="M22 68L22 46L36 34L36 68H22Z" fill="#3b82f6" />
                      <path d="M42 68L42 32L56 20L56 68H42Z" fill="#2563eb" />
                      <path d="M62 68L62 18L76 6L76 68H62Z" fill="#1d4ed8" />
                      <path d="M16 75L84 52L86 58L16 81Z" fill="#2563eb" />
                    </svg>
                  </div>

                  {/* Navigation Actions: Back (if step > 1) & Skip */}
                  <div className="flex items-center gap-2">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={handlePrev}
                        className={`text-xs font-semibold hover:underline transition-colors ${
                          themeMode === 'light' ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Back
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleSkip}
                      className={`text-xs font-semibold hover:underline transition-colors ${
                        themeMode === 'light' ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Skip
                    </button>
                  </div>
                </div>
              </div>

              {/* Middle Section: Dynamic Slide Headlines & 3D Vector Graphics */}
              <div className="flex-1 flex flex-col items-center justify-center text-center px-1 py-3">
                
                {/* ---------------------------------------------------------------
                    SLIDE 1: WELCOME & SMART POS / CARD TERMINAL (EXACT STRUCTURE)
                   --------------------------------------------------------------- */}
                {currentStep === 1 && (
                  <div className="flex-1 flex flex-col items-center justify-between w-full animate-in fade-in duration-300">
                    <div className="space-y-1.5 mt-1">
                      <h2 className={`font-display text-2xl font-bold tracking-tight ${
                        themeMode === 'light' ? 'text-slate-900' : 'text-white'
                      }`}>
                        Welcome to AdeTech Banking
                      </h2>
                      <p className={`text-xs max-w-[240px] mx-auto leading-relaxed ${
                        themeMode === 'light' ? 'text-slate-500' : 'text-slate-300'
                      }`}>
                        Your money, your rules. Smart digital banking for everyone.
                      </p>
                    </div>

                    {/* Exact 3D Isometric Blue POS Terminal with Dispensing Yellow Receipt Slip */}
                    <div
                      onClick={() => setReceiptEjected(!receiptEjected)}
                      className="my-auto relative w-48 h-48 flex items-center justify-center cursor-pointer group"
                      title="Click POS to test paper receipt print"
                    >
                      <svg viewBox="0 0 240 240" fill="none" className="w-full h-full drop-shadow-xl transition-transform group-hover:scale-105 duration-300">
                        <defs>
                          <linearGradient id="posBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#1d4ed8" />
                          </linearGradient>
                          <linearGradient id="posSideGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#1e40af" />
                            <stop offset="100%" stopColor="#172554" />
                          </linearGradient>
                          <linearGradient id="receiptGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#fef08a" />
                            <stop offset="100%" stopColor="#fde047" />
                          </linearGradient>
                        </defs>

                        {/* Dispensing Yellow Paper Receipt Tape */}
                        <path
                          d={receiptEjected 
                            ? "M100 32C100 32 115 15 145 15C175 15 178 32 178 32L170 105L108 105L100 32Z"
                            : "M100 48C100 48 115 32 145 32C175 32 178 48 178 48L170 105L108 105L100 48Z"
                          }
                          fill="url(#receiptGrad)"
                          className="transition-all duration-300"
                        />
                        {/* Receipt Subtle Print Lines */}
                        <line x1="120" y1="48" x2="158" y2="48" stroke="#ca8a04" strokeWidth="2" strokeDasharray="3 3" />
                        <line x1="116" y1="58" x2="162" y2="58" stroke="#ca8a04" strokeWidth="2" strokeDasharray="4 2" />
                        <line x1="114" y1="68" x2="150" y2="68" stroke="#ca8a04" strokeWidth="2" strokeDasharray="3 3" />
                        <line x1="112" y1="78" x2="156" y2="78" stroke="#ca8a04" strokeWidth="2" strokeDasharray="4 2" />

                        {/* POS Main Top Face (Isometric Tilt) */}
                        <path
                          d="M72 102L168 76L202 142L106 172L72 102Z"
                          fill="url(#posBodyGrad)"
                          stroke="#60a5fa"
                          strokeWidth="1.5"
                        />

                        {/* POS Left Thickness Face */}
                        <path
                          d="M72 102L106 172L106 195L72 125Z"
                          fill="url(#posSideGrad)"
                        />

                        {/* POS Bottom Face */}
                        <path
                          d="M106 172L202 142L202 165L106 195Z"
                          fill="#1e3a8a"
                        />

                        {/* Digital Screen on POS */}
                        <path
                          d="M96 104L156 88L172 120L112 136Z"
                          fill="#0f172a"
                        />
                        {/* Status Light on Screen */}
                        <circle cx="112" cy="112" r="3" fill="#22c55e" />
                        <rect x="122" y="108" width="32" height="4" rx="1.5" fill="#38bdf8" />
                        <rect x="120" y="118" width="24" height="4" rx="1.5" fill="#94a3b8" />

                        {/* Keypad Buttons (Row 1) */}
                        <rect x="108" y="142" width="10" height="6" rx="2" fill="#93c5fd" />
                        <rect x="122" y="139" width="10" height="6" rx="2" fill="#93c5fd" />
                        <rect x="136" y="136" width="10" height="6" rx="2" fill="#93c5fd" />

                        {/* Keypad Buttons (Row 2) */}
                        <rect x="112" y="152" width="10" height="6" rx="2" fill="#93c5fd" />
                        <rect x="126" y="149" width="10" height="6" rx="2" fill="#93c5fd" />
                        <rect x="140" y="146" width="10" height="6" rx="2" fill="#93c5fd" />

                        {/* Keypad Buttons (Row 3) */}
                        <rect x="116" y="162" width="10" height="6" rx="2" fill="#ef4444" />
                        <rect x="130" y="159" width="10" height="6" rx="2" fill="#eab308" />
                        <rect x="144" y="156" width="10" height="6" rx="2" fill="#22c55e" />

                        {/* Card Slot with Inserted Gold Card */}
                        <rect x="92" y="176" width="38" height="6" rx="2" fill="#0f172a" />
                        <path d="M78 184L122 173L125 180L81 191Z" fill="#f59e0b" />
                        <rect x="86" y="181" width="8" height="5" rx="1" fill="#fde047" />
                      </svg>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[11px] font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-300 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                        CBN & NDIC Regulated Bank
                      </div>
                      <div className="text-[10px] text-slate-400">Tap POS terminal to print receipt</div>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------------------
                    SLIDE 2: INSTANT ZERO-FEE WIRES & TRANSFERS
                   --------------------------------------------------------------- */}
                {currentStep === 2 && (
                  <div className="flex-1 flex flex-col items-center justify-between w-full animate-in fade-in duration-300">
                    <div className="space-y-1.5 mt-1">
                      <h2 className={`font-display text-2xl font-bold tracking-tight ${
                        themeMode === 'light' ? 'text-slate-900' : 'text-white'
                      }`}>
                        Instant Zero-Fee Rails
                      </h2>
                      <p className={`text-xs max-w-[240px] mx-auto leading-relaxed ${
                        themeMode === 'light' ? 'text-slate-500' : 'text-slate-300'
                      }`}>
                        Send money to any commercial bank or fintech account in Nigeria in seconds.
                      </p>
                    </div>

                    {/* 3D Wire Transfer Vector Illustration */}
                    <div className="my-auto relative w-48 h-48 flex items-center justify-center">
                      <svg viewBox="0 0 240 240" fill="none" className="w-full h-full drop-shadow-xl">
                        {/* Smartphone Body */}
                        <rect x="65" y="45" width="110" height="155" rx="20" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
                        <rect x="73" y="55" width="94" height="135" rx="14" fill="#0f172a" />
                        {/* Transaction Card Popout */}
                        <rect x="83" y="85" width="74" height="60" rx="10" fill="#2563eb" />
                        <circle cx="120" cy="110" r="14" fill="#ffffff" />
                        <path d="M115 110L125 110M120 105L125 110L120 115" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="94" y="132" width="52" height="6" rx="2" fill="#93c5fd" />
                        {/* Outgoing Velocity Rings */}
                        <circle cx="180" cy="80" r="22" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="2" />
                        <text x="180" y="85" textAnchor="middle" fill="#10b981" fontSize="12" fontWeight="bold" fontFamily="monospace">NIP</text>
                        {/* Real-time Latency Tag */}
                        <rect x="85" y="165" width="70" height="14" rx="4" fill="#1e3a8a" />
                        <text x="120" y="175" textAnchor="middle" fill="#93c5fd" fontSize="8" fontWeight="bold">32ms SPEED</text>
                      </svg>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                        NIBSS Direct Instant Clearance
                      </div>
                      <div className="text-[10px] text-slate-400">Zero transfer charges across all tiers</div>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------------------
                    SLIDE 3: VIRTUAL DOLLAR & NAIRA CARDS
                   --------------------------------------------------------------- */}
                {currentStep === 3 && (
                  <div className="flex-1 flex flex-col items-center justify-between w-full animate-in fade-in duration-300">
                    <div className="space-y-1.5 mt-1">
                      <h2 className={`font-display text-2xl font-bold tracking-tight ${
                        themeMode === 'light' ? 'text-slate-900' : 'text-white'
                      }`}>
                        Global Virtual Cards
                      </h2>
                      <p className={`text-xs max-w-[240px] mx-auto leading-relaxed ${
                        themeMode === 'light' ? 'text-slate-500' : 'text-slate-300'
                      }`}>
                        Issue instant USD Visa & Naira cards for international subscriptions and travel.
                      </p>
                    </div>

                    {/* 3D Floating Debit Cards Illustration with Toggle */}
                    <div
                      onClick={() => setActiveCardBrand(activeCardBrand === 'visa' ? 'mastercard' : 'visa')}
                      className="my-auto relative w-48 h-48 flex items-center justify-center cursor-pointer group"
                      title="Click card to switch between Visa and Mastercard"
                    >
                      <svg viewBox="0 0 240 240" fill="none" className="w-full h-full drop-shadow-xl transition-transform group-hover:scale-105 duration-300">
                        {/* Background Metal Card */}
                        <rect x="35" y="85" width="130" height="80" rx="12" fill="#0f172a" stroke="#475569" strokeWidth="1.5" transform="rotate(-10 35 85)" />
                        {/* Foreground Active Card */}
                        <rect
                          x="65"
                          y="65"
                          width="135"
                          height="85"
                          rx="12"
                          fill={activeCardBrand === 'visa' ? 'url(#splashBarGrad)' : 'linear-gradient(135deg, #1e293b, #0f172a)'}
                          stroke={activeCardBrand === 'visa' ? '#60a5fa' : '#f59e0b'}
                          strokeWidth="1.5"
                        />
                        {/* Gold Chip */}
                        <rect x="80" y="80" width="16" height="12" rx="2" fill="#fde047" />
                        <circle cx="175" cy="85" r="8" fill={activeCardBrand === 'visa' ? '#38bdf8' : '#ea580c'} />
                        {activeCardBrand === 'mastercard' && (
                          <circle cx="165" cy="85" r="8" fill="#eab308" fillOpacity="0.8" />
                        )}
                        <rect x="80" y="115" width="65" height="6" rx="2" fill="#ffffff" fillOpacity="0.8" />
                        <rect x="80" y="126" width="35" height="5" rx="2" fill="#93c5fd" />
                        <text x="175" y="132" textAnchor="end" fill="#ffffff" fontSize="11" fontWeight="bold">
                          {activeCardBrand === 'visa' ? 'VISA' : 'MC'}
                        </text>
                      </svg>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[11px] font-semibold text-cyan-600 bg-cyan-50 dark:bg-cyan-950/60 dark:text-cyan-300 px-3 py-1 rounded-full border border-cyan-200 dark:border-cyan-800">
                        3D Secure 2.0 Global Access
                      </div>
                      <div className="text-[10px] text-slate-400">Tap card to switch Visa / Mastercard</div>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------------------
                    SLIDE 4: HIGH-YIELD VAULTS & WEALTH
                   --------------------------------------------------------------- */}
                {currentStep === 4 && (
                  <div className="flex-1 flex flex-col items-center justify-between w-full animate-in fade-in duration-300">
                    <div className="space-y-1.5 mt-1">
                      <h2 className={`font-display text-2xl font-bold tracking-tight ${
                        themeMode === 'light' ? 'text-slate-900' : 'text-white'
                      }`}>
                        Grow & Secure Wealth
                      </h2>
                      <p className={`text-xs max-w-[240px] mx-auto leading-relaxed ${
                        themeMode === 'light' ? 'text-slate-500' : 'text-slate-300'
                      }`}>
                        Earn up to 15.5% annual interest on locked wealth vaults with full insurance.
                      </p>
                    </div>

                    {/* Interactive Vault Calculator */}
                    <div className="my-auto w-full max-w-[250px] p-4 rounded-2xl bg-slate-50 dark:bg-[#071527] border border-blue-900/40 shadow-inner space-y-3">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-semibold">Deposit:</span>
                        <span className="font-mono font-bold text-blue-600 dark:text-cyan-400">
                          ₦{vaultDeposit.toLocaleString()}
                        </span>
                      </div>
                      
                      <input
                        type="range"
                        min="20000"
                        max="1000000"
                        step="10000"
                        value={vaultDeposit}
                        onChange={(e) => setVaultDeposit(Number(e.target.value))}
                        className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 dark:bg-blue-950 rounded-lg"
                      />

                      <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between text-[11px]">
                        <span className="text-emerald-700 dark:text-emerald-300 font-medium">1-Year Return:</span>
                        <span className="font-mono font-extrabold text-emerald-600 dark:text-emerald-400">
                          +₦{calculatedYield.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[11px] font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950/60 dark:text-blue-300 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800">
                        100% Insured by NDIC
                      </div>
                      <div className="text-[10px] text-slate-400">Slide range bar to compute daily gains</div>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------------------
                    SLIDE 5: ACCOUNT ACTIVATION & ONBOARDING SELECTION
                   --------------------------------------------------------------- */}
                {currentStep === 5 && (
                  <div className="flex-1 flex flex-col items-center justify-between w-full animate-in fade-in duration-300">
                    <div className="space-y-1.5 mt-1">
                      <h2 className={`font-display text-2xl font-bold tracking-tight ${
                        themeMode === 'light' ? 'text-slate-900' : 'text-white'
                      }`}>
                        Ready to Get Started?
                      </h2>
                      <p className={`text-xs max-w-[240px] mx-auto leading-relaxed ${
                        themeMode === 'light' ? 'text-slate-500' : 'text-slate-300'
                      }`}>
                        Open your digital bank account in under 2 minutes with BVN or phone number.
                      </p>
                    </div>

                    {/* Account Type Options (Direct React JSX) */}
                    <div className="my-auto w-full space-y-2 text-left">
                      <div className="p-3 rounded-2xl bg-blue-50 dark:bg-[#071527] border-2 border-blue-600 flex items-center justify-between">
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">Personal Checking</div>
                          <div className="text-[10px] text-slate-500">Tier 3 daily limits, virtual card included</div>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>

                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#071527] border border-slate-200 dark:border-blue-900/60 flex items-center justify-between opacity-80">
                        <div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white">High-Yield Wealth Vault</div>
                          <div className="text-[10px] text-slate-500">Up to 15.5% annual automated compounding</div>
                        </div>
                        <span className="text-[10px] font-bold text-blue-600 bg-blue-100 dark:bg-blue-950 px-2 py-0.5 rounded">
                          Optional
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-300 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                        Zero Paperwork / Instant Verification
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Section: Primary Action Button (Matches Reference Blue Button) */}
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={currentStep === 1 ? handleOpenAccount : handleNext}
                  className="w-full py-3.5 rounded-full bg-[#4f6bf7] hover:bg-blue-600 active:scale-98 text-white font-bold text-sm shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>{currentStep === 1 || currentStep === 5 ? 'Open Your Account' : 'Next'}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {currentStep === 1 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className={`w-full text-center text-xs font-semibold py-1 transition-colors ${
                      themeMode === 'light' ? 'text-blue-600 hover:text-blue-700' : 'text-blue-400 hover:text-blue-300'
                    }`}
                  >
                    Explore Feature Tour (1/5) &rarr;
                  </button>
                )}

                {/* Quick Switch Link */}
                <div className="text-center pt-0.5">
                  {isAuthenticatedContext ? (
                    <button
                      type="button"
                      onClick={() => navigate('/dashboard/overview')}
                      className={`text-xs font-semibold hover:underline ${
                        themeMode === 'light' ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Enter Banking Overview &rarr;
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className={`text-xs font-semibold hover:underline ${
                        themeMode === 'light' ? 'text-slate-500 hover:text-slate-900' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Already have an account? Sign In
                    </Link>
                  )}
                </div>

                {/* iOS Home Indicator Bar */}
                <div className={`w-32 h-1 rounded-full mx-auto mt-1 ${
                  themeMode === 'light' ? 'bg-slate-900' : 'bg-slate-400'
                }`} />
              </div>

            </div>
          </div>

        </div>

      </main>

    </div>
  );
}

export default WelcomeDashboard;
