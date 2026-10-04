import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe } from 'lucide-react';
import { Language } from '../types';
import { sound, triggerHaptic } from '../utils/audio';

interface LanguageSwitcherProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLang,
  onLanguageChange,
  className = '',
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    sound.playTap();
    triggerHaptic('tap');
    setIsOpen(!isOpen);
  };

  const handleSelect = (lang: Language) => {
    if (lang === currentLang) {
      setIsOpen(false);
      return;
    }
    sound.playNeonFlicker();
    triggerHaptic('neon');
    onLanguageChange(lang);
    setIsOpen(false);
  };

  const languages: { code: Language; label: string }[] = [
    { code: 'az', label: 'AZ' },
    { code: 'en', label: 'EN' },
    { code: 'ru', label: 'RU' },
  ];

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <motion.button
        onClick={handleToggle}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900/90 border border-cyan-400/30 text-white/90 shadow-[0_0_15px_rgba(0,229,255,0.15)] hover:border-cyan-400/60 hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all z-50"
      >
        <motion.div
          animate={isOpen ? { rotate: 90 } : { 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={isOpen 
            ? { type: 'spring', stiffness: 260, damping: 20 }
            : { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <Globe className="w-4 h-4 text-cyan-400" />
        </motion.div>
        <span className="text-xs font-bold tracking-widest uppercase font-tech">
          {currentLang}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute right-0 mt-2 w-28 bg-zinc-950/95 border border-cyan-400/50 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5),0_0_20px_rgba(0,229,255,0.2)] py-1.5 z-50 backdrop-blur-xl overflow-hidden"
          >
            {languages.map((l) => (
              <motion.button
                key={l.code}
                whileHover={{ backgroundColor: 'rgba(0, 229, 255, 0.1)' }}
                onClick={() => handleSelect(l.code)}
                className={`w-full text-left px-4 py-2 text-xs font-bold uppercase transition-colors flex items-center justify-between ${
                  currentLang === l.code
                    ? 'text-cyan-400 bg-cyan-950/40'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                <span>{l.label}</span>
                {currentLang === l.code && (
                  <motion.span
                    layoutId="activeCircle"
                    className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff]"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
