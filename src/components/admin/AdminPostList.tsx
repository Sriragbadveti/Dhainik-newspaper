import React from 'react';
import { useTranslation } from 'react-i18next';
import { Trash2, RotateCcw, Eye, ExternalLink } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { Link } from 'react-router-dom';

export const AdminPostList: React.FC = () => {
  const { posts, deletePost, resetPosts, setExpandedPost, setActivePostIndex } = useAppStore();
  const { t } = useTranslation();

  const handleDelete = (id: string, title: string) => {
    if (window.confirm(`${t('adminList.deleteConfirm')}\n\n"${title}"`)) {
      deletePost(id);
    }
  };

  return (
    <div className="bg-paper-50/90 backdrop-blur-md rounded-2xl border border-ink-900/10 p-6 sm:p-8 shadow-xl space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif font-black text-2xl text-ink-950">{t('adminList.title')}</h2>
          <p className="text-xs text-ink-500 font-medium">
            {t('adminList.totalStories')}: <span className="font-mono font-bold text-ink-900">{posts.length}</span>
          </p>
        </div>

        <button
          onClick={() => {
            if (window.confirm('Reset all posts to default seed dataset? Custom published posts will be removed.')) {
              resetPosts();
            }
          }}
          className="flex items-center space-x-1.5 px-3.5 py-2 bg-paper-200 hover:bg-paper-300 text-ink-800 text-xs font-semibold rounded-xl border border-ink-900/10 transition-colors shadow-sm"
        >
          <RotateCcw className="w-3.5 h-3.5 text-crimson-800" />
          <span>{t('adminList.resetSeed')}</span>
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="py-12 text-center text-ink-400 text-sm font-medium">
          {t('adminList.noPosts')}
        </div>
      ) : (
        <div className="divide-y divide-ink-900/10 overflow-hidden">
          {posts.map((post, index) => {
            const title = post.translations.en?.title || 'Untitled';
            const date = new Date(post.publishedAt).toLocaleDateString(undefined, {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });

            const hasHi = !!post.translations.hi?.title;
            const hasTe = !!post.translations.te?.title;

            return (
              <div
                key={post.id}
                className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-paper-100/50 p-2 rounded-xl transition-colors"
              >
                {/* Left: Thumbnail & Details */}
                <div className="flex items-center space-x-4 min-w-0 flex-1">
                  <img
                    src={post.coverImageUrl}
                    alt={title}
                    className="w-16 h-12 rounded-lg object-cover flex-shrink-0 border border-ink-900/10 shadow-sm"
                  />
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 bg-crimson-800 text-paper-50 text-[10px] font-bold uppercase rounded">
                        {post.category}
                      </span>
                      <span className="text-[11px] text-ink-400 font-mono">{date}</span>
                    </div>

                    <h3 className="text-sm font-bold text-ink-950 truncate font-serif">{title}</h3>

                    {/* Language badging */}
                    <div className="flex items-center space-x-1.5 text-[10px] font-mono text-ink-500">
                      <span className="text-emerald-700 font-bold">EN ✓</span>
                      <span className={hasHi ? 'text-emerald-700 font-bold' : 'text-ink-300 opacity-60'}>
                        HI {hasHi ? '✓' : '✗'}
                      </span>
                      <span className={hasTe ? 'text-emerald-700 font-bold' : 'text-ink-300 opacity-60'}>
                        TE {hasTe ? '✓' : '✗'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center space-x-2 self-end sm:self-center">
                  <Link
                    to="/"
                    onClick={() => setActivePostIndex(index)}
                    className="p-2 rounded-lg bg-paper-200 text-ink-800 hover:bg-paper-300 transition-colors"
                    title="View in Reel"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => setExpandedPost(post)}
                    className="p-2 rounded-lg bg-paper-200 text-ink-800 hover:bg-paper-300 transition-colors"
                    title="Preview Reader View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleDelete(post.id, title)}
                    className="p-2 rounded-lg bg-crimson-800/10 text-crimson-800 hover:bg-crimson-800 hover:text-paper-50 transition-colors"
                    title="Delete Post"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
