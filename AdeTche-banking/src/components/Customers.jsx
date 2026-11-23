import React from 'react';

function Customers() {
  return (
    <section id="customers" className="relative py-24 bg-[#071527] text-white overflow-hidden border-t border-blue-900/40">

      {/* Background Subtle Gradient Accents */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-500/40 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            CUSTOMER STORIES
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            What Our Customers Say About Us
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto italic">
            Don't just take our word for it. See what our happy customers have to say about their experience with us.
          </p>
        </div>

        {/* =========================================================================
            TESTIMONIAL CARDS (DIRECT REACT JSX STRUCTURE - NO JSON DATA ARRAY)
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">

          {/* ---------------- CARD 1: Chinedu Okafor ---------------- */}
          <div className="relative p-7 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl shadow-black/20 flex flex-col justify-between group">
            <div className="absolute top-5 right-6 opacity-10 group-hover:opacity-20 text-blue-400 transition-opacity">
              <svg className="w-12 h-12 fill-current" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            <div>

              {/* Review Title */}
              <h3 className="font-display font-bold text-lg text-white mb-3">
                Excellent Service
              </h3>

              {/* Review Quote */}
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                "Amazing experience! The service was fast, reliable, and professional. I'm very happy with the quality. I will definitely recommend this platform to others."
              </p>
            </div>

            {/* Customer Author Row */}
            <div className="pt-4 border-t border-blue-900/40 flex items-center gap-3.5">
              <img
                src="/images/customers/customer-1.jpg"
                alt="Chinedu Okafor"
                className="w-13 h-13 w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/40 group-hover:ring-blue-400 transition-all shadow-md"
              />
              <div>
                <div className="font-display font-bold text-white text-base">
                  Chinedu Okafor
                </div>
                <div className="flex items-center gap-1.5 text-xs text-blue-400 font-medium mt-0.5">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Lagos</span>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- CARD 2: Adebayo Adewale ---------------- */}
          <div className="relative p-7 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl shadow-black/20 flex flex-col justify-between group">
            <div className="absolute top-5 right-6 opacity-10 group-hover:opacity-20 text-blue-400 transition-opacity">
              <svg className="w-12 h-12 fill-current" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            <div>

              {/* Review Title */}
              <h3 className="font-display font-bold text-lg text-white mb-3">
                Highly Recommended
              </h3>

              {/* Review Quote */}
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                "I really love how easy everything is. The platform is user-friendly, and the customer support is excellent. Keep up the good work!"
              </p>
            </div>

            {/* Customer Author Row */}
            <div className="pt-4 border-t border-blue-900/40 flex items-center gap-3.5">
              <img
                src="/images/customers/customer-2.jpg"
                alt="Adebayo Adewale"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/40 group-hover:ring-blue-400 transition-all shadow-md"
              />
              <div>
                <div className="font-display font-bold text-white text-base">
                  Adebayo Adewale
                </div>
                <div className="flex items-center gap-1.5 text-xs text-blue-400 font-medium mt-0.5">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Ibadan</span>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- CARD 3: Ngozi Eze ---------------- */}
          <div className="relative p-7 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl shadow-black/20 flex flex-col justify-between group">
            <div className="absolute top-5 right-6 opacity-10 group-hover:opacity-20 text-blue-400 transition-opacity">
              <svg className="w-12 h-12 fill-current" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            <div>

              {/* Review Title */}
              <h3 className="font-display font-bold text-lg text-white mb-3">
                Outstanding Experience
              </h3>

              {/* Review Quote */}
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                "I had a wonderful experience using this platform. Everything was smooth and convenient. I look forward to doing more business here."
              </p>
            </div>

            {/* Customer Author Row */}
            <div className="pt-4 border-t border-blue-900/40 flex items-center gap-3.5">
              <img
                src="/images/customers/customer-3.jpg"
                alt="Ngozi Eze"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/40 group-hover:ring-blue-400 transition-all shadow-md"
              />
              <div>
                <div className="font-display font-bold text-white text-base">
                  Miss Monisola Olufunmilayo
                </div>
                <div className="flex items-center gap-1.5 text-xs text-blue-400 font-medium mt-0.5">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Lagos</span>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- CARD 4: Fatima Ibrahim ---------------- */}
          <div className="relative p-7 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl shadow-black/20 flex flex-col justify-between group">
            <div className="absolute top-5 right-6 opacity-10 group-hover:opacity-20 text-blue-400 transition-opacity">
              <svg className="w-12 h-12 fill-current" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            <div>

              {/* Review Title */}
              <h3 className="font-display font-bold text-lg text-white mb-3">
                Trusted Platform
              </h3>

              {/* Review Quote */}
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                "Very impressive service! I appreciate the professionalism, transparency, and attention given to customers. I highly recommend it."
              </p>
            </div>

            {/* Customer Author Row */}
            <div className="pt-4 border-t border-blue-900/40 flex items-center gap-3.5">
              <img
                src="/images/customers/customer-4.jpg"
                alt="Fatima Ibrahim"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/40 group-hover:ring-blue-400 transition-all shadow-md"
              />
              <div>
                <div className="font-display font-bold text-white text-base">
                  Fatima Ibrahim
                </div>
                <div className="flex items-center gap-1.5 text-xs text-blue-400 font-medium mt-0.5">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Abuja</span>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- CARD 5: Oluwaseun Ogunleye ---------------- */}
          <div className="relative p-7 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl shadow-black/20 flex flex-col justify-between group">
            <div className="absolute top-5 right-6 opacity-10 group-hover:opacity-20 text-blue-400 transition-opacity">
              <svg className="w-12 h-12 fill-current" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            <div>

              {/* Review Title */}
              <h3 className="font-display font-bold text-lg text-white mb-3">
                Customer Satisfaction
              </h3>

              {/* Review Quote */}
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                "This is exactly the kind of service I was looking for. Easy to use, dependable, and efficient. I'm glad I discovered this platform."
              </p>
            </div>

            {/* Customer Author Row */}
            <div className="pt-4 border-t border-blue-900/40 flex items-center gap-3.5">
              <img
                src="/images/customers/customer-5.jpg"
                alt="Oluwaseun Ogunleye"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/40 group-hover:ring-blue-400 transition-all shadow-md"
              />
              <div>
                <div className="font-display font-bold text-white text-base">
                  Oluwaseun Ogunleye
                </div>
                <div className="flex items-center gap-1.5 text-xs text-blue-400 font-medium mt-0.5">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Ogun State</span>
                </div>
              </div>
            </div>
          </div>

          {/* ---------------- CARD 6: Blessing Nwosu ---------------- */}
          <div className="relative p-7 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1.5 shadow-xl shadow-black/20 flex flex-col justify-between group">
            <div className="absolute top-5 right-6 opacity-10 group-hover:opacity-20 text-blue-400 transition-opacity">
              <svg className="w-12 h-12 fill-current" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            <div>

              {/* Review Title */}
              <h3 className="font-display font-bold text-lg text-white mb-3">
                Great Experience
              </h3>

              {/* Review Quote */}
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                "Excellent customer experience from start to finish. I am satisfied with the service and will continue using this platform."
              </p>
            </div>

            {/* Customer Author Row */}
            <div className="pt-4 border-t border-blue-900/40 flex items-center gap-3.5">
              <img
                src="/images/customers/customer-6.jpg"
                alt="Blessing Nwosu"
                className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/40 group-hover:ring-blue-400 transition-all shadow-md"
              />
              <div>
                <div className="font-display font-bold text-white text-base">
                  Blessing Nwosu
                </div>
                <div className="flex items-center gap-1.5 text-xs text-blue-400 font-medium mt-0.5">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Port Harcourt</span>
                </div>
              </div>
            </div>
          </div>

        </div>


        <div className="rounded-2xl bg-gradient-to-r from-blue-950/60 via-[#0a1d36] to-blue-950/60 border border-blue-800/40 p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 mb-1">
                4.9 / 5.0
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">
                Customer Rating
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 mb-1">
                50,000+
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">
                Active Users
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 mb-1">
                99.9%
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">
                Uptime Reliability
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 mb-1">
                24 / 7
              </div>
              <div className="text-xs sm:text-sm text-slate-300 font-medium">
                Dedicated Support
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Customers;
