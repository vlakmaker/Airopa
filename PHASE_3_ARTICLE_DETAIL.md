# Phase 3: Article Detail Page Implementation

## Overview

Phase 3 adds internal article detail pages at `/article/:id` with ethical source attribution. Users can now click on article cards to view detailed information before being directed to the original source.

**Completion Date:** 2026-02-02
**Branch:** `phase-2-api-integration` (will be merged)
**Status:** ✅ Complete

---

## What's New

### 🎯 Core Features

1. **Internal Article Detail Pages**
   - Route: `/article/:id`
   - View article metadata without leaving the site
   - Maintains consistent navigation and branding

2. **Ethical Source Attribution** (CRITICAL)
   - Prominent source attribution card
   - "Originally published by [Source]" disclaimer
   - Clear CTA to read full article at original source
   - Legal disclaimer about content rights
   - Opens source in new tab with security attributes

3. **Enhanced Navigation**
   - Cards now link internally (no longer open external links directly)
   - Logo intelligently routes based on current page
   - Breadcrumb navigation for better UX

4. **Responsive Design**
   - Mobile-friendly layouts
   - Graceful handling of missing data (covers, dates, etc.)
   - Loading skeletons and error states

---

## New Components

### 1. SourceAttribution Component
**Location:** `src/components/SourceAttribution.tsx`

**Purpose:** Displays prominent, ethical attribution to original article source.

**Features:**
- Accent-bordered card with distinct background
- Source name with globe icon
- "Originally Published By" heading
- Publication date
- Primary CTA button: "Read Full Article at [Source]"
- External link icon
- Legal disclaimer
- Opens in new tab with `rel="noopener noreferrer"`

**Props:**
```typescript
interface SourceAttributionProps {
  sourceName: string;    // Name of the original publisher
  sourceUrl: string;     // URL to the original article
  publishedDate?: string; // ISO date string
}
```

**Example Usage:**
```tsx
<SourceAttribution
  sourceName="TechCrunch"
  sourceUrl="https://techcrunch.com/article/..."
  publishedDate="2026-02-02T10:00:00Z"
/>
```

---

### 2. ArticleHero Component
**Location:** `src/components/ArticleHero.tsx`

**Purpose:** Displays article header with cover image, title, and metadata.

**Features:**
- Full-width cover image (or gradient fallback if missing)
- Article title (h1) with proper SEO hierarchy
- Category badge with pillar classification
- Country badge (if applicable)
- Tags display (up to 3)
- Editor's Pick indicator
- Publication date with calendar icon
- Location with map pin icon
- Card design floats above hero section

**Props:**
```typescript
interface ArticleHeroProps {
  frontmatter: PostFrontmatter; // Full article metadata
}
```

**Handles Missing Data:**
- No cover image → Shows gradient background
- No title → Displays "Untitled Article"
- No location/tags → Gracefully hidden

---

### 3. ArticleDetail Page
**Location:** `src/pages/ArticleDetail.tsx`

**Purpose:** Main article detail page component.

**Features:**
- URL parameter extraction (`/article/:id`)
- React Query data fetching with `useArticle(id)` hook
- Loading state with skeletons
- Error handling with retry functionality
- 404 handling for invalid article IDs
- Breadcrumb navigation (Home > Category)
- Article information card
- Primary CTA (in SourceAttribution)
- Secondary CTA (at bottom)
- Back to Home button
- Automatic scroll to top on mount

**Data Flow:**
```
1. Extract article ID from URL params
2. Fetch article via useArticle(id) hook
3. Transform API Article → Post via articleToPost()
4. Render components with data
5. Handle loading/error/empty states
```

---

## Modified Components

### 4. StoryCard Component
**Location:** `src/components/StoryCard.tsx`

**Changes:**
- Changed from `<a href={external}>` to `<Link to={internal}>`
- Now links to `/article/${post.slug}` instead of external URL
- Removed `target="_blank"` and `rel="noreferrer"`
- Maintains all hover effects and visual styling
- Added `react-router-dom` Link import

**Before:**
```tsx
<a href={d.canonical} target="_blank" rel="noreferrer">
```

**After:**
```tsx
<Link to={`/article/${post.slug}`}>
```

---

