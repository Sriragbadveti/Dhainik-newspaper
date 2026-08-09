import React from 'react';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { Language } from '../../types/news';

const LANGUAGES: { code: Language; label: string; script: string }[] = [
  { code: 'en', label: 'EN', script: 'English' },
  { code: 'hi', label: 'हिं', script: 'हिन्दी' },
  { code: 'te', label: 'తె', script: 'తెలుగు' },
];

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useAppStore();

  return (
    <div 
      className="relative flex items-center bg-paper-200/80 backdrop-blur-md p-1 rounded-full border border-ink-900/10 shadow-sm"
      role="group"
      aria-label="Language selector"
    >
      {LANGUAGES.map((lang) => {
        const isActive = language === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200 z-10 ${
              isActive ? 'text-paper-50' : 'text-ink-800 hover:text-ink-950'
            }`}
            title={lang.script}
          >
            {isActive && (
              <motion.div
                layoutId="activeLangPill"
                className="absolute inset-0 bg-crimson-800 rounded-full -z-10 shadow-sm"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className={lang.code === 'hi' ? 'font-hindi' : lang.code === 'te' ? 'font-telugu' : 'font-sans'}>
              {lang.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};
