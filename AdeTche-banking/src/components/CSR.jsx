import React, { useState } from 'react';

function CSR() {
  const [activeTab, setActiveTab] = useState('all');

  const pillars = [
    {
      id: 'social-investments',
      title: 'Social Investments',
      subtitle: 'Nurturing Potential and Uplifting Nigerian Communities',
      tag: 'Community Empowerment',
      image: '/images/csr/social-investment.jpg',
      stat: '₦2.5B+',
      statLabel: 'Total Social Capital Invested',
      description:
        'We believe sustainable business success is inextricably tied to community prosperity. Through dedicated foundations, educational grants, and micro-entrepreneurship programs, AdeTech Banking directs capital to underserved populations across Nigeria.',
      highlights: [
        {
          title: 'Youth & STEM Education Grants',
          desc: 'Equipped over 45 secondary schools with high-speed internet and modern digital coding labs, empowering 65,000+ Nigerian students with fintech and computer science skills.'
        },
        {
          title: 'Maternal & Community Healthcare',
          desc: 'Partnered with state primary healthcare centers to fund maternal care kits, diagnostic equipment, and mobile wellness clinics reaching 120,000+ rural residents.'
        },
        {
          title: 'Women Entrepreneurship Revolving Fund',
          desc: 'Provided zero-interest revolving seed capital, financial literacy workshops, and mentorship to over 15,000 female market traders and MSME owners.'
        },
        {
          title: 'Clean Water & Community Solar Boreholes',
          desc: 'Commissioned 80 solar-powered clean water boreholes in communities facing severe water shortages, reducing water-borne illnesses by 64% in target zones.'
        }
      ]
    },
    {
      id: 'sustainability',
      title: 'Sustainability & ESG',
      subtitle: 'Environmental Stewardship & Responsible Green Finance',
      tag: 'Environmental Governance',
      image: '/images/csr/sustainability.jpg',
      stat: '42%',
      statLabel: 'Branch Carbon Footprint Reduction',
      description:
        'AdeTech Banking actively integrates Environmental, Social, and Governance (ESG) standards into every credit decision, facility deployment, and internal process, fostering low-carbon African economic growth.',
      highlights: [
        {
          title: 'Solar-Powered Smart Branches',
          desc: 'Over 68% of AdeTech bank branches and ATM galleries run on hybrid solar inverter systems, eliminating over 14,000 metric tons of carbon emissions annually.'
        },
        {
          title: 'Paperless Digital Operations',
          desc: '100% digital account opening, e-receipts, and electronic statements across all platforms, preserving an estimated 920 trees each operating year.'
        },
        {
          title: 'Green Bonds & Climate Financing',
          desc: 'Structuring dedicated green credit lines with favorable rates for solar energy providers, climate-smart agriculture, and recycling innovators.'
        },
        {
          title: 'Eco-Friendly Bio-Degradable Cards',
          desc: 'Pioneered recycled ocean plastic and PLA bio-degradable debit cards across our retail network, reducing single-use petroleum plastic waste.'
        }
      ]
    },
    {
      id: 'stakeholders',
      title: 'Stakeholders',
      subtitle: 'Inclusive Dialogue, Ethical Value, and Shared Prosperity',
      tag: 'Stakeholder Matrix',
      image: null,
      stat: '99.98%',
      statLabel: 'Customer SLA Satisfaction & Trust',
      description:
        'Our stakeholder engagement model ensures that all voices—from grassroots customers and employees to regulators and host communities—are actively represented in our corporate governance.',
      stakeholderGroups: [
        {
          group: 'Customers & Depositors',
          focus: 'Data Privacy, Fair Pricing & 24/7 Reliability',
          commitment: 'Zero hidden fees, sovereign bank-grade cyber security, and responsive 24/7 customer resolution across all channels.'
        },
        {
          group: 'Employees & Future Leaders',
          focus: 'Diversity, Health, and Career Growth',
          commitment: 'Equal opportunity hiring, 46% women in executive leadership, comprehensive medical coverage, and tuition reimbursement.'
        },
        {
          group: 'Regulators & Government',
          focus: 'Absolute Transparency & Full Compliance',
          commitment: 'Exemplary compliance with Central Bank of Nigeria (CBN), NDIC guidelines, and anti-money laundering (AML/CFT) frameworks.'
        },
        {
          group: 'Host Communities',
          focus: 'Local Job Creation & Civic Progress',
          commitment: 'Prioritizing local staffing, community development committees, and respectful engagement with traditional and local authorities.'
        },
        {
          group: 'Shareholders & Capital Partners',
          focus: 'Sustainable Returns & Ethical Stewardship',
          commitment: 'Delivering robust risk-adjusted long-term capital preservation with disciplined corporate governance.'
        }
      ]
    },
    {
      id: 'partnerships',
      title: 'Partnerships & Collaborations',
      subtitle: 'Scaling Collective Impact Across Nigeria and Africa',
      tag: 'Strategic Alliances',
      image: '/images/csr/partnerships.jpg',
      stat: '50+',
      statLabel: 'Active Public & Private Alliances',
      description:
        'No single institution can solve systemic social and ecological challenges alone. We forge strategic coalitions with government bodies, multilateral development agencies, and fintech pioneers to amplify positive outcomes.',
      highlights: [
        {
          title: 'CBN Financial Inclusion Strategy',
          desc: 'Partnered with the Central Bank of Nigeria to deploy certified agency banking kiosks across rural local government areas, onboarding 350,000 unbanked citizens.'
        },
        {
          title: 'Multilateral Climate Resilience Coalition',
          desc: 'Collaborating with pan-African development finance institutions to syndicate low-cost credit for smallholder agricultural irrigation and solar mini-grids.'
        },
        {
          title: 'Fintech & Tech Incubator Alliances',
          desc: 'Co-funding innovation challenges and developer workshops in Lagos, Abuja, and Ibadan to mentor early-stage African technology founders.'
        },
        {
          title: 'NGO Healthcare & Emergency Relief',
          desc: 'Standing partnerships with verified civil society groups to provide rapid humanitarian aid, medical interventions, and disaster relief.'
        }
      ]
    },
    {
      id: 'sustainability-reporting',
      title: 'Sustainability Reporting',
      subtitle: 'Accountable Disclosures and Audited ESG Benchmarks',
      tag: 'Governance & Transparency',
      image: null,
      stat: '100%',
      statLabel: 'NSBP & GRI Compliance Rate',
      description:
        'We adhere to the highest international standards of corporate transparency. Our sustainability disclosures align with the Nigerian Sustainable Banking Principles (NSBP) and the Global Reporting Initiative (GRI).',
      reports: [
        {
          name: '2025/2026 Annual Sustainability & ESG Report',
          period: 'Full Year 2025/2026',
          pages: '84 Pages PDF',
          standard: 'GRI Core & NSBP Standards',
          summary: 'In-depth audit of our carbon accounting, diversity metrics, social investments, and green lending portfolio.'
        },
        {
          name: 'Independent Auditor ESG Assurance Statement',
          period: 'Issued Q4 2025',
          pages: '16 Pages PDF',
          standard: 'ISAE 3000 International Standard',
          summary: 'Third-party validation verifying greenhouse gas emissions, community fund disbursements, and compliance indices.'
        },
        {
          name: 'Green Finance Impact & Climate Risk Whitepaper',
          period: 'Executive Review',
          pages: '32 Pages PDF',
          standard: 'TCFD Recommendations',
          summary: 'Forward-looking scenarios examining physical and transitional climate risks across Nigeria and credit mitigation paths.'
        }
      ]
    }
  ];

  const filteredPillars = activeTab === 'all' ? pillars : pillars.filter((p) => p.id === activeTab);

  return (
    <section id="crs" className="relative py-24 bg-[#071527] text-white overflow-hidden border-t border-blue-900/40">

      {/* Background Decorative Glow Accents */}
      <div className="absolute top-10 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-400/40 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            CORPORATE RESPONSIBILITY & SUSTAINABILITY (CRS)
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Empowering People, Sustaining Nigeria's Future
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            At AdeTech Banking, our commitment goes beyond digital financial excellence. We invest deeply in social empowerment, environmental regeneration, and ethical partnerships to forge an inclusive, sustainable economy.
          </p>
        </div>

        {/* =========================================================================
            CORPORATE FLAG SHOWCASE: ADETECH NAVY BLUE BRANDING
           ========================================================================= */}
        <div className="mb-20 rounded-3xl bg-gradient-to-br from-[#0a1d36] via-[#0d2545] to-[#071527] border border-blue-800/50 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left: Flag Image with Navy Blue Branding */}
            <div className="lg:col-span-6">
              <div className="relative group rounded-2xl overflow-hidden border-2 border-blue-500/40 shadow-2xl bg-[#051326]">
                <img
                  src="/images/csr/adetech-flag.jpg"
                  alt="AdeTech Banking Corporate Navy Blue Flag on Flagpoles"
                  className="w-full h-80 sm:h-96 object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071527]/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-[#071527]/90 backdrop-blur-md border border-blue-400/30 px-4 py-2.5 rounded-xl">
                  <span className="text-xs font-bold text-white tracking-wide">AdeTech Corporate Flag</span>
                  <span className="text-[11px] font-semibold text-blue-300 bg-blue-900/60 px-2.5 py-0.5 rounded-md border border-blue-400/30">
                    Navy Blue Identity
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Flag Meaning & Corporate Creed */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3">
                OUR CORPORATE EMBLEM & FLAG
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4 leading-snug">
                Flying the AdeTech Flag: Integrity, Innovation, and National Pride
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                Our flag flies proudly at every branch, data hub, and commercial center across Nigeria. Rendered in signature <strong>AdeTech Navy Blue (#071527)</strong>, the colors represent unshakeable security, institutional stability, and our enduring pledge to build lasting wealth for every Nigerian citizen.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-blue-900/50">
                <div className="p-3.5 rounded-xl bg-[#071527]/80 border border-blue-900/60">
                  <div className="text-xl sm:text-2xl font-extrabold text-blue-400">100%</div>
                  <div className="text-xs text-slate-300 font-medium mt-0.5">Nigerian Owned & Operated</div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#071527]/80 border border-blue-900/60">
                  <div className="text-xl sm:text-2xl font-extrabold text-cyan-400">Navy Blue</div>
                  <div className="text-xs text-slate-300 font-medium mt-0.5">Sovereign Financial Creed</div>
                </div>
              </div>
            </div>

          </div>
        </div>

      
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14 p-2 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 backdrop-blur-md max-w-4xl mx-auto shadow-xl">
          <button
            type="button"
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40'
                : 'text-slate-300 hover:text-white hover:bg-blue-950/50'
            }`}
          >
            All CRS Pillars
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('social-investments')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'social-investments'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40'
                : 'text-slate-300 hover:text-white hover:bg-blue-950/50'
            }`}
          >
            Social Investments
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sustainability')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'sustainability'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40'
                : 'text-slate-300 hover:text-white hover:bg-blue-950/50'
            }`}
          >
            Sustainability & ESG
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('stakeholders')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'stakeholders'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40'
                : 'text-slate-300 hover:text-white hover:bg-blue-950/50'
            }`}
          >
            Stakeholders
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('partnerships')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'partnerships'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40'
                : 'text-slate-300 hover:text-white hover:bg-blue-950/50'
            }`}
          >
            Partnerships
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sustainability-reporting')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'sustainability-reporting'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/40'
                : 'text-slate-300 hover:text-white hover:bg-blue-950/50'
            }`}
          >
            Reporting
          </button>
        </div>

       
        <div className="space-y-16">
          {filteredPillars.map((pillar, idx) => (
            <div
              key={pillar.id}
              className="rounded-3xl bg-[#0a1d36]/90 border border-blue-900/50 p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md"
            >
              {/* Pillar Top Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-blue-900/50">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-300 font-bold text-sm flex items-center justify-center">
                    0{idx + 1}
                  </span>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400 block">
                      {pillar.tag}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                      {pillar.title}
                    </h3>
                  </div>
                </div>

                <div className="bg-[#071527] px-4 py-2.5 rounded-xl border border-blue-900/60 flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xl sm:text-2xl font-extrabold text-blue-400 leading-tight">
                      {pillar.stat}
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      {pillar.statLabel}
                    </div>
                  </div>
                </div>
              </div>

              {/* Subtitle & Paragraph */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-8 max-w-4xl">
                {pillar.description}
              </p>

              {/* Layout: Image + Highlight Grid for Social, Sustainability, Partnerships */}
              {pillar.image && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
                  {/* Photo Column */}
                  <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-blue-800/50 shadow-xl group">
                    <img
                      src={pillar.image}
                      alt={pillar.title}
                      className="w-full h-72 sm:h-80 object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="p-3.5 bg-[#071527] border-t border-blue-900/50 flex items-center justify-between text-xs text-slate-300">
                      <span className="font-semibold text-white">{pillar.subtitle}</span>
                      <span className="text-blue-400 text-[11px] uppercase tracking-wider">AdeTech CRS</span>
                    </div>
                  </div>

                  {/* Highlights Grid */}
                  <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {pillar.highlights &&
                      pillar.highlights.map((item, hIdx) => (
                        <div
                          key={hIdx}
                          className="p-4 sm:p-5 rounded-2xl bg-[#071527]/80 border border-blue-900/60 hover:border-blue-500/40 transition-colors"
                        >
                          <div className="mb-2 text-blue-400 font-bold text-sm">
                            <h4>{item.title}</h4>
                          </div>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* STAKEHOLDERS SPECIAL VIEW */}
              {pillar.stakeholderGroups && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pillar.stakeholderGroups.map((stk, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-5 rounded-2xl bg-[#071527]/80 border border-blue-900/60 hover:border-blue-500/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="mb-3">
                          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                            Stakeholder Tier 0{sIdx + 1}
                          </span>
                        </div>
                        <h4 className="font-display font-bold text-lg text-white mb-1">
                          {stk.group}
                        </h4>
                        <div className="text-xs font-semibold text-slate-400 mb-3">
                          {stk.focus}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {stk.commitment}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SUSTAINABILITY REPORTING SPECIAL VIEW */}
              {pillar.reports && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  {pillar.reports.map((rep, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-6 rounded-2xl bg-[#071527] border border-blue-900/60 hover:border-blue-400/50 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                          <span className="px-2.5 py-0.5 rounded bg-blue-950 border border-blue-800/40 text-blue-300 font-semibold">
                            {rep.period}
                          </span>
                          <span className="font-semibold">{rep.pages}</span>
                        </div>
                        <h4 className="font-display font-bold text-base text-white mb-2 leading-snug">
                          {rep.name}
                        </h4>
                        <div className="text-[11px] text-cyan-400 font-medium mb-3">
                          Framework: {rep.standard}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed mb-6">
                          {rep.summary}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => alert(`Downloading ${rep.name} (${rep.pages})...`)}
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 border border-blue-400/40 shadow-lg shadow-blue-600/30 transition-all"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        <span>Download Full Report</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>

        {/* CRS Footer Commitment Callout */}
        <div className="mt-16 text-center max-w-2xl mx-auto p-6 rounded-2xl bg-[#0a1d36]/60 border border-blue-900/40">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3">
            AdeTech Banking CRS programs are guided by the Central Bank of Nigeria (CBN) Sustainable Banking Principles and the United Nations Sustainable Development Goals.
          </p>
          <div className="text-xs font-semibold text-blue-400">
            For CRS partnerships, inquiries or grant applications: <a href="tel:09077108987" className="underline hover:text-white">09077108987</a>
          </div>
        </div>

      </div>
    </section>
  );
}

export default CSR;
