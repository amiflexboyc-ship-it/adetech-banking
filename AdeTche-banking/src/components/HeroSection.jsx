import React, { useState, useEffect } from 'react';

function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 3 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 3 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 3 : prev - 1));
  };

  return (
    <section id="home" className="relative flex-1 flex flex-col justify-center overflow-hidden min-h-[calc(100vh-5rem)] bg-[#071527]">

      {/* Slides Container */}
      <div className="relative w-full h-full flex-1 min-h-[560px] sm:min-h-[640px] lg:min-h-[720px] flex items-center">

        {/* ==================== SLIDE 1 ==================== */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === 0 ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Background: Modern Skyscraper with BANK Architecture */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: 'url(/images/bg-bank-1.jpg)',
              filter: 'brightness(1.06) contrast(1.08) saturate(1.12)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071527]/90 via-[#071527]/60 to-[#071527]/25" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#071527] to-transparent pointer-events-none" />

          {/* Slide 1 Content */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center py-10 lg:py-0">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

              {/* Left Column: Text & Buttons */}
              <div className="lg:col-span-7 py-6">
                <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-900/70 border border-blue-400/50 text-blue-300 text-xs font-bold uppercase tracking-wider mb-5 shadow-lg backdrop-blur-md">
                  COMMERCIAL & DIGITAL BANKING
                </div>

                <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                  AdeTech Banking: Empowering African Commerce and Global Finance
                </h1>

                <p className="text-base sm:text-lg text-slate-100 leading-relaxed mb-8 max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-medium">
                  Sovereign-grade digital banking infrastructure delivering seamless domestic and cross-border settlements with institutional reliability.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 shadow-xl shadow-blue-600/40 hover:shadow-blue-500/60 border border-blue-400/50 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Open Account</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base text-white bg-[#0a1d36]/90 hover:bg-[#0d2545] border border-blue-500/50 shadow-lg backdrop-blur-md transition-all"
                  >
                    <span>Explore Solutions</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Circular Side Image */}
              <div className="hidden md:flex lg:col-span-5 justify-center lg:justify-end">
                <div className="relative group">
                  {/* Glowing Circular Ring */}
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition duration-700" />

                  {/* Circular Image Container */}
                  <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-blue-400/50 shadow-2xl shadow-blue-600/40 bg-[#0a1d36]">
                    <img
                      src="/images/phone-app-1.jpg"
                      alt="Adetech Bank Mobile App"
                      className="w-full h-full object-cover object-center block transform transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Circular Bottom Floating Badge */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-[#071527]/95 backdrop-blur-md border border-blue-400/50 text-xs text-white shadow-xl flex items-center whitespace-nowrap">
                    <span className="font-semibold text-slate-100">Adetech Mobile Banking | ₦150k</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ==================== SLIDE 2 ==================== */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === 1 ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Background: Central Bank with Multi-Currency Signs */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: 'url(/images/bg-bank-2.jpg)',
              filter: 'brightness(1.06) contrast(1.08) saturate(1.12)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071527]/90 via-[#071527]/60 to-[#071527]/25" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#071527] to-transparent pointer-events-none" />

          {/* Slide 2 Content */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center py-10 lg:py-0">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

              {/* Left Column: Text & Buttons */}
              <div className="lg:col-span-7 py-6">
                <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-900/70 border border-blue-400/50 text-blue-300 text-xs font-bold uppercase tracking-wider mb-5 shadow-lg backdrop-blur-md">
                  GLOBAL TREASURY & MULTI-CURRENCY
                </div>

                <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                  AdeTech Banking: Institutional Treasury and Multi-Currency Accounts
                </h1>

                <p className="text-base sm:text-lg text-slate-100 leading-relaxed mb-8 max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-medium">
                  Hold, convert, and transact seamlessly across 45+ currencies including USD, GBP, EUR, and NGN at true real-market exchange rates.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 shadow-xl shadow-blue-600/40 hover:shadow-blue-500/60 border border-blue-400/50 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Open Account</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base text-white bg-[#0a1d36]/90 hover:bg-[#0d2545] border border-blue-500/50 shadow-lg backdrop-blur-md transition-all"
                  >
                    <span>Explore Solutions</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Circular Side Image */}
              <div className="hidden md:flex lg:col-span-5 justify-center lg:justify-end">
                <div className="relative group">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition duration-700" />

                  <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-blue-400/50 shadow-2xl shadow-blue-600/40 bg-[#0a1d36]">
                    <img
                      src="/images/phone-app-2.jpg"
                      alt="Adetech Banking Customer in Cafe"
                      className="w-full h-full object-cover object-center block transform transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-[#071527]/95 backdrop-blur-md border border-blue-400/50 text-xs text-white shadow-xl flex items-center whitespace-nowrap">
                    <span className="font-semibold text-slate-100">Everyday Digital Banking</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ==================== SLIDE 3 ==================== */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === 2 ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Background: Modern Skyline with Growth Arrow */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: 'url(/images/bg-bank-3.jpg)',
              filter: 'brightness(1.06) contrast(1.08) saturate(1.12)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071527]/90 via-[#071527]/60 to-[#071527]/25" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#071527] to-transparent pointer-events-none" />

          {/* Slide 3 Content */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center py-10 lg:py-0">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

              {/* Left Column: Text & Buttons */}
              <div className="lg:col-span-7 py-6">
                <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-900/70 border border-blue-400/50 text-blue-300 text-xs font-bold uppercase tracking-wider mb-5 shadow-lg backdrop-blur-md">
                  SMART DIGITAL CARDS & PAYMENTS
                </div>

                <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                  AdeTech Banking: Seamless Internet Banking and Virtual Cards
                </h1>

                <p className="text-base sm:text-lg text-slate-100 leading-relaxed mb-8 max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-medium">
                  Experience total control with real-time fund transfers, instant virtual dollar cards, physical metal debit cards, and automated billing.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 shadow-xl shadow-blue-600/40 hover:shadow-blue-500/60 border border-blue-400/50 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Open Account</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base text-white bg-[#0a1d36]/90 hover:bg-[#0d2545] border border-blue-500/50 shadow-lg backdrop-blur-md transition-all"
                  >
                    <span>Explore Solutions</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Circular Side Image */}
              <div className="hidden md:flex lg:col-span-5 justify-center lg:justify-end">
                <div className="relative group">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 via-teal-400 to-blue-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition duration-700" />

                  <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-blue-400/50 shadow-2xl shadow-blue-600/40 bg-[#0a1d36]">
                    <img
                      src="/images/phone-app-3.jpg"
                      alt="Adetech Mobile Banking Customer on transit"
                      className="w-full h-full object-cover object-center block transform transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-[#071527]/95 backdrop-blur-md border border-blue-400/50 text-xs text-white shadow-xl flex items-center whitespace-nowrap">
                    <span className="font-semibold text-slate-100">Instant Online Access</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ==================== SLIDE 4 ==================== */}
        <div
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === 3 ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          {/* Background: Modern Corporate Blue Glass Skyscraper */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-all duration-700"
            style={{
              backgroundImage: 'url(/images/bg-bank-4.jpg)',
              filter: 'brightness(1.06) contrast(1.08) saturate(1.12)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071527]/90 via-[#071527]/60 to-[#071527]/25" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#071527] to-transparent pointer-events-none" />

          {/* Slide 4 Content */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center py-10 lg:py-0">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

              {/* Left Column: Text & Buttons */}
              <div className="lg:col-span-7 py-6">
                <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-900/70 border border-blue-400/50 text-blue-300 text-xs font-bold uppercase tracking-wider mb-5 shadow-lg backdrop-blur-md">
                  WEALTH ACCUMULATION & ASSET SECURITY
                </div>

                <h1 className="font-display text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                  AdeTech Banking: Modern Wealth Vaults and Capital Growth
                </h1>

                <p className="text-base sm:text-lg text-slate-100 leading-relaxed mb-8 max-w-xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-medium">
                  Instant account activation, high-yield wealth accumulation vaults, and institutional security protecting your generational prosperity.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 shadow-xl shadow-blue-600/40 hover:shadow-blue-500/60 border border-blue-400/50 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Open Account</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base text-white bg-[#0a1d36]/90 hover:bg-[#0d2545] border border-blue-500/50 shadow-lg backdrop-blur-md transition-all"
                  >
                    <span>Explore Solutions</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Circular Side Image */}
              <div className="hidden md:flex lg:col-span-5 justify-center lg:justify-end">
                <div className="relative group">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition duration-700" />

                  <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-blue-400/50 shadow-2xl shadow-blue-600/40 bg-[#0a1d36]">
                    <img
                      src="/images/phone-app-1.jpg"
                      alt="Adetech Bank Mobile App"
                      className="w-full h-full object-cover object-center block transform transition duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-[#071527]/95 backdrop-blur-md border border-blue-400/50 text-xs text-white shadow-xl flex items-center whitespace-nowrap">
                    <span className="font-semibold text-slate-100">Adetech Mobile Banking | Secure</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Slide Controls Bar (Prev, Direct Indicator Buttons, Next, Pause/Play) */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 rounded-2xl bg-[#071527]/85 border border-blue-900/60 backdrop-blur-md shadow-2xl">

          {/* Direct Slide Indicator Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCurrentSlide(0)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentSlide === 0
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40'
                  : 'bg-[#0a1d36] text-slate-300 hover:text-white hover:bg-[#0d2545]'
              }`}
            >
              <span>01</span>
              {currentSlide === 0 && <span className="hidden sm:inline-block w-8 h-1 bg-white/80 rounded-full" />}
            </button>

            <button
              type="button"
              onClick={() => setCurrentSlide(1)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentSlide === 1
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40'
                  : 'bg-[#0a1d36] text-slate-300 hover:text-white hover:bg-[#0d2545]'
              }`}
            >
              <span>02</span>
              {currentSlide === 1 && <span className="hidden sm:inline-block w-8 h-1 bg-white/80 rounded-full" />}
            </button>

            <button
              type="button"
              onClick={() => setCurrentSlide(2)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentSlide === 2
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40'
                  : 'bg-[#0a1d36] text-slate-300 hover:text-white hover:bg-[#0d2545]'
              }`}
            >
              <span>03</span>
              {currentSlide === 2 && <span className="hidden sm:inline-block w-8 h-1 bg-white/80 rounded-full" />}
            </button>

            <button
              type="button"
              onClick={() => setCurrentSlide(3)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                currentSlide === 3
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40'
                  : 'bg-[#0a1d36] text-slate-300 hover:text-white hover:bg-[#0d2545]'
              }`}
            >
              <span>04</span>
              {currentSlide === 3 && <span className="hidden sm:inline-block w-8 h-1 bg-white/80 rounded-full" />}
            </button>
          </div>

          {/* Prev, Next, Play/Pause Controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={prevSlide}
              className="w-10 h-10 rounded-xl bg-[#0a1d36] hover:bg-[#0d2545] border border-blue-900/50 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              aria-label="Previous Slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={nextSlide}
              className="w-10 h-10 rounded-xl bg-[#0a1d36] hover:bg-[#0d2545] border border-blue-900/50 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              aria-label="Next Slide"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-xl bg-[#0a1d36] hover:bg-[#0d2545] border border-blue-900/50 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
              aria-label={isPlaying ? "Pause Slides" : "Play Slides"}
            >
              {isPlaying ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              )}
            </button>
          </div>

        </div>
      </div>

    </section>
  );
}

export default HeroSection;
