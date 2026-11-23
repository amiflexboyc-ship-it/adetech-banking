import React, { useState, useEffect } from 'react';
import api from '../../api';

function Transactions() {
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statementSuccess, setStatementSuccess] = useState(false);

  const handleDownload = () => {
    setStatementSuccess(true);
    setTimeout(() => setStatementSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-blue-900/50">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-white">Account Statement & History</h1>
          <p className="text-xs text-slate-300 mt-0.5">Comprehensive audit trail of all inflows, wires, and POS transactions.</p>
        </div>

        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#0a1d36] hover:bg-[#0d2545] text-white border border-blue-800/60 transition-all"
        >
          <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download PDF Statement</span>
        </button>
      </div>

      {statementSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold animate-in fade-in">
          Official AdeTech e-Statement generated successfully. Check your email or downloads folder.
        </div>
      )}

      {/* Filter and Search Controls */}
      <div className="p-4 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <svg className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by reference, recipient..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#071527] border border-blue-900/60 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#071527] border border-blue-900/60 text-xs w-full md:w-auto">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`flex-1 md:flex-none px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              filterType === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            All Ledger
          </button>
          <button
            type="button"
            onClick={() => setFilterType('credit')}
            className={`flex-1 md:flex-none px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              filterType === 'credit' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Credits Only
          </button>
          <button
            type="button"
            onClick={() => setFilterType('debit')}
            className={`flex-1 md:flex-none px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              filterType === 'debit' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Debits Only
          </button>
        </div>
      </div>

      {/* Direct React JSX Statement Table */}
      <div className="p-6 rounded-3xl bg-[#0a1d36]/90 border border-blue-900/50 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-blue-900/60 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-3">Reference</th>
                <th className="py-3 px-3">Description / Party</th>
                <th className="py-3 px-3">Channel</th>
                <th className="py-3 px-3">Date</th>
                <th className="py-3 px-3">Amount</th>
                <th className="py-3 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-blue-900/30 font-medium">
              
              {/* Row 1 */}
              {(filterType === 'all' || filterType === 'credit') && (
                <tr className="hover:bg-blue-950/40 transition-colors">
                  <td className="py-3.5 px-3 font-mono text-cyan-400">ADT-TX-9928172</td>
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-white">Chevron Nigeria Treasury</div>
                    <div className="text-[10px] text-slate-400">Consulting Contract Settlement</div>
                  </td>
                  <td className="py-3.5 px-3 text-slate-300">NIP Direct Wire</td>
                  <td className="py-3.5 px-3 text-slate-400">Today, 11:42 AM</td>
                  <td className="py-3.5 px-3 font-bold text-emerald-400 font-mono">+₦250,000.00</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
                      Settled
                    </span>
                  </td>
                </tr>
              )}

              {/* Row 2 */}
              {(filterType === 'all' || filterType === 'debit') && (
                <tr className="hover:bg-blue-950/40 transition-colors">
                  <td className="py-3.5 px-3 font-mono text-cyan-400">ADT-TX-8831920</td>
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-white">Ikeja Electric (IKEDC)</div>
                    <div className="text-[10px] text-slate-400">Prepaid Utility Token Purchase</div>
                  </td>
                  <td className="py-3.5 px-3 text-slate-300">Utility Gateway</td>
                  <td className="py-3.5 px-3 text-slate-400">Yesterday, 04:15 PM</td>
                  <td className="py-3.5 px-3 font-bold text-slate-200 font-mono">-₦45,000.00</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
                      Settled
                    </span>
                  </td>
                </tr>
              )}

              {/* Row 3 */}
              {(filterType === 'all' || filterType === 'debit') && (
                <tr className="hover:bg-blue-950/40 transition-colors">
                  <td className="py-3.5 px-3 font-mono text-cyan-400">ADT-TX-7719284</td>
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-white">MTN Broadband Top-Up</div>
                    <div className="text-[10px] text-slate-400">High-Speed Data Bundle</div>
                  </td>
                  <td className="py-3.5 px-3 text-slate-300">Telecom Switch</td>
                  <td className="py-3.5 px-3 text-slate-400">Nov 13, 2026</td>
                  <td className="py-3.5 px-3 font-bold text-slate-200 font-mono">-₦12,500.00</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
                      Settled
                    </span>
                  </td>
                </tr>
              )}

              {/* Row 4 */}
              {(filterType === 'all' || filterType === 'credit') && (
                <tr className="hover:bg-blue-950/40 transition-colors">
                  <td className="py-3.5 px-3 font-mono text-cyan-400">ADT-TX-6610291</td>
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-white">Ibrahim Danladi & Co</div>
                    <div className="text-[10px] text-slate-400">Retainer Fee Wire Transfer</div>
                  </td>
                  <td className="py-3.5 px-3 text-slate-300">Interbank Instant</td>
                  <td className="py-3.5 px-3 text-slate-400">Nov 11, 2026</td>
                  <td className="py-3.5 px-3 font-bold text-emerald-400 font-mono">+₦500,000.00</td>
                  <td className="py-3.5 px-3">
                    <span className="px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-[10px] font-bold">
                      Settled
                    </span>
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default Transactions;
