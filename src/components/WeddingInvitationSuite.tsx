import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Clock,
  MapPin,
  Share2,
  Check,
  Sparkles,
  Send,
  AlertCircle,
  ExternalLink,
  Bed,
  Plane,
  Edit2,
  Printer,
  Undo2,
  BookmarkCheck,
  CheckCircle2
} from 'lucide-react';
import { SkyBlueBotanicalCrest, WaxSeal } from './FloralMotifs';
import { weddingInfo, scheduleList, registryList, initialGuestbookEntries } from '../data/weddingData';
import type { RsvpSubmission, GuestbookEntry } from '../types/wedding';

interface WeddingInvitationSuiteProps {
  onOpenNextJsGuide: () => void;
}

export const WeddingInvitationSuite: React.FC<WeddingInvitationSuiteProps> = ({
  onOpenNextJsGuide
}) => {
  const RSVP_STORAGE_KEY = 'celeste_liam_wedding_rsvp';
  const GUESTBOOK_STORAGE_KEY = 'celeste_liam_guestbook_entries';
  const GUEST_NAME_KEY = 'celeste_liam_guest_name';

  // Envelope state
  const [isOpened, setIsOpened] = useState(false);
  const [guestName, setGuestName] = useState('Our Cherished Guest');
  const [isEditingGuest, setIsEditingGuest] = useState(false);
  const [activeCard, setActiveCard] = useState<'invitation' | 'rsvp' | 'schedule' | 'venue' | 'attire' | 'registry' | 'guestbook'>('invitation');
  const [viewMode, setViewMode] = useState<'card' | 'booklet'>('card');
  const [copiedLink, setCopiedLink] = useState(false);

  // RSVP Form state
  const [rsvpFullName, setRsvpFullName] = useState('');
  const [rsvpEmail, setRsvpEmail] = useState('');
  const [rsvpAttending, setRsvpAttending] = useState<'joyfully_accept' | 'regretfully_decline'>('joyfully_accept');
  const [rsvpGuestCount, setRsvpGuestCount] = useState<number>(1);
  const [rsvpPlusOne, setRsvpPlusOne] = useState('');
  const [rsvpDietary, setRsvpDietary] = useState('none');
  const [rsvpSong, setRsvpSong] = useState('');
  const [rsvpNote, setRsvpNote] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpData, setRsvpData] = useState<RsvpSubmission | null>(null);
  const [rsvpError, setRsvpError] = useState('');

  // Guestbook state
  const [guestbookEntries, setGuestbookEntries] = useState<GuestbookEntry[]>(initialGuestbookEntries);
  const [gbAuthor, setGbAuthor] = useState('');
  const [gbRelation, setGbRelation] = useState('Friend');
  const [gbMessage, setGbMessage] = useState('');
  const [gbSuccess, setGbSuccess] = useState(false);


  // Countdown state
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Check saved guest name
    const savedName = localStorage.getItem(GUEST_NAME_KEY);
    if (savedName) setGuestName(savedName);

    // Check saved RSVP
    try {
      const storedRsvp = localStorage.getItem(RSVP_STORAGE_KEY);
      if (storedRsvp) {
        const parsed = JSON.parse(storedRsvp);
        setRsvpData(parsed);
        setRsvpSubmitted(true);
        setRsvpFullName(parsed.fullName);
        setRsvpEmail(parsed.email);
        setRsvpAttending(parsed.attending);
        setRsvpGuestCount(parsed.guestCount);
        setRsvpPlusOne(parsed.plusOneName || '');
        setRsvpDietary(parsed.dietaryRestrictions || 'none');
        setRsvpSong(parsed.songRequest || '');
        setRsvpNote(parsed.personalNote || '');
      }
    } catch {}

    // Check saved Guestbook
    try {
      const storedGb = localStorage.getItem(GUESTBOOK_STORAGE_KEY);
      if (storedGb) {
        const parsedGb = JSON.parse(storedGb);
        if (Array.isArray(parsedGb) && parsedGb.length > 0) {
          setGuestbookEntries(parsedGb);
        }
      }
    } catch {}

    // Countdown calculation
    const calcCountdown = () => {
      const target = new Date(weddingInfo.targetDate).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);
      setCountdown({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((diff % (1000 * 60)) / 1000)
      });
    };
    calcCountdown();
    const timer = setInterval(calcCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenEnvelope = () => {
    setIsOpened(true);
  };

  const handleSaveGuestName = () => {
    setIsEditingGuest(false);
    localStorage.setItem(GUEST_NAME_KEY, guestName);
    if (!rsvpFullName) {
      setRsvpFullName(guestName);
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleDownloadCalendar = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Celeste & Liam Wedding Invitation//EN',
      'BEGIN:VEVENT',
      'SUMMARY:Wedding of Celeste & Liam',
      'DESCRIPTION:Celebrating the marriage of Celeste Laurent & Liam Vance. Dress Code: Sky Blue & Pure White.',
      'LOCATION:Villa Cerulean\\, 480 Azure Coastline Blvd\\, Newport\\, RI',
      'DTSTART:20260620T203000Z',
      'DTEND:20260621T040000Z',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'Celeste-and-Liam-Wedding-Invitation.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpError('');

    if (!rsvpFullName.trim()) {
      setRsvpError('Please provide your full name.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!rsvpEmail.trim() || !emailPattern.test(rsvpEmail)) {
      setRsvpError('Please provide a valid email address.');
      return;
    }

    const submission: RsvpSubmission = {
      id: 'rsvp-' + Date.now(),
      fullName: rsvpFullName.trim(),
      email: rsvpEmail.trim(),
      attending: rsvpAttending,
      guestCount: rsvpAttending === 'joyfully_accept' ? rsvpGuestCount : 0,
      plusOneName: rsvpAttending === 'joyfully_accept' && rsvpGuestCount > 1 ? rsvpPlusOne.trim() : undefined,
      dietaryRestrictions: rsvpDietary,
      songRequest: rsvpSong.trim(),
      personalNote: rsvpNote.trim(),
      submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(submission));
    setRsvpData(submission);
    setRsvpSubmitted(true);

    // If a personal note was entered, append to guestbook
    if (rsvpNote.trim()) {
      const gbEntry: GuestbookEntry = {
        id: 'gb-rsvp-' + Date.now(),
        name: rsvpFullName.trim(),
        relationship: rsvpAttending === 'joyfully_accept' ? 'Cherished Guest' : 'Sending Wishes',
        message: rsvpNote.trim(),
        date: 'Just now'
      };
      const updatedGb = [gbEntry, ...guestbookEntries];
      setGuestbookEntries(updatedGb);
      localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(updatedGb));
    }
  };

  const handlePostGuestbook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gbAuthor.trim() || !gbMessage.trim()) return;

    const entry: GuestbookEntry = {
      id: 'gb-' + Date.now(),
      name: gbAuthor.trim(),
      relationship: gbRelation,
      message: gbMessage.trim(),
      date: 'Just now'
    };
    const updated = [entry, ...guestbookEntries];
    setGuestbookEntries(updated);
    localStorage.setItem(GUESTBOOK_STORAGE_KEY, JSON.stringify(updated));
    setGbAuthor('');
    setGbMessage('');
    setGbSuccess(true);
    setTimeout(() => setGbSuccess(false), 2500);
  };

  const invitationCards = [
    { id: 'invitation', label: 'Formal Invitation', icon: '💌' },
    { id: 'rsvp', label: 'RSVP Response Card', icon: '🕊️' },
    { id: 'schedule', label: 'Order of Events', icon: '📜' },
    { id: 'venue', label: 'Venue & Travel', icon: '🏛️' },
    { id: 'attire', label: 'Dress Code & Palette', icon: '🎨' },
    { id: 'registry', label: 'Wishing Well', icon: '🎁' },
    { id: 'guestbook', label: 'Guestbook Wishes', icon: '✍️' }
  ];

  return (
    <div className="min-h-screen bg-wedding-pattern py-8 sm:py-12 px-3 sm:px-6 relative overflow-x-hidden">
      
      {/* Top Header Bar for the Invitation Suite */}
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-serif text-xl sm:text-2xl text-slate-800 font-medium tracking-tight">
            Celeste &amp; Liam
          </span>
          <span className="hidden sm:inline text-xs text-slate-400">|</span>
          <span className="hidden sm:inline text-xs uppercase tracking-widest text-sky-700 font-semibold">
            The Wedding Invitation
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isOpened && (
            <button
              onClick={() => setIsOpened(false)}
              className="px-3 py-1.5 text-xs font-medium bg-white hover:bg-sky-50 text-sky-800 border border-sky-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs whitespace-nowrap"
              title="Close and re-seal envelope"
            >
              <Undo2 className="w-3.5 h-3.5" />
              <span>Reseal Envelope</span>
            </button>
          )}

          <button
            onClick={onOpenNextJsGuide}
            className="px-3 py-1.5 text-xs font-medium bg-sky-50 hover:bg-sky-100 text-sky-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
            title="Next.js Source Code & Guide"
          >
            <span>Next.js Code</span>
          </button>
        </div>
      </div>

      {/* Main Suite Container */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {!isOpened ? (
            /* ========================================================
               1. SEALED ENVELOPE ARRIVAL VIEW
               The site starts as the sealed sky-blue & white envelope
               ======================================================== */
            <motion.div
              key="sealed-envelope"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94, y: -20 }}
              transition={{ duration: 0.35 }}
              className="relative max-w-2xl mx-auto"
            >
              {/* Outer Envelope Card */}
              <div className="bg-[#EBF5FB] rounded-2xl shadow-xl border-2 border-sky-200 overflow-hidden relative p-8 sm:p-14 text-center">
                
                {/* Envelope Fold Triangular Flap */}
                <div className="absolute top-0 inset-x-0 h-44 [clip-path:polygon(0_0,50%_100%,100%_0)] bg-gradient-to-b from-white/90 via-[#F3F9FD] to-[#DCEEFA] shadow-md border-b border-sky-200 pointer-events-none" />

                {/* Postage Stamp in Top-Right Corner */}
                <div className="absolute top-6 right-6 w-20 h-24 bg-white border-2 border-dashed border-sky-300 rounded-sm p-1.5 flex flex-col items-center justify-between shadow-2xs rotate-2 hidden sm:flex">
                  <div className="w-full flex justify-between text-[8px] text-sky-600 font-bold uppercase tracking-widest">
                    <span>USA</span>
                    <span>2026</span>
                  </div>
                  <SkyBlueBotanicalCrest size={44} />
                  <span className="text-[7px] text-sky-800 font-serif uppercase tracking-wider font-semibold">
                    LOVE · CELESTE &amp; LIAM
                  </span>
                </div>

                {/* Circular Newport Postmark Stamp */}
                <div className="absolute top-8 right-24 w-18 h-18 rounded-full border border-sky-400/60 flex flex-col items-center justify-center -rotate-12 pointer-events-none hidden sm:flex">
                  <span className="text-[7px] font-bold tracking-widest text-sky-600">NEWPORT RI</span>
                  <span className="text-[6px] tracking-wider text-sky-500 font-mono">20 JUN 2026</span>
                  <span className="text-[6px] tracking-widest text-sky-600">AIR MAIL</span>
                </div>

                {/* Main Envelope Body Content */}
                <div className="relative z-10 pt-16 sm:pt-20 pb-4 flex flex-col items-center">
                  
                  {/* Addressing Calligraphy */}
                  <div className="mb-8 w-full max-w-md">
                    <p className="font-script text-2xl sm:text-3xl text-sky-600 mb-1">
                      To our cherished guest
                    </p>

                    {isEditingGuest ? (
                      <div className="flex items-center justify-center gap-2 mt-2">
                        <input
                          type="text"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          placeholder="Your Name(s)"
                          className="px-3 py-1.5 text-center text-sm font-serif font-semibold text-slate-800 bg-white border border-sky-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-400"
                          autoFocus
                        />
                        <button
                          onClick={handleSaveGuestName}
                          className="px-3 py-1.5 bg-sky-500 text-white text-xs font-medium rounded-md hover:bg-sky-600"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <div className="group flex items-center justify-center gap-2 cursor-pointer" onClick={() => setIsEditingGuest(true)}>
                        <h2 className="font-serif text-2xl sm:text-3xl text-slate-800 font-medium underline decoration-sky-300 underline-offset-4">
                          {guestName}
                        </h2>
                        <Edit2 className="w-3.5 h-3.5 text-sky-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}

                    <p className="text-xs text-slate-500 mt-2 tracking-wide">
                      You are cordially invited to celebrate the marriage of
                    </p>
                    <p className="font-serif text-xl sm:text-2xl text-slate-900 font-medium tracking-tight mt-1">
                      Celeste Laurent &amp; Liam Vance
                    </p>
                  </div>

                  {/* 3D Sky Blue Wax Seal Centerpiece */}
                  <div className="my-3 flex flex-col items-center">
                    <WaxSeal size={88} onClick={handleOpenEnvelope} monogram="C&L" />
                    <button
                      onClick={handleOpenEnvelope}
                      className="mt-4 px-6 py-2.5 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white text-xs uppercase tracking-widest font-semibold rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Break Wax Seal &amp; Open Invitation</span>
                    </button>
                  </div>

                  {/* Wedding Date & City Kicker */}
                  <div className="mt-8 flex items-center gap-3 text-xs text-slate-600 border-t border-sky-200/80 pt-4">
                    <span>Saturday, June 20, 2026</span>
                    <span className="text-sky-300">·</span>
                    <span>Villa Cerulean</span>
                    <span className="text-sky-300">·</span>
                    <span>Newport, Rhode Island</span>
                  </div>

                </div>

              </div>
            </motion.div>
          ) : (
            /* ========================================================
               2. THE OPENED INVITATION SUITE
               The site is the full luxury stationery invitation suite
               ======================================================== */
            <motion.div
              key="opened-suite"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="space-y-8"
            >
              
              {/* Invitation Suite Navigation Tabs (Like pulling individual cards from an invitation pocket) */}
              <div className="bg-white rounded-2xl p-2 sm:p-3 border border-sky-100 shadow-sm">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 px-2">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-800">
                    <BookmarkCheck className="w-4 h-4 text-sky-500" />
                    <span>Stationery Enclosure Cards</span>
                  </div>

                  <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs">
                    <button
                      onClick={() => setViewMode('card')}
                      className={`px-3 py-1 rounded-md font-medium transition-colors ${
                        viewMode === 'card'
                          ? 'bg-white text-sky-900 shadow-2xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Card View
                    </button>
                    <button
                      onClick={() => setViewMode('booklet')}
                      className={`px-3 py-1 rounded-md font-medium transition-colors ${
                        viewMode === 'booklet'
                          ? 'bg-white text-sky-900 shadow-2xs font-semibold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      All Cards (Continuous)
                    </button>
                  </div>
                </div>

                {/* Enclosure Tab Buttons */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  {invitationCards.map((card) => {
                    const isActive = activeCard === card.id;
                    return (
                      <button
                        key={card.id}
                        onClick={() => {
                          setActiveCard(card.id as any);
                          if (viewMode === 'booklet') {
                            const el = document.getElementById(`card-${card.id}`);
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                          }
                        }}
                        className={`px-3 py-2 rounded-xl transition-all font-medium flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                          isActive
                            ? 'bg-sky-500 text-white shadow-xs font-semibold'
                            : 'bg-sky-50/60 hover:bg-sky-100/70 text-slate-700'
                        }`}
                      >
                        <span>{card.icon}</span>
                        <span>{card.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ========================================================
                  CARD 1: THE FORMAL WEDDING INVITATION (Primary Letterpress)
                  ======================================================== */}
              {(viewMode === 'booklet' || activeCard === 'invitation') && (
                <div
                  id="card-invitation"
                  className="bg-white rounded-2xl shadow-xl border-2 border-sky-100 overflow-hidden relative"
                >
                  {/* Sky blue ribbon banner accent */}
                  <div className="h-2 bg-gradient-to-r from-sky-300 via-sky-400 to-sky-300" />
                  
                  <div className="p-6 sm:p-12 border border-sky-100/60 m-3 sm:m-4 rounded-xl relative">
                    
                    {/* Delicate four-corner flourishes */}
                    <div className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-sky-300 pointer-events-none" />
                    <div className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-sky-300 pointer-events-none" />
                    <div className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-sky-300 pointer-events-none" />
                    <div className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-sky-300 pointer-events-none" />

                    {/* Top Botanical Crest */}
                    <div className="flex justify-center mb-6">
                      <SkyBlueBotanicalCrest size={96} />
                    </div>

                    {/* Formal Invitation Wording */}
                    <div className="text-center space-y-4 max-w-xl mx-auto">
                      <p className="text-xs uppercase tracking-[0.28em] text-sky-800 font-semibold">
                        Together with their families
                      </p>

                      <div className="space-y-1 py-1">
                        <h1 className="font-serif text-3xl sm:text-5xl text-slate-900 font-normal tracking-tight">
                          Celeste Marie Laurent
                        </h1>
                        <p className="font-script text-3xl sm:text-4xl text-sky-500 py-1">
                          and
                        </p>
                        <h1 className="font-serif text-3xl sm:text-5xl text-slate-900 font-normal tracking-tight">
                          Liam Alexander Vance
                        </h1>
                      </div>

                      <p className="font-serif italic text-base sm:text-lg text-slate-700 max-w-lg mx-auto pt-2 leading-relaxed">
                        request the honour of your presence to celebrate their wedding and the covenant of lifelong devotion
                      </p>

                      {/* Date & Time Ceremony Block */}
                      <div className="my-8 py-6 border-y border-sky-100 bg-sky-50/50 rounded-xl px-4 text-center space-y-3">
                        <div className="flex items-center justify-center gap-2 text-slate-900 font-serif text-xl sm:text-2xl font-medium">
                          <Calendar className="w-5 h-5 text-sky-600 shrink-0" />
                          <span>Saturday, the Twentieth of June</span>
                        </div>
                        <div className="text-xs uppercase tracking-[0.2em] text-sky-800 font-semibold">
                          Two Thousand Twenty-Six
                        </div>
                        <div className="flex items-center justify-center gap-2 text-sm text-slate-700">
                          <Clock className="w-4 h-4 text-sky-600" />
                          <span>At half past four in the afternoon</span>
                        </div>

                        <div className="pt-2 text-slate-800 text-sm font-medium">
                          <div className="flex items-center justify-center gap-1.5">
                            <MapPin className="w-4 h-4 text-sky-600" />
                            <span>{weddingInfo.venueName}</span>
                          </div>
                          <p className="text-xs text-slate-500 font-normal mt-0.5">
                            {weddingInfo.venueAddress} · {weddingInfo.city}, {weddingInfo.stateCountry}
                          </p>
                        </div>
                      </div>

                      {/* Attire & Reception Kicker */}
                      <div className="space-y-1 text-center">
                        <p className="text-xs uppercase tracking-wider text-slate-500">
                          Dinner, Dancing &amp; Merriment to follow
                        </p>
                        <p className="text-xs text-sky-800 font-medium">
                          Attire: Coastal Formal · Accents of Sky Blue &amp; White Cherished
                        </p>
                      </div>

                      {/* Personalized Guest Badge */}
                      <div className="mt-6 pt-4 border-t border-sky-100/80 flex items-center justify-between text-xs text-slate-600">
                        <span className="font-serif italic text-slate-800">
                          Prepared especially for: <strong className="font-semibold text-sky-900">{guestName}</strong>
                        </span>
                        <span className="text-[11px] font-mono text-sky-700">
                          INVITATION № CL-2026
                        </span>
                      </div>

                      {/* Quick Action Buttons for the Invitation Card */}
                      <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
                        <button
                          onClick={() => {
                            setActiveCard('rsvp');
                            if (viewMode === 'booklet') {
                              document.getElementById('card-rsvp')?.scrollIntoView({ behavior: 'smooth' });
                            }
                          }}
                          className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold rounded-lg shadow-sm transition-all cursor-pointer flex items-center gap-2"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Reply to Invitation (RSVP)</span>
                        </button>

                        <button
                          onClick={handleDownloadCalendar}
                          className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Calendar className="w-3.5 h-3.5 text-sky-600" />
                          <span>Save to Calendar (.ics)</span>
                        </button>

                        <button
                          onClick={handlePrint}
                          className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <Printer className="w-3.5 h-3.5 text-sky-600" />
                          <span>Print Keepsake</span>
                        </button>

                        <button
                          onClick={handleShare}
                          className="px-3.5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5 text-slate-500" />}
                          <span>{copiedLink ? 'Copied' : 'Share'}</span>
                        </button>
                      </div>

                    </div>
                  </div>

                  {/* Countdown Bar inside the invitation */}
                  <div className="bg-sky-50/80 px-6 py-4 border-t border-sky-100 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs uppercase tracking-wider text-sky-800 font-semibold">
                      Countdown to the Vows:
                    </span>
                    <div className="flex items-center gap-4 text-xs font-mono font-semibold text-slate-800 tabular-nums">
                      <span><strong>{countdown.days}</strong> Days</span>
                      <span>·</span>
                      <span><strong>{countdown.hours}</strong> Hours</span>
                      <span>·</span>
                      <span><strong>{countdown.minutes}</strong> Mins</span>
                      <span>·</span>
                      <span><strong>{countdown.seconds}</strong> Secs</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================
                  CARD 2: RSVP RESPONSE CARD (Enclosure)
                  ======================================================== */}
              {(viewMode === 'booklet' || activeCard === 'rsvp') && (
                <div
                  id="card-rsvp"
                  className="bg-white rounded-2xl shadow-lg border border-sky-100 p-6 sm:p-10 relative"
                >
                  <div className="max-w-xl mx-auto">
                    <div className="text-center mb-8">
                      <span className="text-[11px] uppercase tracking-[0.25em] text-sky-700 font-semibold">
                        Formal Response Card
                      </span>
                      <h2 className="font-serif text-3xl text-slate-900 font-medium mt-1">
                        Kindly Reply by May 15, 2026
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Please indicate your attendance so we may reserve your seaside seat.
                      </p>
                    </div>

                    {rsvpSubmitted && rsvpData ? (
                      <div className="p-6 bg-sky-50/70 border border-sky-200 rounded-xl text-center space-y-3">
                        <div className="w-12 h-12 rounded-full bg-white shadow-2xs border border-sky-200 mx-auto flex items-center justify-center text-sky-600">
                          <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <h3 className="font-serif text-xl font-medium text-slate-900">
                          {rsvpData.attending === 'joyfully_accept' ? 'Response Received: Joyfully Attending' : 'Response Received: Regretfully Declining'}
                        </h3>
                        <p className="text-xs text-slate-600 max-w-sm mx-auto">
                          Thank you, {rsvpData.fullName}! Your response has been recorded.
                        </p>
                        <button
                          onClick={() => setRsvpSubmitted(false)}
                          className="px-4 py-1.5 text-xs font-medium text-sky-800 hover:text-sky-950 underline cursor-pointer"
                        >
                          Modify Response
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleRsvpSubmit} className="space-y-5">
                        {rsvpError && (
                          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{rsvpError}</span>
                          </div>
                        )}

                        {/* Acceptance Choice */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setRsvpAttending('joyfully_accept')}
                            className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                              rsvpAttending === 'joyfully_accept'
                                ? 'border-sky-500 bg-sky-50 text-sky-950 ring-1 ring-sky-400'
                                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <span className="font-serif text-base block font-medium">Accepts with Pleasure</span>
                            <span className="text-[11px] text-slate-500">I will be there to celebrate</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setRsvpAttending('regretfully_decline')}
                            className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                              rsvpAttending === 'regretfully_decline'
                                ? 'border-slate-400 bg-slate-50 text-slate-900 ring-1 ring-slate-400'
                                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <span className="font-serif text-base block font-medium">Declines with Regret</span>
                            <span className="text-[11px] text-slate-500">Will toast from afar</span>
                          </button>
                        </div>

                        {/* Inputs */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Guest Full Name *
                            </label>
                            <input
                              type="text"
                              required
                              value={rsvpFullName}
                              onChange={(e) => setRsvpFullName(e.target.value)}
                              placeholder="Your full name"
                              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1">
                              Email Address *
                            </label>
                            <input
                              type="email"
                              required
                              value={rsvpEmail}
                              onChange={(e) => setRsvpEmail(e.target.value)}
                              placeholder="email@example.com"
                              className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800"
                            />
                          </div>
                        </div>

                        {rsvpAttending === 'joyfully_accept' && (
                          <div className="space-y-4 pt-2 border-t border-slate-100">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                  Number of Guests
                                </label>
                                <select
                                  value={rsvpGuestCount}
                                  onChange={(e) => setRsvpGuestCount(Number(e.target.value))}
                                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800"
                                >
                                  <option value={1}>1 Guest (Just myself)</option>
                                  <option value={2}>2 Guests (Myself + Companion)</option>
                                  <option value={3}>3 Guests (Family)</option>
                                  <option value={4}>4 Guests (Family)</option>
                                </select>
                              </div>

                              {rsvpGuestCount > 1 && (
                                <div>
                                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                                    Companion Name
                                  </label>
                                  <input
                                    type="text"
                                    value={rsvpPlusOne}
                                    onChange={(e) => setRsvpPlusOne(e.target.value)}
                                    placeholder="Full name of companion"
                                    className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800"
                                  />
                                </div>
                              )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                  Dietary Preferences
                                </label>
                                <select
                                  value={rsvpDietary}
                                  onChange={(e) => setRsvpDietary(e.target.value)}
                                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800"
                                >
                                  <option value="none">No Restrictions</option>
                                  <option value="vegetarian">Vegetarian</option>
                                  <option value="vegan">Vegan</option>
                                  <option value="gluten-free">Gluten-Free</option>
                                  <option value="allergies">Allergies / Special</option>
                                </select>
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-slate-700 mb-1">
                                  Song Request for Reception
                                </label>
                                <input
                                  type="text"
                                  value={rsvpSong}
                                  onChange={(e) => setRsvpSong(e.target.value)}
                                  placeholder="Artist & Song Title"
                                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            A Personal Note for Celeste &amp; Liam
                          </label>
                          <textarea
                            rows={3}
                            value={rsvpNote}
                            onChange={(e) => setRsvpNote(e.target.value)}
                            placeholder="Send a toast or warm message with your RSVP..."
                            className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800 resize-none"
                          />
                        </div>

                        <div className="text-center pt-2">
                          <button
                            type="submit"
                            className="w-full sm:w-auto px-8 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-xs uppercase tracking-wider font-semibold rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 mx-auto"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Transmit Response</span>
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              )}

              {/* ========================================================
                  CARD 3: ORDER OF EVENTS & SCHEDULE (Enclosure)
                  ======================================================== */}
              {(viewMode === 'booklet' || activeCard === 'schedule') && (
                <div
                  id="card-schedule"
                  className="bg-white rounded-2xl shadow-lg border border-sky-100 p-6 sm:p-10 relative"
                >
                  <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                      <span className="text-[11px] uppercase tracking-[0.25em] text-sky-700 font-semibold">
                        Celebration Order
                      </span>
                      <h2 className="font-serif text-3xl text-slate-900 font-medium mt-1">
                        Order of Events
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Saturday, June 20, 2026 · Villa Cerulean
                      </p>
                    </div>

                    <div className="space-y-4">
                      {scheduleList.map((item, idx) => (
                        <div
                          key={item.id}
                          className="flex items-start justify-between gap-4 p-4 rounded-xl bg-sky-50/50 border border-sky-100/80 hover:bg-sky-50 transition-colors"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[11px] font-semibold text-sky-700 uppercase">
                                0{idx + 1}.
                              </span>
                              <h3 className="font-serif text-lg text-slate-900 font-medium">
                                {item.title}
                              </h3>
                            </div>
                            <p className="text-xs text-slate-600">
                              {item.description}
                            </p>
                            <span className="text-[11px] text-sky-800 font-medium block mt-1">
                              Location: {item.location}
                            </span>
                          </div>

                          <span className="font-mono text-xs font-semibold text-slate-700 bg-white px-2.5 py-1 rounded-md border border-slate-200 tabular-nums shrink-0">
                            {item.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================
                  CARD 4: VENUE & TRAVEL (Enclosure)
                  ======================================================== */}
              {(viewMode === 'booklet' || activeCard === 'venue') && (
                <div
                  id="card-venue"
                  className="bg-white rounded-2xl shadow-lg border border-sky-100 p-6 sm:p-10 relative"
                >
                  <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                      <span className="text-[11px] uppercase tracking-[0.25em] text-sky-700 font-semibold">
                        Location &amp; Accommodations
                      </span>
                      <h2 className="font-serif text-3xl text-slate-900 font-medium mt-1">
                        Villa Cerulean &amp; Conservatory
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        480 Azure Coastline Boulevard · Newport, Rhode Island
                      </p>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-sky-50/60 p-5 rounded-xl border border-sky-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="text-xs uppercase tracking-wider text-sky-800 font-semibold">
                            Seaside Estate Grounds
                          </div>
                          <div className="font-serif text-lg text-slate-900 font-medium mt-0.5">
                            Villa Cerulean Lawn &amp; Starlight Ballroom
                          </div>
                          <p className="text-xs text-slate-500 mt-1">
                            Complimentary valet parking will be available at the main gate.
                          </p>
                        </div>

                        <a
                          href={`https://maps.google.com/?q=${encodeURIComponent('Villa Cerulean Newport RI')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg flex items-center gap-1.5 whitespace-nowrap shrink-0 self-start sm:self-auto"
                        >
                          <span>Open in Maps</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>

                      {/* Travel & Lodging Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl border border-slate-200/80 bg-white space-y-2">
                          <div className="flex items-center gap-2 text-sky-700 font-serif font-medium text-base">
                            <Plane className="w-4 h-4" />
                            <span>Travel / Airports</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            <strong>T.F. Green (PVD)</strong>: 35 minutes via rideshare or rental.
                            <br />
                            <strong>Boston Logan (BOS)</strong>: 75 minutes.
                          </p>
                        </div>

                        <div className="p-4 rounded-xl border border-slate-200/80 bg-white space-y-2">
                          <div className="flex items-center gap-2 text-sky-700 font-serif font-medium text-base">
                            <Bed className="w-4 h-4" />
                            <span>Hotel Room Blocks</span>
                          </div>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            <strong>The Newport Harbor Hotel</strong>
                            <br />
                            Discount Code: <code className="bg-sky-50 px-1 rounded text-sky-900 font-semibold">CELESTE26</code>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================
                  CARD 5: ATTIRE & PALETTE GUIDE (Enclosure)
                  ======================================================== */}
              {(viewMode === 'booklet' || activeCard === 'attire') && (
                <div
                  id="card-attire"
                  className="bg-white rounded-2xl shadow-lg border border-sky-100 p-6 sm:p-10 relative"
                >
                  <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                      <span className="text-[11px] uppercase tracking-[0.25em] text-sky-700 font-semibold">
                        Styling Suggestions
                      </span>
                      <h2 className="font-serif text-3xl text-slate-900 font-medium mt-1">
                        Sky Blue &amp; Pure White Attire
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Coastal formal styling to match the seaside celebration.
                      </p>
                    </div>

                    {/* Color Swatches */}
                    <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 flex-wrap">
                      {weddingInfo.themeColors.map((color) => (
                        <div key={color.name} className="flex flex-col items-center text-center">
                          <div
                            className="w-12 h-12 rounded-full border-2 border-white shadow-2xs mb-1.5"
                            style={{ backgroundColor: color.hex }}
                          />
                          <span className="text-xs font-semibold text-slate-800">{color.name}</span>
                          <span className="text-[10px] font-mono text-slate-400">{color.hex}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-600 leading-relaxed">
                      <div className="p-4 bg-sky-50/50 rounded-xl border border-sky-100 space-y-1">
                        <strong className="font-serif text-sm font-medium text-slate-900 block">Ladies</strong>
                        <p>Flowing midi or floor-length dresses in tones of sky blue, powder blue, soft floral prints, or elegant neutrals. Block heels are recommended for the outdoor lawn ceremony.</p>
                      </div>

                      <div className="p-4 bg-sky-50/50 rounded-xl border border-sky-100 space-y-1">
                        <strong className="font-serif text-sm font-medium text-slate-900 block">Gentlemen</strong>
                        <p>Tailored lightweight suits or blazers in navy, stone grey, or slate blue, paired with crisp white dress shirts. Sky blue ties or pocket squares are a lovely touch.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================
                  CARD 6: WISHING WELL & REGISTRY (Enclosure)
                  ======================================================== */}
              {(viewMode === 'booklet' || activeCard === 'registry') && (
                <div
                  id="card-registry"
                  className="bg-white rounded-2xl shadow-lg border border-sky-100 p-6 sm:p-10 relative"
                >
                  <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                      <span className="text-[11px] uppercase tracking-[0.25em] text-sky-700 font-semibold">
                        With Love &amp; Gratitude
                      </span>
                      <h2 className="font-serif text-3xl text-slate-900 font-medium mt-1">
                        Our Wishing Well
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Your presence is our treasured gift. If you wish to bless us, you may contribute to our new beginning.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      {registryList.slice(0, 2).map((item) => (
                        <div key={item.id} className="p-5 bg-sky-50/50 rounded-xl border border-sky-100 space-y-2">
                          <span className="text-[11px] uppercase tracking-wider text-sky-800 font-semibold">
                            {item.category}
                          </span>
                          <h3 className="font-serif text-lg text-slate-900 font-medium">
                            {item.title}
                          </h3>
                          <p className="text-xs text-slate-600">
                            {item.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs space-y-1.5 text-center">
                      <p className="font-medium text-slate-800">Direct Registry &amp; Wishing Well Details:</p>
                      <p className="text-slate-600">Venmo: <strong>@CelesteAndLiam-Wedding</strong> · Zelle: <strong>celeste.laurent@wedding2026.com</strong></p>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================
                  CARD 7: GUESTBOOK WISHES (Enclosure)
                  ======================================================== */}
              {(viewMode === 'booklet' || activeCard === 'guestbook') && (
                <div
                  id="card-guestbook"
                  className="bg-white rounded-2xl shadow-lg border border-sky-100 p-6 sm:p-10 relative"
                >
                  <div className="max-w-2xl mx-auto">
                    <div className="text-center mb-8">
                      <span className="text-[11px] uppercase tracking-[0.25em] text-sky-700 font-semibold">
                        Love Notes
                      </span>
                      <h2 className="font-serif text-3xl text-slate-900 font-medium mt-1">
                        Guestbook Blessings
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Leave a heartfelt wish for Celeste &amp; Liam on their wedding invitation.
                      </p>
                    </div>

                    {/* Quick post form */}
                    <form onSubmit={handlePostGuestbook} className="bg-sky-50/50 p-4 rounded-xl border border-sky-100 space-y-3 mb-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          value={gbAuthor}
                          onChange={(e) => setGbAuthor(e.target.value)}
                          placeholder="Your Name"
                          className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800"
                        />
                        <select
                          value={gbRelation}
                          onChange={(e) => setGbRelation(e.target.value)}
                          className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800"
                        >
                          <option value="Friend">Friend</option>
                          <option value="Family">Family Member</option>
                          <option value="Colleague">Colleague</option>
                          <option value="Well Wisher">Well Wisher</option>
                        </select>
                      </div>

                      <textarea
                        required
                        rows={2}
                        value={gbMessage}
                        onChange={(e) => setGbMessage(e.target.value)}
                        placeholder="Write your blessings for the bride &amp; groom..."
                        className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg text-slate-800 resize-none"
                      />

                      <div className="flex items-center justify-between">
                        {gbSuccess ? (
                          <span className="text-xs text-emerald-600 font-medium">Blessing added!</span>
                        ) : (
                          <span className="text-[11px] text-slate-400">Recorded directly into the invitation</span>
                        )}
                        <button
                          type="submit"
                          className="px-4 py-1.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-medium rounded-lg cursor-pointer"
                        >
                          Post Note
                        </button>
                      </div>
                    </form>

                    {/* Entries List */}
                    <div className="space-y-3">
                      {guestbookEntries.slice(0, 4).map((entry) => (
                        <div key={entry.id} className="p-3.5 bg-white rounded-lg border border-slate-100 shadow-2xs">
                          <div className="flex justify-between items-baseline mb-1">
                            <span className="font-serif text-sm font-medium text-slate-900">{entry.name}</span>
                            <span className="text-[10px] text-sky-700">{entry.relationship}</span>
                          </div>
                          <p className="font-serif italic text-xs text-slate-600">“{entry.message}”</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};
