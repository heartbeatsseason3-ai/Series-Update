/**
 * Configuration Settings
 */
const ad1 = `
        <script>
          atOptions = {
            'key' : '41381acd9cf7f2701d35aa2372c93a8f',
            'format' : 'iframe',
            'height' : 60,
            'width' : 468,
            'params' : {}
          };
        </script>
        <script src="https://www.highperformanceformat.com/41381acd9cf7f2701d35aa2372c93a8f/invoke.js"></script>
`;

const ad2 = `
        <script>
          atOptions = {
            'key' : 'b695c55c7854dd20a9652ca53aa5c647',
            'format' : 'iframe',
            'height' : 60,
            'width' : 468,
            'params' : {}
          };
        </script>
        <script src="https://www.highperformanceformat.com/b695c55c7854dd20a9652ca53aa5c647/invoke.js"></script>
`;

const CONFIG = {
    destinationUrl: "https://example.com/destination",
    requireAdClick: true,
    countdownSeconds: 5,
    adContainerCode: Math.random() < 0.5 ? ad1 : ad2,
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
    // 1. Inject Ad Code
    adContainer.innerHTML = '';
    
    // Convert string to HTML and execute scripts properly
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = CONFIG.adContainerCode;
    
    Array.from(tempDiv.childNodes).forEach(node => {
        if (node.tagName && node.tagName.toLowerCase() === 'script') {
            const script = document.createElement('script');
            if (node.src) {
                script.src = node.src;
            } else {
                script.textContent = node.textContent;
            }
            adContainer.appendChild(script);
        } else {
            adContainer.appendChild(node.cloneNode(true));
        }
    });

    Analytics.trackPageView();

    if (!CONFIG.requireAdClick) {
        statusTitle.textContent = "Please Wait";
        statusMessage.textContent = "Your link is being prepared...";
        startCountdown();
    } else {
        setupAdClickDetection();
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
