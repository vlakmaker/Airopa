/**
 * API Type Definitions for AIropa Backend
 *
 * These types match the FastAPI backend response models
 */

// Article Categories
export type ArticleCategory = 'startups' | 'policy' | 'country' | 'stories' | 'research' | 'industry';

// European Countries (all 27 EU members + Europe)
export type ArticleCountry =
  | 'Austria' | 'Belgium' | 'Bulgaria' | 'Croatia' | 'Cyprus'
  | 'Czech Republic' | 'Denmark' | 'Estonia' | 'Finland' | 'France'
  | 'Germany' | 'Greece' | 'Hungary' | 'Ireland' | 'Italy'
  | 'Latvia' | 'Lithuania' | 'Luxembourg' | 'Malta' | 'Netherlands'
  | 'Poland' | 'Portugal' | 'Romania' | 'Slovakia' | 'Slovenia'
  | 'Spain' | 'Sweden' | 'Europe';

// Core Article Interface
export interface Article {
  id: string;
  title: string;
  url: string;
  source: string;
  category: ArticleCategory;
  country?: ArticleCountry;
  quality_score: number;
  image_url?: string | null;
  summary?: string;
  created_at: string;
  published_date?: string;
}

// API Response Types
export interface ArticlesListResponse {
  articles: Article[];
  total: number;
  limit: number;
  offset: number;
  timestamp: string;
}

export interface ArticleResponse extends Article {}

export interface HealthResponse {
  status: string;
  timestamp: string;
  api_version?: string;
}

// API Error Types
export interface APIError {
  detail: string;
  status?: number;
}

// Query Parameters for Article Filtering
export interface ArticleQueryParams {
  limit?: number;
  offset?: number;
  category?: ArticleCategory;
  country?: ArticleCountry;
  minQuality?: number;
}

// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
export const DEFAULT_LIMIT = 50;
export const DEFAULT_MIN_QUALITY = 0.0;
