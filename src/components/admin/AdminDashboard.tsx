import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LogOut, PlusCircle, ListOrdered } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { AdminLogin } from './AdminLogin';
import { AdminPostForm } from './AdminPostForm';
import { AdminPostList } from './AdminPostList';

export const AdminDashboard: React.FC = () => {
  const { isAdmin, setIsAdmin } = useAppStore();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'create' | 'manage'>('create');

  if (!isAdmin) {
    return <AdminLogin />;
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-paper-50/90 backdrop-blur-md p-4 rounded-2xl border border-ink-900/10 shadow-sm">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setActiveTab('create')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'create'
                ? 'bg-crimson-800 text-paper-50 shadow-sm'
                : 'bg-paper-200 text-ink-800 hover:bg-paper-300'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Publish New Story</span>
          </button>

          <button
            onClick={() => setActiveTab('manage')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'manage'
                ? 'bg-crimson-800 text-paper-50 shadow-sm'
                : 'bg-paper-200 text-ink-800 hover:bg-paper-300'
            }`}
          >
            <ListOrdered className="w-4 h-4" />
            <span>Manage Published ({useAppStore.getState().posts.length})</span>
          </button>
        </div>

        <button
          onClick={() => setIsAdmin(false)}
          className="flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold text-crimson-800 bg-crimson-800/10 hover:bg-crimson-800 hover:text-paper-50 rounded-xl transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Exit Editor Session</span>
        </button>
      </div>

      {/* Main Panel Content */}
      {activeTab === 'create' ? <AdminPostForm /> : <AdminPostList />}
    </div>
  );
};
