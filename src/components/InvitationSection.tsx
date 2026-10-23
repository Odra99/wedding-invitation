import React from 'react';
import { Mail, Sparkles, Calendar, MapPin } from 'lucide-react';
import { SkyBlueBotanicalCrest, WaxSeal } from './FloralMotifs';

interface InvitationSectionProps {
  onOpenInvitation: () => void;
  onOpenRsvp: () => void;
}

export const InvitationSection: React.FC<InvitationSectionProps> = ({
  onOpenInvitation,
  onOpenRsvp
}) => {
  return (
    <section id="invitation" className="py-20 bg-white border-y border-sky-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-sky-700 font-semibold mb-2">
            <span>The Invitation Suite</span>
            <span aria-hidden="true">·</span>
            <span>Sky Blue &amp; White</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-normal tracking-tight">
            An Invitation Sealed with Love &amp; Sea Spray
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Every detail of our union has been handcrafted to reflect the serene elegance of Newport’s coastal skies. Open the digital envelope below to view your personalized ceremony suite.
          </p>
        </div>

        {/* Interactive Invitation Preview Card with Wax Seal */}
        <div className="relative max-w-3xl mx-auto bg-gradient-to-b from-[#F0F9FF] to-[#E0F2FE]/50 rounded-2xl p-6 sm:p-10 border border-sky-200/90 shadow-md overflow-hidden">
          
          {/* Subtle Watermark-free clean hairline border */}
          <div className="bg-white rounded-xl p-6 sm:p-10 border border-sky-100 shadow-sm relative">
            <div className="flex flex-col items-center text-center">
              
              <SkyBlueBotanicalCrest size={76} />

              <span className="text-[11px] uppercase tracking-[0.2em] text-sky-800 font-semibold mt-4 mb-2">
                Honoured Invitation
              </span>

              <h3 className="font-serif text-2xl sm:text-3xl text-slate-900 font-normal">
                Celeste Laurent &amp; Liam Vance
              </h3>

              <p className="font-serif italic text-slate-600 text-sm sm:text-base max-w-md mx-auto my-3">
                Request the honour of your company at the celebration of their wedding
              </p>

              <div className="my-3 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-700 font-medium">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-sky-600" />
                  Saturday, June 20, 2026
                </span>
                <span className="text-sky-300">·</span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-sky-600" />
                  Villa Cerulean, Newport RI
                </span>
              </div>

              {/* The Wax Seal Click Target */}
              <div className="my-6 flex flex-col items-center">
                <WaxSeal size={72} onClick={onOpenInvitation} monogram="C&L" />
                <span className="text-xs text-sky-700 font-medium mt-3">
                  Click the wax seal to unlock the full interactive pass &amp; music
                </span>
              </div>

              {/* Actions row */}
              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={onOpenInvitation}
                  className="px-5 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-medium rounded-lg shadow-xs transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Open Full Invitation Suite</span>
                </button>

                <button
                  onClick={onOpenRsvp}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5 text-sky-300" />
                  <span>Submit RSVP</span>
                </button>
              </div>

            </div>
          </div>

          {/* Invitation Specs footer */}
          <div className="mt-6 flex flex-wrap items-center justify-between text-xs text-slate-500 pt-2 border-t border-sky-200/50">
            <span>Includes: Digital Keepsake Pass · Calendar Integration · Directional Concierge</span>
            <span className="text-sky-800 font-medium">Palette: Sky Azure &amp; Pure White</span>
          </div>

        </div>

      </div>
    </section>
  );
};
