# Production Debugging Guide

## Understanding Errors on Deployed Website

The TechLabs MVP has comprehensive error monitoring and debugging capabilities
built-in.

### 🐛 Debug Panel (Production)

A debug panel is available on the deployed site to help you understand runtime
errors:

**To Enable Debug Panel:**

1. Open your deployed website: https://techlabs-96b2d.web.app
2. Open browser Developer Tools (F12)
3. Go to Console tab
4. Type: `localStorage.setItem('debug_enabled', 'true')`
5. Refresh the page
6. Look for a purple bug icon (🐛) in the bottom-left corner
7. Click the bug icon to open the debug panel

**Debug Panel Features:**

- ✅ Lists all captured runtime errors
- ✅ Shows error timestamps, messages, and stack traces
- ✅ Displays error location (file, line, column)
- ✅ Shows current route when error occurred
- ✅ Download error reports as JSON files
- ✅ Clear stored errors

### 📊 Error Monitoring

The app automatically captures:

**JavaScript Errors:**

- Uncaught exceptions
- Unhandled promise rejections
- React component errors (via Error Boundaries)
- Loading errors

**Error Information Collected:**

- Error message and stack trace
- URL and route where error occurred
- Browser user agent
- Build version
- Timestamp
- Component stack (for React errors)

**Storage:**

- Errors are stored in browser localStorage
- Last 20 errors are kept
- Errors persist across page reloads

### 🔧 Error Reporting Methods

**Method 1: Debug Panel (Recommended)**

1. Enable debug panel as described above
2. Reproduce the error
3. Open debug panel to view error details
4. Download error report for detailed analysis

**Method 2: Browser Developer Tools**

1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for error messages (red text)
4. Check Network tab for failed requests

**Method 3: LocalStorage Inspection**

1. Open Developer Tools (F12)
2. Go to Application tab (Chrome) or Storage tab (Firefox)
3. Select LocalStorage → your domain
4. Look for `error_reports` key
5. View the JSON data for stored errors

### 🚨 Common Error Types

**1. Bundle Loading Errors**

- **Symptom:** White screen or failed component loads
- **Check:** Network tab for 404 errors on .js files
- **Solution:** Clear cache, check deployment status

**2. React Component Errors**

- **Symptom:** Component shows error boundary fallback
- **Check:** Debug panel for component stack trace
- **Solution:** Check for missing props or data

**3. API/Network Errors**

- **Symptom:** Failed data loading
- **Check:** Network tab for failed API calls
- **Solution:** Check API endpoints and CORS

**4. Performance Issues**

- **Symptom:** Slow loading, janky animations
- **Check:** Performance tab in dev tools
- **Solution:** Review bundle size and lazy loading

### 🎯 Production Testing Checklist

After deployment, test these scenarios:

- [ ] Homepage loads without errors
- [ ] All navigation links work
- [ ] Mobile responsive design
- [ ] Forms submit correctly
- [ ] Images and assets load
- [ ] Error boundaries work (force an error to test)
- [ ] Debug panel can be enabled and shows data
- [ ] Performance is acceptable on slow connections

### 🔍 Advanced Debugging

**Forcing Errors for Testing:** Open browser console and run:

```javascript
// Test error boundary
throw new Error('Test error for debugging')

// Test promise rejection
Promise.reject('Test promise rejection')
```

**Performance Analysis:**

1. Open Dev Tools → Lighthouse tab
2. Run audit for Performance, Accessibility, SEO
3. Review recommendations

**Bundle Analysis:**

- Built bundle is optimized with code splitting
- Check Network tab to see chunk loading
- Verify critical resources load first

### 📧 Reporting Issues

If you encounter persistent errors:

1. **Collect Information:**
   - Error message and stack trace
   - Steps to reproduce
   - Browser and device info
   - URL where error occurred
   - Screenshot or video

2. **Export Debug Data:**
   - Use debug panel to download error report
   - Include the JSON file with your report

3. **Submit Issue:**
   - Create GitHub issue with collected information
   - Include environment details (production vs staging)

---

**Deployed Site:** https://techlabs-96b2d.web.app  
**Console:** https://console.firebase.google.com/project/techlabs-96b2d/overview
