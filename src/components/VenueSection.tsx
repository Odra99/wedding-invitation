import React, { useState } from 'react';
import {
  MapPin,
  Compass,
  Plane,
  Bed,
  Check,
  ExternalLink,
  ShieldCheck,
  Copy
} from 'lucide-react';
import { weddingInfo } from '../data/weddingData';

export const VenueSection: React.FC = () => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    const fullAddress = `${weddingInfo.venueName}, ${weddingInfo.venueAddress}, ${weddingInfo.city}, ${weddingInfo.stateCountry}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(fullAddress);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    }
  };

  return (
    <section id="venue" className="py-20 bg-sky-50/20 border-t border-sky-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-sky-700 font-semibold mb-2">
            <span>Location &amp; Travel</span>
            <span aria-hidden="true">·</span>
            <span>Newport, Rhode Island</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-normal tracking-tight">
            Villa Cerulean &amp; Conservatory
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Perched atop the ocean bluffs overlooking Rhode Island Sound, offering panoramic sea views and starlit evening salons.
          </p>
        </div>

        {/* Venue Marquee Card & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column (7 cols): Venue Card & Map Coordinates */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-sky-100 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-sky-100">
              <div>
                <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
                  The Ceremony &amp; Reception Grounds
                </span>
                <h3 className="font-serif text-2xl text-slate-900 font-medium mt-1">
                  {weddingInfo.venueName}
                </h3>
                <p className="text-sm text-slate-600 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-sky-500 shrink-0" />
                  <span>{weddingInfo.venueAddress}, {weddingInfo.city}, {weddingInfo.stateCountry}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyAddress}
                  className="px-3.5 py-2 text-xs font-medium bg-sky-50 hover:bg-sky-100 text-sky-800 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                >
                  {copiedAddress ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-sky-600" />}
                  <span>{copiedAddress ? 'Address Copied!' : 'Copy Address'}</span>
                </button>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(weddingInfo.venueName + ' ' + weddingInfo.venueAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 text-xs font-medium bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Stylized Map View Box */}
            <div className="relative rounded-xl overflow-hidden bg-sky-50 border border-sky-200/80 p-6 text-center">
              <div className="max-w-md mx-auto space-y-3">
                <div className="w-12 h-12 rounded-full bg-white shadow-xs border border-sky-200 mx-auto flex items-center justify-center text-sky-600">
                  <Compass className="w-6 h-6 animate-pulse" />
                </div>
                <h4 className="font-serif text-lg text-slate-900 font-medium">
                  Coastal Route &amp; Ocean Access
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Located along Ocean Drive. Follow Azure Coastline Boulevard until the private stone gate marked with the Celeste &amp; Liam wedding sign and white floral wreaths.
                </p>
                <div className="text-[11px] text-sky-700 font-mono pt-1">
                  GPS: 41.4820° N, 71.3280° W · Newport Sound
                </div>
              </div>
            </div>

            {/* Valet & Parking note */}
            <div className="flex items-center gap-3 text-xs text-slate-600 bg-sky-50/50 p-4 rounded-xl border border-sky-100">
              <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0" />
              <span>
                <strong>Complimentary Valet Parking:</strong> Attendants will greet you at the main gate and handle all guest parking with ease throughout the evening.
              </span>
            </div>
          </div>

          {/* Right Column (5 cols): Travel, Airports & Hotels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Travel & Flights */}
            <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                  <Plane className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg text-slate-900 font-medium">
                  Nearby Airports
                </h3>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="pb-2.5 border-b border-slate-100">
                  <div className="font-semibold text-slate-800 flex justify-between">
                    <span>Rhode Island T.F. Green (PVD)</span>
                    <span className="text-sky-700 font-medium">35 mins</span>
                  </div>
                  <p className="text-slate-500 mt-0.5">Closest airport with easy rental car or rideshare to Newport.</p>
                </div>

                <div>
                  <div className="font-semibold text-slate-800 flex justify-between">
                    <span>Boston Logan Intl (BOS)</span>
                    <span className="text-sky-700 font-medium">75 mins</span>
                  </div>
                  <p className="text-slate-500 mt-0.5">Major hub for international flights with direct highway route.</p>
                </div>
              </div>
            </div>

            {/* Recommended Accommodations */}
            <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-xs space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600">
                  <Bed className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg text-slate-900 font-medium">
                  Guest Hotel Room Blocks
                </h3>
              </div>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="p-3 bg-sky-50/50 rounded-lg border border-sky-100">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-slate-800">The Newport Harbor Hotel</span>
                    <span className="text-sky-700 font-medium">Code: CELESTE26</span>
                  </div>
                  <p className="text-slate-500 mt-1">Waterfront boutique resort with dedicated wedding shuttle.</p>
                </div>

                <div className="p-3 bg-sky-50/50 rounded-lg border border-sky-100">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-slate-800">The Vanderbilt Coastal Inn</span>
                    <span className="text-sky-700 font-medium">Code: LIAM2026</span>
                  </div>
                  <p className="text-slate-500 mt-1">Charming historic retreat located 10 minutes from Villa Cerulean.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
