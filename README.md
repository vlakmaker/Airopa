# AIropa.news

Signals from the European AI frontier. Curated news, startups, and policy from across the continent.

**Live**: [www.airopa.news](https://www.airopa.news)

## What is AIropa?

AIropa is an automated news aggregator focused on European AI and technology. It scrapes RSS feeds from 13+ European tech sources, classifies articles using LLM-powered agents, and presents them in a clean, feed-first interface.

## Architecture

```
RSS Feeds (13 sources)
    |
    v
[airopa-automation]         <-- Backend (FastAPI + PostgreSQL)
  Scraper Agent             Fetches & deduplicates articles
  Classifier Agent          LLM-powered category + EU relevance scoring
  Summarizer Agent          2-3 sentence editorial summaries
  Quality Scorer            Rule-based quality gate
    |
    v
REST API (/api/articles)
    |
    v
[Airopa]                    <-- This repo (React frontend)
  Feed-first homepage
  Category filtering
  Article detail pages
```

## Tech Stack

| Layer     | Technology                                    |
|-----------|-----------------------------------------------|
| Framework | React 18 + TypeScript                         |
| Build     | Vite                                          |
| Styling   | Tailwind CSS + shadcn/ui                      |
| Routing   | React Router v6                               |
| Data      | TanStack Query v5 (infinite scroll, caching)  |
| Icons     | Lucide React                                  |
| Testing   | Vitest + MSW + Testing Library                |
| Deploy    | Lovable (Netlify)                             |

## Project Structure

```
src/
  components/       UI components (CompactHeader, FeaturedStories, ArticleFeed, etc.)
  pages/            Route pages (Index, ArticleDetail, NotFound)
  hooks/            Data fetching hooks (useArticles, useArticle, useHealthCheck)
  lib/              Utilities (adapters, categories, countries, articleSelection)
  __tests__/        Test files, mocks, and handlers
public/
  assets/           Static images (hero-bg.jpg, etc.)
```

## Getting Started

```sh
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm run test:run

# Build for production
npm run build
```

## Environment

The app reads the API base URL from environment variables:

```
VITE_API_BASE_URL=https://web-production-bcd96.up.railway.app
```

## Key Components

- **CompactHeader** -- Sticky header with background texture and navigation
- **FeaturedStories** -- Hero card for top story + grid of featured articles
- **ArticleFeed** -- Infinite-scroll feed with category filtering
- **ArticleCardHorizontal** -- Card component with image, summary, source badge
- **CategorySpotlight** -- Reusable category section (startups, policy, research, industry)

## Related

- **Backend**: [airopa-automation](https://github.com/vlakmaker/airopa-automation) -- FastAPI pipeline with LLM classification
