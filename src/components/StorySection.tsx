import React from 'react';
import { storyMilestones } from '../data/weddingData';
import { Heart, MapPin } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="py-20 bg-sky-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-sky-700 font-semibold mb-2">
            <span>Our Journey</span>
            <span aria-hidden="true">·</span>
            <span>2021 – Forever</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-normal tracking-tight">
            How Two Souls Found Their Horizon
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            From an accidental conversation over tea in Newport to a lifetime of shared dreams under coastal skies.
          </p>
        </div>

        {/* Editorial Milestone Timeline */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-1/2 before:-translate-x-1/2 before:w-[1px] before:bg-sky-200 hidden md:block">
          {storyMilestones.map((milestone, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={milestone.id}
                className={`relative flex items-center justify-between gap-8 ${
                  isEven ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className="w-[45%] bg-white rounded-xl p-6 border border-sky-100 shadow-xs hover:border-sky-300 transition-colors">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-semibold text-sky-700 uppercase tracking-wider">
                      {milestone.tag}
                    </span>
                    <span>{milestone.date}</span>
                  </div>

                  <h3 className="font-serif text-xl text-slate-900 font-medium mb-1">
                    {milestone.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-sky-800 font-medium mb-3">
                    <MapPin className="w-3.5 h-3.5 text-sky-500" />
                    <span>{milestone.location}</span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>

                {/* Central Timeline Milestone Node */}
                <div className="absolute left-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border-2 border-sky-400 flex items-center justify-center shadow-xs z-10">
                  <span className="text-[11px] font-semibold text-sky-700">
                    {milestone.year.slice(2)}
                  </span>
                </div>

                {/* Counterbalance empty spacer */}
                <div className="w-[45%]" />
              </div>
            );
          })}
        </div>

        {/* Mobile View: Vertical Stack */}
        <div className="space-y-6 md:hidden">
          {storyMilestones.map((milestone) => (
            <div
              key={milestone.id}
              className="bg-white rounded-xl p-6 border border-sky-100 shadow-xs"
            >
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="font-semibold text-sky-700 uppercase tracking-wider">
                  {milestone.tag}
                </span>
                <span>{milestone.year}</span>
              </div>
              <h3 className="font-serif text-xl text-slate-900 font-medium mb-1">
                {milestone.title}
              </h3>
              <div className="flex items-center gap-1.5 text-xs text-sky-800 font-medium mb-3">
                <MapPin className="w-3.5 h-3.5 text-sky-500" />
                <span>{milestone.location}</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {milestone.description}
              </p>
            </div>
          ))}
        </div>

        {/* Heartfelt Quote Banner */}
        <div className="mt-14 p-8 bg-gradient-to-r from-sky-100/50 via-white to-sky-100/50 rounded-2xl border border-sky-200/70 text-center">
          <Heart className="w-6 h-6 text-sky-500 mx-auto mb-3" />
          <p className="font-serif italic text-lg sm:text-xl text-slate-800 max-w-xl mx-auto">
            “You are my today and all of my tomorrows.”
          </p>
          <span className="text-xs tracking-wider uppercase text-sky-800 font-medium mt-2 block">
            Leo Christopher
          </span>
        </div>

      </div>
    </section>
  );
};
