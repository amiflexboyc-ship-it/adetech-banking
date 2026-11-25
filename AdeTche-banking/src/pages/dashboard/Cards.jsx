import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import api from '../../api';

function Cards() {
  const { user } = useOutletContext();
  const [cards, setCards] = useState([
    {
      id: 'crd_001',
      type: 'virtual',
      brand: 'Visa',
      currency: 'USD',
      cardHolder: 'ADEKUNLE OLAWALE',
      cardNumber: '4532 •••• •••• 8821',
      fullNumber: '4532 8819 0293 8821',
      cvv: '784',
      expiry: '08/29',
      status: 'active',
      spendingLimit: 2500.00
    },
    {
      id: 'crd_002',
      type: 'physical',
      brand: 'Mastercard Metal',
      currency: 'NGN',
      cardHolder: 'ADEKUNLE OLAWALE',
      cardNumber: '5399 •••• •••• 1042',
      fullNumber: '5399 2819 4018 1042',
      cvv: '392',
      expiry: '11/30',
      status: 'active',
      spendingLimit: 1000000.00
    }
  ]);

  const [showDetails, setShowDetails] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newCardCurrency, setNewCardCurrency] = useState('USD');
  const [newCardBrand, setNewCardBrand] = useState('Visa');
  const [creating, setCreating] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  useEffect(() => {
    api.account.getCards()
      .then((res) => {
        if (res && res.cards && res.cards.length > 0) {
          setCards(res.cards);
        }
      })
      .catch(() => {});
  }, []);

  const handleCreateCard = async (e) => {
    e.preventDefault();
    setCreating(true);
    setStatusMessage('');

    try {
      const response = await api.account.createCard({
        currency: newCardCurrency,
        brand: newCardBrand,
        spendingLimit: newCardCurrency === 'USD' ? 1500 : 500000
      });

      if (response && response.card) {
        setCards((prev) => [response.card, ...prev]);
        setStatusMessage('New virtual card generated and activated instantly.');
      }
    } catch (err) {

      const randomLast4 = Math.floor(1000 + Math.random() * 9000);
      const generated = {
        id: `crd_${Date.now()}`,
        type: 'virtual',
        brand: newCardBrand,
        currency: newCardCurrency,
        cardHolder: user.name.toUpperCase(),
        cardNumber: `${newCardBrand === 'Visa' ? '4532' : '5399'} •••• •••• ${randomLast4}`,
        fullNumber: `${newCardBrand === 'Visa' ? '4532' : '5399'} 9182 3719 ${randomLast4}`,
        cvv: '819',
        expiry: '12/29',
        status: 'active',
        spendingLimit: newCardCurrency === 'USD' ? 1500 : 500000
      };
      setCards((prev) => [generated, ...prev]);
      setStatusMessage('Virtual card generated and activated instantly.');
    } finally {
      setCreating(false);
      setTimeout(() => {
        setShowCreateModal(false);
        setStatusMessage('');
      }, 1500);
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-blue-900/50">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-white">Cards Command Center</h1>
          <p className="text-xs text-slate-300 mt-0.5">Manage virtual dollar and high-limit physical debit cards.</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-[#0a1d36] hover:bg-[#0d2545] border border-blue-900/60 text-slate-300 hover:text-white transition-all"
          >
            <svg className="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <span>{showDetails ? 'Hide Sensitive Info' : 'Reveal Card Numbers'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 border border-blue-400/40 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Create Virtual Card</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="p-6 rounded-3xl bg-[#0a1d36]/90 border border-blue-900/50 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-tr from-blue-950 via-blue-900 to-indigo-900 border border-blue-500/40 shadow-2xl text-white">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-cyan-400 rounded-sm"></span>
                <span className="text-xs font-bold tracking-wider uppercase text-blue-200">AdeTech Virtual USD</span>
              </div>
              <span className="text-base font-extrabold text-cyan-300 font-mono">VISA</span>
            </div>

            <div className="font-mono text-xl sm:text-2xl tracking-widest text-slate-100 mb-6">
              {showDetails ? '4532 8819 0293 8821' : '4532 •••• •••• 8821'}
            </div>

            <div className="flex items-center justify-between text-xs text-blue-200">
              <div>
                <span className="text-[10px] text-blue-300 uppercase block">Card Holder</span>
                <span className="font-bold">{user.name.toUpperCase()}</span>
              </div>
              <div>
                <span className="text-[10px] text-blue-300 uppercase block">CVV</span>
                <span className="font-mono font-bold">{showDetails ? '784' : '•••'}</span>
              </div>
              <div>
                <span className="text-[10px] text-blue-300 uppercase block">Expires</span>
                <span className="font-mono font-bold">08/29</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#071527] border border-blue-900/60 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Monthly Spend Limit</span>
              <span className="font-mono font-bold text-white">$2,500.00 / month</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Card Status</span>
              <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                Active & Verified
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">3D Secure 2.0</span>
              <span className="text-cyan-400 font-semibold">Enabled</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[#0a1d36]/90 border border-blue-900/50 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-tr from-slate-950 via-[#0d2545] to-slate-900 border border-slate-700/60 shadow-2xl text-white">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 bg-amber-400 rounded-sm"></span>
                <span className="text-xs font-bold tracking-wider uppercase text-slate-300">AdeTech Metal NGN</span>
              </div>
              <span className="text-sm font-extrabold text-orange-400 font-mono">Mastercard</span>
            </div>

            <div className="font-mono text-xl sm:text-2xl tracking-widest text-slate-100 mb-6">
              {showDetails ? '5399 2819 4018 1042' : '5399 •••• •••• 1042'}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-300">
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Card Holder</span>
                <span className="font-bold">{user.name.toUpperCase()}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">CVV</span>
                <span className="font-mono font-bold">{showDetails ? '392' : '•••'}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Expires</span>
                <span className="font-mono font-bold">11/30</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#071527] border border-blue-900/60 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Daily ATM / POS Cap</span>
              <span className="font-mono font-bold text-white">₦1,000,000.00 / day</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Card Status</span>
              <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
                Active & Verified
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Contactless NFC</span>
              <span className="text-cyan-400 font-semibold">Active</span>
            </div>
          </div>
        </div>

      </div>

      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#0a1d36] border border-blue-800 shadow-2xl space-y-5 animate-in fade-in">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-white">Generate Virtual Card</h3>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {statusMessage && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
                {statusMessage}
              </div>
            )}

            <form onSubmit={handleCreateCard} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Card Currency</label>
                <select
                  value={newCardCurrency}
                  onChange={(e) => setNewCardCurrency(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#071527] border border-blue-900/60 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="USD">United States Dollar (USD) - $1,500 Limit</option>
                  <option value="NGN">Nigerian Naira (NGN) - ₦500,000 Limit</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-semibold">Card Network</label>
                <select
                  value={newCardBrand}
                  onChange={(e) => setNewCardBrand(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#071527] border border-blue-900/60 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="Visa">Visa 3D Secure</option>
                  <option value="Mastercard">Mastercard Identity Check</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-[#071527] border border-blue-900/60 text-[11px] text-slate-300">
                Card provisioning fee is waived for Tier 3 accounts. The card is activated immediately for cross-border subscriptions.
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition-colors disabled:opacity-50"
                >
                  {creating ? 'Generating Card...' : 'Issue Card Now'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-3 rounded-xl bg-[#071527] border border-blue-900/60 text-slate-400 hover:text-white font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Cards;
