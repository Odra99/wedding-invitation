import React from 'react';
import { scheduleList } from '../data/weddingData';
import {
  GlassWater,
  Heart,
  Wine,
  Utensils,
  Cake,
  Sparkles,
  MapPin,
  Info
} from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  GlassWater: <GlassWater className="w-5 h-5 text-sky-600" />,
  Heart: <Heart className="w-5 h-5 text-sky-600" />,
  Wine: <Wine className="w-5 h-5 text-sky-600" />,
  Utensils: <Utensils className="w-5 h-5 text-sky-600" />,
  Cake: <Cake className="w-5 h-5 text-sky-600" />,
  Sparkles: <Sparkles className="w-5 h-5 text-sky-600" />
};

export const ScheduleSection: React.FC = () => {
  return (
    <section id="schedule" className="py-20 bg-white border-t border-sky-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-sky-700 font-semibold mb-2">
            <span>Order of Events</span>
            <span aria-hidden="true">·</span>
            <span>Saturday, June 20, 2026</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-normal tracking-tight">
            The Wedding Day Itinerary
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            From the afternoon ocean breeze to twilight dancing beneath the stars, here is what we have planned for our celebration.
          </p>
        </div>

        {/* Schedule Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scheduleList.map((item, index) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-6 border border-sky-100 hover:border-sky-300 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center shrink-0 border border-sky-100">
                      {iconMap[item.iconName] || <Heart className="w-5 h-5 text-sky-600" />}
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider text-sky-700 font-semibold">
                        0{index + 1}. Event
                      </span>
                      <h3 className="font-serif text-xl text-slate-900 font-medium leading-snug">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Tabular Time Label */}
                  <span className="font-mono text-xs font-semibold text-slate-700 bg-sky-50/80 px-2.5 py-1 rounded-md border border-sky-100 whitespace-nowrap shrink-0 tabular-nums">
                    {item.time}
                  </span>
                </div>

                <div className="text-xs font-medium text-sky-800 mb-2">
                  {item.subtitle}
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                <span className="truncate">{item.location}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Guest Note */}
        <div className="mt-12 bg-sky-50/60 rounded-xl p-5 border border-sky-100 flex items-start gap-3.5 max-w-2xl mx-auto">
          <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
          <div className="text-xs text-slate-600 leading-relaxed">
            <strong className="font-semibold text-slate-800 block mb-0.5">Prompt Arrival Requested:</strong>
            Guests are encouraged to arrive by 3:45 PM to enjoy welcome refreshments and find their seats before the bridal procession begins promptly at 4:30 PM.
          </div>
        </div>

      </div>
    </section>
  );
};
