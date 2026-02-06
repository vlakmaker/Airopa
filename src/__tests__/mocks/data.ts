import type { Article, ArticlesListResponse, HealthResponse } from '@/api/types';

export const mockArticle: Article = {
  id: '1',
  title: 'AI Startup Raises €50M Series B',
  url: 'https://example.com/article-1',
  source: 'TechCrunch',
  category: 'startups',
  country: 'France',
  quality_score: 0.85,
  image_url: 'https://example.com/images/startup.jpg',
  created_at: '2024-01-15T10:00:00Z',
  published_date: '2024-01-15T09:00:00Z',
};

export const mockArticle2: Article = {
  id: '2',
  title: 'EU AI Act Implementation Guidelines',
  url: 'https://example.com/article-2',
  source: 'European Commission',
  category: 'policy',
  country: 'Europe',
  quality_score: 0.92,
  image_url: null,
  created_at: '2024-01-14T15:30:00Z',
  published_date: '2024-01-14T14:00:00Z',
};

export const mockArticle3: Article = {
  id: '3',
  title: 'German AI Research Breakthrough',
  url: 'https://example.com/article-3',
  source: 'Nature',
  category: 'country',
  country: 'Germany',
  quality_score: 0.78,
  created_at: '2024-01-13T08:00:00Z',
};

export const mockArticlesResponse: ArticlesListResponse = {
  articles: [mockArticle, mockArticle2, mockArticle3],
  total: 3,
  limit: 50,
  offset: 0,
  timestamp: '2024-01-15T12:00:00Z',
};

export const mockHealthResponse: HealthResponse = {
  status: 'ok',
  timestamp: '2024-01-15T12:00:00Z',
  api_version: '1.0.0',
};

export const mockErrorResponse = {
  detail: 'Article not found',
};
