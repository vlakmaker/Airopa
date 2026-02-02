# Quick Start Guide - AIropa Frontend with API Integration

## ✅ Phase 2 Complete!

The frontend now integrates with the backend API. All components have been updated to fetch dynamic data.

## Getting Started

### 1. Configure API Endpoint

Edit `.env.development` to point to your backend API:
```bash
VITE_API_BASE_URL=http://localhost:8000/api
```

### 2. Start Backend API

Make sure your FastAPI backend is running on the configured port (e.g., port 8000).

### 3. Install Dependencies (if not already done)

```bash
npm install
```

### 4. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## What's New

### API Client Layer
- `src/api/types.ts` - TypeScript interfaces for API
- `src/api/client.ts` - API fetch functions
- `src/hooks/useArticles.ts` - React Query hooks with caching

### Updated Components
All these now use the API:
- FeaturedStory
- StartupGrid
- PolicySection
- CountrySpotlight

### Features
- ✅ Automatic caching (5-10 min)
- ✅ Loading states with skeletons
- ✅ Error handling with retry
- ✅ Type-safe API calls
- ✅ Optimized performance

## Testing

1. Start backend API
2. Run `npm run dev`
3. Open browser
4. Verify articles load from API
5. Test error handling by stopping backend

## Build for Production

```bash
npm run build
```

Build output will be in `dist/` directory.

## Troubleshooting

**CORS errors?**
Add CORS middleware to your FastAPI backend:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Articles not loading?**
- Check backend is running
- Verify API URL in `.env.development`
- Check browser console for errors

## Next Steps

See `IMPLEMENTATION_PLAN.md` for:
- Phase 3: Additional components
- Phase 4: New pages (category, country, article detail)
- Phase 5: Admin dashboard
- Phase 6: Testing & optimization

For detailed implementation info, see `API_INTEGRATION_SUMMARY.md`
