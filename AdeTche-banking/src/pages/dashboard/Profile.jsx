import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import api from '../../api';

function Profile() {
  const { user, setUser } = useOutletContext();
  const navigate = useNavigate();
  const [successNotice, setSuccessNotice] = useState('');

  const handleLogout = async () => {
    await api.auth.logout();
    navigate('/login');
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setSuccessNotice('Account preferences saved successfully.');
    setTimeout(() => setSuccessNotice(''), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">

      <div className="pb-4 border-b border-blue-900/50">
        <h1 className="font-display text-2xl font-extrabold text-white">Profile & KYC Verification</h1>
        <p className="text-xs text-slate-300 mt-0.5">Biometric identity verification and regulatory classification.</p>
      </div>

      {successNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold animate-in fade-in">
          {successNotice}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 shadow-md">
          <div className="text-[11px] text-slate-400 mb-1">BVN Status</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-sm"></span>
            <span className="font-bold text-white text-sm">Verified (NIBSS)</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 shadow-md">
          <div className="text-[11px] text-slate-400 mb-1">NIN Biometric</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-400 rounded-sm"></span>
            <span className="font-bold text-white text-sm">Verified (NIMC)</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 shadow-md">
          <div className="text-[11px] text-slate-400 mb-1">Account Tier</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-cyan-400 rounded-sm"></span>
            <span className="font-bold text-cyan-300 text-sm">Tier 3 (Unrestricted)</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleUpdate} className="p-6 sm:p-8 rounded-3xl bg-[#0a1d36]/90 border border-blue-900/50 shadow-xl space-y-5 text-xs">
        <h3 className="font-display font-bold text-base text-white">Registered Account Information</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold">Full Legal Name</label>
            <input
              type="text"
              value={user.name}
              disabled
              className="w-full px-4 py-2.5 rounded-xl bg-[#071527] border border-blue-900/60 text-slate-300 font-semibold cursor-not-allowed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold">NUBAN Account Number</label>
            <input
              type="text"
              value={user.accountNumber}
              disabled
              className="w-full px-4 py-2.5 rounded-xl bg-[#071527] border border-blue-900/60 text-cyan-400 font-mono font-bold cursor-not-allowed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold">Registered Email</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-4 py-2.5 rounded-xl bg-[#071527] border border-blue-900/60 text-slate-300 cursor-not-allowed"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold">Mobile Phone Number</label>
            <input
              type="text"
              defaultValue="09077108987"
              className="w-full px-4 py-2.5 rounded-xl bg-[#071527] border border-blue-900/60 text-white font-mono focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-blue-900/40 space-y-3">
          <h4 className="font-display font-bold text-sm text-white">Regulatory Transfer Thresholds</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
            <div className="p-3 rounded-xl bg-[#071527] border border-blue-900/60 flex items-center justify-between">
              <span className="text-slate-400">Single NIP Transaction Limit</span>
              <span className="font-mono font-bold text-white">₦5,000,000.00</span>
            </div>
            <div className="p-3 rounded-xl bg-[#071527] border border-blue-900/60 flex items-center justify-between">
              <span className="text-slate-400">Daily Cumulative Limit</span>
              <span className="font-mono font-bold text-white">₦10,000,000.00</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-blue-900/40">
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
          >
            Save Account Preferences
          </button>

          <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/40 border border-rose-900/60 text-rose-300 font-bold text-xs transition-colors"
          >
            Sign Out of Banking Portal
          </button>
        </div>
      </form>

    </div>
  );
}

export default Profile;
