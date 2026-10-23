import React, { useState } from 'react';
import { registryList } from '../data/weddingData';
import {
  Gift,
  Plane,
  Home,
  CookingPot,
  HeartHandshake,
  Check
} from 'lucide-react';
import type { RegistryItem } from '../types/wedding';

const iconRegistry: Record<string, React.ReactNode> = {
  Plane: <Plane className="w-5 h-5 text-sky-600" />,
  Home: <Home className="w-5 h-5 text-sky-600" />,
  CookingPot: <CookingPot className="w-5 h-5 text-sky-600" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5 text-sky-600" />
};

export const RegistrySection: React.FC = () => {
  const [selectedFund, setSelectedFund] = useState<RegistryItem | null>(null);
  const [giftAmount, setGiftAmount] = useState<number>(100);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [giftCompleted, setGiftCompleted] = useState(false);

  const handleCopyAccount = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2500);
    }
  };

  const handleConfirmContribution = (e: React.FormEvent) => {
    e.preventDefault();
    setGiftCompleted(true);
    setTimeout(() => {
      setGiftCompleted(false);
      setSelectedFund(null);
    }, 2500);
  };

  return (
    <section id="registry" className="py-20 bg-sky-50/20 border-t border-sky-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-widest text-sky-700 font-semibold mb-2">
            <span>Gift Registry &amp; Wishing Well</span>
            <span aria-hidden="true">·</span>
            <span>With Gratitude</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-normal tracking-tight">
            Our Wishing Well
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Your presence at our wedding is the greatest gift of all. If you wish to bless us with a token of love, we have created funds to help build our new life and support causes close to our hearts.
          </p>
        </div>

        {/* Registry Funds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {registryList.map((item) => {
            const percentage = Math.min(100, Math.round((item.currentAmount / item.goalAmount) * 100));
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl p-6 border border-sky-100 hover:border-sky-300 shadow-xs transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-sky-50 flex items-center justify-center shrink-0 border border-sky-100">
                      {iconRegistry[item.icon] || <Gift className="w-5 h-5 text-sky-600" />}
                    </div>
                    <span className="text-[11px] font-semibold text-sky-800 uppercase tracking-wider bg-sky-50 px-2.5 py-1 rounded-md">
                      {item.category}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-slate-900 font-medium mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  {/* Progress bar */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex justify-between text-xs font-mono tabular-nums text-slate-600">
                      <span>${item.currentAmount.toLocaleString()} funded</span>
                      <span className="font-semibold text-sky-700">{percentage}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Suggested: ${item.suggestedContribution}
                  </span>
                  <button
                    onClick={() => {
                      setSelectedFund(item);
                      setGiftAmount(item.suggestedContribution);
                    }}
                    className="px-4 py-1.5 bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>Contribute with Love</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Contribution */}
        {selectedFund && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-xl border border-sky-100 relative">
              <button
                onClick={() => setSelectedFund(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm font-semibold"
              >
                ✕
              </button>

              <div className="text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mx-auto mb-3">
                  <Gift className="w-6 h-6" />
                </div>
                <span className="text-xs uppercase tracking-wider text-sky-700 font-semibold">
                  Contribute to
                </span>
                <h3 className="font-serif text-2xl text-slate-900 font-medium mt-1">
                  {selectedFund.title}
                </h3>
              </div>

              {giftCompleted ? (
                <div className="text-center py-6 space-y-2">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif text-xl font-medium text-slate-900">
                    Thank You Deeply!
                  </h4>
                  <p className="text-xs text-slate-600">
                    Your thoughtful blessing of ${giftAmount} means the world to Celeste &amp; Liam.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleConfirmContribution} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Select Contribution Amount:
                    </label>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {[50, 100, 150, 250].map((amt) => (
                        <button
                          key={amt}
                          type="button"
                          onClick={() => setGiftAmount(amt)}
                          className={`py-2 text-xs font-semibold rounded-lg border transition-colors ${
                            giftAmount === amt
                              ? 'border-sky-500 bg-sky-500 text-white'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Payment accounts */}
                  <div className="bg-sky-50/70 p-4 rounded-xl border border-sky-100 text-xs space-y-2">
                    <div className="font-semibold text-slate-800">
                      Transfer Details (Venmo / Zelle / Bank):
                    </div>
                    <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-md border border-slate-200">
                      <span>Venmo: <strong>@CelesteAndLiam-Wedding</strong></span>
                      <button
                        type="button"
                        onClick={() => handleCopyAccount('@CelesteAndLiam-Wedding')}
                        className="text-sky-600 hover:text-sky-800 text-[11px] font-medium"
                      >
                        {copiedAccount ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <div className="flex items-center justify-between bg-white px-3 py-1.5 rounded-md border border-slate-200">
                      <span>Zelle: <strong>celeste.laurent@wedding2026.com</strong></span>
                      <button
                        type="button"
                        onClick={() => handleCopyAccount('celeste.laurent@wedding2026.com')}
                        className="text-sky-600 hover:text-sky-800 text-[11px] font-medium"
                      >
                        {copiedAccount ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-xs font-medium rounded-lg transition-colors cursor-pointer"
                    >
                      Record Blessing of ${giftAmount}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
