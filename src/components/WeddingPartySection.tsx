import React from 'react';
import { entourageList } from '../data/weddingData';

export const WeddingPartySection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-sky-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-sky-700 font-semibold mb-2">
            <span>Our Entourage</span>
            <span aria-hidden="true">·</span>
            <span>Family &amp; Best Friends</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-normal tracking-tight">
            The Wedding Party
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            The devoted companions standing beside us on our wedding day.
          </p>
        </div>

        {/* 3-in-a-Row Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {entourageList.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-xl p-6 border border-sky-100 hover:border-sky-300 shadow-xs transition-colors flex flex-col justify-between text-center"
            >
              <div>
                {/* Monogram or Avatar Circle */}
                <div className="w-16 h-16 rounded-full bg-sky-50 border border-sky-200 mx-auto flex items-center justify-center mb-4">
                  <span className="font-serif text-lg font-semibold text-sky-800">
                    {member.name.split(' ').map((n) => n[0]).join('')}
                  </span>
                </div>

                <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider block mb-1">
                  {member.role}
                </span>

                <h3 className="font-serif text-xl text-slate-900 font-medium">
                  {member.name}
                </h3>

                <span className="text-xs text-slate-400 block mt-0.5 mb-3">
                  {member.relation}
                </span>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {member.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-sky-800 font-medium">
                Celeste &amp; Liam Wedding Party
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
