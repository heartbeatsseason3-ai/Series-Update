/**
 * Vercel Web Analytics Integration
 * Initializes analytics tracking for the Series Update platform
 */

import { inject } from './vercel-analytics.js';

// Initialize Vercel Analytics
inject({
    mode: 'auto', // Auto-detect development vs production
    debug: false  // Set to true to see analytics events in console
});
