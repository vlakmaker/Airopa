import { describe, it, expect } from 'vitest';
import { articleToPost, articlesToPosts } from '@/lib/adapters';
import { mockArticle, mockArticle2, mockArticle3 } from '../mocks/data';

describe('Adapters', () => {
  describe('articleToPost', () => {
    it('should transform article to post correctly', () => {
      const post = articleToPost(mockArticle);

      expect(post.slug).toBe(mockArticle.id);
      expect(post.html).toBe('');
      expect(post.data.title).toBe(mockArticle.title);
      expect(post.data.source?.name).toBe(mockArticle.source);
      expect(post.data.source?.url).toBe(mockArticle.url);
      expect(post.data.canonical).toBe(mockArticle.url);
      expect(post.data.country).toBe(mockArticle.country);
    });

    it('should use published_date over created_at when available', () => {
      const post = articleToPost(mockArticle);

      expect(post.data.date).toBe(mockArticle.published_date);
    });

    it('should use created_at when published_date is not available', () => {
      const post = articleToPost(mockArticle3);

      expect(post.data.date).toBe(mockArticle3.created_at);
    });

    it('should map category to pillar correctly', () => {
      const startupsPost = articleToPost(mockArticle);
      expect(startupsPost.data.pillar).toBe('startups');

      const policyPost = articleToPost(mockArticle2);
      expect(policyPost.data.pillar).toBe('policy');

      const countryPost = articleToPost(mockArticle3);
      expect(countryPost.data.pillar).toBe('country');
    });

    it('should map "stories" category to "research" pillar', () => {
      const storiesArticle = {
        ...mockArticle,
        category: 'stories' as const,
      };
      const post = articleToPost(storiesArticle);

      expect(post.data.pillar).toBe('research');
    });

    it('should set editor_pick based on quality_score', () => {
      const highQualityArticle = {
        ...mockArticle,
        quality_score: 0.85,
      };
      const highQualityPost = articleToPost(highQualityArticle);
      expect(highQualityPost.data.editor_pick).toBe(true);

      const lowQualityArticle = {
        ...mockArticle,
        quality_score: 0.75,
      };
      const lowQualityPost = articleToPost(lowQualityArticle);
      expect(lowQualityPost.data.editor_pick).toBe(false);
    });

    it('should include category as tag', () => {
      const post = articleToPost(mockArticle);

      expect(post.data.tags).toContain(mockArticle.category);
    });

    it('should set ai_generated to false', () => {
      const post = articleToPost(mockArticle);

      expect(post.data.ai_generated).toBe(false);
    });

    it('should use API image_url when available', () => {
      const startupsPost = articleToPost(mockArticle);
      expect(startupsPost.data.cover).toBe(mockArticle.image_url);
      expect(startupsPost.data.cover_fallback).toBe('/assets/startup-berlin.jpg');
    });

    it('should fallback to category image when image_url is missing', () => {
      const policyPost = articleToPost(mockArticle2);
      expect(policyPost.data.cover).toBe('/assets/eu-parliament.jpg');
      expect(policyPost.data.cover_fallback).toBe('/assets/eu-parliament.jpg');

      const countryPost = articleToPost(mockArticle3);
      expect(countryPost.data.cover).toBe('/assets/featured-story.jpg');
      expect(countryPost.data.cover_fallback).toBe('/assets/featured-story.jpg');
    });

    it('should fallback to category image when image_url is empty string', () => {
      const emptyImageArticle = { ...mockArticle, image_url: '' };
      const post = articleToPost(emptyImageArticle);
      expect(post.data.cover).toBe('/assets/startup-berlin.jpg');

      const whitespaceArticle = { ...mockArticle, image_url: '   ' };
      const wsPost = articleToPost(whitespaceArticle);
      expect(wsPost.data.cover).toBe('/assets/startup-berlin.jpg');
    });

    it('should use article summary when available', () => {
      const articleWithSummary = { ...mockArticle, summary: 'AI startup funding round.' };
      const post = articleToPost(articleWithSummary);
      expect(post.data.summary).toBe('AI startup funding round.');
    });

    it('should default to empty string when no summary', () => {
      const post = articleToPost(mockArticle);
      expect(post.data.summary).toBe('');
    });
  });

  describe('articlesToPosts', () => {
    it('should transform array of articles to posts', () => {
      const articles = [mockArticle, mockArticle2, mockArticle3];
      const posts = articlesToPosts(articles);

      expect(posts).toHaveLength(3);
      expect(posts[0].slug).toBe(mockArticle.id);
      expect(posts[1].slug).toBe(mockArticle2.id);
      expect(posts[2].slug).toBe(mockArticle3.id);
    });

    it('should handle empty array', () => {
      const posts = articlesToPosts([]);

      expect(posts).toHaveLength(0);
      expect(posts).toEqual([]);
    });

    it('should preserve order of articles', () => {
      const articles = [mockArticle2, mockArticle, mockArticle3];
      const posts = articlesToPosts(articles);

      expect(posts[0].slug).toBe(mockArticle2.id);
      expect(posts[1].slug).toBe(mockArticle.id);
      expect(posts[2].slug).toBe(mockArticle3.id);
    });
  });
});
