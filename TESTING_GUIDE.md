# Phase 2 Testing Guide - API Integration

## Overview

This guide walks you through testing the Phase 2 API integration to verify that the frontend is successfully communicating with the backend API.

## Prerequisites

- ✅ Backend API code in `/home/vlakmaker/airopa-automation`
- ✅ Frontend code in `/home/vlakmaker/Airopa`
- ✅ Python 3.7+ installed
- ✅ Node.js 18+ installed
- ✅ All dependencies installed

---

## Step 1: Start the Backend API

### Option A: Using uvicorn directly

```bash
# Terminal 1 - Start Backend API
cd /home/vlakmaker/airopa-automation

# Install dependencies if needed
pip install -r requirements.txt

# Start the API server
uvicorn airopa_automation.api.main:app --reload --port 8000 --host 0.0.0.0

# You should see:
# INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
```

### Option B: Using Python module

```bash
cd /home/vlakmaker/airopa-automation
python -m uvicorn airopa_automation.api.main:app --reload --port 8000
```

### Verify Backend is Running

Open another terminal and test:

```bash
# Test health endpoint
curl http://localhost:8000/api/health

# Expected response:
# {"status":"ok","timestamp":"2026-02-02T..."}

# Test articles endpoint
curl http://localhost:8000/api/articles?limit=2

# Expected response:
# {"articles":[...],"total":...,"limit":2,"offset":0,"timestamp":"..."}
```

---

## Step 2: Configure Frontend API URL

The frontend is already configured in `.env.development`:

```bash
cd /home/vlakmaker/Airopa
cat .env.development

# Should show:
# VITE_API_BASE_URL=http://localhost:8000/api
```

If the backend runs on a different port, edit this file.

---

## Step 3: Start the Frontend

```bash
# Terminal 2 - Start Frontend
cd /home/vlakmaker/Airopa

# Install dependencies if needed (already done)
npm install

# Start development server
npm run dev

# You should see:
# ➜  Local:   http://localhost:5173/
# ➜  Network: use --host to expose
```

---

## Step 4: Open Browser and Test

### Open the App

Navigate to: **http://localhost:5173**

### What to Verify

#### ✅ Visual Checks

1. **Featured Story Section**
   - Should load article data from API
   - Shows article title, summary, source
   - Has loading skeleton before data loads
   - No error messages

2. **European Startup Spotlight**
   - Grid of 3 startup articles
   - Each card shows category badge
   - Articles have quality scores

3. **Policy & Regulation Section**
   - Grid of 3 policy articles
   - Proper formatting

4. **Country Spotlights Section**
   - Grid of 3 country-specific articles

#### ✅ Browser Console Checks

Open DevTools (F12) → Console Tab:

**Should see:**
```
✓ No CORS errors
✓ No 404 errors
✓ No TypeScript errors
```

**May see (normal):**
```
INFO: React Query cache initialized
INFO: Fetching articles...
```

#### ✅ Network Tab Checks

Open DevTools (F12) → Network Tab → Filter: XHR

**Should see these requests:**
- `GET /api/articles?limit=1&min_quality=0.8` (Featured)
- `GET /api/articles?limit=3&category=startups&min_quality=0.6` (Startups)
- `GET /api/articles?limit=3&category=policy&min_quality=0.6` (Policy)
- `GET /api/articles?limit=3&category=country&min_quality=0.6` (Country)

**Click on each request to verify:**
- Status: `200 OK`
- Response: JSON with articles array
- Headers: `Content-Type: application/json`

---

## Step 5: Test Error Handling

### Test 1: Backend Offline Error

```bash
# Stop the backend (Ctrl+C in Terminal 1)
# Reload frontend browser

# Expected behavior:
✓ Error messages appear with "Retry" buttons
✓ Error displays are styled nicely
✓ No white screen of death
```

### Test 2: Error Recovery

```bash
# Start backend again (Terminal 1)
uvicorn airopa_automation.api.main:app --reload --port 8000

# Click "Retry" button in browser

# Expected behavior:
✓ Articles load successfully
✓ Error messages disappear
✓ Content displays normally
```

