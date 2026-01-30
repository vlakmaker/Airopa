# Airopa Deployment Guide

## 🚀 Quick Start

### Local Development
```bash
npm install
npm run dev
# App runs at http://localhost:5173
```

### Production Build
```bash
npm run build:prod
npm run preview:prod
# Preview at http://localhost:4000
```

## 📦 Deployment Options

### Option 1: Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set build command: `npm run build:prod`
3. Set output directory: `dist`
4. Add environment variables from `.env.example`
5. Deploy!

### Option 2: Netlify
1. Connect your GitHub repository to Netlify
2. Use `netlify.toml` configuration
3. Set build command: `npm run build:prod`
4. Set publish directory: `dist`
5. Deploy!

### Option 3: Static Hosting (S3, Cloudflare, etc.)
1. Run `npm run build:prod`
2. Upload contents of `dist/` folder
3. Configure proper caching headers
4. Set up HTTPS

## 🔧 CI/CD Pipeline

The project includes a comprehensive GitHub Actions workflow:
- **Build & Test**: Linting, building, content validation
- **Deploy**: Automatic deployment to Vercel/Netlify on main branch
- **Content Validation**: Ensures all markdown files are valid
- **Performance Audit**: Lighthouse scoring
- **Security Audit**: Dependency vulnerability checking

### Secrets Required
Create these GitHub secrets for CI/CD:
- `VERCEL_TOKEN`: Your Vercel API token
- `VERCEL_ORG_ID`: Your Vercel organization ID
- `VERCEL_PROJECT_ID`: Your Vercel project ID
- `NETLIFY_AUTH_TOKEN`: Your Netlify API token
- `NETLIFY_SITE_ID`: Your Netlify site ID
- `LHCI_GITHUB_APP_TOKEN`: Lighthouse CI token

## 🧪 Testing

### Local Testing
```bash
# Test build
npm run test:build

# Test content loading
npm run test:content

# Full deployment test
npm run deploy:local
```

### Content Validation
```bash
# Check all content files
echo "Checking content files..."
for file in src/content/post/*.md; do
  echo "📄 $file"
  if grep -q "title:" "$file" && grep -q "date:" "$file" && grep -q "pillar:" "$file"; then
    echo "✅ Valid frontmatter"
  else
    echo "❌ Missing required fields"
  fi
done
```

## 📊 Performance Optimization

### Build Analysis
```bash
npm run build:analyze
# Generates bundle analysis report
```

### Caching Strategy
- **HTML**: No cache (always fresh)
- **Assets**: 1 year cache (immutable)
- **API**: No cache (dynamic content)

## 🛡️ Security

### Headers
The deployment includes security headers:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: geolocation=(), microphone=(), camera=()`

### Recommendations
1. Enable HTTPS (required for production)
2. Set up monitoring (Sentry, etc.)
3. Implement rate limiting if needed
4. Regular dependency updates

## 🔄 Update Process

### Content Updates
1. Add/Modify markdown files in `src/content/post/`
2. Ensure proper frontmatter:
   ```yaml
   ---
   title: "Your Title"
   date: "YYYY-MM-DDTHH:MM:SSZ"
   pillar: "research" | "startups" | "policy" | "country"
   source:
     name: "Source Name"
     url: "https://source.url"
   canonical: "https://canonical.url"
   summary: "Brief summary"
   ---
   ```
3. Test locally
4. Commit and push - CI/CD will handle deployment

### Code Updates
1. Make changes in development branch
2. Run `npm run lint:fix`
3. Test locally
4. Create pull request to main
5. CI/CD will run all checks
6. Merge to main for automatic deployment

## 📝 Deployment Checklist

- [ ] Update browserslist database (`npm run update:browserslist`)
- [ ] Run linter (`npm run lint`)
- [ ] Fix any linting issues (`npm run lint:fix`)
- [ ] Build for production (`npm run build:prod`)
- [ ] Test build locally (`npm run preview:prod`)
- [ ] Verify all content loads correctly
- [ ] Check console for errors
- [ ] Test on mobile devices
- [ ] Deploy to production
- [ ] Monitor for errors

## 🆘 Troubleshooting

### Common Issues

**Build fails:**
```bash
rm -rf node_modules dist
npm install
npm run build:prod
```

**Content not loading:**
```bash
# Check content validation
npm run build:prod
node -e "const {getAllPosts} = require('./dist/assets/index-*.js'); getAllPosts().then(console.log).catch(console.error);"
```

**White screen:**
```bash
# Check for JavaScript errors
# Verify all required fields in content files
# Check browser console for errors
```

## 🎓 Best Practices

1. **Always test locally before deploying**
2. **Use semantic versioning** for releases
3. **Document changes** in CHANGELOG.md
4. **Monitor performance** after deployment
5. **Have a rollback plan** for critical issues

## 📞 Support

For deployment issues:
1. Check GitHub Actions logs
2. Review build output
3. Test locally first
4. Consult this documentation

**Your Airopa project is now fully configured for professional deployment!** 🚀