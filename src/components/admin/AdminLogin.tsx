import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Lock, KeyRound, AlertTriangle } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

const DEFAULT_PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE || 'becho2026';

export const AdminLogin: React.FC = () => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const { setIsAdmin } = useAppStore();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === DEFAULT_PASSCODE) {
      setIsAdmin(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 bg-paper-50/90 backdrop-blur-md rounded-2xl border border-ink-900/10 shadow-xl my-12">
      <div className="text-center space-y-3 mb-6">
        <div className="w-12 h-12 bg-crimson-800/10 text-crimson-800 rounded-full flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="font-serif font-black text-2xl text-ink-950">{t('adminAuth.title')}</h2>
        <p className="text-xs text-ink-500 font-medium">{t('adminAuth.subtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-ink-800 uppercase tracking-wider mb-1.5">
            {t('adminAuth.passcodeLabel')}
          </label>
          <div className="relative">
            <input
              type="password"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                setError(false);
              }}
              placeholder={t('adminAuth.passcodePlaceholder')}
              className="w-full px-4 py-3 bg-paper-100 border border-ink-900/15 rounded-xl text-sm font-mono text-ink-900 focus:outline-none focus:ring-2 focus:ring-crimson-800 focus:border-transparent transition-all"
              required
            />
            <KeyRound className="w-4 h-4 text-ink-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
          </div>
          <p className="mt-1 text-[11px] text-ink-400 italic">Default passcode: <code className="font-mono bg-paper-200 px-1.5 py-0.5 rounded text-ink-800 font-bold">becho2026</code></p>
        </div>

        {error && (
          <div className="flex items-center space-x-2 p-3 bg-crimson-800/10 border border-crimson-800/20 text-crimson-800 rounded-xl text-xs font-semibold">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{t('adminAuth.invalid')}</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-crimson-800 hover:bg-crimson-900 text-paper-50 font-semibold text-sm rounded-xl transition-all shadow-md active:scale-98"
        >
          {t('adminAuth.submit')}
        </button>
      </form>
    </div>
  );
};
