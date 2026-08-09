import { create } from 'zustand';
import { Language, NewsPost } from '../types/news';
import { postsService } from '../data/postsService';
import i18n from '../i18n/i18n';

interface AppState {
  language: Language;
  setLanguage: (lang: Language) => void;
  isLangSwitching: boolean;
  
  activePostIndex: number;
  setActivePostIndex: (index: number | ((prev: number) => number)) => void;
  
  posts: NewsPost[];
  refreshPosts: () => void;
  addPost: (post: Omit<NewsPost, 'id' | 'publishedAt'>) => void;
  deletePost: (id: string) => void;
  resetPosts: () => void;
  
  expandedPost: NewsPost | null;
  setExpandedPost: (post: NewsPost | null) => void;
  
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  language: (localStorage.getItem('dainik_language') as Language) || 'en',
  isLangSwitching: false,
  
  setLanguage: (lang: Language) => {
    if (get().language === lang) return;
    set({ isLangSwitching: true });
    
    // Smooth blur transition trigger
    setTimeout(() => {
      i18n.changeLanguage(lang);
      localStorage.setItem('dainik_language', lang);
      set({ language: lang });
      
      setTimeout(() => {
        set({ isLangSwitching: false });
      }, 200);
    }, 150);
  },

  activePostIndex: 0,
  setActivePostIndex: (indexOrFn) => {
    set(state => {
      const newIndex = typeof indexOrFn === 'function' ? indexOrFn(state.activePostIndex) : indexOrFn;
      const clamped = Math.max(0, Math.min(newIndex, state.posts.length - 1));
      return { activePostIndex: clamped };
    });
  },

  posts: postsService.getPosts(),
  
  refreshPosts: () => {
    const updated = postsService.getPosts();
    set({ posts: updated });
  },

  addPost: (postData) => {
    const newPost = postsService.addPost(postData);
    set(state => ({
      posts: [newPost, ...state.posts],
      activePostIndex: 0 // Scroll to newly added post at top
    }));
  },

  deletePost: (id: string) => {
    const updated = postsService.deletePost(id);
    set(state => ({
      posts: updated,
      activePostIndex: Math.min(state.activePostIndex, Math.max(0, updated.length - 1))
    }));
  },

  resetPosts: () => {
    const seed = postsService.resetToSeedData();
    set({ posts: seed, activePostIndex: 0 });
  },

  expandedPost: null,
  setExpandedPost: (post) => set({ expandedPost: post }),

  isAdmin: sessionStorage.getItem('dainik_is_admin') === 'true',
  setIsAdmin: (isAdmin) => {
    sessionStorage.setItem('dainik_is_admin', isAdmin ? 'true' : 'false');
    set({ isAdmin });
  }
}));
