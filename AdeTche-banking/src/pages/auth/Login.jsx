import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../../api';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [formData, setFormData] = useState({
    email: 'amiflexboyc@gmail.com',
    password: 'AdeTech@2026',
    rememberMe: true
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      await api.auth.login(formData.email, formData.password);
      setSuccessMessage('Authentication verified. Welcome to AdeTech Banking.');
      setTimeout(() => {
        const destination = from === '/' ? '/dashboard' : from;
        navigate(destination, { replace: true });
      }, 1000);
    } catch (err) {
      setErrorMessage(err.message || 'Authentication failed. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#071527] text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">

      {/* Background Subtle Gradient Lighting */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Main Container */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">

        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 select-none mb-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              <svg viewBox="0 0 48 48" fill="none" className="w-full h-full drop-shadow-[0_4px_12px_rgba(37,99,235,0.45)]">
                <defs>
                  <linearGradient id="loginShieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="60%" stopColor="#1d4ed8" />
                    <stop offset="100%" stopColor="#0a1d36" />
                  </linearGradient>
                  <linearGradient id="loginSilverAccent" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#93c5fd" />
                  </linearGradient>
                </defs>
                <path
                  d="M24 4L7 11V22C7 33.2 14.3 43.1 24 46C33.7 43.1 41 33.2 41 22V11L24 4Z"
                  fill="url(#loginShieldGrad)"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                />
                <circle cx="24" cy="23" r="11" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
                <ellipse cx="24" cy="23" rx="5.5" ry="11" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6" fill="none" />
                <line x1="13" y1="23" x2="35" y2="23" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" />
                <path
                  d="M24 14L18 29H21.5L22.8 25.5H25.2L26.5 29H30L24 14ZM23.4 22.8L24 20L24.6 22.8H23.4Z"
                  fill="url(#loginSilverAccent)"
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
            Sign In to Bank Account
          </h2>

        </div>

        {/* Card Form */}
        <div className="rounded-3xl bg-[#0a1d36]/95 border border-blue-800/60 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">

          {/* Status Messages */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/80 border border-red-500/40 text-red-300 text-xs font-medium flex items-start gap-2.5">
              <svg className="w-4 h-4 flex-shrink-0 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-start gap-2.5">
              <svg className="w-4 h-4 flex-shrink-0 text-emerald-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">

            {/* Email Address */}
            <div>
              <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1.5">
                Email Address or Account ID
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="amiflexboyc@gmail.com"
                className="w-full px-4 py-3 bg-[#071527] border border-blue-900/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-slate-300 font-bold uppercase tracking-wider">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-blue-400 hover:text-white font-semibold transition-colors"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter security password"
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

            {/* Remember Device */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-blue-800 bg-[#071527] text-blue-600 focus:ring-blue-500"
                />
                <span className="text-[11px] text-slate-300">Remember this trusted device</span>
              </label>


            </div>

            {/* Submit Button */}
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
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Sign In to Account</span>
              )}
            </button>

          </form>


          {/* Register Link */}
          <div className="mt-6 pt-6 border-t border-blue-900/50 text-center text-xs text-slate-400">
            Don't have an AdeTech account?{' '}
            <Link to="/register" className="text-blue-400 hover:text-white font-bold transition-colors">
              Open Free Account
            </Link>
          </div>

        </div>



      </div>
    </div>
  );
}

export default Login;
