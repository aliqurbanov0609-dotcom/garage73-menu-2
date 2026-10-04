import React, { useState } from 'react';
import { UtensilsCrossed, Wine } from 'lucide-react';
import { Language } from '../types';
import { UI_TEXT } from '../data/translations';
import { sound, triggerHaptic } from '../utils/audio';
import { HeaderNav } from './HeaderNav';

interface Screen2ChoiceProps {
  lang: Language;
  onSelectSection: (section: 'kitchen' | 'bar') => void;
  onBackToHome: () => void;
  onLanguageChange: (lang: Language) => void;
}

export const Screen2Choice: React.FC<Screen2ChoiceProps> = ({
  lang,
  onSelectSection,
  onBackToHome,
  onLanguageChange,
}) => {
  const [activeButton, setActiveButton] = useState<'kitchen' | 'bar' | null>(null);

  const handleSelect = (section: 'kitchen' | 'bar') => {
    setActiveButton(section);
    sound.playNeonFlicker();
    sound.playTap();
    triggerHaptic('neon');

    setTimeout(() => {
      onSelectSection(section);
    }, 600);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col justify-between overflow-hidden bg-[#090b10]">
      {/* Background image: kitchen-bar.jpg with dark industrial ambiance */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100"
        style={{
          backgroundImage: `url('/assets/backgrounds/kitchen-bar.jpg')`,
        }}
      >
        {/* Soft vignette & smoke gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/80" />
      </div>

      {/* Atmospheric smoke and haze animation */}
      <div className="absolute inset-0 pointer-events-none opacity-25 mix-blend-screen bg-radial from-cyan-900/40 via-transparent to-pink-900/30 animate-pulse" />

      {/* Top Navigation */}
      <HeaderNav 
        lang={lang} 
        onLanguageChange={onLanguageChange} 
        onHome={onBackToHome}
      />

      {/* Main Choice Zone */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8 max-w-md mx-auto w-full gap-8">
        
        {/* KITCHEN BUTTON */}
        <div className="w-full flex flex-col items-center">
          <button
            onClick={() => handleSelect('kitchen')}
            className={`w-full max-w-xs relative group flex items-center justify-center gap-4 py-5 px-6 rounded-2xl bg-zinc-950/85 backdrop-blur-xl cursor-pointer active:scale-95 transition-all duration-300 ${
              activeButton === 'kitchen'
                ? 'animate-engine-rev border-2 border-white scale-105'
                : 'animate-neon-pulse-blue border-2 border-cyan-400 hover:scale-102'
            }`}
            style={{
              boxShadow: activeButton === 'kitchen'
                ? '0 0 35px #ffffff, 0 0 70px #00e5ff, inset 0 0 20px #00e5ff'
                : '0 0 22px rgba(0, 229, 255, 0.65), inset 0 0 14px rgba(0, 229, 255, 0.35)',
            }}
          >
            {/* Cutlery Icon (Fork & Knife) */}
            <div className="p-2.5 rounded-xl bg-cyan-950/60 border border-cyan-400/50 shadow-[0_0_12px_#00e5ff]">
              <UtensilsCrossed className="w-7 h-7 text-cyan-300 drop-shadow-[0_0_8px_#00e5ff]" />
            </div>

            {/* Glowing Yellow Text */}
            <div className="flex flex-col text-left">
              <span className="text-3xl sm:text-4xl font-black font-stencil tracking-wider text-yellow-300 [text-shadow:0_0_10px_#ffe600,0_0_22px_#ffaa00]">
                {UI_TEXT[lang].kitchen}
              </span>
              <span className="text-[10px] tracking-widest text-cyan-300/80 font-tech font-bold uppercase">
                {lang !== 'en' ? 'KITCHEN MENU' : 'HOT FOOD & APPETIZERS'}
              </span>
            </div>
          </button>

          {/* Wet Floor Blue Reflection */}
          <div className="w-48 h-3 mt-1.5 rounded-full bg-cyan-500/25 blur-md transform scale-y-50 pointer-events-none" />
        </div>

        {/* BAR BUTTON */}
        <div className="w-full flex flex-col items-center">
          <button
            onClick={() => handleSelect('bar')}
            className={`w-full max-w-xs relative group flex items-center justify-center gap-4 py-5 px-6 rounded-2xl bg-zinc-950/85 backdrop-blur-xl cursor-pointer active:scale-95 transition-all duration-300 ${
              activeButton === 'bar'
                ? 'animate-engine-rev border-2 border-white scale-105'
                : 'animate-neon-pulse-pink border-2 border-pink-500 hover:scale-102'
            }`}
            style={{
              boxShadow: activeButton === 'bar'
                ? '0 0 35px #ffffff, 0 0 70px #ff2a85, inset 0 0 20px #ff2a85'
                : '0 0 22px rgba(255, 42, 133, 0.65), inset 0 0 14px rgba(255, 42, 133, 0.35)',
            }}
          >
            {/* Cocktail Icon */}
            <div className="p-2.5 rounded-xl bg-pink-950/60 border border-pink-400/50 shadow-[0_0_12px_#ff2a85]">
              <Wine className="w-7 h-7 text-pink-300 drop-shadow-[0_0_8px_#ff2a85]" />
            </div>

            {/* Glowing Yellow Text */}
            <div className="flex flex-col text-left">
              <span className="text-3xl sm:text-4xl font-black font-stencil tracking-wider text-yellow-300 [text-shadow:0_0_10px_#ffe600,0_0_22px_#ffaa00]">
                {UI_TEXT[lang].bar}
              </span>
              <span className="text-[10px] tracking-widest text-pink-300/80 font-tech font-bold uppercase">
                {lang !== 'en' ? 'BAR & SPIRITS' : 'DRINKS, BEER & SPIRITS'}
              </span>
            </div>
          </button>

          {/* Wet Floor Pink Reflection */}
          <div className="w-48 h-3 mt-1.5 rounded-full bg-pink-500/25 blur-md transform scale-y-50 pointer-events-none" />
        </div>

      </div>

      {/* Bottom Subtle Pub Badge */}
      <div className="relative z-10 pb-6 text-center text-xs text-zinc-400 font-tech tracking-widest uppercase">
        GARAGE 73 PUB • BAKU
      </div>
    </div>
  );
};