### 5. Navigation Component
**Location:** `src/components/Navigation.tsx`

**Changes:**
- Added smart logo routing
- Uses `useLocation()` to detect current page
- Logo behavior:
  - **On home page:** Scrolls to top (existing behavior)
  - **On other pages:** Routes to `/` via Link
- Added React Router imports: `Link`, `useLocation`

**Before:**
```tsx
<button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
  AIropa.news
</button>
```

**After:**
```tsx
{isHomePage ? (
  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
    AIropa.news
  </button>
) : (
  <Link to="/">AIropa.news</Link>
)}
```

---

### 6. App Component
**Location:** `src/App.tsx`

**Changes:**
- Added new route: `/article/:id` → ArticleDetail
- Imported ArticleDetail component
- Positioned above catch-all `*` route

**Routes:**
```tsx
<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/article/:id" element={<ArticleDetail />} />  {/* NEW */}
  <Route path="*" element={<NotFound />} />
</Routes>
```

---

## API Integration

### Endpoint Used
```
GET /api/articles/{id}
```

**Response:**
```typescript
{
  id: string,
  title: string,
  url: string,              // Original source URL
  source: string,           // Publisher name
  category: ArticleCategory,
  country?: ArticleCountry,
  quality_score: number,
  created_at: string,
  published_date?: string
}
```

### Data Limitations
- **No article body/content** - API returns metadata only
- **No cover images** - All articles use gradient fallbacks
- **Summary is placeholder** - Shows "Quality Score: XX%"

These limitations are handled gracefully in the UI.

---

## Ethical Source Attribution

### Design Principles

✅ **Make attribution IMPOSSIBLE to miss**
- Prominent position (above fold, after hero)
- Accent border with background color
- Large, primary-style button
- Clear visual distinction from content

✅ **Clear disclaimer**
- "Originally Published By" heading
- Publisher name and date
- Legal rights statement

✅ **Easy access to source**
- Primary button: "Read Full Article at [Source]"
- Secondary button at bottom of page
- External link icon for clarity
- Opens in new tab for user convenience

✅ **Security & Best Practices**
- Uses `rel="noopener noreferrer"` for security
- Explicit attribution text
- Respects original publishers

### Legal Disclaimer
> "AIropa.news aggregates and curates articles. All content rights belong to the original publisher."

---

## User Flow

### Before Phase 3
```
User clicks card → Opens external source in new tab
```

### After Phase 3
```
User clicks card
  → Navigate to /article/:id (internal)
  → View article details, metadata, source attribution
  → Click "Read Full Article at [Source]"
  → Opens external source in new tab
```

**Benefits:**
- Users stay on site longer
- Better SEO (internal pages indexed)
- Consistent branding throughout journey
- Clear, ethical attribution
- Users can preview before leaving site

---

## Error Handling

### Invalid Article ID
- URL: `/article/invalid-id-123`
- Result: Shows error message with retry button
- Fallback: Link back to home

### Missing Article (404)
- API returns 404 for non-existent article
- Shows: "Article not found" message
- Action: "Back to Home" button

### Network Errors
- Uses existing `ErrorDisplay` component
- Shows: Friendly error message
- Actions: "Retry" button + navigation options

### Missing Data
- No cover → Gradient background
- No title → "Untitled Article"
- No date → Uses `created_at` fallback
- No tags/country → Hidden gracefully

---

## Testing Checklist

✅ Navigate to article from StoryCard
✅ Article metadata displays correctly
✅ Cover image fallback works (gradient)
✅ Source attribution is prominent and clear
✅ "Read Full Article" button opens source in new tab
✅ 404 page for invalid article IDs
✅ Loading skeleton shows during fetch
✅ Error state with retry works
✅ Breadcrumb navigation works
✅ Mobile responsive
✅ Logo routing works correctly
✅ Back button navigation works
✅ Build completes without errors

---

## How to Test

### 1. Start Backend & Frontend
```bash
# Terminal 1: Backend
cd /home/vlakmaker/airopa-automation
/home/vlakmaker/miniconda3/bin/python -m uvicorn airopa_automation.api.main:app --reload --port 8000

# Terminal 2: Frontend
cd /home/vlakmaker/Airopa
npm run dev
```

