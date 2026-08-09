import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Send, CheckCircle2, Image as ImageIcon, Globe, User, Sparkles } from 'lucide-react';
import { Category, NewsPost, Language } from '../../types/news';
import { useAppStore } from '../../store/useAppStore';

const CATEGORIES: Category[] = [
  'National',
  'World',
  'Business',
  'Technology',
  'Sports',
  'Entertainment',
  'Science',
];

const PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1597042675074-b52b217ec37c?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200&auto=format&fit=crop',
];

export const AdminPostForm: React.FC = () => {
  const { addPost } = useAppStore();
  const { t } = useTranslation();

  const [activeTab, setActiveTab] = useState<Language>('en');
  const [category, setCategory] = useState<Category>('Technology');
  const [coverImageUrl, setCoverImageUrl] = useState(PRESET_IMAGES[0]);
  const [author, setAuthor] = useState('Editorial Staff');
  const [source, setSource] = useState('Dainik Bureau');

  // Localized fields state
  const [enTitle, setEnTitle] = useState('');
  const [enSummary, setEnSummary] = useState('');
  const [enBody, setEnBody] = useState('');

  const [hiTitle, setHiTitle] = useState('');
  const [hiSummary, setHiSummary] = useState('');
  const [hiBody, setHiBody] = useState('');

  const [teTitle, setTeTitle] = useState('');
  const [teSummary, setTeSummary] = useState('');
  const [teBody, setTeBody] = useState('');

  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enTitle.trim() || !enSummary.trim()) {
      setErrorMsg(t('adminForm.missingEnFields'));
      return;
    }

    const newPostData: Omit<NewsPost, 'id' | 'publishedAt'> = {
      category,
      coverImageUrl: coverImageUrl.trim() || PRESET_IMAGES[0],
      author: author.trim(),
      source: source.trim(),
      translations: {
        en: {
          title: enTitle.trim(),
          summary: enSummary.trim(),
          body: enBody.trim() || enSummary.trim(),
          readTime: `${Math.max(1, Math.ceil(enSummary.length / 100))} min read`,
        },
        ...(hiTitle.trim() && hiSummary.trim()
          ? {
              hi: {
                title: hiTitle.trim(),
                summary: hiSummary.trim(),
                body: hiBody.trim() || hiSummary.trim(),
                readTime: `${Math.max(1, Math.ceil(hiSummary.length / 100))} मिनट`,
              },
            }
          : {}),
        ...(teTitle.trim() && teSummary.trim()
          ? {
              te: {
                title: teTitle.trim(),
                summary: teSummary.trim(),
                body: teBody.trim() || teSummary.trim(),
                readTime: `${Math.max(1, Math.ceil(teSummary.length / 100))} నిమిషాలు`,
              },
            }
          : {}),
      },
    };

    addPost(newPostData);
    setSuccessMessage(true);
    setErrorMsg('');

    // Reset Form
    setEnTitle('');
    setEnSummary('');
    setEnBody('');
    setHiTitle('');
    setHiSummary('');
    setHiBody('');
    setTeTitle('');
    setTeSummary('');
    setTeBody('');

    setTimeout(() => setSuccessMessage(false), 4000);
  };

  return (
    <div className="bg-paper-50/90 backdrop-blur-md rounded-2xl border border-ink-900/10 p-6 sm:p-8 shadow-xl space-y-6">
      <div>
        <h2 className="font-serif font-black text-2xl text-ink-950">{t('adminForm.title')}</h2>
        <p className="text-xs text-ink-500 font-medium">{t('adminForm.subtitle')}</p>
      </div>

      {successMessage && (
        <div className="flex items-center space-x-2 p-4 bg-emerald-950/10 border border-emerald-900/20 text-emerald-900 rounded-xl text-xs font-semibold">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 flex-shrink-0" />
          <span>{t('adminForm.publishedSuccess')}</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-3 bg-crimson-800/10 border border-crimson-800/20 text-crimson-800 rounded-xl text-xs font-semibold">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Global Post Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-ink-800 uppercase tracking-wider mb-1.5">
              {t('adminForm.category')}
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full px-3 py-2.5 bg-paper-100 border border-ink-900/15 rounded-xl text-xs font-semibold text-ink-900 focus:outline-none focus:ring-2 focus:ring-crimson-800"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-800 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>{t('adminForm.author')}</span>
              <User className="w-3 h-3 text-ink-400" />
            </label>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full px-3 py-2.5 bg-paper-100 border border-ink-900/15 rounded-xl text-xs font-medium text-ink-900 focus:outline-none focus:ring-2 focus:ring-crimson-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-800 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>{t('adminForm.source')}</span>
              <Globe className="w-3 h-3 text-ink-400" />
            </label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full px-3 py-2.5 bg-paper-100 border border-ink-900/15 rounded-xl text-xs font-medium text-ink-900 focus:outline-none focus:ring-2 focus:ring-crimson-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-800 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>Cover Image</span>
              <ImageIcon className="w-3 h-3 text-ink-400" />
            </label>
            <input
              type="url"
              value={coverImageUrl}
              onChange={(e) => setCoverImageUrl(e.target.value)}
              placeholder={t('adminForm.coverUrlPlaceholder')}
              className="w-full px-3 py-2.5 bg-paper-100 border border-ink-900/15 rounded-xl text-xs font-mono text-ink-900 focus:outline-none focus:ring-2 focus:ring-crimson-800"
            />
          </div>
        </div>

        {/* Quick Sample Image Selection */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          <span className="text-[11px] font-bold text-ink-500 uppercase whitespace-nowrap">Presets:</span>
          {PRESET_IMAGES.map((imgUrl, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setCoverImageUrl(imgUrl)}
              className={`w-10 h-7 rounded-md overflow-hidden border-2 transition-all flex-shrink-0 ${
                coverImageUrl === imgUrl ? 'border-crimson-800 scale-105' : 'border-transparent opacity-60'
              }`}
            >
              <img src={imgUrl} alt="Preset" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Language Tabs */}
        <div className="border-b border-ink-900/10">
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setActiveTab('en')}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all ${
                activeTab === 'en'
                  ? 'bg-paper-200 text-crimson-800 border-t-2 border-crimson-800'
                  : 'text-ink-500 hover:text-ink-900'
              }`}
            >
              {t('adminForm.enTab')}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('hi')}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl font-hindi transition-all ${
                activeTab === 'hi'
                  ? 'bg-paper-200 text-crimson-800 border-t-2 border-crimson-800'
                  : 'text-ink-500 hover:text-ink-900'
              }`}
            >
              {t('adminForm.hiTab')} {hiTitle ? '✓' : ''}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('te')}
              className={`px-4 py-2.5 text-xs font-bold rounded-t-xl font-telugu transition-all ${
                activeTab === 'te'
                  ? 'bg-paper-200 text-crimson-800 border-t-2 border-crimson-800'
                  : 'text-ink-500 hover:text-ink-900'
              }`}
            >
              {t('adminForm.teTab')} {teTitle ? '✓' : ''}
            </button>
          </div>
        </div>

        {/* Language Form Fields */}
        {activeTab === 'en' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-ink-800 uppercase tracking-wider mb-1">
                English Headline Title *
              </label>
              <input
                type="text"
                value={enTitle}
                onChange={(e) => setEnTitle(e.target.value)}
                placeholder="Enter compelling news headline..."
                className="w-full px-4 py-3 bg-paper-100 border border-ink-900/15 rounded-xl text-sm font-semibold text-ink-950 focus:outline-none focus:ring-2 focus:ring-crimson-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-ink-800 uppercase tracking-wider mb-1">
                Reel Excerpt Summary * (~250 characters)
              </label>
              <textarea
                rows={2}
                value={enSummary}
                onChange={(e) => setEnSummary(e.target.value)}
                placeholder="Short summary displayed on full-screen card..."
                className="w-full px-4 py-3 bg-paper-100 border border-ink-900/15 rounded-xl text-xs font-normal text-ink-900 focus:outline-none focus:ring-2 focus:ring-crimson-800"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-ink-800 uppercase tracking-wider mb-1">
                Full Article Text (Optional)
              </label>
              <textarea
                rows={4}
                value={enBody}
                onChange={(e) => setEnBody(e.target.value)}
                placeholder="Full article content for expanded reader view..."
                className="w-full px-4 py-3 bg-paper-100 border border-ink-900/15 rounded-xl text-xs font-normal text-ink-900 focus:outline-none focus:ring-2 focus:ring-crimson-800"
              />
            </div>
          </div>
        )}

        {activeTab === 'hi' && (
          <div className="space-y-4 font-hindi">
            <div>
              <label className="block text-xs font-bold text-ink-800 uppercase tracking-wider mb-1">
                हिंदी मुख्य शीर्षक (Hindi Headline)
              </label>
              <input
                type="text"
                value={hiTitle}
                onChange={(e) => setHiTitle(e.target.value)}
                placeholder="हिंदी में शीर्षक दर्ज करें..."
                className="w-full px-4 py-3 bg-paper-100 border border-ink-900/15 rounded-xl text-sm font-semibold text-ink-950 focus:outline-none focus:ring-2 focus:ring-crimson-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-ink-800 uppercase tracking-wider mb-1">
                संक्षिप्त सारांश (Hindi Excerpt)
              </label>
              <textarea
                rows={2}
                value={hiSummary}
                onChange={(e) => setHiSummary(e.target.value)}
                placeholder="संक्षिप्त सारांश..."
                className="w-full px-4 py-3 bg-paper-100 border border-ink-900/15 rounded-xl text-xs font-normal text-ink-900 focus:outline-none focus:ring-2 focus:ring-crimson-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-ink-800 uppercase tracking-wider mb-1">
                पूरा समाचार (Hindi Article Body)
              </label>
              <textarea
                rows={4}
                value={hiBody}
                onChange={(e) => setHiBody(e.target.value)}
                placeholder="पूरा समाचार पाठ..."
                className="w-full px-4 py-3 bg-paper-100 border border-ink-900/15 rounded-xl text-xs font-normal text-ink-900 focus:outline-none focus:ring-2 focus:ring-crimson-800"
              />
            </div>
          </div>
        )}

        {activeTab === 'te' && (
          <div className="space-y-4 font-telugu">
            <div>
              <label className="block text-xs font-bold text-ink-800 uppercase tracking-wider mb-1">
                తెలుగు ముఖ్యాంశం (Telugu Headline)
              </label>
              <input
                type="text"
                value={teTitle}
                onChange={(e) => setTeTitle(e.target.value)}
                placeholder="తెలుగులో శీర్షిక ఇవ్వండి..."
                className="w-full px-4 py-3 bg-paper-100 border border-ink-900/15 rounded-xl text-sm font-semibold text-ink-950 focus:outline-none focus:ring-2 focus:ring-crimson-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-ink-800 uppercase tracking-wider mb-1">
                సంక్షిప్త సారాంశం (Telugu Excerpt)
              </label>
              <textarea
                rows={2}
                value={teSummary}
                onChange={(e) => setTeSummary(e.target.value)}
                placeholder="సంక్షిప్త సారాంశం..."
                className="w-full px-4 py-3 bg-paper-100 border border-ink-900/15 rounded-xl text-xs font-normal text-ink-900 focus:outline-none focus:ring-2 focus:ring-crimson-800"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-ink-800 uppercase tracking-wider mb-1">
                పూర్తి వార్త (Telugu Article Body)
              </label>
              <textarea
                rows={4}
                value={teBody}
                onChange={(e) => setTeBody(e.target.value)}
                placeholder="పూర్తి వార్త పాఠం..."
                className="w-full px-4 py-3 bg-paper-100 border border-ink-900/15 rounded-xl text-xs font-normal text-ink-900 focus:outline-none focus:ring-2 focus:ring-crimson-800"
              />
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3.5 bg-crimson-800 hover:bg-crimson-900 text-paper-50 font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center space-x-2 active:scale-98"
        >
          <Send className="w-4 h-4" />
          <span>{t('adminForm.publishBtn')}</span>
        </button>
      </form>
    </div>
  );
};
