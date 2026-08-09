import { NewsPost } from '../types/news';
import { SEED_POSTS } from './seedPosts';

const STORAGE_KEY = 'dainik_news_posts_v1';

export const postsService = {
  getPosts(): NewsPost[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_POSTS));
        return SEED_POSTS;
      }
      const parsed = JSON.parse(stored) as NewsPost[];
      if (!Array.isArray(parsed) || parsed.length === 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_POSTS));
        return SEED_POSTS;
      }
      return parsed;
    } catch (e) {
      console.warn('Failed to parse localStorage news posts, using seed data:', e);
      return SEED_POSTS;
    }
  },

  addPost(postData: Omit<NewsPost, 'id' | 'publishedAt'>): NewsPost {
    const posts = this.getPosts();
    const newPost: NewsPost = {
      ...postData,
      id: `post-${Date.now()}`,
      publishedAt: new Date().toISOString(),
    };

    const updated = [newPost, ...posts];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save post to localStorage:', e);
    }
    return newPost;
  },

  deletePost(id: string): NewsPost[] {
    const posts = this.getPosts();
    const updated = posts.filter(p => p.id !== id);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update localStorage after delete:', e);
    }
    return updated;
  },

  resetToSeedData(): NewsPost[] {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_POSTS));
    } catch (e) {
      console.error('Failed to reset seed data in localStorage:', e);
    }
    return SEED_POSTS;
  }
};
