// Supabase Configuration
const SUPABASE_URL = "https://gwedrqphjpvyrbdeqakr.supabase.co";
const SUPABASE_KEY = "sb_publishable_uGnp6FKnZN80VJHN13-hvA_6al97gkG";

// Initialize the Supabase client
try {
    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    window.supabaseClient = client;
    window.supabase = client;
    console.log("Supabase client initialized successfully.");
} catch (e) {
    console.error("CRITICAL: Failed to initialize Supabase client:", e);
}

// --- POP BANNER AD GATE SYSTEM ---
class PopBannerGate {
    constructor() {
        this.overlay = null;
        this.targetUrl = null;
        this.adClicked = false;
        this.adIndex = 0; // Tracks which ad to show next
        this.adKeys = ['8fa6018805062814f4d1839f5ff78e24', 'ef8d4530baf9925aae18279a0ec9a902'];
        this.init();
    }

    init() {
        this.createOverlay();
        this.setupAdClickDetection();
        this.attachLinkInterceptors();
        this.patchAppNavigation();
    }

    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.id = 'pop-banner-overlay';
        this.overlay.style.cssText = `
            position: fixed;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.95);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            z-index: 2147483647;
            display: none;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        `;

        const contentBox = document.createElement('div');
        contentBox.style.cssText = `
            background: #11131a;
            border: 1px solid rgba(229,9,20,0.3);
            padding: 30px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0,0,0,0.8), 0 0 20px rgba(229,9,20,0.2);
            max-width: 90%;
            width: 360px;
            animation: popIn 0.3s ease-out;
        `;

