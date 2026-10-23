import React from 'react';
import { Sparkles, Sun, Shirt, Eye } from 'lucide-react';
import { weddingInfo } from '../data/weddingData';

export const DressCodeSection: React.FC = () => {
  return (
    <section className="py-20 bg-white border-t border-sky-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-sky-700 font-semibold mb-2">
            <span>Guest Attire Guide</span>
            <span aria-hidden="true">·</span>
            <span>Coastal Formal</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-normal tracking-tight">
            Sky Blue &amp; Pure White Palette
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            We invite our cherished guests to harmonize with the ocean atmosphere by incorporating our wedding color harmony into your celebration attire.
          </p>
        </div>

        {/* Color Swatches Strip */}
        <div className="max-w-3xl mx-auto bg-sky-50/50 p-6 rounded-2xl border border-sky-100 mb-12">
          <div className="text-center text-xs font-semibold uppercase tracking-wider text-slate-700 mb-4">
            Curated Color Swatches
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
            {weddingInfo.themeColors.map((color) => (
              <div key={color.name} className="flex flex-col items-center text-center">
                <div
                  className="w-14 h-14 rounded-full border-2 border-white shadow-sm flex items-center justify-center mb-2"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="text-xs font-semibold text-slate-800">{color.name}</span>
                <span className="text-[11px] font-mono text-slate-500">{color.hex}</span>
                <span className="text-[10px] text-slate-500 mt-1 line-clamp-2">{color.description}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Styling Advice 2-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          <div className="bg-white rounded-xl p-6 border border-sky-100 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5 text-sky-700">
              <Sparkles className="w-5 h-5 text-sky-500" />
              <h3 className="font-serif text-xl text-slate-900 font-medium">
                For the Ladies
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Cocktail or floor-length gowns, elegant jumpsuits, or summery coastal silhouettes. Accents of sky blue, powder blue, delicate floral patterns, and warm cream are warmly welcomed.
            </p>
            <div className="text-xs text-sky-800 pt-2 border-t border-slate-100 flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-sky-500 shrink-0" />
              <span>Block heels or dress flats are recommended for the grass lawn ceremony.</span>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-sky-100 shadow-xs space-y-3">
            <div className="flex items-center gap-2.5 text-sky-700">
              <Shirt className="w-5 h-5 text-sky-500" />
              <h3 className="font-serif text-xl text-slate-900 font-medium">
                For the Gentlemen
              </h3>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Tailored suits or lightweight linen blazers in navy, slate blue, or soft sand tones, paired with crisp white dress shirts and optional sky blue ties or pocket squares.
            </p>
            <div className="text-xs text-sky-800 pt-2 border-t border-slate-100 flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-sky-500 shrink-0" />
              <span>Ties are optional; light breathable coastal fabrics are encouraged.</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
