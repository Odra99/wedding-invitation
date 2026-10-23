import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  MapPin,
  Clock,
  Download,
  Share2,
  Check,
  X,
  Sparkles,
  QrCode,
  UserCheck
} from 'lucide-react';
import { SkyBlueBotanicalCrest, WaxSeal } from './FloralMotifs';
import { weddingInfo } from '../data/weddingData';

interface DigitalInvitationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRsvp: () => void;
}

export const DigitalInvitationModal: React.FC<DigitalInvitationModalProps> = ({
  isOpen,
  onClose,
  onOpenRsvp
}) => {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [guestName, setGuestName] = useState('Honored Guest');
  const [copiedLink, setCopiedLink] = useState(false);
  const [passDownloaded, setPassDownloaded] = useState(false);

  // Reset or initialize state
  const handleOpenEnvelope = () => {
    setEnvelopeOpened(true);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleDownloadCalendar = () => {
    // Generate .ics calendar invite
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Celeste & Liam Wedding//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'SUMMARY:Wedding of Celeste & Liam',
      'DESCRIPTION:Join us for the wedding of Celeste Laurent & Liam Vance. Dress Code: Sky Blue & White accents.',
      'LOCATION:Villa Cerulean\\, 480 Azure Coastline Blvd\\, Newport\\, RI',
      'DTSTART:20260620T203000Z', // 4:30 PM EDT (UTC-4) -> 20:30 UTC
      'DTEND:20260621T040000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'Celeste-and-Liam-Wedding.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrintPass = () => {
    window.print();
    setPassDownloaded(true);
    setTimeout(() => setPassDownloaded(false), 3000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-transparent my-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close digital invitation"
            className="absolute -top-3 -right-3 z-30 p-2.5 rounded-full bg-white text-slate-700 shadow-md hover:bg-slate-100 transition-colors cursor-pointer border border-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400"
          >
            <X className="w-5 h-5" />
          </button>

          {!envelopeOpened ? (
            /* UNOPENED ENVELOPE CEREMONY VIEW */
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-gradient-to-br from-[#EBF5FB] via-[#F4F9FD] to-[#DDF0FC] rounded-2xl p-8 sm:p-12 shadow-2xl border border-sky-200 text-center relative overflow-hidden"
            >
              {/* Envelope flap lines */}
              <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-sky-200/50 to-transparent pointer-events-none" />
              <div className="absolute inset-x-8 top-0 h-32 border-b border-sky-300/60 [clip-path:polygon(0_0,50%_100%,100%_0)] bg-white/70 shadow-sm" />

              <div className="relative z-10 pt-16 pb-6 flex flex-col items-center">
                <span className="text-xs uppercase tracking-widest text-sky-800 font-semibold mb-2">
                  Official Wedding Invitation
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-slate-800 font-medium tracking-tight mb-2">
                  Celeste &amp; Liam
                </h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto mb-8">
                  Saturday, June 20, 2026 · Newport, Rhode Island
                </p>

                {/* Wax Seal Centerpiece */}
                <div className="my-4 flex flex-col items-center">
                  <WaxSeal size={84} onClick={handleOpenEnvelope} monogram="C&L" />
                  <p className="mt-4 text-xs font-medium text-sky-700 tracking-wide">
                    Tap the blue wax seal to reveal your formal invitation
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-center gap-3">
                  <button
                    onClick={handleOpenEnvelope}
                    className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg shadow-sm transition-all hover:shadow-md cursor-pointer flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    Open Digital Invitation
                  </button>
                </div>
              </div>

              {/* Envelope bottom edge detail */}
              <div className="mt-8 text-xs text-slate-400">
                Sky Blue &amp; Pure White Coastal Celebration
              </div>
            </motion.div>
          ) : (
            /* OPENED FORMAL INVITATION CARD */
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="bg-white rounded-2xl shadow-2xl border-2 border-sky-100 overflow-hidden relative"
              id="printable-wedding-card"
            >
              {/* Subtle Sky Blue Border Liner */}
              <div className="p-2 sm:p-3 bg-gradient-to-r from-sky-100 via-sky-50 to-sky-100">
                <div className="bg-white rounded-xl p-6 sm:p-10 border border-sky-200/80 relative">
                  
                  {/* Decorative corner flourishes */}
                  <div className="absolute top-3 left-3 w-8 h-8 border-t-2 border-l-2 border-sky-300 rounded-tl-sm pointer-events-none" />
                  <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-sky-300 rounded-tr-sm pointer-events-none" />
                  <div className="absolute bottom-3 left-3 w-8 h-8 border-b-2 border-l-2 border-sky-300 rounded-bl-sm pointer-events-none" />
                  <div className="absolute bottom-3 right-3 w-8 h-8 border-b-2 border-r-2 border-sky-300 rounded-br-sm pointer-events-none" />

                  {/* Top Crest */}
                  <div className="flex justify-center mb-4">
                    <SkyBlueBotanicalCrest size={90} />
                  </div>

                  {/* Header Prose */}
                  <div className="text-center space-y-3 mb-6">
                    <p className="text-xs tracking-[0.25em] uppercase text-sky-700 font-medium">
                      Together with their families
                    </p>
                    
                    <h2 className="font-serif text-3xl sm:text-5xl text-slate-900 font-normal tracking-tight">
                      Celeste Marie Laurent
                    </h2>
                    <p className="font-script text-2xl sm:text-3xl text-sky-500 py-0.5">
                      and
                    </p>
                    <h2 className="font-serif text-3xl sm:text-5xl text-slate-900 font-normal tracking-tight">
                      Liam Alexander Vance
                    </h2>

                    <p className="font-serif text-base sm:text-lg text-slate-700 italic max-w-md mx-auto pt-2">
                      request the honour of your presence as they exchange vows and celebrate the sacred covenant of marriage
                    </p>
                  </div>

                  {/* Date, Time & Venue Block */}
                  <div className="my-6 py-6 border-y border-sky-100 bg-sky-50/40 rounded-xl px-4 text-center space-y-3">
                    <div className="flex items-center justify-center gap-2 text-slate-800 font-serif text-lg sm:text-xl font-medium">
                      <Calendar className="w-5 h-5 text-sky-600 shrink-0" />
                      <span>Saturday, the Twentieth of June, Two Thousand Twenty-Six</span>
                    </div>

                    <div className="flex items-center justify-center gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-sky-600" />
                        At half past four in the afternoon
                      </span>
                    </div>

                    <div className="flex flex-col items-center justify-center text-sm text-slate-700 pt-1">
                      <div className="flex items-center gap-1.5 font-medium text-slate-900">
                        <MapPin className="w-4 h-4 text-sky-600 shrink-0" />
                        <span>{weddingInfo.venueName}</span>
                      </div>
                      <span className="text-slate-500 text-xs mt-0.5">
                        {weddingInfo.venueAddress} · {weddingInfo.city}, {weddingInfo.stateCountry}
                      </span>
                    </div>
                  </div>

                  {/* Attire & Reception Kicker */}
                  <div className="text-center space-y-1 mb-8">
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Dinner, Dancing &amp; Merriment to follow
                    </p>
                    <p className="text-xs text-sky-800 font-medium">
                      Dress Code: Coastal Formal · Sky Blue &amp; White Accents Cherished
                    </p>
                  </div>

                  {/* Personalized Guest Pass Section */}
                  <div className="bg-sky-50/70 rounded-xl p-4 border border-sky-200/70 mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-sky-900">
                          <UserCheck className="w-4 h-4 text-sky-600" />
                          <span>Personalized Digital Pass</span>
                        </div>
                        <p className="text-xs text-slate-500">Enter your name for your personalized keepsake pass:</p>
                      </div>
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Guest Name(s)"
                        className="px-3 py-1.5 text-xs bg-white border border-sky-200 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800 max-w-xs"
                      />
                    </div>

                    <div className="mt-3 pt-3 border-t border-sky-200/50 flex items-center justify-between text-xs text-slate-600">
                      <span className="font-serif italic text-slate-800">
                        Guest: <strong className="font-semibold text-sky-900">{guestName || 'Honored Guest'}</strong>
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-sky-700">
                        <QrCode className="w-3.5 h-3.5" />
                        Pass ID: CL-2026-VIP
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons Toolbar */}
                  <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
                    <button
                      onClick={() => {
                        onClose();
                        onOpenRsvp();
                      }}
                      className="px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-medium rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
                    >
                      Joyfully RSVP Now
                    </button>

                    <button
                      onClick={handleDownloadCalendar}
                      className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <Calendar className="w-3.5 h-3.5 text-sky-600" />
                      Add to Calendar (.ics)
                    </button>

                    <button
                      onClick={handlePrintPass}
                      className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <Download className="w-3.5 h-3.5 text-sky-600" />
                      {passDownloaded ? 'Ready to Print!' : 'Print / Save Pass'}
                    </button>

                    <button
                      onClick={handleShare}
                      className="px-3 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                      title="Copy Invitation Link"
                    >
                      {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
                      <span>{copiedLink ? 'Copied' : 'Share'}</span>
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
