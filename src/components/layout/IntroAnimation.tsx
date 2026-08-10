import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export const IntroAnimation: React.FC = () => {
  const [isVisible, setIsVisible] = useState(() => {
    return !(sessionStorage.getItem('becho_intro_seen') || sessionStorage.getItem('dainik_intro_seen'));
  });
  const { t } = useTranslation();

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      dismissIntro();
    }, 1400);

    const handleQuickDismiss = () => dismissIntro();
    window.addEventListener('keydown', handleQuickDismiss);
    window.addEventListener('touchstart', handleQuickDismiss);
    window.addEventListener('wheel', handleQuickDismiss);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleQuickDismiss);
      window.removeEventListener('touchstart', handleQuickDismiss);
      window.removeEventListener('wheel', handleQuickDismiss);
    };
  }, [isVisible]);

  const dismissIntro = () => {
    sessionStorage.setItem('becho_intro_seen', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={dismissIntro}
          className="fixed inset-0 z-50 bg-paper-100 flex flex-col items-center justify-center cursor-pointer select-none"
        >
          <div className="text-center px-6 max-w-lg">
            {/* Press Badge */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-block px-3 py-1 bg-crimson-800 text-paper-50 font-mono text-[10px] tracking-widest uppercase font-bold rounded mb-4"
            >
              {t('edition')} • {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </motion.div>

            {/* Main Headline Mark */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-serif font-black text-5xl sm:text-6xl text-ink-950 tracking-tight uppercase"
            >
              {t('appName')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mt-2 font-serif italic text-lg sm:text-xl text-ink-500"
            >
              {t('appSubtitle')}
            </motion.p>

            {/* Newspaper Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="w-32 h-0.5 bg-crimson-800 mx-auto my-6"
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="text-xs text-ink-500 font-sans tracking-wide uppercase"
            >
              Tap or scroll to enter
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
