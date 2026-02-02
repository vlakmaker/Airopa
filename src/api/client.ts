/**
 * API Client for AIropa Backend
 *
 * Provides functions to interact with the FastAPI backend
 */

import {
  Article,
  ArticlesListResponse,
  ArticleResponse,
  HealthResponse,
  APIError,
  ArticleQueryParams,
  API_BASE_URL,
  DEFAULT_LIMIT,
  DEFAULT_MIN_QUALITY,
} from './types';

/**
 * Custom error class for API errors
 */
export class APIClientError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'APIClientError';
    this.status = status;
  }
}

/**
 * Handle API response errors
 */
async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let errorMessage = 'API request failed';

    try {
      const errorData: APIError = await response.json();
      errorMessage = errorData.detail || errorMessage;
    } catch {
      // If parsing error response fails, use status text
      errorMessage = response.statusText || errorMessage;
    }

    throw new APIClientError(errorMessage, response.status);
  }

  return response.json();
}

/**
 * Build URL with query parameters
 */
function buildURL(endpoint: string, params?: Record<string, string | number | boolean>): string {
  const url = new URL(`${API_BASE_URL}${endpoint}`, window.location.origin);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  return url.toString();
}

/**
 * Fetch articles with optional filtering
 *
 * @param params - Query parameters for filtering articles
 * @returns Promise<ArticlesListResponse>
 */
export async function fetchArticles(params: ArticleQueryParams = {}): Promise<ArticlesListResponse> {
  const {
    limit = DEFAULT_LIMIT,
    offset = 0,
    category,
    country,
    minQuality = DEFAULT_MIN_QUALITY,
  } = params;

  const queryParams: Record<string, string | number> = {
    limit,
    offset,
  };

  if (category) queryParams.category = category;
  if (country) queryParams.country = country;
  if (minQuality > 0) queryParams.min_quality = minQuality;

  try {
    const url = buildURL('/articles', queryParams);
    const response = await fetch(url);
    return handleResponse<ArticlesListResponse>(response);
  } catch (error) {
    if (error instanceof APIClientError) {
      throw error;
    }
    throw new APIClientError(
      error instanceof Error ? error.message : 'Network error occurred'
    );
  }
}

/**
 * Fetch a single article by ID
 *
 * @param articleId - The article ID
 * @returns Promise<ArticleResponse>
 */
export async function fetchArticleById(articleId: string): Promise<ArticleResponse> {
  try {
    const url = buildURL(`/articles/${articleId}`);
    const response = await fetch(url);
    return handleResponse<ArticleResponse>(response);
  } catch (error) {
    if (error instanceof APIClientError) {
      throw error;
    }
    throw new APIClientError(
      error instanceof Error ? error.message : 'Network error occurred'
    );
  }
}

/**
 * Check API health status
 *
 * @returns Promise<HealthResponse>
 */
export async function checkHealth(): Promise<HealthResponse> {
  try {
    const url = buildURL('/health');
    const response = await fetch(url);
    return handleResponse<HealthResponse>(response);
  } catch (error) {
    if (error instanceof APIClientError) {
      throw error;
    }
    throw new APIClientError(
      error instanceof Error ? error.message : 'Network error occurred'
    );
  }
}

/**
 * Utility function to check if error is an API error
 */
export function isAPIError(error: unknown): error is APIClientError {
  return error instanceof APIClientError;
}
