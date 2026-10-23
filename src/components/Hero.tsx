import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Mail, Heart, Clock } from 'lucide-react';
import { SeasideArchIllustration, SkyBlueBotanicalCrest } from './FloralMotifs';
import { weddingInfo } from '../data/weddingData';

interface HeroProps {
  onOpenInvitation: () => void;
  onOpenRsvp: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenInvitation, onOpenRsvp }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(weddingInfo.targetDate).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-sky-50/30">
      {/* Decorative ambient background gradients */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-sky-200/40 via-sky-100/30 to-blue-200/20 blur-3xl -z-10 pointer-events-none rounded-full" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Split Screen Hero: Left Column Typography, Right Column Visual Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16">
          
          {/* Left Column (7 cols): Editorial Typography */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Elegant Sub-Kicker (Zero pill discipline: unboxed text with bullet separator) */}
            <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">
              <span>Wedding Celebration</span>
              <span aria-hidden="true" className="text-sky-300">·</span>
              <span>June 20, 2026</span>
              <span aria-hidden="true" className="text-sky-300">·</span>
              <span>Newport, Rhode Island</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-slate-900 tracking-tight leading-[1.08] [text-wrap:balance]">
              Where the sea meets the sky, we begin our forever.
            </h1>

            {/* Couple Names in Serif & Calligraphy */}
            <div className="flex items-center justify-center lg:justify-start gap-3 py-1">
              <span className="font-serif text-2xl sm:text-3xl text-slate-800 font-medium">Celeste Laurent</span>
              <span className="font-script text-3xl sm:text-4xl text-sky-500">&amp;</span>
              <span className="font-serif text-2xl sm:text-3xl text-slate-800 font-medium">Liam Vance</span>
            </div>

            {/* Lead Copy */}
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              We warmly invite you to celebrate our union at Villa Cerulean. An enchanting seaside celebration enveloped in tones of sky blue, crisp white petals, coastal breezes, and starlight.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={onOpenInvitation}
                className="px-6 py-3.5 bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-2 group whitespace-nowrap"
              >
                <Mail className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span>Open Digital Invitation</span>
              </button>

              <button
                onClick={onOpenRsvp}
                className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 text-sm font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-2 whitespace-nowrap"
              >
                <Heart className="w-4 h-4 text-sky-500" />
                <span>RSVP to Ceremony</span>
              </button>
            </div>

            {/* Ceremony Quick Details */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-500 border-t border-sky-100">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-sky-600" />
                Saturday, June 20, 2026
              </span>
              <span className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-600" />
                4:30 PM Ceremony
              </span>
              <span className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-sky-600" />
                Villa Cerulean, Newport
              </span>
            </div>
          </div>

          {/* Right Column (5 cols): Seaside Wedding Arch Visual Container */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full relative shadow-lg rounded-2xl border border-sky-200/80 bg-white p-2">
              <SeasideArchIllustration />
              
              {/* Floating Monogram Stamp overlay */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-xs p-2 rounded-xl shadow-xs border border-sky-100 hidden sm:block">
                <SkyBlueBotanicalCrest size={56} />
              </div>

              {/* Caption banner below image */}
              <div className="px-4 py-3 bg-white flex items-center justify-between text-xs text-slate-600">
                <span className="font-serif italic text-slate-800">Ceremony by the Blue Horizon</span>
                <span className="text-sky-700 font-medium">Villa Cerulean Lawn</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Full-Width Countdown Strip below the split */}
        <div className="mt-8 pt-8 border-t border-sky-200/60">
          <div className="text-center mb-6">
            <span className="text-xs uppercase tracking-widest text-sky-800 font-semibold">
              Counting Down to the Vows
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 max-w-3xl mx-auto">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map((unit) => (
              <div
                key={unit.label}
                className="bg-white rounded-xl p-4 sm:p-5 text-center border border-sky-100 shadow-xs"
              >
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-slate-900 tabular-nums leading-none">
                  {String(unit.value).padStart(2, '0')}
                </div>
                <div className="text-xs uppercase tracking-wider text-sky-700 font-medium mt-2">
                  {unit.label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
