export type Language = 'en' | 'hi' | 'te';

export type Category = 'National' | 'World' | 'Business' | 'Technology' | 'Sports' | 'Entertainment' | 'Science';

export interface LocalizedFields {
  title: string;
  summary: string;
  body: string;
  readTime: string;
}

export interface NewsPost {
  id: string;
  category: Category;
  coverImageUrl: string;
  publishedAt: string; // ISO String
  author?: string;
  source?: string;
  translations: {
    en: LocalizedFields;
    hi?: LocalizedFields;
    te?: LocalizedFields;
  };
}
