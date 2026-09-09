/**
 * Series Update - Fullscreen Toggle Controller & SPA Navigation Engine
 * - Maintains Fullscreen across page navigations (movies, tvshows, watch, etc.)
 * - Persists fullscreen state in localStorage
 * - Seamlessly loads pages without destroying native browser Fullscreen
 */
(function() {
    'use strict';

    const FS_KEY = 'series_update_fullscreen';

    function getNativeFullscreenElement() {
        return document.fullscreenElement ||
               document.webkitFullscreenElement ||
               document.mozFullScreenElement ||
               document.msFullscreenElement;
    }

    function isFullscreenPreferred() {
        return localStorage.getItem(FS_KEY) === 'true';
    }

    function setFullscreenPreferred(val) {
        if (val) {
            localStorage.setItem(FS_KEY, 'true');
        } else {
            localStorage.setItem(FS_KEY, 'false');
        }
    }

    function isFullscreenActive() {
        return !!getNativeFullscreenElement() || (document.documentElement && document.documentElement.classList.contains('is-fullscreen-mode'));
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
        if (document.documentElement) document.documentElement.classList.add('is-fullscreen-mode');
        if (document.body) document.body.classList.add('is-fullscreen-mode');
        setFullscreenPreferred(true);
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
        if (document.documentElement) document.documentElement.classList.remove('is-fullscreen-mode');
        if (document.body) document.body.classList.remove('is-fullscreen-mode');
        setFullscreenPreferred(false);
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


        buttons.forEach(btn => {
            btn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleFullscreenMode();
            };
        });

        if (isFullscreenPreferred()) {
            if (document.documentElement) document.documentElement.classList.add('is-fullscreen-mode');
            if (document.body) document.body.classList.add('is-fullscreen-mode');
            updateIcons(true);
        } else {
            updateIcons(isFullscreenActive());
        }
    }

    // Native Navigation helper
    window.navigateTo = function(url) {
        if (url) window.location.href = url;
    };

    // Restore Native Fullscreen on first user interaction if preference is saved
    function restoreOnUserGesture() {
        if (isFullscreenPreferred() && !getNativeFullscreenElement()) {
            requestFullscreenMode();
        }
    }
    ['click', 'touchstart', 'pointerdown', 'keydown'].forEach(evt => {
        document.addEventListener(evt, restoreOnUserGesture, { once: true });
    });

    // Sync icons when native fullscreen state changes (ESC key, browser UI)
    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(evt => {
        document.addEventListener(evt, function() {
            const nativeActive = !!getNativeFullscreenElement();
            if (!nativeActive) {
                if (document.documentElement) document.documentElement.classList.remove('is-fullscreen-mode');
                if (document.body) document.body.classList.remove('is-fullscreen-mode');
                setFullscreenPreferred(false);
            } else {
                setFullscreenPreferred(true);
                if (document.documentElement) document.documentElement.classList.add('is-fullscreen-mode');
                if (document.body) document.body.classList.add('is-fullscreen-mode');
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
