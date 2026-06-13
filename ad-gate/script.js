/**
 * Configuration Settings
 */
const CONFIG = {
    destinationUrl: "https://example.com/destination", // Set your destination URL here
    requireAdClick: true, // true = must click ad, false = just wait
    countdownSeconds: 5, // time to wait after click (or without click if requireAdClick=false)
    adContainerCode: `
        <script>
          atOptions = {
            'key' : '8fa6018805062814f4d1839f5ff78e24',
            'format' : 'iframe',
            'height' : 250,
            'width' : 300,
            'params' : {}
          };
        </script>
        <script src="https://www.highperformanceformat.com/8fa6018805062814f4d1839f5ff78e24/invoke.js"></script>
    `,
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

function handleAdClickEvent() {
    const now = Date.now();
    if (now - lastClickTime < CONFIG.preventRapidClicksLimitMs) {
        return; // Anti-spam protection
    }
    lastClickTime = now;

    if (!adClicked && CONFIG.requireAdClick) {
        adClicked = true;
        Analytics.trackAdClick();
        
        // Show success animation overlay
        successAnimation.classList.add('show');
        
        statusTitle.textContent = "Thank You";
        statusMessage.textContent = "Your link is now ready.";
        
        setTimeout(() => {
            startCountdown();
        }, 1000);
    }
}

function startCountdown() {
    if (countdownActive) return;
    countdownActive = true;

    if (CONFIG.countdownSeconds <= 0) {
        enableContinueButton();
        return;
    }

    let timeLeft = CONFIG.countdownSeconds;
    let totalTime = CONFIG.countdownSeconds;
    
    const updateProgress = () => {
        const percent = ((totalTime - timeLeft) / totalTime) * 100;
        progressBarFill.style.width = `${percent}%`;
        countdownText.textContent = `Please wait ${timeLeft.toFixed(0)} seconds...`;
    };

    updateProgress();

    const interval = setInterval(() => {
        timeLeft -= 0.1;
        
        if (timeLeft <= 0) {
            clearInterval(interval);
            timeLeft = 0;
            updateProgress();
            enableContinueButton();
        } else {
            updateProgress();
        }
    }, 100);
}

function enableContinueButton() {
    progressBarFill.style.width = `100%`;
    countdownText.textContent = "Ready to proceed!";
    
    continueBtn.disabled = false;
    continueBtn.classList.remove('btn-disabled');
    continueBtn.classList.add('btn-active');
}

// Continue Button Click
continueBtn.addEventListener('click', () => {
    if (continueBtn.disabled) return;
    Analytics.trackContinueClick();
    
    const urlParams = new URLSearchParams(window.location.search);
    const dest = urlParams.get('dest');
    
    window.location.href = dest ? decodeURIComponent(dest) : CONFIG.destinationUrl;
});

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
