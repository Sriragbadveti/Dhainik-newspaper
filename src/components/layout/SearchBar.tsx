import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, X, Newspaper, Calendar, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import { NewsPost } from '../../types/news';

export const SearchBar: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { posts, language, setActivePostIndex, setExpandedPost } = useAppStore();

  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isExpandedMobile, setIsExpandedMobile] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setIsExpandedMobile(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter posts based on search query
  const filteredPosts = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return [];

    return posts.filter((post) => {
      const trans = post.translations[language] || post.translations.en;
      const enTrans = post.translations.en;

      const titleMatch = (trans?.title || '').toLowerCase().includes(trimmed) || (enTrans?.title || '').toLowerCase().includes(trimmed);
      const summaryMatch = (trans?.summary || '').toLowerCase().includes(trimmed) || (enTrans?.summary || '').toLowerCase().includes(trimmed);
      const categoryMatch = (post.category || '').toLowerCase().includes(trimmed);
      const authorMatch = (post.author || '').toLowerCase().includes(trimmed);
      const sourceMatch = (post.source || '').toLowerCase().includes(trimmed);

      return titleMatch || summaryMatch || categoryMatch || authorMatch || sourceMatch;
    });
  }, [query, posts, language]);

  const handleSelectPost = (post: NewsPost) => {
    const postIndex = posts.findIndex((p) => p.id === post.id);
    
    // Redirect to main feed if not currently on home route
    if (location.pathname !== '/') {
      navigate('/');
    }

    if (postIndex !== -1) {
      setActivePostIndex(postIndex);
    }
    
    // Expand full post modal for immediate news reading
    setExpandedPost(post);

    setIsOpen(false);
    setQuery('');
    setIsExpandedMobile(false);
    inputRef.current?.blur();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setIsExpandedMobile(false);
      inputRef.current?.blur();
    } else if (e.key === 'Enter' && filteredPosts.length > 0) {
      e.preventDefault();
      handleSelectPost(filteredPosts[0]);
    }
  };

  return (
    <div ref={searchRef} className="relative flex items-center">
      {/* Mobile Toggle Button */}
      {!isExpandedMobile && (
        <button
          onClick={() => {
            setIsExpandedMobile(true);
            setTimeout(() => inputRef.current?.focus(), 100);
          }}
          className="sm:hidden p-2 text-ink-800 hover:text-crimson-800 hover:bg-paper-200/60 rounded-full transition-colors"
          aria-label="Open Search"
        >
          <Search className="w-4 h-4" />
        </button>
      )}

      {/* Input Bar Container */}
      <div
        className={`${
          isExpandedMobile
            ? 'absolute right-0 top-1/2 -translate-y-1/2 w-64 z-50 flex'
            : 'hidden sm:flex'
        } items-center relative transition-all duration-200`}
      >
        <div className="relative flex items-center w-40 md:w-56 lg:w-64">
          <Search className="absolute left-3 w-3.5 h-3.5 text-ink-400 pointer-events-none" />
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={t('searchPlaceholder', 'Search news...')}
            className="w-full pl-9 pr-8 py-1.5 text-xs font-medium bg-paper-200/80 hover:bg-paper-200 text-ink-950 placeholder-ink-400 rounded-full border border-ink-900/10 focus:outline-none focus:ring-2 focus:ring-crimson-800/40 focus:border-crimson-800/50 transition-all shadow-inner"
          />

          {query && (
            <button
              onClick={() => {
                setQuery('');
                setIsOpen(false);
                inputRef.current?.focus();
              }}
              className="absolute right-2.5 p-0.5 rounded-full text-ink-400 hover:text-ink-900 hover:bg-paper-300 transition-colors"
              aria-label="Clear Search"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* Results Dropdown Modal */}
      <AnimatePresence>
        {isOpen && query.trim().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-80 sm:w-96 max-h-[75vh] bg-paper-50/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-ink-900/15 overflow-hidden z-50 flex flex-col"
          >
            {/* Dropdown Header */}
            <div className="px-4 py-2.5 bg-paper-100/80 border-b border-ink-900/10 flex items-center justify-between text-xs font-semibold text-ink-600">
              <span>Found {filteredPosts.length} {filteredPosts.length === 1 ? 'story' : 'stories'}</span>
              <span className="text-[10px] text-ink-400">Press Enter to select top news</span>
            </div>

            {/* Dropdown Results List */}
            <div className="overflow-y-auto divide-y divide-ink-900/5 p-1.5">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => {
                  const trans = post.translations[language] || post.translations.en;
                  return (
                    <div
                      key={post.id}
                      onClick={() => handleSelectPost(post)}
                      className="group flex items-start space-x-3 p-2.5 hover:bg-crimson-800/10 rounded-xl cursor-pointer transition-colors"
                    >
                      {/* Cover Thumbnail */}
                      <img
                        src={post.coverImageUrl}
                        alt={trans.title}
                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0 shadow-sm border border-ink-900/10 group-hover:scale-105 transition-transform"
                      />

                      {/* Content Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-1.5 mb-1">
                          <span className="px-2 py-0.5 bg-crimson-800/15 text-crimson-900 font-bold text-[10px] uppercase rounded-md tracking-wider">
                            {post.category}
                          </span>
                          <span className="text-[10px] text-ink-400 flex items-center space-x-1">
                            <Calendar className="w-2.5 h-2.5" />
                            <span>{new Date(post.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                          </span>
                        </div>

                        <h4 className="text-xs font-bold text-ink-950 line-clamp-2 leading-tight group-hover:text-crimson-900 transition-colors">
                          {trans.title}
                        </h4>

                        <p className="text-[11px] text-ink-500 line-clamp-1 mt-0.5 font-serif italic">
                          {trans.summary}
                        </p>
                      </div>

                      <ChevronRight className="w-4 h-4 text-ink-300 group-hover:text-crimson-800 group-hover:translate-x-0.5 transition-all self-center" />
                    </div>
                  );
                })
              ) : (
                <div className="p-6 text-center text-ink-500 space-y-2">
                  <Newspaper className="w-8 h-8 text-ink-300 mx-auto" />
                  <p className="text-xs font-semibold">{t('searchNoResults', 'No news stories found')}</p>
                  <p className="text-[11px] text-ink-400">{t('searchHint', 'Try searching headlines, topics, or authors')}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
