import React, { useState } from 'react';
import { Language } from '../types';
import { sound, triggerHaptic } from '../utils/audio';

interface Screen1MainProps {
  onProceed: (lang: Language) => void;
  currentLang: Language;
}

export const Screen1Main: React.FC<Screen1MainProps> = ({ onProceed, currentLang }) => {
  const [selectedLang, setSelectedLang] = useState<Language | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const languages: { code: Language; label: string; sub: string }[] = [
    { code: 'az', label: 'AZ', sub: 'AZE' },
    { code: 'en', label: 'EN', sub: 'ENG' },
    { code: 'ru', label: 'RU', sub: 'RUS' },
  ];

  const handleSelectLanguage = (lang: Language) => {
    if (isAnimating) return;
    setSelectedLang(lang);
    setIsAnimating(true);

    // Audio effects: engine ignition starter crank & rev up
    sound.playIgnition();
    triggerHaptic('engine');

    // Laser scan sound effect after ignition catches
    setTimeout(() => {
      sound.playLaser();
    }, 400);

    // Transition to Screen 2 after laser and engine sequence
    setTimeout(() => {
      onProceed(lang);
    }, 1250);
  };

  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center justify-between p-4 sm:p-6 overflow-hidden bg-[#090a0f] select-none">
      {/* 1. Dark Perforated Carbon Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none scale-100 transition-all duration-700"
        style={{
          backgroundImage: `url('/assets/backgrounds/main-bg.jpg')`,
        }}
      >
        {/* Subtle vignette and darkening */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/75" />
      </div>

      {/* Atmospheric neon ambient lights */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-80 h-72 bg-[#ff2a85]/20 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-amber-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-96 h-72 bg-[#00e5ff]/20 rounded-full blur-[90px] pointer-events-none" />

      {/* 2. TOP SECTION: GARAGE 73 + PUB */}
      <header className="relative z-10 w-full flex flex-col items-center mt-6 sm:mt-10">
        {/* GARAGE 73 - Hot Pink Stencil Neon */}
        <h1 
          className="text-[42px] sm:text-6xl md:text-7xl font-black tracking-[0.14em] font-stencil text-[#ff4097] text-center"
          style={{
            textShadow: `
              0 0 4px #ffffff,
              0 0 8px #ff2a85,
              0 0 16px #ff2a85,
              0 0 32px #ff0066,
              0 0 60px #ff0066,
              0 0 90px #cc0052
            `,
          }}
        >
          GARAGE 73
        </h1>

        {/* PUB - Yellow License Plate Badge */}
        <div className="mt-4 sm:mt-5 relative">
          {/* Yellow ambient back-glow */}
          <div className="absolute -inset-2 bg-yellow-400/30 rounded-2xl blur-lg pointer-events-none animate-pulse" />
          
          <div 
            className="relative px-8 py-2 rounded-xl border-[2.5px] border-[#ffe600] bg-[#eab308]/90 shadow-[0_0_20px_#ffe600,inset_0_0_12px_rgba(255,255,255,0.4)] flex items-center justify-center min-w-[130px]"
          >
            <span 
              className="text-2xl sm:text-3xl font-black font-stencil tracking-[0.2em] text-[#121318]"
              style={{
                letterSpacing: '0.22em',
              }}
            >
              PUB
            </span>
          </div>
        </div>
      </header>

      {/* 3. CENTER SECTION: MENU Neon Box */}
      <section className="relative z-10 my-auto flex flex-col items-center justify-center w-full max-w-sm px-4">
        {/* Neon Box Wrapper */}
        <div className="relative w-full py-2 flex justify-center">
          {/* Outer Neon Glows */}
          <div className="absolute inset-0 bg-yellow-400/10 rounded-3xl blur-2xl pointer-events-none" />
          <div className="absolute inset-x-8 -top-4 h-12 bg-cyan-400/20 blur-xl pointer-events-none" />
          <div className="absolute inset-x-8 -bottom-4 h-12 bg-cyan-400/20 blur-xl pointer-events-none" />

          {/* The Neon Frame Container */}
          <div 
            className="relative w-full max-w-[310px] sm:max-w-[340px] px-6 py-6 sm:py-8 rounded-3xl bg-zinc-950/60 backdrop-blur-md flex flex-col items-center justify-center border-2 border-transparent"
            style={{
              boxShadow: `
                0 0 25px rgba(0, 229, 255, 0.4),
                0 0 50px rgba(255, 42, 133, 0.25),
                inset 0 0 20px rgba(0, 229, 255, 0.15)
              `,
            }}
          >
            {/* SVG Neon Frame Border (Cyan Blue top/bottom brackets with pink corner flares) */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              viewBox="0 0 320 160"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <filter id="neonGlowBlue" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur1" />
                  <feGaussianBlur stdDeviation="7" result="blur2" />
                  <feMerge>
                    <feMergeNode in="blur2" />
                    <feMergeNode in="blur1" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="neonFrameGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#ff2a85" />
                  <stop offset="25%" stopColor="#00e5ff" />
                  <stop offset="75%" stopColor="#00e5ff" />
                  <stop offset="100%" stopColor="#ff2a85" />
                </linearGradient>
              </defs>

              {/* Top Bracket */}
              <path
                d="M 50 8 L 270 8 A 20 20 0 0 1 290 28 L 290 40"
                stroke="#00e5ff"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#neonGlowBlue)"
              />
              <path
                d="M 30 40 L 30 28 A 20 20 0 0 1 50 8"
                stroke="#00e5ff"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#neonGlowBlue)"
              />

              {/* Bottom Bracket */}
              <path
                d="M 290 120 L 290 132 A 20 20 0 0 1 270 152 L 50 152 A 20 20 0 0 1 30 132 L 30 120"
                stroke="#00e5ff"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#neonGlowBlue)"
              />

              {/* Side Pink Neon Glow Accents */}
              <line x1="16" y1="55" x2="16" y2="105" stroke="#ff2a85" strokeWidth="3" strokeLinecap="round" opacity="0.85" filter="drop-shadow(0 0 8px #ff2a85)" />
              <line x1="304" y1="55" x2="304" y2="105" stroke="#ff2a85" strokeWidth="3" strokeLinecap="round" opacity="0.85" filter="drop-shadow(0 0 8px #ff2a85)" />
            </svg>

            {/* Glowing Double-Line Yellow "MENU" Neon Tube Typography */}
            <div className="relative z-10 flex items-center justify-center">
              <span 
                className="text-6xl sm:text-7xl font-extrabold tracking-[0.16em] font-display text-[#ffe600]"
                style={{
                  textShadow: `
                    0 0 3px #ffffff,
                    0 0 8px #ffe600,
                    0 0 18px #ffcc00,
                    0 0 35px #ff9900,
                    0 0 65px #ff6600
                  `,
                  WebkitTextStroke: '1px #ffffff',
                }}
              >
                MENU
              </span>
            </div>
          </div>
        </div>

        {/* TAP A LANGUAGE TO OPEN MENU */}
        <p 
          className="mt-8 text-xs sm:text-[13px] font-bold tracking-[0.25em] text-white/90 uppercase font-tech text-center"
          style={{
            textShadow: '0 0 8px rgba(0, 229, 255, 0.7)',
          }}
        >
          {currentLang === 'az' ? 'MENYUNU AÇMAQ ÜÇÜN DİL SEÇİN' : currentLang === 'ru' ? 'ВЫБЕРИТЕ ЯЗЫК ДЛЯ ВХОДА В МЕНЮ' : 'TAP A LANGUAGE TO OPEN MENU'}
        </p>
      </section>

      {/* 4. BOTTOM SECTION: Three Language Buttons AZ / EN / RU */}
      <footer className="relative z-20 w-full max-w-sm mb-6 sm:mb-10 px-2">
        <div className="relative flex items-center justify-center gap-3 sm:gap-4 h-28">
          {languages.map((item) => {
            const isChosen = selectedLang === item.code;
            const isOther = selectedLang !== null && !isChosen;

            return (
              <div
                key={item.code}
                className="transition-all duration-700 ease-out"
                style={{
                  transform: isOther
                    ? 'translateY(320px) scale(0.5)'
                    : isChosen
                    ? 'translateY(0) scale(1.16)'
                    : 'translateY(0) scale(1)',
                  opacity: isOther ? 0 : 1,
                  pointerEvents: isAnimating ? 'none' : 'auto',
                }}
              >
                <button
                  onClick={() => handleSelectLanguage(item.code)}
                  aria-label={`Select ${item.label}`}
                  className={`relative group flex flex-col items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-zinc-950/85 backdrop-blur-xl cursor-pointer active:scale-95 transition-all ${
                    isChosen
                      ? 'animate-engine-rev'
                      : 'animate-neon-pulse-blue hover:scale-105'
                  }`}
                  style={{
                    border: isChosen ? '2.5px solid #ffffff' : '2.5px solid #00e5ff',
                    boxShadow: isChosen
                      ? '0 0 30px #ffffff, 0 0 60px #00e5ff, inset 0 0 25px #ffffff'
                      : '0 0 16px rgba(0, 229, 255, 0.7), inset 0 0 12px rgba(0, 229, 255, 0.3)',
                  }}
                >
                  {/* WHITE LASER TRACING RECTANGLE */}
                  {isChosen && (
                    <svg
                      className="absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)] pointer-events-none rounded-2xl overflow-visible"
                      viewBox="0 0 100 100"
                      fill="none"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="96"
                        height="96"
                        rx="16"
                        stroke="#ffffff"
                        strokeWidth="3.5"
                        strokeDasharray="384"
                        strokeDashoffset="0"
                        style={{
                          animation: 'laserSweep 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                          filter: 'drop-shadow(0 0 8px #ffffff) drop-shadow(0 0 22px #00e5ff)',
                        }}
                      />
                    </svg>
                  )}

                  {/* Primary Language Code */}
                  <span
                    className={`text-2xl sm:text-3xl font-black font-stencil tracking-wider transition-colors ${
                      isChosen ? 'text-white drop-shadow-[0_0_12px_#ffffff]' : 'text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.7)]'
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Secondary Subtitle */}
                  <span
                    className={`text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase font-tech mt-1 transition-colors ${
                      isChosen ? 'text-white font-extrabold' : 'text-white/80'
                    }`}
                  >
                    {item.sub}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </footer>
    </div>
  );
};
