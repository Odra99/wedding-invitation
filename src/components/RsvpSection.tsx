import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Send,
  Sparkles,
  User,
  Mail,
  Music,
  Utensils,
  AlertCircle,
  Edit3
} from 'lucide-react';
import type { RsvpSubmission } from '../types/wedding';

interface RsvpSectionProps {
  onRsvpSuccess?: (submission: RsvpSubmission) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ onRsvpSuccess }) => {
  const STORAGE_KEY = 'celeste_liam_wedding_rsvp';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState<'joyfully_accept' | 'regretfully_decline'>('joyfully_accept');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [plusOneName, setPlusOneName] = useState('');
  const [dietary, setDietary] = useState('none');
  const [dietaryNotes, setDietaryNotes] = useState('');
  const [songRequest, setSongRequest] = useState('');
  const [personalNote, setPersonalNote] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<RsvpSubmission | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  // Load existing RSVP if user previously answered
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as RsvpSubmission;
        setSubmittedData(parsed);
        setSubmitted(true);
        // Pre-fill inputs
        setFullName(parsed.fullName);
        setEmail(parsed.email);
        setAttending(parsed.attending);
        setGuestCount(parsed.guestCount);
        setPlusOneName(parsed.plusOneName || '');
        setDietary(parsed.dietaryRestrictions || 'none');
        setDietaryNotes(parsed.dietaryNotes || '');
        setSongRequest(parsed.songRequest || '');
        setPersonalNote(parsed.personalNote || '');
      }
    } catch {
      // Ignore localStorage parse error
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailPattern.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const newSubmission: RsvpSubmission = {
      id: 'rsvp-' + Date.now(),
      fullName: fullName.trim(),
      email: email.trim(),
      attending,
      guestCount: attending === 'joyfully_accept' ? guestCount : 0,
      plusOneName: attending === 'joyfully_accept' && guestCount > 1 ? plusOneName.trim() : undefined,
      dietaryRestrictions: dietary,
      dietaryNotes: dietaryNotes.trim(),
      songRequest: songRequest.trim(),
      personalNote: personalNote.trim(),
      submittedAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      })
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newSubmission));
    } catch {
      // Storage unavailable
    }

    setSubmittedData(newSubmission);
    setSubmitted(true);
    setShowCelebration(true);

    if (onRsvpSuccess) {
      onRsvpSuccess(newSubmission);
    }

    setTimeout(() => {
      setShowCelebration(false);
    }, 4000);
  };

  const handleEdit = () => {
    setSubmitted(false);
  };

  return (
    <section id="rsvp" className="py-20 bg-sky-50/40 border-t border-sky-100 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-sky-700 font-semibold mb-2">
            <span>Kindly Respond</span>
            <span aria-hidden="true">·</span>
            <span>By May 15, 2026</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-normal tracking-tight">
            Reserve Your Place by the Sea
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Please let us know if you will celebrate with us in Newport. We can’t wait to share our special day with you.
          </p>
        </div>

        {/* Celebration Banner when submitted */}
        {showCelebration && (
          <div className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-emerald-800 text-sm flex items-center justify-center gap-2 animate-bounce">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span>Thank you, {submittedData?.fullName}! Your RSVP has been received with love.</span>
          </div>
        )}

        {submitted && submittedData ? (
          /* Confirmation Screen */
          <div className="bg-white rounded-2xl p-8 sm:p-10 border border-sky-200 shadow-sm text-center max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center mx-auto mb-4 text-sky-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-widest text-sky-700 font-semibold">
              RSVP Confirmed
            </span>

            <h3 className="font-serif text-2xl text-slate-900 font-medium mt-1">
              {submittedData.attending === 'joyfully_accept'
                ? 'We Are Thrilled You’re Coming!'
                : 'You Will Be Missed!'}
            </h3>

            <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
              {submittedData.attending === 'joyfully_accept'
                ? `We have reserved ${submittedData.guestCount} seat(s) for ${submittedData.fullName}${
                    submittedData.plusOneName ? ` and ${submittedData.plusOneName}` : ''
                  }. A confirmation email was recorded for ${submittedData.email}.`
                : `Thank you for letting us know, ${submittedData.fullName}. You will be warmly in our hearts on June 20th.`}
            </p>

            <div className="my-6 p-4 bg-sky-50/60 rounded-xl border border-sky-100 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="font-semibold text-sky-900">
                  {submittedData.attending === 'joyfully_accept' ? 'Joyfully Attending' : 'Regretfully Declining'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Party Size:</span>
                <span className="font-medium text-slate-800">{submittedData.guestCount} guest(s)</span>
              </div>
              {submittedData.dietaryRestrictions !== 'none' && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Dietary:</span>
                  <span className="font-medium text-slate-800 capitalize">{submittedData.dietaryRestrictions}</span>
                </div>
              )}
              {submittedData.songRequest && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Song Request:</span>
                  <span className="font-medium text-slate-800 italic">"{submittedData.songRequest}"</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleEdit}
                className="px-4 py-2 text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5 text-sky-600" />
                <span>Update Response</span>
              </button>
            </div>
          </div>
        ) : (
          /* RSVP Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-6 sm:p-10 border border-sky-100 shadow-sm space-y-6 max-w-2xl mx-auto"
          >
            {errorMessage && (
              <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-lg flex items-center gap-2 text-xs text-rose-700">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Attendance Choice Buttons */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-3">
                Will you be attending? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttending('joyfully_accept')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    attending === 'joyfully_accept'
                      ? 'border-sky-500 bg-sky-50/70 text-sky-950 ring-1 ring-sky-500'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      attending === 'joyfully_accept' ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-300'
                    }`}
                  >
                    {attending === 'joyfully_accept' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <div>
                    <span className="font-serif text-base font-medium block">Joyfully Accepts</span>
                    <span className="text-[11px] text-slate-500">I will celebrate with you!</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setAttending('regretfully_decline')}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-3 ${
                    attending === 'regretfully_decline'
                      ? 'border-slate-400 bg-slate-50 text-slate-900 ring-1 ring-slate-400'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                      attending === 'regretfully_decline' ? 'border-slate-600 bg-slate-600 text-white' : 'border-slate-300'
                    }`}
                  >
                    {attending === 'regretfully_decline' && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <div>
                    <span className="font-serif text-base font-medium block">Regretfully Declines</span>
                    <span className="text-[11px] text-slate-500">Will toast from afar</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Guest Name & Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g., Sarah Jenkins"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="sarah@example.com"
                    className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 focus:border-sky-500 text-slate-800"
                  />
                </div>
              </div>
            </div>

            {/* If Attending: Additional options */}
            {attending === 'joyfully_accept' && (
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Total Attending in Party
                    </label>
                    <select
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800"
                    >
                      <option value={1}>1 Guest (Just myself)</option>
                      <option value={2}>2 Guests (Myself + Plus One)</option>
                      <option value={3}>3 Guests (Family)</option>
                      <option value={4}>4 Guests (Family)</option>
                    </select>
                  </div>

                  {guestCount > 1 && (
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Plus One / Companion Name(s)
                      </label>
                      <input
                        type="text"
                        value={plusOneName}
                        onChange={(e) => setPlusOneName(e.target.value)}
                        placeholder="Companion Full Name"
                        className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800"
                      />
                    </div>
                  )}
                </div>

                {/* Dietary Requirements */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Dietary Preferences
                    </label>
                    <div className="relative">
                      <Utensils className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <select
                        value={dietary}
                        onChange={(e) => setDietary(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800"
                      >
                        <option value="none">No Dietary Restrictions</option>
                        <option value="vegetarian">Vegetarian</option>
                        <option value="vegan">Vegan</option>
                        <option value="gluten_free">Gluten-Free</option>
                        <option value="halal">Halal</option>
                        <option value="kosher">Kosher</option>
                        <option value="other">Allergies / Special (specify)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      DJ Song Request
                    </label>
                    <div className="relative">
                      <Music className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={songRequest}
                        onChange={(e) => setSongRequest(e.target.value)}
                        placeholder="Song & Artist you want to dance to"
                        className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Loving Note / Wishes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                A Note or Blessing for Celeste &amp; Liam
              </label>
              <textarea
                rows={3}
                value={personalNote}
                onChange={(e) => setPersonalNote(e.target.value)}
                placeholder="Share your warm thoughts or advice for the happy couple..."
                className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 text-slate-800 resize-none"
              />
            </div>

            {/* Submit button */}
            <div className="pt-2 text-center">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 bg-sky-500 hover:bg-sky-600 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 mx-auto"
              >
                <Send className="w-4 h-4" />
                <span>Confirm &amp; Send RSVP</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </section>
  );
};
