/**
 * Series Update - Fullscreen Mode & Scroll Controller
 * - Adds/binds Full Screen toggle button at top bar header.
 * - Scroll UP -> Take Full Screen mode.
 * - Scroll DOWN -> Return to Normal mode.
 */
(function() {
    'use strict';

    function getNativeFullscreenElement() {
        return document.fullscreenElement ||
               document.webkitFullscreenElement ||
               document.mozFullScreenElement ||
               document.msFullscreenElement;
    }

    function isFullscreenActive() {
        return !!getNativeFullscreenElement() || document.documentElement.classList.contains('is-fullscreen-mode');
    }

    function updateIcons(active) {
        const buttons = document.querySelectorAll('.fullscreen-btn, #fullscreen-btn');
        buttons.forEach(btn => {
            const enterSvg = btn.querySelector('.fs-icon-enter');
            const exitSvg = btn.querySelector('.fs-icon-exit');
            if (active) {
                btn.classList.add('active');
                btn.setAttribute('title', 'Exit Full Screen');
                if (enterSvg) {
                    enterSvg.style.setProperty('display', 'none', 'important');
                    enterSvg.classList.add('hidden');
                }
                if (exitSvg) {
                    exitSvg.style.setProperty('display', 'inline-block', 'important');
                    exitSvg.classList.remove('hidden');
                }
            } else {
                btn.classList.remove('active');
                btn.setAttribute('title', 'Full Screen');
                if (enterSvg) {
                    enterSvg.style.setProperty('display', 'inline-block', 'important');
                    enterSvg.classList.remove('hidden');
                }
                if (exitSvg) {
                    exitSvg.style.setProperty('display', 'none', 'important');
                    exitSvg.classList.add('hidden');
                }
            }
        });
    }

    function requestFullscreenMode() {
        const docEl = document.documentElement;
        if (!getNativeFullscreenElement()) {
            if (docEl.requestFullscreen) {
                docEl.requestFullscreen().catch(() => {});
            } else if (docEl.webkitRequestFullscreen) {
                docEl.webkitRequestFullscreen();
            } else if (docEl.mozRequestFullScreen) {
                docEl.mozRequestFullScreen();
            } else if (docEl.msRequestFullscreen) {
                docEl.msRequestFullscreen();
            }
        }
        document.documentElement.classList.add('is-fullscreen-mode');
        document.body.classList.add('is-fullscreen-mode');
        updateIcons(true);
    }

    function exitFullscreenMode() {
        if (getNativeFullscreenElement()) {
            if (document.exitFullscreen) {
                document.exitFullscreen().catch(() => {});
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
        document.documentElement.classList.remove('is-fullscreen-mode');
        document.body.classList.remove('is-fullscreen-mode');
        updateIcons(false);
    }

    function toggleFullscreenMode() {
        if (isFullscreenActive()) {
            exitFullscreenMode();
        } else {
            requestFullscreenMode();
        }
    }

    function initHeaderButton() {
        let buttons = document.querySelectorAll('.fullscreen-btn, #fullscreen-btn');
        if (buttons.length === 0) {
            const containers = document.querySelectorAll('.header-actions, .header-right, .nav-right');
            containers.forEach(container => {
                const btn = document.createElement('button');
                btn.id = 'fullscreen-btn';
                btn.className = 'header-icon icon-btn fullscreen-btn';
                btn.setAttribute('aria-label', 'Toggle Fullscreen');
                btn.setAttribute('title', 'Toggle Full Screen');
                btn.innerHTML = `
                    <svg class="fs-icon-enter" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                    </svg>
                    <svg class="fs-icon-exit" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
                        <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
                    </svg>`;
                container.insertBefore(btn, container.firstChild);
            });
            buttons = document.querySelectorAll('.fullscreen-btn, #fullscreen-btn');
        }

        buttons.forEach(btn => {
            if (!btn.dataset.fsBound) {
                btn.dataset.fsBound = 'true';
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleFullscreenMode();
                });
            }
        });
        updateIcons(isFullscreenActive());
    }

    // Scroll Direction Detection: Scroll UP -> Full Screen | Scroll DOWN -> Normal Mode
    let lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    let isTicking = false;

    function onScrollHandler() {
        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
        const delta = currentScrollY - lastScrollY;
        const minDelta = 12; // 12px threshold to ignore tiny movements

        if (Math.abs(delta) >= minDelta) {
            if (delta < 0) {
                // User is scrolling UP -> Take Full Screen
                requestFullscreenMode();
            } else if (delta > 0) {
                // User is scrolling DOWN -> Normal mode
                exitFullscreenMode();
            }
            lastScrollY = currentScrollY <= 0 ? 0 : currentScrollY;
        }
        isTicking = false;
    }

    window.addEventListener('scroll', function() {
        if (!isTicking) {
            window.requestAnimationFrame(onScrollHandler);
            isTicking = true;
        }
    }, { passive: true });

    // Sync icons when native fullscreen state changes (ESC key, browser UI)
    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(evt => {
        document.addEventListener(evt, function() {
            const active = !!getNativeFullscreenElement();
            if (!active) {
                document.documentElement.classList.remove('is-fullscreen-mode');
                document.body.classList.remove('is-fullscreen-mode');
            }
            updateIcons(isFullscreenActive());
        });
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeaderButton);
    } else {
        initHeaderButton();
    }
})();
