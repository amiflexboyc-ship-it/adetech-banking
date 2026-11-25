import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || 'your registered email';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOtpChange = (index, value) => {
    if (value.length > 1) {
      value = value.slice(-1);
    }
    const updated = [...otp];
    updated[index] = value;
    setOtp(updated);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const fullCode = otp.join('');
    if (fullCode.length < 6) {
      setErrorMessage('Please enter the full 6-digit verification code.');
      return;
    }

    setErrorMessage('');
    setIsVerifying(true);

    setTimeout(() => {
      setIsVerifying(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }, 1200);
  };

  const handleResend = () => {
    if (!canResend) return;
    setTimer(60);
    setCanResend(false);
    setErrorMessage('');
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
                  <linearGradient id="vEmailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="60%" stopColor="#1d4ed8" />
                    <stop offset="100%" stopColor="#0a1d36" />
                  </linearGradient>
                  <linearGradient id="vEmailSilver" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#93c5fd" />
                  </linearGradient>
                </defs>
                <path
                  d="M24 4L7 11V22C7 33.2 14.3 43.1 24 46C33.7 43.1 41 33.2 41 22V11L24 4Z"
                  fill="url(#vEmailGrad)"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                />
                <circle cx="24" cy="23" r="11" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.4" fill="none" />
                <ellipse cx="24" cy="23" rx="5.5" ry="11" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6" fill="none" />
                <line x1="13" y1="23" x2="35" y2="23" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" />
                <path
                  d="M24 14L18 29H21.5L22.8 25.5H25.2L26.5 29H30L24 14ZM23.4 22.8L24 20L24.6 22.8H23.4Z"
                  fill="url(#vEmailSilver)"
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
            Verify Your Email
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            We have sent a 6-digit security code to <strong className="text-cyan-400 font-mono">{email}</strong>
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
              <h3 className="font-display font-bold text-xl text-white mb-2">Email Verified Successfully</h3>
              <p className="text-xs text-slate-300 mb-4">
                Your AdeTech digital banking account is active. Redirecting to login...
              </p>
            </div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-6">

              <div>
                <label className="block text-slate-300 font-bold uppercase tracking-wider text-xs mb-3 text-center">
                  Enter 6-Digit Passcode
                </label>
                <div className="flex items-center justify-center gap-2 sm:gap-3">
                  <input
                    id="otp-input-0"
                    type="text"
                    maxLength={1}
                    value={otp[0]}
                    onChange={(e) => handleOtpChange(0, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(0, e)}
                    className="w-11 h-12 text-center text-lg font-mono font-bold bg-[#071527] border border-blue-900/60 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    id="otp-input-1"
                    type="text"
                    maxLength={1}
                    value={otp[1]}
                    onChange={(e) => handleOtpChange(1, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(1, e)}
                    className="w-11 h-12 text-center text-lg font-mono font-bold bg-[#071527] border border-blue-900/60 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    id="otp-input-2"
                    type="text"
                    maxLength={1}
                    value={otp[2]}
                    onChange={(e) => handleOtpChange(2, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(2, e)}
                    className="w-11 h-12 text-center text-lg font-mono font-bold bg-[#071527] border border-blue-900/60 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    id="otp-input-3"
                    type="text"
                    maxLength={1}
                    value={otp[3]}
                    onChange={(e) => handleOtpChange(3, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(3, e)}
                    className="w-11 h-12 text-center text-lg font-mono font-bold bg-[#071527] border border-blue-900/60 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    id="otp-input-4"
                    type="text"
                    maxLength={1}
                    value={otp[4]}
                    onChange={(e) => handleOtpChange(4, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(4, e)}
                    className="w-11 h-12 text-center text-lg font-mono font-bold bg-[#071527] border border-blue-900/60 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <input
                    id="otp-input-5"
                    type="text"
                    maxLength={1}
                    value={otp[5]}
                    onChange={(e) => handleOtpChange(5, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(5, e)}
                    className="w-11 h-12 text-center text-lg font-mono font-bold bg-[#071527] border border-blue-900/60 rounded-xl text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 shadow-xl shadow-blue-600/30 border border-blue-400/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isVerifying ? (
                  <>
                    <svg className="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>Verifying Code...</span>
                  </>
                ) : (
                  <span>Verify & Activate Account</span>
                )}
              </button>

              <div className="text-center text-xs text-slate-400 pt-2">
                {canResend ? (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="font-bold text-blue-400 hover:text-white transition-colors"
                  >
                    Resend Code Now
                  </button>
                ) : (
                  <span>
                    Resend code available in{' '}
                    <strong className="text-white font-mono">{timer}s</strong>
                  </span>
                )}
              </div>

            </form>
          )}

        </div>

        <div className="mt-6 text-center text-xs text-slate-400">
          Need assistance? Reach customer desk via{' '}
          <a href="https://wa.me/2349077108987" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 font-semibold">
            WhatsApp 09077108987
          </a>
        </div>

      </div>
    </div>
  );
}

export default VerifyEmail;