### Test 3: Empty Results

```bash
# In backend terminal, modify response to return empty array
# Or test with a category that has no articles

# Expected behavior:
✓ Sections gracefully hide when empty
✓ No broken UI
```

---

## Step 6: Test React Query Caching

### Test Cache Hit

1. Load the page (fresh load)
2. Note the Network tab shows API requests
3. Navigate away (close tab or go to another page)
4. Navigate back within 5 minutes

**Expected behavior:**
- ✓ Content appears instantly (cached)
- ✓ Network tab shows no new API requests (within stale time)
- ✓ After 5 minutes, requests are made again

### Test Refetch on Focus

1. Load the page
2. Switch to another application/tab
3. Wait 1 minute
4. Switch back to browser tab

**Expected behavior:**
- ✓ React Query may refetch data
- ✓ Content updates with fresh data

---

## Step 7: Test API Documentation

### Swagger UI

Open: **http://localhost:8000/docs**

**Should see:**
- FastAPI Swagger UI
- `/api/health` endpoint
- `/api/articles` endpoint with filter parameters
- `/api/articles/{id}` endpoint
- Interactive "Try it out" buttons

**Test an endpoint:**
1. Click `/api/articles`
2. Click "Try it out"
3. Set `limit: 5`
4. Click "Execute"
5. Verify response returns 5 articles

---

## Common Issues & Solutions

### Issue: CORS Errors

**Symptom:**
```
Access to fetch at 'http://localhost:8000/api/articles' from origin
'http://localhost:5173' has been blocked by CORS policy
```

**Solution:**
The backend should have CORS middleware. Check if it's configured in the API main.py.

If not, add:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Issue: Connection Refused

**Symptom:**
```
Failed to fetch
net::ERR_CONNECTION_REFUSED
```

**Solution:**
- Verify backend is running on port 8000
- Check `.env.development` has correct URL
- Try `http://localhost:8000` vs `http://127.0.0.1:8000`

### Issue: Module Not Found (Backend)

**Symptom:**
```
ModuleNotFoundError: No module named 'fastapi'
```

**Solution:**
```bash
cd /home/vlakmaker/airopa-automation
pip install -r requirements.txt
```

### Issue: Stale Cache

**Symptom:**
- Frontend shows old data
- Changes in backend not reflected

**Solution:**
```bash
# Clear React Query cache
# In browser console:
window.location.reload(true)  # Hard reload

# Or clear browser cache (Ctrl+Shift+Delete)
```

---

## Success Criteria Checklist

Use this checklist to verify Phase 2 is working:

- [ ] Backend API starts without errors
- [ ] Frontend dev server starts without errors
- [ ] Browser loads app at http://localhost:5173
- [ ] Featured Story section displays article from API
- [ ] Startup Grid shows 3 articles
- [ ] Policy Section shows 3 articles
- [ ] Country Spotlights shows 3 articles
- [ ] No CORS errors in console
- [ ] Network tab shows successful API calls (200 OK)
- [ ] Loading skeletons appear before data loads
- [ ] Error handling works (backend offline test)
- [ ] Retry button recovers from errors
- [ ] React Query caching works (instant second load)
- [ ] Swagger docs accessible at /docs
- [ ] Build completes without errors (`npm run build`)

---

## Next Steps After Testing

Once all tests pass:

### Merge to Main (if satisfied)
```bash
git checkout main
git merge phase-2-api-integration
git push origin main
```

### Continue to Phase 3
```bash
git checkout -b phase-3-advanced-components
# Implement FilterControls, pagination, etc.
```

### Deploy to Production
```bash
# Build frontend
npm run build

# Deploy dist/ folder to hosting
# Deploy backend API to production server
```

---

## Testing Logs

**Tested by:** _______________
**Date:** _______________
**Backend Version:** _______________
**Frontend Version:** phase-2-api-integration

**Results:**
- [ ] All tests passed
- [ ] Issues found (list below):
  - _______________
  - _______________

**Notes:**
_______________
_______________
