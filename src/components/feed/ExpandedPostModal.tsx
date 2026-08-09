import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Calendar, User, Globe, Share2, Check, Clock } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const ExpandedPostModal: React.FC = () => {
  const { expandedPost, setExpandedPost, language } = useAppStore();
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  if (!expandedPost) return null;

  const translation = expandedPost.translations[language] || expandedPost.translations.en;
  const isFallback = !expandedPost.translations[language] && language !== 'en';

  const formattedDate = new Date(expandedPost.publishedAt).toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const headlineFontClass =
    language === 'hi' ? 'font-headline-hi' : language === 'te' ? 'font-headline-te' : 'font-headline-en';

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-ink-950/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
          className="relative w-full max-w-4xl bg-paper-50 rounded-2xl shadow-2xl overflow-hidden border border-ink-900/10 flex flex-col max-h-[90vh]"
        >
          {/* Header Action Bar */}
          <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-paper-50/90 backdrop-blur-md border-b border-ink-900/10">
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 bg-crimson-800 text-paper-50 font-bold text-xs uppercase tracking-wider rounded-full">
                {expandedPost.category}
              </span>
              {isFallback && (
                <span className="px-2.5 py-0.5 bg-amber-100 text-amber-900 font-semibold text-[11px] rounded-full border border-amber-300">
                  {t('fallbackNotice')}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleShare}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-paper-200 text-ink-800 text-xs font-semibold hover:bg-paper-300 transition-colors"
                title="Share Article"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>

              <button
                onClick={() => setExpandedPost(null)}
                className="p-1.5 rounded-full bg-paper-200 text-ink-800 hover:bg-crimson-800 hover:text-paper-50 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="overflow-y-auto p-6 sm:p-10 space-y-6">
            {/* Title & Metadata */}
            <div className="space-y-4">
              <h1 className={`text-3xl sm:text-4xl md:text-5xl font-black text-ink-950 leading-tight ${headlineFontClass}`}>
                {translation.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-ink-500 pt-2 border-b border-ink-900/10 pb-4">
                {expandedPost.author && (
                  <div className="flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-crimson-800" />
                    <span>{expandedPost.author}</span>
                  </div>
                )}
                {expandedPost.source && (
                  <div className="flex items-center space-x-1.5">
                    <Globe className="w-3.5 h-3.5 text-crimson-800" />
                    <span>{expandedPost.source}</span>
                  </div>
                )}
                <div className="flex items-center space-x-1.5">
                  <Calendar className="w-3.5 h-3.5 text-crimson-800" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <Clock className="w-3.5 h-3.5 text-crimson-800" />
                  <span>{translation.readTime}</span>
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-md">
              <img
                src={expandedPost.coverImageUrl}
                alt={translation.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Excerpt Summary */}
            <div className="p-4 sm:p-5 rounded-xl bg-paper-100 border-l-4 border-crimson-800 text-ink-900 italic text-base sm:text-lg font-serif">
              "{translation.summary}"
            </div>

            {/* Article Text Paragraphs */}
            <div className="prose prose-lg max-w-none text-ink-900 leading-relaxed font-sans space-y-4 pt-2">
              {(translation.body || translation.summary).split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-base sm:text-lg leading-relaxed text-ink-900">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
