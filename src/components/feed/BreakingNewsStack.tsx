import React from 'react';
import { useTranslation } from 'react-i18next';
import { Flame, Clock, ArrowRight, X, BookOpen } from 'lucide-react';
import { ScrollStack, ScrollStackItem } from '../ui/ScrollStack';
import { useAppStore } from '../../store/useAppStore';

interface BreakingNewsStackProps {
  onClose?: () => void;
}

export const BreakingNewsStack: React.FC<BreakingNewsStackProps> = ({ onClose }) => {
  const { posts, language, setExpandedPost } = useAppStore();
  const { t } = useTranslation();

  // Highlight top 5 stories as breaking / trending stack
  const highlightedPosts = posts.slice(0, 5);

  const headlineFontClass =
    language === 'hi' ? 'font-headline-hi' : language === 'te' ? 'font-headline-te' : 'font-headline-en';

  return (
    <div className="relative w-full h-full flex flex-col bg-paper-100/95 backdrop-blur-xl z-30 overflow-hidden">
      {/* Top Header Banner */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-ink-900/10 bg-paper-50/80 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-crimson-800 text-paper-50 rounded-xl animate-pulse">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-serif font-black text-xl text-ink-950 flex items-center gap-2">
              <span>{language === 'hi' ? 'ब्रेकिंग एवं हाइलाइट्स' : language === 'te' ? 'తాజా వార్తలు & ముఖ్యాంశాలు' : 'Breaking & Highlighted Reel Stack'}</span>
            </h2>
            <p className="text-xs text-ink-500 font-medium">Scroll down to explore stacked news cards</p>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-paper-200 text-ink-800 hover:bg-crimson-800 hover:text-paper-50 transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* ScrollStack Container */}
      <div className="flex-1 w-full max-w-4xl mx-auto overflow-hidden">
        <ScrollStack
          itemDistance={90}
          itemScale={0.04}
          itemStackDistance={25}
          stackPosition="15%"
          scaleEndPosition="5%"
          baseScale={0.88}
          rotationAmount={0.8}
          blurAmount={1.5}
        >
          {highlightedPosts.map((post, idx) => {
            const translation = post.translations[language] || post.translations.en;
            const formattedTime = new Date(post.publishedAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <ScrollStackItem key={post.id}>
                <div className="relative w-full h-full flex flex-col justify-between overflow-hidden rounded-3xl p-6 sm:p-8 bg-paper-50 border border-ink-900/15 shadow-xl">
                  {/* Card Background Glow */}
                  <div className="absolute top-0 right-0 w-48 h-48 bg-crimson-800/5 rounded-full blur-3xl pointer-events-none" />

                  {/* Header Row */}
                  <div className="flex items-center justify-between z-10">
                    <div className="flex items-center space-x-2">
                      <span className="px-3 py-1 bg-crimson-800 text-paper-50 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-full shadow-sm flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-paper-50 animate-ping" />
                        <span>BREAKING #{idx + 1}</span>
                      </span>
                      <span className="px-2.5 py-0.5 bg-paper-200 text-ink-800 text-[11px] font-semibold rounded-full border border-ink-900/10">
                        {post.category}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1 text-xs text-ink-500 font-mono">
                      <Clock className="w-3.5 h-3.5 text-crimson-800" />
                      <span>{formattedTime}</span>
                    </div>
                  </div>

                  {/* Body Content Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center my-4 z-10">
                    <div className="md:col-span-2 space-y-3">
                      <h3 className={`text-xl sm:text-2xl md:text-3xl font-black text-ink-950 leading-tight ${headlineFontClass}`}>
                        {translation.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-ink-700 font-sans line-clamp-3">
                        {translation.summary}
                      </p>
                    </div>

                    <div className="aspect-video md:aspect-square rounded-2xl overflow-hidden shadow-md border border-ink-900/10">
                      <img
                        src={post.coverImageUrl}
                        alt={translation.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>

                  {/* Bottom Footer Action */}
                  <div className="flex items-center justify-between pt-3 border-t border-ink-900/10 z-10">
                    <span className="text-xs font-mono text-ink-500">{translation.readTime}</span>

                    <button
                      onClick={() => setExpandedPost(post)}
                      className="flex items-center space-x-2 px-4 py-2 bg-ink-950 hover:bg-crimson-800 text-paper-50 rounded-full text-xs font-bold transition-all shadow-sm group"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{t('readMore')}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>
      </div>
    </div>
  );
};
