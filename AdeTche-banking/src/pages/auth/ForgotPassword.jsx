import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Please provide your registered account email.');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#071527] text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">

      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">

        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 select-none mb-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              <svg viewBox="0 0 48 48" fill="none" className="w-full h-full drop-shadow-[0_4px_12px_rgba(37,99,235,0.45)]">
                <defs>
                  <linearGradient id="fpShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="60%" stopColor="#1d4ed8" />
                    <stop offset="100%" stopColor="#0a1d36" />
                  </linearGradient>
                  <linearGradient id="fpSilverAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#93c5fd" />
                  </linearGradient>
                </defs>
                <path
                  d="M24 4L7 11V22C7 33.2 14.3 43.1 24 46C33.7 43.1 41 33.2 41 22V11L24 4Z"
                  fill="url(#fpShieldGrad)"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                />
                <circle cx="24" cy="23" r="11" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
                <ellipse cx="24" cy="23" rx="5.5" ry="11" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6" fill="none" />
                <line x1="13" y1="23" x2="35" y2="23" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" />
                <path
                  d="M24 14L18 29H21.5L22.8 25.5H25.2L26.5 29H30L24 14ZM23.4 22.8L24 20L24.6 22.8H23.4Z"
                  fill="url(#fpSilverAccent)"
                />
                <circle cx="24" cy="10" r="2.2" fill="#60a5fa" />
              </svg>
            </div>
            <div className="flex items-center tracking-tight leading-none">
              <span className="font-display font-bold text-2xl text-white">Ade</span>
              <span className="font-display font-bold text-2xl text-blue-500">Tech</span>
              <span className="font-display font-semibold text-2xl text-slate-200 ml-1.5">Banking</span>
            </div>
          </Link>

          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Reset Bank Password
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Enter your registered email address to receive password recovery instructions.
          </p>
        </div>

        <div className="rounded-3xl bg-[#0a1d36]/95 border border-blue-800/60 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">

          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-medium flex items-start gap-2.5">
              <svg className="w-4 h-4 flex-shrink-0 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {submitted ? (
            <div className="text-center py-4 animate-in fade-in">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <h3 className="font-display font-bold text-xl text-white mb-2">Recovery Email Sent</h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-6">
                If an account exists for <strong className="text-cyan-400 font-mono">{email}</strong>, you will receive an encrypted reset link valid for 15 minutes.
              </p>

              <Link
                to="/reset-password"
                className="block w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 transition-all text-center mb-3"
              >
                Proceed to Enter New Password &rarr;
              </Link>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs text-slate-400 hover:text-white transition-colors"
              >
                Didn't receive email? Try again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 text-xs">

              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider mb-2">
                  Registered Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="amiflexboyc@gmail.com"
                  className="w-full px-4 py-3 bg-[#071527] border border-blue-900/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 shadow-xl shadow-blue-600/30 border border-blue-400/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Dispatching Recovery Instructions...</span>
                  </>
                ) : (
                  <span>Send Recovery Email</span>
                )}
              </button>

            </form>
          )}

          {/* Security Advisory Pill */}
          <div className="mt-6 pt-5 border-t border-blue-900/50 text-[11px] text-slate-400 flex items-start gap-2.5">
            <svg className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>
              AdeTech Bank staff will never ask for your password, PIN, or SMS OTP over phone, email, or WhatsApp.
            </span>
          </div>

          {/* Back to Login Link */}
          <div className="mt-4 text-center text-xs text-slate-400">
            Remember your credentials?{' '}
            <Link to="/login" className="text-blue-400 hover:text-white font-bold transition-colors">
              Return to Sign In
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ForgotPassword;
