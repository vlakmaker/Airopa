# Error Handling Test Guide

## Manual Testing Scenarios

### 1. Test Content Loading Errors

**Scenario**: Simulate failed content loading
**How to test**:
1. Temporarily rename `/src/content/post/` directory
2. Refresh the page
3. Verify you see friendly error messages with retry buttons

**Expected Result**:
- All sections show error displays instead of crashing
- Retry buttons work when content is restored
- No blank screens or cryptic errors

### 2. Test Malformed Frontmatter

**Scenario**: Test validation of required fields
**How to test**:
1. Create a test markdown file with missing `title` field
2. Refresh the page
3. Check browser console for validation warnings

**Expected Result**:
- Invalid posts are filtered out gracefully
- Console shows clear validation warnings
- App continues to work with valid posts

### 3. Test Network Errors (Advanced)

**Scenario**: Simulate network failure
**How to test** (requires service worker or network throttling):
1. Use Chrome DevTools → Network → Offline
2. Refresh the page
3. Observe error handling

**Expected Result**:
- App shows appropriate error messages
- No crashes or white screens
- Recovery options available

### 4. Test Empty States

**Scenario**: Test when no content is available
**How to test**:
1. Temporarily empty the `/src/content/post/` directory
2. Refresh the page

**Expected Result**:
- Sections with no content don't display
- No errors or crashes
- Clean UI without broken layouts

### 5. Test Global Error Boundary

**Scenario**: Test catastrophic failure recovery
**How to test**:
1. Introduce a bug in a component (e.g., undefined variable)
2. Refresh the page

**Expected Result**:
- Global error fallback appears
- Error message is user-friendly
- Refresh button works

## Automated Testing (Future)

For production, consider adding:

```typescript
// Example test case (would require testing framework)
test('FeaturedStory handles loading errors', async () => {
  // Mock failed content loading
  jest.spyOn(content, 'featured').mockRejectedValue(new Error('Network error'));
  
  render(<FeaturedStory />);
  
  // Should show loading state first
  expect(screen.getByText('Loading')).toBeInTheDocument();
  
  // After error, should show error display
  await waitFor(() => {
    expect(screen.getByText('Error Loading Content')).toBeInTheDocument();
  });
});
```

## Verification Checklist

- [ ] All sections show loading skeletons initially
- [ ] Error displays appear when content fails to load
- [ ] Retry buttons work and reload content
- [ ] Empty sections don't break layout
- [ ] Global errors show friendly fallback UI
- [ ] No console errors in production mode
- [ ] All type checking passes

## Performance Notes

With proper error handling:
- Initial load may be slightly slower due to validation
- But user experience is much better
- Error recovery is instant (no page reload needed)
- Overall perceived performance improves

## Security Benefits

- Frontmatter validation prevents malformed data issues
- Error boundaries prevent XSS from error messages
- Type safety prevents runtime type errors
- Graceful degradation improves security posture