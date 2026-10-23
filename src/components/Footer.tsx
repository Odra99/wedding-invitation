import React from 'react';
import { weddingInfo } from '../data/weddingData';

interface FooterProps {
  onOpenInvitation: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenInvitation }) => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-12 border-t border-sky-900/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center space-y-6">
          
          {/* Couple Monogram Crest in White/Sky Blue */}
          <div className="w-16 h-16 rounded-full bg-slate-800/80 border border-sky-500/40 flex items-center justify-center">
            <span className="font-serif text-2xl font-medium tracking-widest text-sky-300">
              C &amp; L
            </span>
          </div>

          <div className="space-y-1">
            <h3 className="font-serif text-3xl font-normal text-white tracking-tight">
              Celeste &amp; Liam
            </h3>
            <p className="text-xs tracking-[0.2em] uppercase text-sky-300 font-medium">
              {weddingInfo.weddingDate} · {weddingInfo.city}, {weddingInfo.stateCountry}
            </p>
          </div>

          <p className="font-serif italic text-sm text-slate-300 max-w-md mx-auto">
            “With grateful hearts, we thank each of you for being part of our love story.”
          </p>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium pt-2">
            <a href="#invitation" onClick={(e) => { e.preventDefault(); onOpenInvitation(); }} className="hover:text-sky-300 transition-colors">
              Digital Invitation
            </a>
            <a href="#story" className="hover:text-sky-300 transition-colors">
              Our Story
            </a>
            <a href="#schedule" className="hover:text-sky-300 transition-colors">
              Schedule
            </a>
            <a href="#venue" className="hover:text-sky-300 transition-colors">
              Venue
            </a>
            <a href="#rsvp" className="hover:text-sky-300 transition-colors">
              RSVP
            </a>
            <a href="#registry" className="hover:text-sky-300 transition-colors">
              Gift Registry
            </a>
            <a href="#guestbook" className="hover:text-sky-300 transition-colors">
              Guestbook
            </a>
          </div>

          {/* Quiet Copyright */}
          <div className="pt-8 border-t border-slate-800/80 w-full text-center text-xs text-slate-500">
            <p>© 2026 Celeste Laurent &amp; Liam Vance. Crafted with sky blue &amp; white coastal love.</p>
          </div>

        </div>
      </div>
    </footer>
  );
};
