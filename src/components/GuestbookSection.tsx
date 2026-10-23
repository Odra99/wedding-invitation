import React, { useState, useEffect } from 'react';
import { MessageSquareHeart, Send, Heart, Sparkles } from 'lucide-react';
import { initialGuestbookEntries } from '../data/weddingData';
import type { GuestbookEntry } from '../types/wedding';

export const GuestbookSection: React.FC<{ newEntryFromRsvp?: GuestbookEntry | null }> = ({
  newEntryFromRsvp
}) => {
  const STORAGE_KEY = 'celeste_liam_guestbook_entries';

  const [entries, setEntries] = useState<GuestbookEntry[]>(initialGuestbookEntries);
  const [authorName, setAuthorName] = useState('');
  const [relationship, setRelationship] = useState('Friend');
  const [messageText, setMessageText] = useState('');
  const [justPosted, setJustPosted] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setEntries(parsed);
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  // Sync if new entry arrived from RSVP note
  useEffect(() => {
    if (newEntryFromRsvp) {
      setEntries((prev) => {
        const updated = [newEntryFromRsvp, ...prev];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {}
        return updated;
      });
    }
  }, [newEntryFromRsvp]);

  const handlePostMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !messageText.trim()) return;

    const newEntry: GuestbookEntry = {
      id: 'gb-' + Date.now(),
      name: authorName.trim(),
      relationship: relationship.trim() || 'Guest',
      message: messageText.trim(),
      date: 'Just now'
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {}

    setAuthorName('');
    setMessageText('');
    setJustPosted(true);
    setTimeout(() => setJustPosted(false), 3000);
  };

  return (
    <section id="guestbook" className="py-20 bg-white border-t border-sky-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-sky-700 font-semibold mb-2">
            <span>Warm Wishes</span>
            <span aria-hidden="true">·</span>
            <span>Guestbook Wall</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-normal tracking-tight">
            Words of Love &amp; Blessings
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Leave a note of love, wisdom, or celebration for Celeste and Liam as they embark on this lifelong voyage.
          </p>
        </div>

        {/* Post a Note Form */}
        <div className="max-w-2xl mx-auto bg-sky-50/50 rounded-2xl p-6 sm:p-8 border border-sky-100 shadow-xs mb-14">
          <div className="flex items-center gap-2 text-sky-800 font-serif text-lg font-medium mb-4">
            <MessageSquareHeart className="w-5 h-5 text-sky-600" />
            <span>Sign the Couple’s Guestbook</span>
          </div>

          <form onSubmit={handlePostMessage} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="e.g. Aunt Claire &amp; Family"
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Relationship to Couple
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800"
                >
                  <option value="Friend">Friend</option>
                  <option value="Family">Family Member</option>
                  <option value="Colleague">Colleague / Peer</option>
                  <option value="Wedding Party">Wedding Party</option>
                  <option value="Well Wisher">Well Wisher</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Your Message or Toast *
              </label>
              <textarea
                required
                rows={3}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Write your wishes for the bride &amp; groom..."
                className="w-full px-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800 resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              {justPosted ? (
                <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Your message was posted!
                </span>
              ) : (
                <span className="text-xs text-slate-400">Notes appear live on the wall</span>
              )}

              <button
                type="submit"
                className="px-5 py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Blessing</span>
              </button>
            </div>
          </form>
        </div>

        {/* Guestbook Wishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-white rounded-xl p-6 border border-sky-100 shadow-xs flex flex-col justify-between hover:border-sky-300 transition-colors"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h4 className="font-serif text-lg text-slate-900 font-medium leading-snug">
                      {entry.name}
                    </h4>
                    <span className="text-xs text-sky-700 font-medium">
                      {entry.relationship}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap">
                    {entry.date}
                  </span>
                </div>

                <p className="font-serif italic text-sm text-slate-700 leading-relaxed">
                  “{entry.message}”
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1 text-sky-500">
                  <Heart className="w-3.5 h-3.5 fill-sky-200" />
                  <span>Blessing Recorded</span>
                </span>
                <span className="text-[10px] tracking-wider uppercase text-slate-400">
                  Villa Cerulean
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
