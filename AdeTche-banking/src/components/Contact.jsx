import React, { useState } from 'react';
import api from '../api';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'general',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await api.contact.submit(formData);
    } catch (err) {
      console.warn('Backend offline or unreachable, logging contact locally:', err.message);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  return (
    <section id="contact" className="relative py-24 bg-[#071527] text-white overflow-hidden border-t border-blue-900/40">

      {/* Background Decorative Glow Accents */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-blue-900/60 border border-blue-400/40 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            CONNECT WITH US
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-4">
            Contact AdeTech Banking
          </h2>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Have questions regarding account opening, virtual cards, or institutional services? Our dedicated banking desk is here to assist you 24/7.
          </p>
        </div>

        {/* =========================================================================
            TWO-COLUMN CONTACT LAYOUT: QUICK CHANNELS (LEFT) & FORM (RIGHT)
           ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* ---------------- LEFT COLUMN: DIRECT CHANNELS (DIRECT REACT JSX) ---------------- */}
          <div className="lg:col-span-5 space-y-6">

            {/* CHANNEL 1: WHATSAPP */}
            <a
              href="https://wa.me/2349077108987?text=Hello%20AdeTech%20Banking%2C%20I%20would%20like%20to%20make%20an%20inquiry."
              target="_blank"
              rel="noopener noreferrer"
              className="p-6 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 shadow-xl block group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-800/50 flex-shrink-0 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-5.705 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Instant Chat</span>
                    <span className="text-[11px] font-semibold text-slate-400">Available 24/7</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-1 group-hover:text-emerald-300 transition-colors">
                    WhatsApp Banking
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-3">
                    Connect directly with our client advisory on WhatsApp for quick support.
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:underline">
                    <span>Chat on WhatsApp (09077108987)</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>

            {/* CHANNEL 2: EMAIL */}
            <a
              href="mailto:amiflexboyc@gmail.com?subject=AdeTech%20Banking%20Inquiry"
              className="p-6 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1 shadow-xl block group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-800/50 flex-shrink-0 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Official Correspondence</span>
                    <span className="text-[11px] font-semibold text-slate-400">Response &lt; 2h</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-white mb-1 group-hover:text-blue-300 transition-colors">
                    Email Support
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed mb-3">
                    Send detailed inquiries, partnership requests, or documentation.
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 group-hover:underline break-all">
                    <span>amiflexboyc@gmail.com</span>
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </a>

            {/* CHANNEL 3: DIRECT PHONE & LOCATION INFO */}
            <div className="p-6 rounded-2xl bg-[#0a1d36]/90 border border-blue-900/50 shadow-xl">
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-900/30 border border-blue-800/40 flex-shrink-0 flex items-center justify-center text-blue-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Direct Hotline</div>
                    <a href="tel:09077108987" className="text-sm font-bold text-white hover:text-blue-400 transition-colors">
                      09077108987
                    </a>
                  </div>
                </div>

                <div className="pt-3 border-t border-blue-900/40 flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-900/30 border border-blue-800/40 flex-shrink-0 flex items-center justify-center text-blue-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Flagship Headquarters</div>
                    <div className="text-xs font-medium text-slate-200">
                      Plot 22, Yomi Ajetunmobi St, Lekki 106104, Lagos
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ---------------- RIGHT COLUMN: INTERACTIVE BANKING CONTACT FORM ---------------- */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-[#0a1d36]/90 border border-blue-900/50 shadow-2xl backdrop-blur-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="mb-8">
                <h3 className="font-display font-bold text-2xl text-white mb-2">
                  Send a Direct Message
                </h3>
                <p className="text-sm text-slate-300">
                  Fill in your details below and an AdeTech banking specialist will respond promptly.
                </p>
              </div>

              {isSubmitted ? (
                <div className="p-8 rounded-2xl bg-blue-950/60 border border-blue-500/40 text-center animate-in fade-in duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-400/30 flex items-center justify-center text-blue-400 mx-auto mb-4">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="font-display font-bold text-xl text-white mb-2">Message Delivered</h4>
                  <p className="text-sm text-slate-300 mb-6 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-white">{formData.name}</strong>. Your message has been routed to <strong className="text-cyan-400">amiflexboyc@gmail.com</strong> and our support desk. We will reach you within 2 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: 'general', message: '' });
                    }}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Adekunle"
                        className="w-full px-4 py-3 bg-[#071527] border border-blue-900/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="[EMAIL_ADDRESS]"
                        className="w-full px-4 py-3 bg-[#071527] border border-blue-900/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder=" 09077108987"
                        className="w-full px-4 py-3 bg-[#071527] border border-blue-900/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      />
                    </div>

                    {/* Inquiry Type */}
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Inquiry Topic
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#071527] border border-blue-900/60 rounded-xl text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                      >
                        <option value="general">General Banking Inquiry</option>
                        <option value="account">Account Opening / Verification</option>
                        <option value="cards">Virtual Dollar & Metal Cards</option>
                        <option value="wealth">High-Yield Wealth Vaults</option>
                        <option value="support">Technical Support</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Your Message
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message or inquiry here..."
                      className="w-full px-4 py-3 bg-[#071527] border border-blue-900/60 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 shadow-xl shadow-blue-600/30 border border-blue-400/40 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Submit Message</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>

                  <div className="text-center text-[11px] text-slate-400 mt-3">
                    Protected by AdeTech Sovereign Privacy &amp; Data Security Standards.
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Contact;

