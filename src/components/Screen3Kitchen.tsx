import React from 'react';
import { ChevronRight, Utensils } from 'lucide-react';
import { Language, MenuCategory } from '../types';
import { UI_TEXT } from '../data/translations';
import { sound, triggerHaptic } from '../utils/audio';
import { HeaderNav } from './HeaderNav';

interface Screen3KitchenProps {
  categories: MenuCategory[];
  lang: Language;
  onSelectCategory: (categoryId: string) => void;
  onBack: () => void;
  onHome: () => void;
  onLanguageChange: (lang: Language) => void;
}

export const Screen3Kitchen: React.FC<Screen3KitchenProps> = ({
  categories,
  lang,
  onSelectCategory,
  onBack,
  onHome,
  onLanguageChange,
}) => {
  const handleCategoryClick = (categoryId: string) => {
    sound.playTap();
    triggerHaptic('tap');
    onSelectCategory(categoryId);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col bg-[#08090d] text-white">
      {/* Background image: kitchen-screen.jpg */}
      <div
        className="fixed inset-0 bg-cover bg-center pointer-events-none opacity-40 mix-blend-screen scale-100"
        style={{
          backgroundImage: `url('/assets/backgrounds/kitchen-screen.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090d]/90 via-[#08090d]/70 to-[#08090d]/95" />
      </div>

      {/* Top Header */}
      <HeaderNav
        lang={lang}
        onLanguageChange={onLanguageChange}
        onBack={onBack}
        onHome={onHome}
        title={UI_TEXT[lang].kitchen}
        badge="🍴"
      />

      {/* Content Container */}
      <main className="relative z-10 flex-1 px-4 py-6 max-w-2xl mx-auto w-full">
        {/* Banner Title */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,229,255,0.25)] mb-2">
            <Utensils className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-bold tracking-widest uppercase font-tech text-cyan-300">
              {UI_TEXT[lang].kitchenSubtitle}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-stencil tracking-wider text-yellow-300 drop-shadow-[0_0_10px_rgba(255,230,0,0.4)]">
            {UI_TEXT[lang].kitchen}
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-12">
          {categories.map((cat, idx) => {
            const itemCount = cat.items.length;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-950/80 backdrop-blur-md hover:border-cyan-400/60 active:scale-[0.98] transition-all duration-300 text-left shadow-lg hover:shadow-[0_0_20px_rgba(0,229,255,0.25)]"
              >
                {/* Photo Thumbnail Banner */}
                <div className="relative h-32 w-full overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name[lang]}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  
                  {/* Category index badge */}
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/70 border border-white/15 text-[10px] font-mono text-zinc-300 font-bold">
                    0{idx + 1}
                  </div>

                  {/* Items count */}
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-400/40 text-[10px] font-tech text-cyan-300 font-bold">
                    {UI_TEXT[lang].itemsCount(itemCount)}
                  </div>
                </div>

                {/* Details Bar */}
                <div className="p-3.5 flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold font-stencil tracking-wide text-white group-hover:text-yellow-300 transition-colors line-clamp-1">
                      {cat.name[lang]}
                    </h3>
                    {lang !== 'en' && (
                      <p className="text-[11px] text-zinc-400 font-tech uppercase tracking-wider truncate">
                        {cat.name.en}
                      </p>
                    )}
                  </div>

                  <div className="p-1.5 rounded-xl bg-zinc-900 border border-white/10 text-cyan-400 group-hover:border-cyan-400 group-hover:translate-x-1 transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};
