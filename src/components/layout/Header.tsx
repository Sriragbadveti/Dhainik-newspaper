import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck, Newspaper, ArrowLeft } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { useAppStore } from '../../store/useAppStore';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');
  const { isAdmin } = useAppStore();

  const formattedDate = new Date().toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-paper-50/85 backdrop-blur-md border-b border-ink-900/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        {/* Left: Branding & Date */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <Link to="/" className="group flex items-center space-x-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-crimson-800 text-paper-50 rounded-lg flex items-center justify-center font-serif font-black text-xl sm:text-2xl shadow-sm group-hover:bg-crimson-900 transition-colors">
              D
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-black text-xl sm:text-2xl tracking-tight text-ink-950 uppercase leading-none">
                {t('appName')}
              </span>
              <span className="text-[10px] sm:text-xs font-semibold text-crimson-800 uppercase tracking-widest leading-tight mt-0.5">
                {t('edition')}
              </span>
            </div>
          </Link>

          <div className="hidden md:block h-7 w-px bg-ink-900/15" />

          <div className="hidden md:flex flex-col text-xs text-ink-500 font-medium">
            <span>{formattedDate}</span>
            <span className="text-[10px] tracking-wide uppercase text-ink-800/60 font-semibold">{t('appSubtitle')}</span>
          </div>
        </div>

        {/* Right: Language Switcher, Breaking Stack & Admin Link */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <LanguageSwitcher />

          <Link
            to={location.pathname === '/trending' ? '/' : '/trending'}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold rounded-full border transition-all shadow-sm ${
              location.pathname === '/trending'
                ? 'bg-crimson-800 text-paper-50 border-crimson-800'
                : 'bg-paper-200/80 text-ink-900 border-ink-900/10 hover:bg-crimson-800 hover:text-paper-50 hover:border-crimson-800'
            }`}
            title="Toggle Breaking News Stack"
          >
            <span className="w-2 h-2 rounded-full bg-crimson-600 animate-ping" />
            <span>⚡ {location.pathname === '/trending' ? 'Reel Feed' : 'Breaking'}</span>
          </Link>

          {isAdminPath ? (
            <Link
              to="/"
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-ink-800 bg-paper-200/80 hover:bg-paper-300 rounded-full border border-ink-900/10 transition-colors shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t('backToFeed')}</span>
            </Link>
          ) : (
            <Link
              to="/admin"
              className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all shadow-sm ${
                isAdmin
                  ? 'bg-emerald-950/10 text-emerald-900 border-emerald-900/30 hover:bg-emerald-950/20'
                  : 'bg-paper-200/80 text-ink-800 border-ink-900/10 hover:bg-paper-300'
              }`}
              title={isAdmin ? 'Admin Authenticated' : 'Admin Login'}
            >
              {isAdmin ? <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> : <Newspaper className="w-3.5 h-3.5 text-ink-800" />}
              <span className="hidden sm:inline">{t('admin')}</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
