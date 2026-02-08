import { describe, it, expect, beforeEach } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/server';
import {
  fetchArticles,
  fetchArticleById,
  checkHealth,
  isAPIError,
  APIClientError,
} from '@/api/client';
import { mockArticle, mockErrorResponse } from '../mocks/data';

describe('API Client', () => {
  describe('fetchArticles', () => {
    it('should fetch articles successfully', async () => {
      const result = await fetchArticles();
      
      expect(result).toHaveProperty('articles');
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('limit');
      expect(result).toHaveProperty('offset');
      expect(result.articles).toBeInstanceOf(Array);
      expect(result.articles.length).toBeGreaterThan(0);
    });

    it('should apply default parameters', async () => {
      const result = await fetchArticles();
      
      expect(result.limit).toBe(50);
      expect(result.offset).toBe(0);
    });

    it('should filter by category', async () => {
      const result = await fetchArticles({ category: 'startups' });
      
      expect(result.articles).toHaveLength(1);
      expect(result.articles[0].category).toBe('startups');
    });

    it('should filter by country', async () => {
      const result = await fetchArticles({ country: 'France' });
      
      expect(result.articles).toHaveLength(1);
      expect(result.articles[0].country).toBe('France');
    });

    it('should filter by minimum quality', async () => {
      const result = await fetchArticles({ minQuality: 0.9 });
      
      expect(result.articles.length).toBeGreaterThanOrEqual(0);
      result.articles.forEach(article => {
        expect(article.quality_score).toBeGreaterThanOrEqual(0.9);
      });
    });

    it('should apply custom limit and offset', async () => {
      const result = await fetchArticles({ limit: 10, offset: 0 });
      
      expect(result.limit).toBe(10);
      expect(result.offset).toBe(0);
    });

    it('should throw APIClientError on server error', async () => {
      server.use(
        http.get('/api/articles', () => {
          return HttpResponse.json(
            { detail: 'Internal server error' },
            { status: 500 }
          );
        })
      );

      await expect(fetchArticles()).rejects.toThrow(APIClientError);
      await expect(fetchArticles()).rejects.toThrow('Internal server error');
    });

    it('should handle network errors', async () => {
      server.use(
        http.get('/api/articles', () => {
          return HttpResponse.error();
        })
      );

      await expect(fetchArticles()).rejects.toThrow(APIClientError);
    });
  });

  describe('fetchArticleById', () => {
    it('should fetch a single article successfully', async () => {
      const result = await fetchArticleById('1');
      
      expect(result).toHaveProperty('id', '1');
      expect(result).toHaveProperty('title');
      expect(result).toHaveProperty('url');
      expect(result).toHaveProperty('source');
      expect(result).toHaveProperty('category');
      expect(result).toHaveProperty('quality_score');
    });

    it('should throw 404 error when article not found', async () => {
      await expect(fetchArticleById('not-found')).rejects.toThrow(APIClientError);
      
      try {
        await fetchArticleById('not-found');
      } catch (error) {
        expect(error).toBeInstanceOf(APIClientError);
        expect((error as APIClientError).status).toBe(404);
      }
    });

    it('should handle server errors', async () => {
      server.use(
        http.get('/api/articles/:id', () => {
          return HttpResponse.json(
            { detail: 'Database error' },
            { status: 500 }
          );
        })
      );

      await expect(fetchArticleById('1')).rejects.toThrow(APIClientError);
    });
  });

  describe('checkHealth', () => {
    it('should return health status successfully', async () => {
      const result = await checkHealth();
      
      expect(result).toHaveProperty('status', 'ok');
      expect(result).toHaveProperty('timestamp');
    });

    it('should throw error on health check failure', async () => {
      server.use(
        http.get('/api/health', () => {
          return HttpResponse.json(
            { detail: 'Service unavailable' },
            { status: 503 }
          );
        })
      );

      await expect(checkHealth()).rejects.toThrow(APIClientError);
    });
  });

  describe('APIClientError', () => {
    it('should create error with message and status', () => {
      const error = new APIClientError('Test error', 404);
      
      expect(error.message).toBe('Test error');
      expect(error.status).toBe(404);
      expect(error.name).toBe('APIClientError');
    });

    it('should create error without status', () => {
      const error = new APIClientError('Test error');
      
      expect(error.message).toBe('Test error');
      expect(error.status).toBeUndefined();
    });
  });

  describe('isAPIError', () => {
    it('should return true for APIClientError', () => {
      const error = new APIClientError('Test error', 404);
      expect(isAPIError(error)).toBe(true);
    });

    it('should return false for regular Error', () => {
      const error = new Error('Regular error');
      expect(isAPIError(error)).toBe(false);
    });

    it('should return false for non-error values', () => {
      expect(isAPIError(null)).toBe(false);
      expect(isAPIError(undefined)).toBe(false);
      expect(isAPIError('string')).toBe(false);
      expect(isAPIError({})).toBe(false);
    });
  });
});
