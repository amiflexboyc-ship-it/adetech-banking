import React, { useState } from 'react';

function Map() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedLocationId, setSelectedLocationId] = useState(1);

  const locations = [
    {
      id: 1,
      name: 'AdeTech Lekki Flagship Branch (Head Office)',
      type: 'branch',
      typeName: 'Bank Branch',
      city: 'Lagos',
      address: 'Plot 22, Yomi Ajetunmobi St, Eti-Osa, Lekki 106104, Lagos, Nigeria',
      hours: {
        weekdays: 'Mon – Fri: 8:00 AM – 4:00 PM',
        saturday: 'Sat: 9:00 AM – 2:00 PM',
        sunday: 'Sun: Closed (ATMs 24/7)'
      },
      phone: '09077108987',
      services: ['Account Opening', 'Cash Deposit & Withdrawal', 'Virtual & Metal Cards', 'Foreign Exchange', 'Institutional Banking'],
      image: '/images/bg-bank-4.jpg',
      mapCoords: { x: '25%', y: '78%' },
      googleMapsQuery: 'Plot 22, Yomi Ajetunmobi St, Eti-Osa, Lekki 106104, Lagos, Nigeria'
    },
    {
      id: 2,
      name: 'AdeTech Central Business District Branch',
      type: 'branch',
      typeName: 'Bank Branch',
      city: 'Abuja',
      address: 'Herbert Macaulay Way, Central Business District, Abuja, FCT',
      hours: {
        weekdays: 'Mon – Fri: 8:00 AM – 4:30 PM',
        saturday: 'Sat: 9:00 AM – 1:00 PM',
        sunday: 'Sun: Closed (ATMs 24/7)'
      },
      phone: '09077108987',
      services: ['Corporate Banking', 'Treasury Services', 'SME Business Advisory', 'Biometric Enrollment'],
      image: '/images/bg-bank-1.jpg',
      mapCoords: { x: '48%', y: '52%' },
      googleMapsQuery: 'Herbert Macaulay Way, Central Business District, Abuja'
    },
    {
      id: 3,
      name: 'AdeTech Ikeja City Mall 24/7 ATM Gallery',
      type: 'atm',
      typeName: 'ATM Location',
      city: 'Lagos',
      address: 'Ground Floor, Ikeja City Mall, Obafemi Awolowo Way, Alausa, Ikeja, Lagos',
      hours: {
        weekdays: '24 Hours / 7 Days a Week',
        saturday: '24 Hours / 7 Days a Week',
        sunday: '24 Hours / 7 Days a Week'
      },
      phone: '09077108987',
      services: ['Cash Withdrawal', 'Real-Time Cash Deposit', 'Cardless Cash Transfer', 'PIN Management'],
      image: '/images/bg-bank-2.jpg',
      mapCoords: { x: '26%', y: '75%' },
      googleMapsQuery: 'Ikeja City Mall, Alausa, Ikeja, Lagos'
    },
    {
      id: 4,
      name: 'AdeTech Bodija Commercial Branch',
      type: 'branch',
      typeName: 'Bank Branch',
      city: 'Ibadan',
      address: 'Old Bodija Road, Opposite University Secretariat, Ibadan, Oyo State',
      hours: {
        weekdays: 'Mon – Fri: 8:00 AM – 4:00 PM',
        saturday: 'Sat: 9:00 AM – 2:00 PM',
        sunday: 'Sun: Closed (ATMs 24/7)'
      },
      phone: '09077108987',
      services: ['Savings & Loans', 'POS Terminal Issuance', 'International Remittances', 'Cashier Services'],
      image: '/images/bg-bank-3.jpg',
      mapCoords: { x: '28%', y: '71%' },
      googleMapsQuery: 'Old Bodija, Ibadan, Oyo State'
    },
    {
      id: 5,
      name: 'AdeTech Trans-Amadi Corporate Hub',
      type: 'branch',
      typeName: 'Bank Branch',
      city: 'Port Harcourt',
      address: 'Plot 88 Trans-Amadi Industrial Layout, Port Harcourt, Rivers State',
      hours: {
        weekdays: 'Mon – Fri: 8:00 AM – 4:00 PM',
        saturday: 'Sat: Closed',
        sunday: 'Sun: Closed (ATMs 24/7)'
      },
      phone: '09077108987',
      services: ['Commercial Trade Finance', 'Corporate Accounts', 'Forex Counter', 'ATM Gallery'],
      image: '/images/bg-bank-1.jpg',
      mapCoords: { x: '51%', y: '84%' },
      googleMapsQuery: 'Trans-Amadi Industrial Layout, Port Harcourt'
    },
    {
      id: 6,
      name: 'AdeTech Authorized Agent Kiosk - Yaba Tech',
      type: 'agent',
      typeName: 'Banking Agent',
      city: 'Lagos',
      address: 'Commercial Junction, Herbert Macaulay Way, Yaba, Lagos',
      hours: {
        weekdays: 'Mon – Fri: 7:30 AM – 7:00 PM',
        saturday: 'Sat: 8:00 AM – 6:00 PM',
        sunday: 'Sun: 10:00 AM – 4:00 PM'
      },
      phone: '09077108987',
      services: ['Instant Account Opening', 'Fast POS Cash-In / Cash-Out', 'Bill Payments', 'Airtime Top-up'],
      image: '/images/bg-bank-2.jpg',
      mapCoords: { x: '25%', y: '76%' },
      googleMapsQuery: 'Herbert Macaulay Way, Yaba, Lagos'
    },
    {
      id: 7,
      name: 'AdeTech Wuse II Smart ATM & Branch',
      type: 'branch',
      typeName: 'Bank Branch',
      city: 'Abuja',
      address: 'Adetokunbo Ademola Crescent, Wuse II, Abuja, FCT',
      hours: {
        weekdays: 'Mon – Fri: 8:00 AM – 4:30 PM',
        saturday: 'Sat: 9:00 AM – 2:00 PM',
        sunday: 'Sun: Closed (ATMs 24/7)'
      },
      phone: '09077108987',
      services: ['Wealth Management', 'Dual Currency ATMs', 'Cards Center', 'Customer Support'],
      image: '/images/bg-bank-3.jpg',
      mapCoords: { x: '49%', y: '50%' },
      googleMapsQuery: 'Adetokunbo Ademola Crescent, Wuse II, Abuja'
    },
    {
      id: 8,
      name: 'AdeTech Authorized Agent - Dugbe Market',
      type: 'agent',
      typeName: 'Banking Agent',
      city: 'Ibadan',
      address: 'Shop 14, Commercial Complex, Dugbe Central Market, Ibadan, Oyo State',
      hours: {
        weekdays: 'Mon – Fri: 8:00 AM – 6:30 PM',
        saturday: 'Sat: 8:30 AM – 5:30 PM',
        sunday: 'Sun: Closed'
      },
      phone: '09077108987',
      services: ['Merchant Settlement', 'Cash Deposit', 'Cash Withdrawal', 'Utility Bill Collection'],
      image: '/images/bg-bank-4.jpg',
      mapCoords: { x: '27%', y: '72%' },
      googleMapsQuery: 'Dugbe, Ibadan, Oyo State'
    }
  ];

  const filteredLocations = locations.filter((loc) => {
    const matchesFilter = selectedFilter === 'all' || loc.type === selectedFilter;
    const matchesCity = selectedCity === 'all' || loc.city.toLowerCase() === selectedCity.toLowerCase();
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      query === '' ||
      loc.name.toLowerCase().includes(query) ||
      loc.address.toLowerCase().includes(query) ||
      loc.city.toLowerCase().includes(query);

    return matchesFilter && matchesCity && matchesSearch;
  });

  const activeLocation = locations.find((l) => l.id === selectedLocationId) || filteredLocations[0] || locations[0];

  return (
    <section id="map" className="relative py-24 bg-[#071527] text-white overflow-hidden border-t border-blue-900/40">

      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-500/40 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            BRANCH & ATM LOCATOR
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Find AdeTech Near You
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover convenient banking locations and access points around you. Use our interactive map to explore available branches, ATM locations and banking services.
          </p>
        </div>

        <div className="p-4 sm:p-6 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 backdrop-blur-md shadow-xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

            <div className="md:col-span-6 relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by city, address or landmark (e.g. Lekki, Lagos, Abuja, Bodija)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#071527] border border-blue-800/60 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            <div className="md:col-span-6 flex flex-wrap items-center gap-2 md:justify-end">
              <button
                type="button"
                onClick={() => setSelectedFilter('all')}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${selectedFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-[#071527] text-slate-300 hover:text-white border border-blue-900/50'
                  }`}
              >
                All Access Points
              </button>

              <button
                type="button"
                onClick={() => setSelectedFilter('branch')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${selectedFilter === 'branch'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-[#071527] text-slate-300 hover:text-white border border-blue-900/50'
                  }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span>Branches</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFilter('atm')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${selectedFilter === 'atm'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-[#071527] text-slate-300 hover:text-white border border-blue-900/50'
                  }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="2" />
                  <line x1="2" y1="10" x2="22" y2="10" strokeWidth="2" />
                </svg>
                <span>ATMs (24/7)</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFilter('agent')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${selectedFilter === 'agent'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'bg-[#071527] text-slate-300 hover:text-white border border-blue-900/50'
                  }`}
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Banking Agents</span>
              </button>
            </div>

          </div>

          <div className="mt-4 pt-4 border-t border-blue-900/40 flex flex-wrap items-center gap-2 text-xs text-slate-300">
            <span className="font-semibold text-slate-400">Quick Cities:</span>
            {['all', 'Lagos', 'Abuja', 'Ibadan', 'Port Harcourt'].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setSelectedCity(c)}
                className={`px-2.5 py-1 rounded-md transition-colors ${selectedCity === c
                    ? 'bg-blue-500/20 text-blue-400 font-bold border border-blue-500/40'
                    : 'hover:text-white hover:bg-blue-950/50'
                  }`}
              >
                {c === 'all' ? 'All Cities' : c}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          <div className="lg:col-span-7 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 p-4 sm:p-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-bold text-slate-300">
                <span>NIGERIA REGIONAL NETWORK MAP</span>
              </div>
              <div className="text-xs text-slate-400">
                Showing {filteredLocations.length} locations
              </div>
            </div>

            <div className="relative w-full h-80 sm:h-96 md:h-[420px] rounded-xl bg-gradient-to-b from-[#051326] via-[#071933] to-[#040e1c] border border-blue-800/40 overflow-hidden shadow-inner flex items-center justify-center">

              <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e3a8a15_1px,transparent_1px),linear-gradient(to_bottom,#1e3a8a15_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

              <svg viewBox="0 0 600 450" className="w-full h-full p-4 opacity-75">
                <defs>
                  <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#0a1d36" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                <path
                  d="M 120 180 Q 150 140 220 130 Q 320 120 400 110 Q 480 120 520 180 Q 540 240 500 300 Q 440 380 340 370 Q 280 400 240 400 Q 180 390 140 340 Q 100 280 120 180 Z"
                  fill="url(#mapGradient)"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />

                <path
                  d="M 160 200 Q 240 260 290 270 Q 380 280 460 250 M 290 270 Q 300 340 320 380"
                  fill="none"
                  stroke="#60a5fa"
                  strokeWidth="1.5"
                  strokeOpacity="0.3"
                />
              </svg>

              {filteredLocations.map((loc) => {
                const isSelected = activeLocation.id === loc.id;
                return (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedLocationId(loc.id)}
                    style={{ left: loc.mapCoords.x, top: loc.mapCoords.y }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                  >

                    {isSelected && (
                      <span className="absolute -inset-1 rounded-full bg-blue-500/30 border border-blue-400/50 pointer-events-none" />
                    )}

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-lg ${isSelected
                          ? 'bg-blue-600 text-white scale-110 ring-4 ring-blue-400/50'
                          : loc.type === 'branch'
                            ? 'bg-[#0a1d36] text-blue-400 border border-blue-400 hover:scale-105'
                            : loc.type === 'atm'
                              ? 'bg-[#0a1d36] text-amber-400 border border-amber-400 hover:scale-105'
                              : 'bg-[#0a1d36] text-green-400 border border-green-400 hover:scale-105'
                        }`}
                    >
                      {loc.type === 'branch' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" />
                        </svg>
                      )}
                      {loc.type === 'atm' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="2" />
                        </svg>
                      )}
                      {loc.type === 'agent' && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      )}
                    </div>

                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#071527] border border-blue-500/50 rounded-lg px-2.5 py-1 text-xs text-white whitespace-nowrap shadow-xl z-30 pointer-events-none">
                      <div className="font-bold">{loc.name}</div>
                      <div className="text-[10px] text-blue-400">{loc.city} | {loc.typeName}</div>
                    </div>
                  </div>
                );
              })}

              <div className="absolute bottom-3 left-3 bg-[#071527]/90 border border-blue-900/50 rounded-lg p-2.5 backdrop-blur-md text-[11px] space-y-1.5 shadow-md">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
                  <span className="text-slate-300">Branch</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-amber-400" />
                  <span className="text-slate-300">ATM Gallery (24/7)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-sm bg-green-400" />
                  <span className="text-slate-300">Agency Banking</span>
                </div>
              </div>

            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Click any marker to view full opening hours and directions</span>
              <span className="text-blue-400 font-medium">Nationwide Coverage</span>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-7 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 shadow-2xl relative flex flex-col justify-between">
            <div>

              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${activeLocation.type === 'branch'
                      ? 'bg-blue-600/30 border border-blue-400/40 text-blue-300'
                      : activeLocation.type === 'atm'
                        ? 'bg-amber-500/20 border border-amber-400/40 text-amber-300'
                        : 'bg-green-500/20 border border-green-400/40 text-green-300'
                    }`}
                >
                  {activeLocation.typeName}
                </span>

                <span className="text-xs text-slate-400 font-semibold">
                  {activeLocation.city}, Nigeria
                </span>
              </div>

              {activeLocation.image && (
                <div className="relative w-full h-44 rounded-xl overflow-hidden mb-5 border border-blue-800/40 shadow-lg group">
                  <img
                    src={activeLocation.image}
                    alt={activeLocation.name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1d36] via-transparent to-black/30" />
                  <div className="absolute bottom-3 left-3 flex items-center">
                    <span className="text-xs font-semibold text-emerald-400 drop-shadow-md">
                      Open & Operational
                    </span>
                  </div>
                </div>
              )}

              <h3 className="font-display font-bold text-xl sm:text-2xl text-white mb-3">
                {activeLocation.name}
              </h3>

              <div className="flex items-start gap-2.5 text-sm text-slate-300 mb-6">
                <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{activeLocation.address}</span>
              </div>

              <div className="p-4 rounded-xl bg-[#071527] border border-blue-900/60 mb-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-2.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <polyline points="12 6 12 12 16 14" strokeWidth="2" />
                  </svg>
                  <span>Branch Opening Hours</span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Weekdays:</span>
                    <span className="font-semibold text-white">{activeLocation.hours.weekdays}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Saturday:</span>
                    <span className="font-semibold text-white">{activeLocation.hours.saturday}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Sunday:</span>
                    <span className="font-semibold text-slate-400">{activeLocation.hours.sunday}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Available Services
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeLocation.services.map((srv, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-blue-900/30 border border-blue-800/40 text-xs text-blue-300"
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Phone: <strong className="text-white">{activeLocation.phone}</strong></span>
              </div>
            </div>

            <div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activeLocation.googleMapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 shadow-xl shadow-blue-600/30 border border-blue-400/40 transition-all transform hover:-translate-y-0.5"
              >
                <span>Get Directions</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Map;
