import React, { useState } from 'react';
import { MessageCircle, X, Send, CheckCircle2 } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [track, setTrack] = useState('A/L ICT (Grade 12–13)');
  const [message, setMessage] = useState('Hi Sir, I would like class timetable & fee details.');
  const [submitted, setSubmitted] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div
          role="dialog"
          aria-label="WhatsApp Student Support"
          className="w-[320px] sm:w-[348px] rounded-xl border border-indigo-400/30 bg-[#0D132B] shadow-2xl overflow-hidden"
        >
          <div className="flex items-center justify-between bg-gradient-to-r from-[#075E54] to-[#128C7E] px-4 py-3 text-white">
            <div>
              <p className="font-display text-sm font-semibold">ICT From ABC Support</p>
              <p className="text-xs text-emerald-100">Admissions & Timetable Desk · +94 77 450 8820</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close WhatsApp support"
              className="rounded-lg p-1.5 text-white/90 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSend} className="p-4 space-y-3">
            <div>
              <label htmlFor="wa-track" className="block text-xs font-medium text-slate-300 mb-1">
                Class Track
              </label>
              <select
                id="wa-track"
                value={track}
                onChange={(e) => setTrack(e.target.value)}
                className="w-full rounded-lg border border-indigo-500/30 bg-[#070B1A] px-3 py-2 text-sm text-slate-100 focus:border-indigo-400 focus:outline-none"
              >
                <option value="O/L ICT (Grade 10–11)">O/L ICT (Grade 10–11)</option>
                <option value="A/L ICT (Grade 12–13)">A/L ICT (Grade 12–13)</option>
                <option value="Past Paper Revision Pack">Past Paper Revision Pack</option>
              </select>
            </div>

            <div>
              <label htmlFor="wa-msg" className="block text-xs font-medium text-slate-300 mb-1">
                Your Message
              </label>
              <textarea
                id="wa-msg"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full rounded-lg border border-indigo-500/30 bg-[#070B1A] px-3 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none resize-none"
                placeholder="Ask about Zoom links, fees, or recordings..."
              />
            </div>

            {submitted ? (
              <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-2.5 text-xs text-emerald-300">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                <span>Inquiry queued for {track}. Our team replies within 15 minutes.</span>
              </div>
            ) : (
              <button
                type="submit"
                className="flex w-full min-h-[42px] items-center justify-center gap-2 rounded-lg bg-[#16A34A] px-4 py-2 text-sm font-semibold text-white hover:bg-[#15803D] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
              >
                <Send className="h-4 w-4" />
                <span>Send WhatsApp Inquiry</span>
              </button>
            )}
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Chat on WhatsApp"
        className="inline-flex h-12 items-center gap-2.5 rounded-full bg-[#16A34A] px-5 text-sm font-semibold text-white shadow-lg shadow-emerald-950/50 hover:bg-[#15803D] transition-transform duration-150 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
      >
        <MessageCircle className="h-5 w-5" />
        <span className="whitespace-nowrap">WhatsApp Help</span>
      </button>
    </div>
  );
};
