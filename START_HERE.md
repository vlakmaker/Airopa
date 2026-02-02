# 🚀 Quick Start - Testing Phase 2 & 3 Integration

**Current Status:** Phase 3 Complete - Article Detail Pages with Ethical Source Attribution

## Super Quick Test (3 commands)

### Terminal 1: Start Backend
```bash
cd /home/vlakmaker/airopa-automation
uvicorn airopa_automation.api.main:app --reload --port 8000
```

### Terminal 2: Start Frontend
```bash
cd /home/vlakmaker/Airopa
npm run dev
```

### Browser: Open App
Navigate to: **http://localhost:5173**

---

## ✅ What You Should See

### In Terminal 1 (Backend):
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete.
```

### In Terminal 2 (Frontend):
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

### In Browser:
- **Featured Story** section with article
- **European Startup Spotlight** grid (3 articles)
- **Policy & Regulation** grid (3 articles)
- **Country Spotlights** grid (3 articles)
- **Click any article** → Navigate to article detail page
- **Prominent source attribution** with "Read Full Article" button

### In Browser DevTools (F12 → Network):
- API calls to `http://localhost:8000/api/articles`
- Status: `200 OK`
- No CORS errors

---

## 🧪 Quick Tests

### Test 1: Article Detail Pages (NEW - Phase 3)
```bash
# In browser:
1. Click any article card
2. Should navigate to /article/:id
3. Verify source attribution card is prominent
4. Click "Read Full Article at [Source]" button
5. Should open source in new tab
```

### Test 2: Verify API is working
```bash
# In a third terminal:
curl http://localhost:8000/api/health
# Should return: {"status":"ok",...}

curl http://localhost:8000/api/articles?limit=2
# Should return: {"articles":[...],...}
```

### Test 3: Error Handling
1. Stop backend (Ctrl+C in Terminal 1)
2. Reload browser
3. Should see error messages with "Retry" buttons
4. Restart backend
5. Click "Retry"
6. Articles should load again

### Test 4: Check API Docs
Open: **http://localhost:8000/docs**
- Interactive Swagger UI
- Try the endpoints

---

## 🎯 Success Checklist

**Phase 2:**
- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Articles display in all 4 sections
- [ ] No CORS errors in console
- [ ] Network tab shows 200 OK responses
- [ ] Error retry works

**Phase 3:**
- [ ] Article cards link to detail pages (not external)
- [ ] Detail page displays with hero section
- [ ] Source attribution is prominent and clear
- [ ] "Read Full Article" button opens source
- [ ] Navigation back to home works
- [ ] 404 handling for invalid article IDs

---

## 📚 More Details

**Phase 2 Testing Guide:**
```bash
cat /home/vlakmaker/Airopa/TESTING_GUIDE.md
```

**Phase 3 Documentation:**
```bash
cat /home/vlakmaker/Airopa/PHASE_3_ARTICLE_DETAIL.md
```

For automated test helper:
```bash
/home/vlakmaker/Airopa/test-integration.sh
```

---

## 🐛 Common Issues

**Port 8000 already in use?**
```bash
# Find and kill the process
lsof -ti:8000 | xargs kill -9
```

**Port 5173 already in use?**
```bash
# Find and kill the process
lsof -ti:5173 | xargs kill -9
```

**Backend dependencies missing?**
```bash
cd /home/vlakmaker/airopa-automation
pip install -r requirements.txt
```

**Frontend dependencies missing?**
```bash
cd /home/vlakmaker/Airopa
npm install
```

---

## 🎉 That's It!

Once both are running and browser shows articles with clickable detail pages, Phases 2 & 3 are working! 🚀

**What's New in Phase 3:**
- ✅ Article detail pages at `/article/:id`
- ✅ Ethical source attribution with prominent CTA
- ✅ Breadcrumb navigation
- ✅ Graceful error handling
- ✅ Mobile responsive design
