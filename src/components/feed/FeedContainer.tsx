import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDrag } from '@use-gesture/react';
import { ShieldAlert, Newspaper } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { PostCard } from './PostCard';

export const FeedContainer: React.FC = () => {
  const { posts, activePostIndex, setActivePostIndex } = useAppStore();
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isCooldownRef = useRef(false);

  const total = posts.length;

  // Handle Keyboard Arrows Navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept keyboard if typing in an input or modal is open
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') {
        return;
      }

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        setActivePostIndex((prev) => Math.min(total - 1, prev + 1));
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        setActivePostIndex((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [total, setActivePostIndex]);

  // Handle Wheel Scroll Navigation with debounce cooldown
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 25 || isCooldownRef.current) return;

      isCooldownRef.current = true;
      if (e.deltaY > 0) {
        setActivePostIndex((prev) => Math.min(total - 1, prev + 1));
      } else {
        setActivePostIndex((prev) => Math.max(0, prev - 1));
      }

      setTimeout(() => {
        isCooldownRef.current = false;
      }, 500);
    };

    const element = containerRef.current;
    if (element) {
      element.addEventListener('wheel', handleWheel, { passive: true });
    }
    return () => {
      if (element) {
        element.removeEventListener('wheel', handleWheel);
      }
    };
  }, [total, setActivePostIndex]);

  // Handle Touch Gesture Swipe using @use-gesture/react
  const bindDrag = useDrag(
    ({ swipe: [, swipeY], direction: [, dirY], distance: [, distY], cancel }) => {
      if (isCooldownRef.current) return;

      if (swipeY < 0 || (dirY < 0 && distY > 60)) {
        // Swipe Up -> Next Post
        isCooldownRef.current = true;
        setActivePostIndex((prev) => Math.min(total - 1, prev + 1));
        cancel();
      } else if (swipeY > 0 || (dirY > 0 && distY > 60)) {
        // Swipe Down -> Prev Post
        isCooldownRef.current = true;
        setActivePostIndex((prev) => Math.max(0, prev - 1));
        cancel();
      }

      setTimeout(() => {
        isCooldownRef.current = false;
      }, 400);
    },
    {
      axis: 'y',
      filterTaps: true,
      rubberband: true
    }
  );

  if (total === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center z-10 relative">
        <div className="p-4 bg-crimson-800/10 text-crimson-800 rounded-full mb-4">
          <Newspaper className="w-12 h-12" />
        </div>
        <h2 className="text-2xl font-bold font-serif text-ink-950 mb-2">{t('emptyFeed.title')}</h2>
        <p className="text-sm text-ink-500 max-w-md mb-6">{t('emptyFeed.message')}</p>
        <Link
          to="/admin"
          className="px-6 py-2.5 bg-crimson-800 text-paper-50 font-semibold rounded-full hover:bg-crimson-900 transition-colors shadow-md"
        >
          {t('emptyFeed.adminBtn')}
        </Link>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      {...bindDrag()}
      className="relative w-full h-full overflow-hidden touch-none select-none z-10"
    >
      {/* Cards Slider Stack */}
      <div
        className="w-full h-full transition-transform duration-500 ease-out"
        style={{ transform: `translate3d(0, -${activePostIndex * 100}%, 0)` }}
      >
        {posts.map((post, idx) => (
          <div key={post.id} className="w-full h-full relative">
            <PostCard post={post} isActive={idx === activePostIndex} />
          </div>
        ))}
      </div>
    </div>
  );
};