### 2. Open Browser
Navigate to: http://localhost:5173

### 3. Click Any Article Card
Should navigate to: http://localhost:5173/article/{id}

### 4. Verify Detail Page
- [ ] Hero section with gradient background
- [ ] Article title and metadata
- [ ] **Source attribution card is prominent**
- [ ] "Read Full Article at [Source]" button is visible
- [ ] Breadcrumb shows: Home > Category
- [ ] Article information displays correctly

### 5. Test Source Attribution
- [ ] Click "Read Full Article" button
- [ ] Should open source in NEW tab
- [ ] Original tab stays on detail page

### 6. Test Navigation
- [ ] Click logo → Returns to home
- [ ] Click "Back to Home" → Returns to home
- [ ] Click browser back → Returns to home

### 7. Test Error Cases
**Invalid ID:**
```
http://localhost:5173/article/999999
```
- [ ] Shows error message
- [ ] Retry button works

**Empty ID:**
```
http://localhost:5173/article/
```
- [ ] Redirects to 404 page

---

## File Structure

```
src/
├── components/
│   ├── ArticleHero.tsx           ✨ NEW - Article header component
│   ├── SourceAttribution.tsx     ✨ NEW - Ethical source attribution
│   ├── StoryCard.tsx             📝 MODIFIED - Internal Link
│   └── Navigation.tsx            📝 MODIFIED - Smart routing
├── pages/
│   ├── ArticleDetail.tsx         ✨ NEW - Article detail page
│   ├── Index.tsx                 (unchanged)
│   └── NotFound.tsx              (unchanged)
├── App.tsx                       📝 MODIFIED - Added route
├── hooks/
│   └── useArticle.ts             (already existed)
└── lib/
    └── adapters.ts               (unchanged)
```

---

## Build Status

✅ **Build successful** (Feb 2, 2026)

```bash
npm run build

# Output:
✓ 1692 modules transformed.
✓ built in 3.96s
```

- No TypeScript errors
- No compilation errors
- All imports resolved
- Bundle size: 358 KB (gzipped: 110 KB)

---

## Next Steps (Future Phases)

### Phase 4 Ideas
- [ ] Related articles section
- [ ] Share buttons (Twitter, LinkedIn, email)
- [ ] Bookmark/save functionality
- [ ] Reading time estimate
- [ ] Print stylesheet
- [ ] Comments/discussion section

### Backend Improvements Needed
- [ ] Add article body/content to API response
- [ ] Add cover images to article data
- [ ] Improve summary generation (not just quality score)
- [ ] Add author information
- [ ] Add related articles endpoint

### SEO & Metadata
- [ ] Dynamic page titles
- [ ] Meta descriptions
- [ ] Open Graph tags
- [ ] Twitter Card tags
- [ ] Canonical URLs

---

## Success Criteria

✅ Users can view article details without leaving the site
✅ Source attribution is clear, prominent, and ethical
✅ Easy access to full article at original source
✅ Consistent navigation and branding
✅ Proper error handling for all edge cases
✅ Mobile friendly and responsive
✅ Build completes without errors
✅ All existing functionality preserved

---

## Technical Notes

### React Query Caching
- Article detail data cached for 10 minutes (`staleTime`)
- Cached for 30 minutes in memory (`gcTime`)
- Automatic retry on failure (2 attempts)
- Background refetch on window focus

### TypeScript Types
All components are fully typed with:
- `Post` and `PostFrontmatter` types
- `Article` API types
- Proper props interfaces
- Type-safe URL params

### Performance
- Lazy route loading (React Router code splitting)
- Image lazy loading (browser native)
- Proper React Query cache configuration
- No unnecessary re-renders

---

## Ethical Considerations

This implementation prioritizes **ethical journalism**:

1. **Transparency**: Users always know the original source
2. **Attribution**: Clear, prominent source information
3. **Access**: Easy path to read full article at source
4. **Rights**: Explicit statement about content ownership
5. **Intent**: We aggregate/curate, we don't claim ownership

**AIropa.news is an aggregator and curator**, not a content creator. We respect original publishers and make this abundantly clear to users.

---

## Questions or Issues?

Contact the development team or create an issue in the repository.

**Phase 3 Complete** ✅
