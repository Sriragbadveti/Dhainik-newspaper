import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { BookOpen, Calendar, Clock, AlertCircle } from 'lucide-react';
import { NewsPost } from '../../types/news';
import { useAppStore } from '../../store/useAppStore';

interface PostCardProps {
  post: NewsPost;
  isActive: boolean;
}

export const PostCard: React.FC<PostCardProps> = ({ post, isActive }) => {
  const { language, isLangSwitching, setExpandedPost } = useAppStore();
  const { t } = useTranslation();

  const translation = useMemo(() => {
    return post.translations[language] || post.translations.en;
  }, [post, language]);

  const isFallback = !post.translations[language] && language !== 'en';

  const formattedTime = useMemo(() => {
    const date = new Date(post.publishedAt);
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, [post.publishedAt]);

  const headlineFontClass =
    language === 'hi' ? 'font-headline-hi' : language === 'te' ? 'font-headline-te' : 'font-headline-en';

  return (
    <div className={`relative w-full h-full flex flex-col justify-between overflow-hidden p-4 sm:p-8 md:p-12 lg:p-16 transition-all duration-300 ${isLangSwitching ? 'lang-switching' : 'lang-switched'}`}>
      
      {/* Background Visual Layer with Ken Burns Parallax Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div 
          className={`w-full h-full transition-transform duration-1000 ${
            isActive ? 'scale-100 opacity-100' : 'scale-105 opacity-80'
          }`}
        >
          <img
            src={post.coverImageUrl}
            alt={translation.title}
            className="w-full h-full object-cover animate-ken-burns filter brightness-95 contrast-105"
          />
        </div>

        {/* Editorial Gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-paper-50 via-paper-50/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-paper-50/60 via-transparent to-paper-50/90" />
      </div>

      {/* Top Meta Bar */}
      <div className="relative z-10 pt-14 sm:pt-16 max-w-5xl mx-auto w-full flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
          className="flex items-center space-x-2"
        >
          <span className="px-3.5 py-1 bg-crimson-800 text-paper-50 font-bold text-xs uppercase tracking-widest rounded-md shadow-sm">
            {post.category}
          </span>

          {isFallback && (
            <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 bg-amber-100/90 backdrop-blur-md text-amber-900 font-medium text-[11px] rounded-md border border-amber-300">
              <AlertCircle className="w-3 h-3 text-amber-700" />
              <span>{t('fallbackNotice')}</span>
            </span>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center space-x-3 text-xs font-semibold text-ink-800 bg-paper-200/70 backdrop-blur-md px-3 py-1 rounded-full border border-ink-900/10 shadow-sm"
        >
          <div className="flex items-center space-x-1">
            <Calendar className="w-3.5 h-3.5 text-crimson-800" />
            <span>{formattedTime}</span>
          </div>
          <span className="text-ink-900/20">•</span>
          <div className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-crimson-800" />
            <span>{translation.readTime}</span>
          </div>
        </motion.div>
      </div>

      {/* Center/Bottom Content Stack */}
      <div className="relative z-10 max-w-4xl mx-auto w-full my-auto py-6 space-y-5 sm:space-y-6 text-center sm:text-left">
        
        {/* Headline Title */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className={`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-ink-950 leading-tight sm:leading-tight ${headlineFontClass}`}
        >
          {translation.title}
        </motion.h2>

        {/* Story Summary Excerpt */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-base sm:text-xl text-ink-800/90 leading-relaxed font-sans max-w-3xl font-normal"
        >
          {translation.summary}
        </motion.p>

        {/* Read Story CTA Button & Swipe Hint */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-ink-900/10"
        >
          <button
            onClick={() => setExpandedPost(post)}
            className="group flex items-center space-x-2.5 px-6 py-3 bg-ink-950 hover:bg-crimson-800 text-paper-50 rounded-full font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-lg transform active:scale-95"
          >
            <BookOpen className="w-4 h-4 text-paper-50 group-hover:scale-110 transition-transform" />
            <span>{t('readMore')}</span>
          </button>

          <div className="text-xs text-ink-500 font-medium flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-crimson-800 animate-pulse" />
            <span>{t('swipeHint')}</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Padding spacer */}
      <div className="relative z-10 pb-6 text-center sm:text-left text-xs font-mono text-ink-500">
        {post.source && <span>Source: {post.source}</span>}
      </div>
    </div>
  );
};
