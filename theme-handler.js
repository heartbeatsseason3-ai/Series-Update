/**
 * Series Update - Theme Mode Controller (Dark / Light Theme)
 * - Toggles between Dark and Light mode
 * - Auto-binds / injects theme button into top header bar
 * - Remembers user choice in localStorage
 */
(function() {
    'use strict';

    function getSavedTheme() {
        return localStorage.getItem('series_update_theme') || 'dark';
    }

    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.classList.add('light-mode');
            if (document.body) document.body.classList.add('light-mode');
        } else {
            document.documentElement.classList.remove('light-mode');
            if (document.body) document.body.classList.remove('light-mode');
        }
        updateIcons(theme);
    }

    function updateIcons(theme) {
        const buttons = document.querySelectorAll('.theme-toggle-btn, #theme-toggle-btn');
        buttons.forEach(btn => {
            const moonSvg = btn.querySelector('.theme-icon-moon');
            const sunSvg = btn.querySelector('.theme-icon-sun');
            if (theme === 'light') {
                btn.classList.add('active');
                btn.setAttribute('title', 'Switch to Dark Theme');
                if (moonSvg) {
                    moonSvg.style.setProperty('display', 'none', 'important');
                    moonSvg.classList.add('hidden');
                }
                if (sunSvg) {
                    sunSvg.style.setProperty('display', 'inline-block', 'important');
                    sunSvg.classList.remove('hidden');
                }
            } else {
                btn.classList.remove('active');
                btn.setAttribute('title', 'Switch to Light Theme');
                if (moonSvg) {
                    moonSvg.style.setProperty('display', 'inline-block', 'important');
                    moonSvg.classList.remove('hidden');
                }
                if (sunSvg) {
                    sunSvg.style.setProperty('display', 'none', 'important');
                    sunSvg.classList.add('hidden');
                }
            }
        });
    }

    function toggleTheme() {
        const currentTheme = getSavedTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('series_update_theme', newTheme);
        applyTheme(newTheme);
    }

    function initHeaderButton() {
        let buttons = document.querySelectorAll('.theme-toggle-btn, #theme-toggle-btn');
        if (buttons.length === 0) {
            const containers = document.querySelectorAll('.header-actions, .header-right, .nav-right');
            containers.forEach(container => {
                const btn = document.createElement('button');
                btn.id = 'theme-toggle-btn';
                btn.className = 'header-icon icon-btn theme-toggle-btn';
                btn.setAttribute('aria-label', 'Toggle Theme Mode');
                btn.setAttribute('title', 'Toggle Light/Dark Theme');
                btn.innerHTML = `
                    <svg class="theme-icon-moon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                    </svg>
                    <svg class="theme-icon-sun" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
                        <circle cx="12" cy="12" r="5"/>
                        <line x1="12" y1="1" x2="12" y2="3"/>
                        <line x1="12" y1="21" x2="12" y2="23"/>
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                        <line x1="1" y1="12" x2="3" y2="12"/>
                        <line x1="21" y1="12" x2="23" y2="12"/>
                        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                    </svg>`;
                const fsBtn = container.querySelector('.fullscreen-btn, #fullscreen-btn');
                if (fsBtn && fsBtn.nextSibling) {
                    container.insertBefore(btn, fsBtn.nextSibling);
                } else {
                    container.insertBefore(btn, container.firstChild);
                }
            });
            buttons = document.querySelectorAll('.theme-toggle-btn, #theme-toggle-btn');
        }

        buttons.forEach(btn => {
            btn.removeEventListener('click', toggleTheme);
            btn.addEventListener('click', toggleTheme);
        });

        applyTheme(getSavedTheme());
    }

    // Run early to prevent dark flash if light theme saved
    const saved = getSavedTheme();
    if (saved === 'light') {
        document.documentElement.classList.add('light-mode');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHeaderButton);
    } else {
        initHeaderButton();
    }
})();
