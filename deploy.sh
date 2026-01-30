#!/bin/bash

# Airopa Deployment Script
# Usage: ./deploy.sh [environment]
# Environments: local, staging, production

echo "🚀 Airopa Deployment Script"
echo "=========================="

# Set default environment
ENV=${1:-local}

echo "Environment: $ENV"
echo ""

# Remove bun.lockb if present (to avoid bun dependency issues)
echo "🧹 Cleaning up bun.lockb if present..."
rm -f bun.lockb

# Update browserslist database
echo "🔄 Updating browserslist database..."
npm run update:browserslist

# Lint and fix
echo "🧹 Running linter..."
npm run lint:fix

if [ $? -ne 0 ]; then
    echo "❌ Linting failed. Please fix linting issues."
    exit 1
fi

# Build for appropriate environment
if [ "$ENV" = "production" ] || [ "$ENV" = "staging" ]; then
    echo "🏗️  Building for production..."
    npm run build:prod
else
    echo "🏗️  Building for development..."
    npm run build:dev
fi

if [ $? -ne 0 ]; then
    echo "❌ Build failed."
    exit 1
fi

# Test content loading
echo "📊 Testing content pipeline..."
npm run test:content

if [ $? -ne 0 ]; then
    echo "❌ Content validation failed."
    exit 1
fi

# Verify build artifacts
echo "📦 Verifying build artifacts..."
if [ -d "dist" ]; then
    echo "✅ dist/ folder exists"
    FILE_COUNT=$(ls -1 dist/assets/ 2>/dev/null | wc -l)
    if [ "$FILE_COUNT" -gt 0 ]; then
        echo "✅ Found $FILE_COUNT asset files"
    else
        echo "❌ No asset files found"
        exit 1
    fi
else
    echo "❌ dist/ folder not found"
    exit 1
fi

echo ""
echo "🎉 Deployment package ready!"
echo ""
echo "Next steps:"
echo "- Local testing: npm run preview:prod"
echo "- Deploy to $ENV environment"
echo "- Monitor deployment"
echo ""

# Local deployment option
if [ "$ENV" = "local" ]; then
    echo "🌐 Starting local preview server..."
    npx serve dist -p 3000 &
    echo "📍 Preview available at: http://localhost:3000"
    echo "💡 Press Ctrl+C to stop the server"
fi

echo ""
echo "✅ Deployment script completed successfully!"