/**
 * Configuration Settings
 */
const CONFIG = {
    destinationUrl: "https://example.com/destination",
    requireAdClick: true,
    countdownSeconds: 5,
    preventRapidClicksLimitMs: 1000
};

/**
 * Analytics Tracking (Mockup for actual implementation)
 */
const Analytics = {
    trackPageView: () => console.log("[Analytics] Page View Logged"),
    trackAdClick: () => console.log("[Analytics] Ad Click Logged"),
    trackContinueClick: () => console.log("[Analytics] Continue Button Clicked")
};

// DOM Elements
const adContainer = document.getElementById('ad-container');
const continueBtn = document.getElementById('continue-btn');
const statusTitle = document.getElementById('status-title');
const statusMessage = document.getElementById('status-message');
const progressBarFill = document.getElementById('progress-bar-fill');
const countdownText = document.getElementById('countdown-text');
const successAnimation = document.getElementById('success-animation');
const themeBtn = document.getElementById('theme-btn');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');
const adWrapper = document.getElementById('ad-wrapper');

let adClicked = false;
let countdownActive = false;
let lastClickTime = 0;

function init() {
    Analytics.trackPageView();

    if (!CONFIG.requireAdClick) {
        statusTitle.textContent = "Please Wait";
        statusMessage.textContent = "Your link is being prepared...";
        startCountdown();
    } else {
        setupAdClickDetection();
        
        // Adblock fallback check
        setTimeout(() => {
            const iframe = adContainer.querySelector('iframe');
            if (!iframe) {
                const fallbackMessage = document.createElement('div');
                fallbackMessage.style.color = 'var(--text-muted)';
                fallbackMessage.style.fontSize = '14px';
                fallbackMessage.style.textAlign = 'center';
                fallbackMessage.style.width = '100%';
                fallbackMessage.style.padding = '20px';
                fallbackMessage.style.cursor = 'pointer';
                fallbackMessage.textContent = 'Advertisement blocked. Please click here to continue.';
                adContainer.innerHTML = '';
                adContainer.appendChild(fallbackMessage);
            }
        }, 3000);
    }
}

function setupAdClickDetection() {
    // Detect click on wrapper directly (if ad allows it / is not an iframe)
    adWrapper.addEventListener('click', handleAdClickEvent);

    // Cross-origin iframe click detection (blur event)
    window.focus();
    window.addEventListener('blur', () => {
        setTimeout(() => {
            const active = document.activeElement;
            if (active && (active.tagName === 'IFRAME' || active.closest('.ad-wrapper'))) {
                handleAdClickEvent();
                window.focus(); // regain focus to track subsequent clicks
            }
        }, 100);
    });
}

function navigateToDestination() {
    const urlParams = new URLSearchParams(window.location.search);
    const dest = urlParams.get('dest');
    
    if (dest) {
        let destUrl = decodeURIComponent(dest);
        if (destUrl.includes('?')) {
            destUrl += '&ad_passed=1';
        } else {
            destUrl += '?ad_passed=1';
        }
        window.location.href = destUrl;
    } else {
        window.location.href = CONFIG.destinationUrl;
    }
}

function handleAdClickEvent() {
    const now = Date.now();
    if (now - lastClickTime < CONFIG.preventRapidClicksLimitMs) {
        return; 
    }
    lastClickTime = now;

    if (!adClicked && CONFIG.requireAdClick) {
        adClicked = true;
        Analytics.trackAdClick();
        
        successAnimation.classList.add('show');
        statusTitle.textContent = "Thank You";
        statusMessage.textContent = "Redirecting to next page...";
        
        setTimeout(() => {
            navigateToDestination();
        }, 600); // 0.6 seconds delay to let them see the checkmark
    }
}

function startCountdown() {
    // Disabled
}

function enableContinueButton() {
    // Disabled
}

// Theme Toggle functionality
function toggleTheme() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    if (isDark) {
        document.body.removeAttribute('data-theme');
        moonIcon.style.display = 'block';
        sunIcon.style.display = 'none';
        localStorage.setItem('theme', 'light');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        moonIcon.style.display = 'none';
        sunIcon.style.display = 'block';
        localStorage.setItem('theme', 'dark');
    }
}

themeBtn.addEventListener('click', toggleTheme);

// Load saved theme or system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.body.setAttribute('data-theme', 'dark');
    moonIcon.style.display = 'none';
    sunIcon.style.display = 'block';
}

// Start gateway logic
init();