        const style = document.createElement('style');
        style.textContent = `
            @keyframes popIn {
                from { opacity: 0; transform: scale(0.9); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);

        contentBox.innerHTML = `
            <div style="display:flex; justify-content:center; margin-bottom: 15px;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E50914" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            </div>
            <h2 style="color: white; margin-bottom: 10px; font-size: 22px;">Action Required</h2>
            <p style="color: #aaa; margin-bottom: 20px; font-size: 14px;">Please click the advertisement below to continue to the next page.</p>
            <div id="pop-ad-container" style="position: relative; background: rgba(0,0,0,0.3); padding: 10px; border-radius: 12px; min-height: 270px; display:flex; justify-content:center; align-items:center; border: 1px dashed rgba(255,255,255,0.1);">
                <!-- Ad will be injected here -->
            </div>
            <button id="pop-cancel-btn" style="margin-top: 20px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: white; padding: 12px 24px; border-radius: 12px; cursor: pointer; font-weight: 600; width: 100%; transition: background 0.2s;">Cancel Navigation</button>
        `;

        this.overlay.appendChild(contentBox);
        document.body.appendChild(this.overlay);

        const cancelBtn = document.getElementById('pop-cancel-btn');
        cancelBtn.addEventListener('click', () => this.hideOverlay());
        cancelBtn.addEventListener('mouseover', () => cancelBtn.style.background = 'rgba(255,255,255,0.1)');
        cancelBtn.addEventListener('mouseout', () => cancelBtn.style.background = 'rgba(255,255,255,0.05)');
    }

    injectAd() {
        const adContainer = document.getElementById('pop-ad-container');
        adContainer.innerHTML = '';
        
        // Get the current ad key and increment/wrap the index for the next time
        const currentKey = this.adKeys[this.adIndex];
        this.adIndex = (this.adIndex + 1) % this.adKeys.length;
        
        const adCode = `
            <script>
              atOptions = {
                'key' : '${currentKey}',
                'format' : 'iframe',
                'height' : 250,
                'width' : 300,
                'params' : {}
              };
            <\/script>
            <script src="https://www.highperformanceformat.com/${currentKey}/invoke.js"><\/script>
        `;

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = adCode;
        
        Array.from(tempDiv.childNodes).forEach(node => {
            if (node.tagName && node.tagName.toLowerCase() === 'script') {
                const script = document.createElement('script');
                if (node.src) script.src = node.src;
                else script.textContent = node.textContent;
                adContainer.appendChild(script);
            } else {
                adContainer.appendChild(node.cloneNode(true));
            }
        });
    }

    showOverlay(targetUrl) {
        if (!targetUrl) return;

        // 30% chance to show the ad. 70% chance to just navigate normally.
        // Change 0.3 to any number between 0.0 and 1.0 to adjust frequency.
        if (Math.random() > 0.3) {
            window.location.href = targetUrl;
            return;
        }

        this.targetUrl = targetUrl;
        this.adClicked = false;
        this.injectAd();
        this.overlay.style.display = 'flex';
        window.focus();
    }

    hideOverlay() {
        this.overlay.style.display = 'none';
        this.targetUrl = null;
        document.getElementById('pop-ad-container').innerHTML = ''; 
    }

    setupAdClickDetection() {
        window.addEventListener('blur', () => {
            setTimeout(() => {
                if (this.overlay.style.display === 'flex') {
                    const active = document.activeElement;
                    if (active && (active.tagName === 'IFRAME' || active.closest('#pop-ad-container'))) {
                        this.handleAdClicked();
                        window.focus();
                    }
                }
            }, 100);
        });
    }

    handleAdClicked() {
        if (!this.adClicked && this.targetUrl) {
            this.adClicked = true;
            
            const container = document.getElementById('pop-ad-container');
            container.innerHTML = `
                <div style="display:flex; flex-direction:column; align-items:center; gap: 12px; animation: popIn 0.3s ease-out;">
                    <div style="width:60px; height:60px; border-radius:50%; background:#4CAF50; display:flex; justify-content:center; align-items:center; box-shadow: 0 0 20px rgba(76, 175, 80, 0.4);">
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </div>
                    <div style="color:#4CAF50; font-size:18px; font-weight:bold;">Thank you! Redirecting...</div>
                </div>
            `;
            
            setTimeout(() => {
                window.location.href = this.targetUrl;
            }, 1000);
        }
    }

    attachLinkInterceptors() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('#pop-banner-overlay')) return;

            let targetA = e.target.closest('a');
            let targetOnclick = e.target.closest('[onclick]');

            if (targetA && targetA.href && !targetA.href.startsWith('javascript:') && !targetA.href.includes('#') && targetA.target !== '_blank') {
                try {
                    const currentUrl = new URL(window.location.href);
                    const clickUrl = new URL(targetA.href, window.location.href);
                    
                    if (currentUrl.origin === clickUrl.origin && (currentUrl.pathname !== clickUrl.pathname || currentUrl.search !== clickUrl.search)) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.showOverlay(targetA.href);
                        return;
                    }
                } catch(err) {}
            }

            if (targetOnclick) {
                const onclickStr = targetOnclick.getAttribute('onclick');
                if (onclickStr && onclickStr.includes('window.location.href')) {
                    const match = onclickStr.match(/window\.location\.href\s*=\s*['"]([^'"]+)['"]/);
                    if (match && match[1]) {
                        e.preventDefault();
                        e.stopPropagation();
                        this.showOverlay(match[1]);
                        return;
                    }
                }
            }
        }, true);
    }

    patchAppNavigation() {
        const patch = () => {
            if (window.app && window.app.navigateToWatch && !window.app._navPatched) {
                const orig = window.app.navigateToWatch.bind(window.app);
                window.app.navigateToWatch = (id) => {
                    if (window.popBanner) {
                        window.popBanner.showOverlay('watch.html?id=' + id);
                    } else {
                        orig(id);
                    }
                };
                window.app._navPatched = true;
            }
        };
        const checkApp = setInterval(() => {
            if (window.app) {
                patch();
                clearInterval(checkApp);
            }
        }, 100);
        patch();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.popBanner = new PopBannerGate();
});
