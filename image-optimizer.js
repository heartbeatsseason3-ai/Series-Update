/**
 * Image Optimizer Utility for Series Update Website
 * Compresses, resizes, and caches poster images for ultra-fast loading speed.
 */

(function (window) {
    'use strict';

    /**
     * Converts raw poster URLs into lightweight, edge-cached WebP image URLs.
     * @param {string} url - Original image URL
     * @param {number} width - Target width in pixels (e.g., 320 for grid posters, 700 for hero, 150 for thumbnails)
     * @param {number} quality - Image quality (default: 75)
     * @returns {string} Optimized image URL
     */
    function getOptimizedImageUrl(url, width = 320, quality = 75) {
        if (!url || typeof url !== 'string' || url.trim() === '') {
            return `https://placehold.co/${width}x${Math.round(width * 1.5)}/1a1a2e/ffffff?text=Poster`;
        }

        const cleanUrl = url.trim();

        // 1. Data URLs or local SVG assets
        if (cleanUrl.startsWith('data:') || cleanUrl.endsWith('.svg')) {
            return cleanUrl;
        }

        // 2. Unsplash Optimization (native URL params)
        if (cleanUrl.includes('images.unsplash.com')) {
            try {
                const urlObj = new URL(cleanUrl);
                urlObj.searchParams.set('w', width.toString());
                urlObj.searchParams.set('q', quality.toString());
                urlObj.searchParams.set('auto', 'format');
                return urlObj.toString();
            } catch (e) {
                // Fallthrough to proxy
            }
        }

        // 3. TMDB Image Optimization (native resolution endpoints)
        if (cleanUrl.includes('image.tmdb.org')) {
            let size = 'w342';
            if (width <= 185) size = 'w185';
            else if (width <= 342) size = 'w342';
            else if (width <= 500) size = 'w500';
            else size = 'w780';
            return cleanUrl.replace(/\/t\/p\/(w\d+|original)\//, `/t/p/${size}/`);
        }

        // 4. Free Edge CDN Proxy (wsrv.nl) for external images (i.ibb.co, imgur, custom hosts)
        // Automatically resizes, converts to WebP/AVIF, and caches at CDN edge worldwide
        if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
            // Avoid double proxying
            if (cleanUrl.includes('wsrv.nl')) return cleanUrl;
            return `https://wsrv.nl/?url=${encodeURIComponent(cleanUrl)}&w=${width}&output=webp&q=${quality}&n=-1`;
        }

        return cleanUrl;
    }

    /**
     * Preloads high-priority images into browser cache memory
     * @param {Array<string>} urls - List of image URLs to preload
     * @param {number} width - Target width for optimization
     */
    function preloadImages(urls, width = 600) {
        if (!Array.isArray(urls)) return;
        urls.forEach(url => {
            if (!url) return;
            const optUrl = getOptimizedImageUrl(url, width);
            const img = new Image();
            img.decoding = 'async';
            img.src = optUrl;
        });
    }

    /**
     * Registers Service Worker for persistent image caching
     */
    function registerImageServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(reg => {
                        console.log('[ImageOptimizer] Service Worker active:', reg.scope);
                    })
                    .catch(err => {
                        console.warn('[ImageOptimizer] SW registration info:', err.message || err);
                    });
            });
        }
    }

    // Attach to global scope
    window.getOptimizedImageUrl = getOptimizedImageUrl;
    window.preloadImages = preloadImages;
    window.registerImageServiceWorker = registerImageServiceWorker;

    // Auto-register service worker
    registerImageServiceWorker();

})(window);
