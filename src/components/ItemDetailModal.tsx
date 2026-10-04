import React, { useEffect } from 'react';
import { ArrowLeft, X, Utensils, Wine } from 'lucide-react';
import { Language, MenuItem } from '../types';
import { UI_TEXT } from '../data/translations';
import { sound, triggerHaptic } from '../utils/audio';
import { LanguageSwitcher } from './LanguageSwitcher';

interface ItemDetailModalProps {
  item: MenuItem;
  section: 'kitchen' | 'bar';
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onClose: () => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  section,
  lang,
  onLanguageChange,
  onClose,
}) => {
  const isKitchen = section === 'kitchen';

  useEffect(() => {
    // Scroll to top when item opens
    window.scrollTo({ top: 0, behavior: 'instant' });
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleBack();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleBack = () => {
    sound.playTap();
    triggerHaptic('tap');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#07080b] flex flex-col justify-between animate-in fade-in duration-300">
      {/* Floating Top Bar with BACK Button */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-gradient-to-b from-[#07080b]/95 via-[#07080b]/75 to-transparent flex items-center justify-between backdrop-blur-sm pointer-events-auto">
        <div className="flex items-center gap-2">
          <button
            onClick={handleBack}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-950/90 border ${
              isKitchen ? 'border-cyan-400/50 text-cyan-300' : 'border-pink-500/50 text-pink-300'
            } hover:scale-105 active:scale-95 transition-all text-xs font-bold tracking-wider font-tech uppercase shadow-2xl`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{UI_TEXT[lang].back}</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher
            currentLang={lang}
            onLanguageChange={onLanguageChange}
          />
          
          <button
            onClick={handleBack}
            aria-label={UI_TEXT[lang].close}
            className="p-2 rounded-xl bg-zinc-950/90 border border-white/20 text-zinc-300 hover:text-white active:scale-95 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 pb-24">
        {/* Large Crisp High-Res Dish/Drink Image */}
        <div className="relative w-full h-80 sm:h-96 md:h-[460px] overflow-hidden bg-zinc-950">
          <img
            src={item.image}
            alt={item.name[lang]}
            className="w-full h-full object-cover object-center filter brightness-95"
          />
          {/* Gradient shadows */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-[#07080b]/20 to-transparent" />
          <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-[#07080b]/80 to-transparent" />

          {/* Section badge indicator */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <div
              className={`p-1.5 rounded-lg border bg-black/70 ${
                isKitchen
                  ? 'border-cyan-400 text-cyan-300 shadow-[0_0_10px_#00e5ff]'
                  : 'border-pink-500 text-pink-300 shadow-[0_0_10px_#ff2a85]'
              }`}
            >
              {isKitchen ? <Utensils className="w-4 h-4" /> : <Wine className="w-4 h-4" />}
            </div>
            <span className="text-xs font-bold font-tech uppercase tracking-widest text-zinc-300">
              GARAGE 73 • {isKitchen ? UI_TEXT[lang].kitchen : UI_TEXT[lang].bar}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="max-w-2xl mx-auto px-4 -mt-2 relative z-10">
          {/* Title & Price Header Card */}
          <div className="p-5 rounded-2xl bg-zinc-950/90 border border-white/10 backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-black font-stencil tracking-wide text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                  {item.name[lang]}
                </h1>

                {/* English sub-title if different language */}
                {lang !== 'en' && (
                  <p className="text-xs text-zinc-400 font-tech uppercase tracking-wider mt-1">
                    {item.name.en}
                  </p>
                )}

                {/* Metadata specs: weight, volume, ABV */}
                <div className="flex items-center gap-3 mt-2.5 text-xs font-tech text-zinc-300">
                  {item.weight && (
                    <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10">
                      {UI_TEXT[lang].portion}: <strong className="text-white">{item.weight}</strong>
                    </span>
                  )}
                  {item.volume && (
                    <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10">
                      {UI_TEXT[lang].volume}: <strong className="text-white">{item.volume}</strong>
                    </span>
                  )}
                  {item.abv && (
                    <span
                      className={`px-2 py-0.5 rounded bg-zinc-900 border ${
                        isKitchen ? 'border-cyan-400/40 text-cyan-300' : 'border-pink-500/40 text-pink-300'
                      }`}
                    >
                      {UI_TEXT[lang].abv}: <strong>{item.abv}</strong>
                    </span>
                  )}
                </div>
              </div>

              {/* Price Neon Tag */}
              <div className="sm:text-right flex items-baseline sm:flex-col justify-start">
                <div className="flex items-baseline gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/40 border border-yellow-400/50 shadow-[0_0_15px_rgba(255,230,0,0.3)]">
                  <span className="text-2xl sm:text-3xl font-black font-stencil tracking-wider text-yellow-300 drop-shadow-[0_0_10px_#ffe600]">
                    {item.price.toFixed(2)}
                  </span>
                  <span className="text-lg font-black font-stencil text-yellow-400">
                    ₼
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* INGREDIENTS SECTION (for food) */}
          {item.ingredients && (
            <div className="mt-4 p-5 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-md">
              <h2 className="text-xs font-bold font-tech uppercase tracking-widest text-cyan-400 flex items-center gap-1.5 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00e5ff]" />
                {UI_TEXT[lang].ingredients}
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed font-sans font-medium">
                {item.ingredients[lang]}
              </p>
            </div>
          )}

          {/* DESCRIPTION SECTION */}
          {item.description && (
            <div className="mt-4 p-5 rounded-2xl bg-zinc-950/80 border border-white/10 backdrop-blur-md">
              <h2 className="text-xs font-bold font-tech uppercase tracking-widest text-amber-400 flex items-center gap-1.5 mb-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 shadow-[0_0_6px_#ffe600]" />
                {UI_TEXT[lang].description}
              </h2>
              <p className="text-sm text-zinc-300 leading-relaxed font-sans">
                {item.description[lang]}
              </p>
            </div>
          )}

          {/* Prominent Bottom BACK Button */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={handleBack}
              className={`w-full max-w-sm flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-zinc-950/90 border ${
                isKitchen
                  ? 'border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:bg-cyan-950/40'
                  : 'border-pink-500 text-pink-300 shadow-[0_0_20px_rgba(255,42,133,0.4)] hover:bg-pink-950/40'
              } text-base font-extrabold font-stencil tracking-widest uppercase active:scale-95 transition-all`}
            >
              <ArrowLeft className="w-5 h-5" />
              <span>{UI_TEXT[lang].back}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
