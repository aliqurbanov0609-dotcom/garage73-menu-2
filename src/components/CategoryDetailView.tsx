import React from 'react';
import { Language, MenuCategory, MenuItem } from '../types';
import { UI_TEXT } from '../data/translations';
import { sound, triggerHaptic } from '../utils/audio';
import { HeaderNav } from './HeaderNav';

interface CategoryDetailViewProps {
  category: MenuCategory;
  section: 'kitchen' | 'bar';
  lang: Language;
  onSelectItem: (item: MenuItem) => void;
  onBack: () => void;
  onHome: () => void;
  onLanguageChange: (lang: Language) => void;
}

export const CategoryDetailView: React.FC<CategoryDetailViewProps> = ({
  category,
  section,
  lang,
  onSelectItem,
  onBack,
  onHome,
  onLanguageChange,
}) => {
  const isKitchen = section === 'kitchen';
  const accentColor = isKitchen ? 'cyan' : 'pink';

  const handleItemClick = (item: MenuItem) => {
    sound.playTap();
    triggerHaptic('tap');
    onSelectItem(item);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col bg-[#07080b] text-white">
      {/* Background industrial wallpaper */}
      <div
        className="fixed inset-0 bg-cover bg-center pointer-events-none opacity-25 mix-blend-screen scale-100"
        style={{
          backgroundImage: `url('${isKitchen ? '/assets/backgrounds/kitchen-screen.jpg' : '/assets/backgrounds/bar-screen.jpg'}')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#07080b]/95 via-[#07080b]/80 to-[#07080b]" />
      </div>

      {/* Top Header with BACK and HOME */}
      <HeaderNav
        lang={lang}
        onLanguageChange={onLanguageChange}
        onBack={onBack}
        onHome={onHome}
        title={category.name[lang]}
        badge={isKitchen ? '🍴' : '🍸'}
      />

      <main className="relative z-10 flex-1 max-w-2xl mx-auto w-full pb-16">
        {/* Large High-Quality Hero Category Photo */}
        <div className="relative w-full h-56 sm:h-72 overflow-hidden border-b border-white/10 shadow-2xl">
          <img
            src={category.image}
            alt={category.name[lang]}
            className="w-full h-full object-cover object-center filter brightness-90"
          />
          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#07080b] via-[#07080b]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#07080b]/80 via-transparent to-transparent" />

          {/* Category Title Overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex flex-col">
            <span
              className={`text-xs font-bold font-tech uppercase tracking-widest ${
                isKitchen ? 'text-cyan-400 drop-shadow-[0_0_8px_#00e5ff]' : 'text-pink-400 drop-shadow-[0_0_8px_#ff2a85]'
              }`}
            >
              GARAGE 73 • {isKitchen ? UI_TEXT[lang].kitchen : UI_TEXT[lang].bar}
            </span>
            <h1 className="text-2xl sm:text-3xl font-black font-stencil tracking-wider text-yellow-300 drop-shadow-[0_0_12px_rgba(255,230,0,0.5)] mt-1">
              {category.name[lang]}
            </h1>
            {lang !== 'en' && (
              <p className="text-xs text-zinc-400 font-tech uppercase tracking-wider mt-0.5">
                {category.name.en}
              </p>
            )}
          </div>
        </div>

        {/* List of Dishes / Drinks */}
        <div className="px-4 mt-6 flex flex-col gap-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold font-tech uppercase tracking-widest text-zinc-400">
              {UI_TEXT[lang].itemsCount(category.items.length)}
            </span>
            <span className="text-xs text-zinc-500 font-tech">
              1 ₼ = 1 AZN
            </span>
          </div>

          {category.items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`group w-full relative flex gap-3.5 p-3 rounded-2xl bg-zinc-950/80 backdrop-blur-md border border-white/10 text-left transition-all duration-300 active:scale-[0.98] ${
                isKitchen
                  ? 'hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]'
                  : 'hover:border-pink-500/60 hover:shadow-[0_0_20px_rgba(255,42,133,0.2)]'
              }`}
            >
              {/* Item Thumbnail */}
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 rounded-xl overflow-hidden border border-white/10 bg-zinc-900">
                <img
                  src={item.image}
                  alt={item.name[lang]}
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Item Info */}
              <div className="flex-1 flex flex-col justify-between min-w-0 py-0.5">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-sm sm:text-base font-bold font-stencil tracking-wide text-white group-hover:text-yellow-300 transition-colors line-clamp-1">
                      {item.name[lang]}
                    </h3>
                  </div>

                  {/* Weight or Volume / ABV */}
                  <div className="flex items-center gap-2 mt-1 text-[11px] font-tech text-zinc-400">
                    {item.weight && <span>{item.weight}</span>}
                    {item.volume && <span>{item.volume}</span>}
                    {item.abv && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className={isKitchen ? 'text-cyan-400' : 'text-pink-400'}>
                          {item.abv} ABV
                        </span>
                      </>
                    )}
                  </div>

                  {/* Short Ingredients / Summary for Food & Description for Drinks */}
                  {item.ingredients ? (
                    <p className="mt-1.5 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {item.ingredients[lang]}
                    </p>
                  ) : item.description ? (
                    <p className="mt-1.5 text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {item.description[lang]}
                    </p>
                  ) : null}
                </div>

                {/* Price Display */}
                <div className="mt-2.5 flex items-center justify-between">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg sm:text-xl font-extrabold font-stencil tracking-wider text-yellow-300 drop-shadow-[0_0_8px_rgba(255,230,0,0.5)]">
                      {item.price.toFixed(2)}
                    </span>
                    <span className="text-sm font-black font-stencil text-yellow-400">
                      ₼
                    </span>
                  </div>

                  {/* Arrow Indicator */}
                  <span
                    className={`text-[11px] font-bold font-tech uppercase tracking-wider px-2 py-0.5 rounded border ${
                      isKitchen
                        ? 'border-cyan-400/40 text-cyan-300 group-hover:bg-cyan-950/60'
                        : 'border-pink-500/40 text-pink-300 group-hover:bg-pink-950/60'
                    } transition-colors`}
                  >
                    {lang === 'az' ? 'ƏTRAFLI' : lang === 'ru' ? 'ПОДРОБНЕЕ' : 'VIEW'}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
};
