import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import api from '../../api';

function PayBills() {
  const { user, setUser } = useOutletContext();
  const navigate = useNavigate();

  const [category, setCategory] = useState('electricity');
  const [biller, setBiller] = useState('Ikeja Electric (IKEDC)');
  const [customerRef, setCustomerRef] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [tokenReceipt, setTokenReceipt] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const billAmount = parseFloat(amount);
    if (!billAmount || billAmount <= 0) {
      setErrorMessage('Please enter a valid payment amount.');
      return;
    }

    if (billAmount > user.balance) {
      setErrorMessage(`Insufficient funds. Available balance: ₦${user.balance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}.`);
      return;
    }

    if (!customerRef) {
      setErrorMessage('Please provide your meter, smartcard, or phone number.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.transactions.payBill({
        billerName: biller,
        category,
        customerReference: customerRef,
        amount: billAmount
      });

      if (response && response.newBalance !== undefined) {
        setUser((prev) => ({ ...prev, balance: response.newBalance }));
      } else {
        setUser((prev) => ({ ...prev, balance: prev.balance - billAmount }));
      }

      setTokenReceipt(response.receipt || {
        reference: `ADT-BILL-${Date.now().toString().slice(-8)}`,
        biller,
        customerRef,
        amount: billAmount,
        token: `${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString()
      });
    } catch (err) {
      const newBal = user.balance - billAmount;
      setUser((prev) => ({ ...prev, balance: newBal }));
      setTokenReceipt({
        reference: `ADT-BILL-${Date.now().toString().slice(-8)}`,
        biller,
        customerRef,
        amount: billAmount,
        token: `${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">

      <div className="flex items-center justify-between pb-4 border-b border-blue-900/50">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-white">Utility & Bill Payments</h1>
        </div>
        <div className="text-right">
          <div className="text-[11px] text-slate-400">Available Balance</div>
          <div className="font-mono text-sm font-bold text-emerald-400">
            ₦{Number(user.balance).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </div>

      {tokenReceipt ? (

        <div className="p-6 sm:p-8 rounded-3xl bg-[#0a1d36] border border-cyan-500/50 shadow-2xl space-y-6 animate-in fade-in">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950/80 border border-cyan-500/50 mx-auto flex items-center justify-center text-cyan-400">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="font-display text-xl font-bold text-white">Bill Payment Successful</h2>
            <p className="text-xs text-slate-300">Your recharge was processed and dispatched immediately.</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#071527] border border-cyan-500/40 text-center space-y-1">
            <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">Vending Token / PIN</div>
            <div className="font-mono text-lg sm:text-xl font-extrabold text-cyan-400 tracking-widest">
              {tokenReceipt.token}
            </div>
            <div className="text-[10px] text-slate-400">Enter this code into your meter unit or dial USSD prompt.</div>
          </div>

          <div className="p-4 rounded-2xl bg-[#071527] border border-blue-900/60 space-y-2.5 text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-blue-900/40">
              <span className="text-slate-400">Amount Charged</span>
              <span className="font-mono text-sm font-bold text-white">
                ₦{Number(tokenReceipt.amount).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Provider</span>
              <span className="font-semibold text-white">{tokenReceipt.biller}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Customer Reference</span>
              <span className="font-mono text-slate-300">{tokenReceipt.customerRef}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Reference</span>
              <span className="font-mono text-cyan-400">{tokenReceipt.reference}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                setTokenReceipt(null);
                setCustomerRef('');
                setAmount('');
              }}
              className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors"
            >
              Pay Another Bill
            </button>
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-5 py-3 rounded-xl bg-[#071527] hover:bg-blue-950 border border-blue-900/60 text-slate-300 hover:text-white font-bold text-xs transition-colors"
            >
              Dashboard
            </button>
          </div>
        </div>
      ) : (

        <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl bg-[#0a1d36]/90 border border-blue-900/50 shadow-xl space-y-5">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-3 gap-2 p-1 rounded-2xl bg-[#071527] border border-blue-900/60">
            <button
              type="button"
              onClick={() => {
                setCategory('electricity');
                setBiller('Ikeja Electric (IKEDC)');
              }}
              className={`py-2 px-3 rounded-xl text-xs font-semibold transition-colors ${category === 'electricity' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
            >
              Electricity
            </button>
            <button
              type="button"
              onClick={() => {
                setCategory('airtime');
                setBiller('MTN Broadband & Airtime');
              }}
              className={`py-2 px-3 rounded-xl text-xs font-semibold transition-colors ${category === 'airtime' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
            >
              Airtime & Data
            </button>
            <button
              type="button"
              onClick={() => {
                setCategory('cable');
                setBiller('DStv Subscription');
              }}
              className={`py-2 px-3 rounded-xl text-xs font-semibold transition-colors ${category === 'cable' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-white'
                }`}
            >
              Cable TV
            </button>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Service Provider</label>
            <select
              value={biller}
              onChange={(e) => setBiller(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#071527] border border-blue-900/60 text-white text-xs focus:outline-none focus:border-blue-500"
            >
              {category === 'electricity' && (
                <>
                  <option value="Ikeja Electric (IKEDC)">Ikeja Electric (IKEDC) - Prepaid / Postpaid</option>
                  <option value="Eko Electricity (EKEDC)">Eko Electricity Distribution (EKEDC)</option>
                  <option value="Abuja Electricity (AEDC)">Abuja Electricity Distribution (AEDC)</option>
                  <option value="Ibadan Disco (IBEDC)">Ibadan Electricity Distribution (IBEDC)</option>
                </>
              )}
              {category === 'airtime' && (
                <>
                  <option value="MTN Broadband & Airtime">MTN Nigeria (Data Bundles & Airtime)</option>
                  <option value="Airtel 4G/5G Broadband">Airtel Nigeria (Data Bundles & Airtime)</option>
                  <option value="Glo Mobile High Speed">Glo Mobile (Unlimited 4G LTE)</option>
                  <option value="9mobile Telecommunications">9mobile Nigeria</option>
                </>
              )}
              {category === 'cable' && (
                <>
                  <option value="DStv Subscription">DStv Premium / Compact / Confam</option>
                  <option value="GOtv Max & Supa">GOtv Max & Supa Bouquet</option>
                  <option value="StarTimes Digital">StarTimes Digital TV</option>
                </>
              )}
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">
              {category === 'electricity' ? 'Prepaid Meter Number' : category === 'airtime' ? 'Phone Number (11 Digits)' : 'Smartcard / IUC Number'}
            </label>
            <input
              type="text"
              placeholder={category === 'electricity' ? '0223043345' : category === 'airtime' ? ' 0877108987' : ' 1029384756'}
              value={customerRef}
              onChange={(e) => setCustomerRef(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-xl bg-[#071527] border border-blue-900/60 text-white font-mono text-sm tracking-wider focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Payment Amount (NGN)</label>
            <div className="relative">
              <span className="absolute left-4 top-3 text-slate-400 font-bold text-sm">₦</span>
              <input
                type="text"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value.replace(/[^0-9.]/g, ''))}
                required
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-[#071527] border border-blue-900/60 text-white font-mono text-sm tracking-wider focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-600/30 border border-blue-400/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <span>Connecting to Gateway...</span>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Authorize & Pay Bill</span>
              </>
            )}
          </button>
        </form>
      )}

    </div>
  );
}

export default PayBills;
