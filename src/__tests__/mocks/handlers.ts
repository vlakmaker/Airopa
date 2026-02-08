import { http, HttpResponse } from 'msw';
import { 
  mockArticlesResponse, 
  mockArticle, 
  mockArticle2,
  mockHealthResponse, 
  mockErrorResponse 
} from './data';

const API_BASE_URL = '/api';

export const handlers = [
  http.get(`${API_BASE_URL}/articles`, ({ request }) => {
    const url = new URL(request.url);
    const category = url.searchParams.get('category');
    const country = url.searchParams.get('country');
    const minQuality = url.searchParams.get('min_quality');
    const limit = url.searchParams.get('limit');
    const offset = url.searchParams.get('offset');

    let articles = mockArticlesResponse.articles;

    if (category) {
      articles = articles.filter(a => a.category === category);
    }

    if (country) {
      articles = articles.filter(a => a.country === country);
    }

    if (minQuality) {
      const minQualityNum = parseFloat(minQuality);
      articles = articles.filter(a => a.quality_score >= minQualityNum);
    }

    const limitNum = limit ? parseInt(limit) : 50;
    const offsetNum = offset ? parseInt(offset) : 0;
    const paginatedArticles = articles.slice(offsetNum, offsetNum + limitNum);

    return HttpResponse.json({
      ...mockArticlesResponse,
      articles: paginatedArticles,
      total: articles.length,
      limit: limitNum,
      offset: offsetNum,
    });
  }),

  http.get(`${API_BASE_URL}/articles/:id`, ({ params }) => {
    const { id } = params;

    if (id === '1') {
      return HttpResponse.json(mockArticle);
    } else if (id === '2') {
      return HttpResponse.json(mockArticle2);
    } else if (id === 'not-found') {
      return HttpResponse.json(mockErrorResponse, { status: 404 });
    }

    return HttpResponse.json(mockArticle);
  }),

  http.get(`${API_BASE_URL}/health`, () => {
    return HttpResponse.json(mockHealthResponse);
  }),
];
