import React, { useState, useEffect } from 'react';
import { Navigate, useLocation, Outlet } from 'react-router-dom';

export function ProtectedRoute({
  isAuthenticated,
  children,
  redirectPath = '/login'
}) {
  const location = useLocation();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {

    if (typeof isAuthenticated === 'boolean') {
      setIsAuth(isAuthenticated);
      setCheckingAuth(false);
      return;
    }

    try {
      const token = localStorage.getItem('adetech_token') || localStorage.getItem('adetech_auth_token');
      const sessionAuth = localStorage.getItem('adetech_is_authenticated');

      if (token || sessionAuth === 'true') {
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }
    } catch {
      setIsAuth(false);
    } finally {
      setCheckingAuth(false);
    }
  }, [isAuthenticated]);

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#071527] flex flex-col items-center justify-center p-4 text-white">
        <div className="relative w-12 h-12 mb-4">
          <svg className="w-full h-full animate-spin text-blue-500" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path
              className="opacity-90"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
        <div className="font-display font-bold text-sm sm:text-base text-white tracking-wide">
          Verifying Security Credentials...
        </div>
        <div className="text-xs text-slate-400 mt-1">
          AdeTech 256-Bit Encrypted Session Check
        </div>
      </div>
    );
  }

  if (!isAuth) {
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
