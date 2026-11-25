import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please verify and try again.');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
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
                  <linearGradient id="rpShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="60%" stopColor="#1d4ed8" />
                    <stop offset="100%" stopColor="#0a1d36" />
                  </linearGradient>
                  <linearGradient id="rpSilverAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#93c5fd" />
                  </linearGradient>
                </defs>
                <path
                  d="M24 4L7 11V22C7 33.2 14.3 43.1 24 46C33.7 43.1 41 33.2 41 22V11L24 4Z"
                  fill="url(#rpShieldGrad)"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                />
                <circle cx="24" cy="23" r="11" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
                <ellipse cx="24" cy="23" rx="5.5" ry="11" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6" fill="none" />
                <line x1="13" y1="23" x2="35" y2="23" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" />
                <path
                  d="M24 14L18 29H21.5L22.8 25.5H25.2L26.5 29H30L24 14ZM23.4 22.8L24 20L24.6 22.8H23.4Z"
                  fill="url(#rpSilverAccent)"
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
            Set New Password
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Choose a strong, unique password to secure your digital banking account.
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

          {success ? (
            <div className="text-center py-6 animate-in fade-in">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <h3 className="font-display font-bold text-xl text-white mb-2">Password Updated Successfully</h3>
              <p className="text-xs text-slate-300 mb-6">
                Your new security password is saved. Redirecting to login...
              </p>

              <Link
                to="/login"
                className="block w-full py-3 px-4 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 transition-all text-center"
              >
                Sign In Now &rarr;
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">

              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new strong password"
                    className="w-full px-4 py-3 bg-[#071527] border border-blue-900/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-white"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1.5">
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                  className="w-full px-4 py-3 bg-[#071527] border border-blue-900/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-[#071527] border border-blue-900/60 text-[11px] text-slate-300 space-y-1.5 mt-2">
                <div className="font-semibold text-slate-400 uppercase text-[10px] tracking-wider mb-1">
                  Password Requirements:
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${newPassword.length >= 8 ? 'bg-emerald-400' : 'bg-slate-600'}`}></span>
                  <span>Minimum 8 characters</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(newPassword) ? 'bg-emerald-400' : 'bg-slate-600'}`}></span>
                  <span>At least one uppercase letter</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(newPassword) ? 'bg-emerald-400' : 'bg-slate-600'}`}></span>
                  <span>At least one number</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 shadow-xl shadow-blue-600/30 border border-blue-400/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-5"
              >
                {loading ? (
                  <>
                    <svg className="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Updating Password...</span>
                  </>
                ) : (
                  <span>Update Password & Secure Account</span>
                )}
              </button>

            </form>
          )}

          <div className="mt-6 pt-5 border-t border-blue-900/50 text-center text-xs text-slate-400">
            Cancel and return to{' '}
            <Link to="/login" className="text-blue-400 hover:text-white font-bold transition-colors">
              Sign In
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ResetPassword;
