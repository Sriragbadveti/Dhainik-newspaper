import React from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const ProgressIndicator: React.FC = () => {
  const { activePostIndex, setActivePostIndex, posts } = useAppStore();
  const total = posts.length;

  if (total === 0) return null;

  return (
    <div className="fixed right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center space-y-3 pointer-events-auto">
      {/* Up Button */}
      <button
        onClick={() => setActivePostIndex((prev) => Math.max(0, prev - 1))}
        disabled={activePostIndex === 0}
        className={`p-2 rounded-full backdrop-blur-md bg-paper-200/80 border border-ink-900/10 text-ink-800 transition-all shadow-sm ${
          activePostIndex === 0
            ? 'opacity-30 cursor-not-allowed'
            : 'hover:bg-crimson-800 hover:text-paper-50 hover:border-crimson-800'
        }`}
        title="Previous Story (Up Arrow)"
        aria-label="Previous Story"
      >
        <ChevronUp className="w-4 h-4" />
      </button>

      {/* Index Counter */}
      <div className="py-1.5 px-2.5 rounded-full bg-paper-200/90 backdrop-blur-md border border-ink-900/10 font-mono text-[11px] font-bold text-ink-900 shadow-sm flex flex-col items-center">
        <span>{String(activePostIndex + 1).padStart(2, '0')}</span>
        <span className="w-3 h-px bg-ink-900/20 my-0.5" />
        <span className="text-ink-500">{String(total).padStart(2, '0')}</span>
      </div>

      {/* Vertical Dots Rail */}
      <div className="flex flex-col space-y-1.5 py-1">
        {posts.map((post, idx) => {
          const isActive = idx === activePostIndex;
          return (
            <button
              key={post.id}
              onClick={() => setActivePostIndex(idx)}
              className="group p-1 focus:outline-none"
              title={`Go to story ${idx + 1}`}
            >
              <div
                className={`w-2 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'h-6 bg-crimson-800 shadow-sm'
                    : 'h-2 bg-ink-900/20 group-hover:bg-ink-900/50'
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* Down Button */}
      <button
        onClick={() => setActivePostIndex((prev) => Math.min(total - 1, prev + 1))}
        disabled={activePostIndex === total - 1}
        className={`p-2 rounded-full backdrop-blur-md bg-paper-200/80 border border-ink-900/10 text-ink-800 transition-all shadow-sm ${
          activePostIndex === total - 1
            ? 'opacity-30 cursor-not-allowed'
            : 'hover:bg-crimson-800 hover:text-paper-50 hover:border-crimson-800'
        }`}
        title="Next Story (Down Arrow)"
        aria-label="Next Story"
      >
        <ChevronDown className="w-4 h-4" />
      </button>
    </div>
  );
};
