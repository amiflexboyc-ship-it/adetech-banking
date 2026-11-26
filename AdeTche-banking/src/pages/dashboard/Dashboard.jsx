import React, { useState, useEffect } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import api from '../../api';

function Dashboard() {
  const context = useOutletContext();
  const user = context?.user || {
    name: 'Adekunle Olawale',
    email: 'amiflexboyc@gmail.com',
    tier: 'Tier 3 (Unrestricted)',
    accountNumber: '0907710898',
    balance: 1450000.00
  };

  const [copied, setCopied] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    let isMounted = true;

    api.transactions.getAll()
      .then((res) => {
        if (isMounted && res && res.transactions) {
          setTransactions(res.transactions);
        }
      })
      .catch(() => { });

    api.account.getCards()
      .then((res) => {
        if (isMounted && res && res.cards) {
          setCards(res.cards);
        }
      })
      .catch(() => { });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleCopyAccount = () => {
    const acc = user?.accountNumber || '0907710898';
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(acc);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const cardHolderName = user?.name ? user.name.toUpperCase() : 'ADEKUNLE OLAWALE';
  const displayBalance = Number(user?.balance ?? 1450000);

  return (
    <div className="space-y-6">

      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0a1d36] via-[#0d2545] to-[#071527] border border-blue-800/60 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-500/40 text-blue-300 text-xs font-bold uppercase tracking-wider">
              <span className="w-2 h-2 bg-blue-400 rounded-sm"></span>
              <span>AdeTech High-Yield Account</span>
            </div>

            <div className="space-y-1">
              <div className="text-xs text-slate-300 uppercase tracking-wider font-semibold">Total Net Liquidity</div>
              <div className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                ₦{displayBalance.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#071527] border border-blue-900/70">
                <span className="text-slate-400">Account:</span>
                <span className="font-mono font-bold text-cyan-400">{user?.accountNumber || '0907710898'}</span>
                <button
                  type="button"
                  onClick={handleCopyAccount}
                  className="ml-1 text-slate-400 hover:text-white"
                  aria-label="Copy Account Number"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                {copied && <span className="text-[10px] text-emerald-400 font-bold">Copied</span>}
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#071527] border border-blue-900/70">
                <span className="text-slate-400">Tier:</span>
                <span className="font-semibold text-emerald-400">{user?.tier || 'Tier 3 (Unrestricted)'}</span>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#071527] border border-blue-900/70">
                <span className="text-slate-400">Status:</span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>Active</span>
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
            <Link
              to="/dashboard/transfer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 border border-blue-400/40 transition-all text-center"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
              <span>Send Money</span>
            </Link>

            <Link
              to="/dashboard/bills"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#0a1d36] hover:bg-[#0d2545] text-slate-200 hover:text-white font-bold text-xs border border-blue-900/60 hover:border-blue-500/40 transition-all text-center"
            >
              <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>Pay Utilities</span>
            </Link>

            <Link
              to="/dashboard/cards"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#0a1d36] hover:bg-[#0d2545] text-slate-200 hover:text-white font-bold text-xs border border-blue-900/60 hover:border-blue-500/40 transition-all text-center"
            >
              <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2" />
              </svg>
              <span>Cards Hub</span>
            </Link>

            <Link
              to="/dashboard/transactions"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-[#0a1d36] hover:bg-[#0d2545] text-slate-200 hover:text-white font-bold text-xs border border-blue-900/60 hover:border-blue-500/40 transition-all text-center"
            >
              <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Statement</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0a1d36]/90 border border-blue-900/50 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-white">Active Payment Cards</h3>
            <Link to="/dashboard/cards" className="text-xs font-semibold text-blue-400 hover:text-white">
              Manage &rarr;
            </Link>
          </div>

          <div className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-tr from-blue-900 via-blue-800 to-indigo-950 border border-blue-500/40 shadow-xl text-white">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[11px] font-bold tracking-wider uppercase text-blue-200">AdeTech Virtual USD</span>
              <span className="text-xs font-bold text-cyan-300">VISA</span>
            </div>
            <div className="font-mono text-base sm:text-lg tracking-widest text-slate-100 mb-4">
              {cards[0]?.cardNumber || '4532 •••• •••• 8821'}
            </div>
            <div className="flex items-center justify-between text-xs text-blue-200">
              <div>
                <span className="text-[10px] text-blue-300 uppercase block">Card Holder</span>
                <span className="font-bold">{cardHolderName}</span>
              </div>
              <div>
                <span className="text-[10px] text-blue-300 uppercase block">Expires</span>
                <span className="font-mono font-bold">{cards[0]?.expiry || '08/29'}</span>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden p-5 rounded-2xl bg-gradient-to-tr from-slate-900 via-[#0d2545] to-slate-800 border border-slate-700/60 shadow-xl text-white">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[11px] font-bold tracking-wider uppercase text-slate-300">AdeTech Metal NGN</span>
              <span className="text-xs font-bold text-orange-400">Mastercard</span>
            </div>
            <div className="font-mono text-base sm:text-lg tracking-widest text-slate-100 mb-4">
              {cards[1]?.cardNumber || '5399 •••• •••• 1042'}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-300">
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Card Holder</span>
                <span className="font-bold">{cardHolderName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Expires</span>
                <span className="font-mono font-bold">{cards[1]?.expiry || '11/30'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0a1d36]/90 border border-blue-900/50 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-bold text-base text-white">Recent Account Activity</h3>
              <Link to="/dashboard/transactions" className="text-xs font-semibold text-blue-400 hover:text-white">
                View All Ledger &rarr;
              </Link>
            </div>

            <div className="space-y-3">
              {transactions && transactions.length > 0 ? (
                transactions.slice(0, 3).map((tx) => {
                  const isCredit = tx.type === 'credit';
                  return (
                    <div
                      key={tx.id || tx.reference}
                      className="p-3.5 rounded-2xl bg-[#071527] border border-blue-900/60 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            isCredit
                              ? 'bg-emerald-950/80 border border-emerald-500/40 text-emerald-400'
                              : 'bg-rose-950/80 border border-rose-500/40 text-rose-400'
                          }`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isCredit ? (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            ) : (
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            )}
                          </svg>
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white truncate max-w-[170px] sm:max-w-xs">
                            {isCredit ? tx.senderName || 'Inward Wire Transfer' : tx.recipientName || 'Outward Settlement'}
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {tx.description || tx.category || (isCredit ? 'Credit Settlement' : 'Transfer Payment')}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-xs font-bold font-mono ${
                            isCredit ? 'text-emerald-400' : 'text-slate-200'
                          }`}
                        >
                          {isCredit ? '+' : '-'}₦{Number(tx.amount || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-[10px] text-slate-400 capitalize">
                          {tx.status || 'Completed'}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-6 rounded-2xl bg-[#071527] border border-blue-900/60 text-center text-xs text-slate-400">
                  No recent activity yet. Transfers and bill payments will appear here with downloadable receipts.
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
