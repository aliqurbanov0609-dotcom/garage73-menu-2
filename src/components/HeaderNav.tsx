import React from 'react';
import { ArrowLeft, Home, Volume2, VolumeX, Globe } from 'lucide-react';
import { Language } from '../types';
import { UI_TEXT } from '../data/translations';
import { sound, triggerHaptic } from '../utils/audio';

import { LanguageSwitcher } from './LanguageSwitcher';

interface HeaderNavProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  onBack?: () => void;
  onHome?: () => void;
  title?: string;
  badge?: string;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  lang,
  onLanguageChange,
  onBack,
  onHome,
  title,
  badge,
}) => {
  const [soundEnabled, setSoundEnabled] = React.useState(sound.enabled);

  const toggleSound = () => {
    sound.enabled = !sound.enabled;
    setSoundEnabled(sound.enabled);
    if (sound.enabled) sound.playTap();
    triggerHaptic('tap');
  };

  const handleBack = () => {
    sound.playTap();
    triggerHaptic('tap');
    if (onBack) onBack();
  };

  const handleHome = () => {
    sound.playTap();
    triggerHaptic('tap');
    if (onHome) onHome();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08090db8] backdrop-blur-md border-b border-white/10 px-3 py-2.5 flex items-center justify-between shadow-2xl transition-all">
      {/* Left side: Back & Home controls */}
      <div className="flex items-center gap-2">
        {onBack && (
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-950/40 active:scale-95 transition-all text-xs font-semibold uppercase tracking-wider font-tech shadow-[0_0_12px_rgba(0,229,255,0.2)]"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span>{UI_TEXT[lang].back}</span>
          </button>
        )}

        {onHome && (
          <button
            onClick={handleHome}
            title={UI_TEXT[lang].home}
            className="p-1.5 rounded-lg bg-zinc-900/90 border border-pink-500/40 text-pink-300 hover:bg-pink-950/40 active:scale-95 transition-all shadow-[0_0_12px_rgba(255,42,133,0.2)]"
          >
            <Home className="w-4 h-4 text-pink-400" />
          </button>
        )}
      </div>

      {/* Center: Title / Logo */}
      <div className="text-center px-2 flex flex-col items-center">
        {title ? (
          <div className="flex items-center gap-1.5">
            {badge && <span className="text-sm">{badge}</span>}
            <span className="text-sm font-bold tracking-wider font-stencil text-amber-300 drop-shadow-[0_0_8px_rgba(255,230,0,0.5)] truncate max-w-[170px] sm:max-w-xs">
              {title}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <span className="font-stencil text-xs sm:text-sm text-pink-500 drop-shadow-[0_0_6px_#ff2a85]">GARAGE 73</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">PUB</span>
          </div>
        )}
      </div>

      {/* Right side: Language Selector & Audio */}
      <div className="flex items-center gap-2">
        {/* Language switch */}
        <LanguageSwitcher
          currentLang={lang}
          onLanguageChange={onLanguageChange}
        />

        {/* Audio Mute/Unmute */}
        <button
          onClick={toggleSound}
          title={soundEnabled ? UI_TEXT[lang].soundOff : UI_TEXT[lang].soundOn}
          className="p-1.5 rounded-lg bg-zinc-900/90 border border-white/15 text-zinc-300 hover:text-white hover:border-amber-400/50 active:scale-95 transition-all"
        >
          {soundEnabled ? (
            <Volume2 className="w-4 h-4 text-amber-400" />
          ) : (
            <VolumeX className="w-4 h-4 text-zinc-500" />
          )}
        </button>
      </div>
    </header>
  );
};
