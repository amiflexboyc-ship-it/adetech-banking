import React, { useState, useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import api from '../../api';
import {
  downloadReceiptFile,
  printReceipt,
  downloadStatementCsv,
  partyName
} from '../../utils/receipt';

function Transactions() {
  const outletContext = useOutletContext() || {};
  const { user } = outletContext;

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statementMessage, setStatementMessage] = useState('');
  const [selectedTx, setSelectedTx] = useState(null);

  const fetchTransactions = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await api.transactions.getAll();
      const list = Array.isArray(response?.transactions) ? response.transactions : [];
      const sorted = [...list].sort((a, b) => new Date(b.date) - new Date(a.date));
      setTransactions(sorted);
    } catch (err) {
      setError(err.message || 'Unable to load transaction history right now.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return transactions.filter((tx) => {
      if (filterType !== 'all' && tx.type !== filterType) {
        return false;
      }
      if (!query) return true;
      const party = partyName(tx).toLowerCase();
      const reference = String(tx.reference || '').toLowerCase();
      const description = String(tx.description || '').toLowerCase();
      const category = String(tx.category || '').toLowerCase();
      const channel = String(tx.channel || '').toLowerCase();
      const accountNo = String(tx.recipientAccountNumber || tx.senderAccountNumber || '').toLowerCase();
      return (
        party.includes(query) ||
        reference.includes(query) ||
        description.includes(query) ||
        category.includes(query) ||
        channel.includes(query) ||
        accountNo.includes(query)
      );
    });
  }, [transactions, filterType, searchQuery]);

  const handleDownloadStatement = () => {
    if (filteredTransactions.length === 0) {
      setStatementMessage('No transactions available to export.');
      setTimeout(() => setStatementMessage(''), 3000);
      return;
    }
    downloadStatementCsv(filteredTransactions);
    setStatementMessage('Official AdeTech CSV statement downloaded.');
    setTimeout(() => setStatementMessage(''), 3500);
  };

  const formatAmount = (tx) => {
    const amount = Number(tx.amount || 0).toLocaleString('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return tx.type === 'credit' ? `+₦${amount}` : `-₦${amount}`;
  };

  const formatDate = (dateValue) => {
    if (!dateValue) return 'N/A';
    const d = new Date(dateValue);
    if (Number.isNaN(d.getTime())) return String(dateValue);
    return d.toLocaleString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusBadge = (status) => {
    const normalized = String(status || 'completed').toLowerCase();
    if (normalized === 'pending') {
      return {
        label: 'Pending',
        className: 'bg-amber-950/80 border-amber-500/40 text-amber-400'
      };
    }
    if (normalized === 'failed' || normalized === 'reversed') {
      return {
        label: normalized === 'reversed' ? 'Reversed' : 'Failed',
        className: 'bg-rose-950/80 border-rose-500/40 text-rose-400'
      };
    }
    return {
      label: 'Settled',
      className: 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400'
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-blue-900/50">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-white">Account Statement & History</h1>
          <p className="text-xs text-slate-300 mt-0.5">Comprehensive audit trail of all inflows, wires, and electronic settlements.</p>
        </div>

        <button
          type="button"
          onClick={handleDownloadStatement}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#0a1d36] hover:bg-[#0d2545] text-white border border-blue-800/60 transition-all disabled:opacity-50"
        >
          <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download CSV Statement</span>
        </button>
      </div>

      {statementMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
          {statementMessage}
        </div>
      )}

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

      {error && (
        <div className="p-4 rounded-2xl bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs flex items-center justify-between gap-4">
          <span>{error}</span>
          <button
            type="button"
            onClick={fetchTransactions}
            className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shrink-0"
          >
            Retry
          </button>
        </div>
      )}

      <div className="p-6 rounded-3xl bg-[#0a1d36]/90 border border-blue-900/50 shadow-xl overflow-hidden">
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-400 text-xs">
            <svg className="w-6 h-6 animate-spin text-cyan-400" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span>Loading account ledger...</span>
          </div>
        ) : filteredTransactions.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <p className="text-sm font-bold text-white">No transactions found</p>
            <p className="text-xs text-slate-400">
              {transactions.length === 0
                ? 'Your ledger has no recorded transactions yet.'
                : 'No transactions match your current search or filter.'}
            </p>
          </div>
        ) : (
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
                  <th className="py-3 px-3 text-right">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-blue-900/30 font-medium">
                {filteredTransactions.map((tx) => {
                  const statusInfo = getStatusBadge(tx.status);
                  const isCredit = tx.type === 'credit';
                  return (
                    <tr
                      key={tx.id || tx.reference}
                      onClick={() => setSelectedTx(tx)}
                      className="hover:bg-blue-950/40 transition-colors cursor-pointer"
                    >
                      <td className="py-3.5 px-3 font-mono text-cyan-400 whitespace-nowrap">
                        {tx.reference || tx.id}
                      </td>
                      <td className="py-3.5 px-3">
                        <div className="font-bold text-white">{partyName(tx)}</div>
                        <div className="text-[10px] text-slate-400">
                          {tx.description || tx.category || 'Electronic Funds Transfer'}
                        </div>
                      </td>
                      <td className="py-3.5 px-3 text-slate-300 whitespace-nowrap">
                        {tx.channel || tx.recipientBank || (isCredit ? 'AdeTech Core Ledger' : 'Electronic Transfer')}
                      </td>
                      <td className="py-3.5 px-3 text-slate-400 whitespace-nowrap">
                        {formatDate(tx.date)}
                      </td>
                      <td
                        className={`py-3.5 px-3 font-bold font-mono whitespace-nowrap ${
                          isCredit ? 'text-emerald-400' : 'text-slate-200'
                        }`}
                      >
                        {formatAmount(tx)}
                      </td>
                      <td className="py-3.5 px-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${statusInfo.className}`}>
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTx(tx);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-[#071527] hover:bg-blue-900/60 border border-blue-800/60 text-cyan-400 text-[11px] font-semibold transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {selectedTx && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelectedTx(null)}
        >
          <div
            className="w-full max-w-lg p-6 rounded-3xl bg-[#0a1d36] border border-blue-800/70 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-blue-900/60 pb-4">
              <div>
                <h2 className="font-display text-lg font-extrabold text-white">Transaction Receipt</h2>
                <p className="text-xs text-slate-400 mt-0.5 font-mono">{selectedTx.reference || selectedTx.id}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTx(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-blue-950/60 transition-colors"
                aria-label="Close receipt"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="text-center py-4 rounded-2xl bg-[#071527] border border-blue-900/60">
              <div className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                {selectedTx.type === 'credit' ? 'Amount Credited' : 'Amount Debited'}
              </div>
              <div
                className={`font-mono text-2xl font-extrabold mt-1 ${
                  selectedTx.type === 'credit' ? 'text-emerald-400' : 'text-white'
                }`}
              >
                {formatAmount(selectedTx)}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#071527] border border-blue-900/60 space-y-2.5 text-xs">
              <div className="flex items-center justify-between gap-4 pb-2 border-b border-blue-900/40">
                <span className="text-slate-400">{selectedTx.type === 'credit' ? 'Sender' : 'Beneficiary'}</span>
                <span className="font-bold text-white text-right">{partyName(selectedTx)}</span>
              </div>
              {(selectedTx.recipientBank || selectedTx.senderBank) && (
                <div className="flex items-center justify-between gap-4 pb-2 border-b border-blue-900/40">
                  <span className="text-slate-400">Bank</span>
                  <span className="text-slate-200 text-right">{selectedTx.recipientBank || selectedTx.senderBank}</span>
                </div>
              )}
              {(selectedTx.recipientAccountNumber || selectedTx.senderAccountNumber) && (
                <div className="flex items-center justify-between gap-4 pb-2 border-b border-blue-900/40">
                  <span className="text-slate-400">Account Number</span>
                  <span className="font-mono text-cyan-400">
                    {selectedTx.recipientAccountNumber || selectedTx.senderAccountNumber}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between gap-4 pb-2 border-b border-blue-900/40">
                <span className="text-slate-400">Category</span>
                <span className="text-slate-200 text-right">{selectedTx.category || 'Electronic Funds Transfer'}</span>
              </div>
              <div className="flex items-center justify-between gap-4 pb-2 border-b border-blue-900/40">
                <span className="text-slate-400">Channel</span>
                <span className="text-slate-200 text-right">{selectedTx.channel || 'AdeTech Core Ledger'}</span>
              </div>
              <div className="flex items-center justify-between gap-4 pb-2 border-b border-blue-900/40">
                <span className="text-slate-400">Date & Time</span>
                <span className="text-slate-200 text-right">{formatDate(selectedTx.date)}</span>
              </div>
              <div className="flex items-center justify-between gap-4 pb-2 border-b border-blue-900/40">
                <span className="text-slate-400">Transaction Fee</span>
                <span className="font-mono text-slate-200">
                  ₦{Number(selectedTx.fee || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-400">Narration</span>
                <span className="text-slate-200 text-right">{selectedTx.description || 'N/A'}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => downloadReceiptFile(selectedTx, user)}
                className="py-3 rounded-xl bg-[#071527] hover:bg-blue-950 border border-blue-800/80 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Download Receipt</span>
              </button>
              <button
                type="button"
                onClick={() => printReceipt(selectedTx, user)}
                className="py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transactions;
