/**
 * How to Watch Movies - Modal & Embedded Video Tutorial Component
 * Vimeo Embed URL: https://player.vimeo.com/video/1227293876?h=b7cbabdcb8&badge=0&autopause=0&player_id=0&app_id=58479&responsive=1&playsinline=1&fullscreen=1
 * Vimeo Direct URL: https://vimeo.com/1227293876
 */

(function () {
    const VIMEO_URL = "https://player.vimeo.com/video/1227293876?h=b7cbabdcb8&badge=0&autopause=0&player_id=0&app_id=58479&responsive=1&playsinline=1&fullscreen=1";
    const VIMEO_DIRECT_URL = "https://vimeo.com/1227293876";

    // Inject Styles dynamically
    function injectStyles() {
        if (document.getElementById('htw-modal-styles')) return;

        const style = document.createElement('style');
        style.id = 'htw-modal-styles';
        style.textContent = `
            /* ===================================================
               HOW TO WATCH - TOP BAR HEADER BUTTON
               =================================================== */
            .htw-header-btn {
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
                gap: 6px !important;
                white-space: nowrap !important;
                flex-shrink: 0 !important;
                background: linear-gradient(135deg, rgba(229, 9, 20, 0.25) 0%, rgba(184, 7, 16, 0.4) 100%) !important;
                color: #FFFFFF !important;
                border: 1px solid rgba(229, 9, 20, 0.6) !important;
                padding: 0 13px !important;
                height: 34px !important;
                line-height: 34px !important;
                border-radius: 20px !important;
                font-size: 12.5px !important;
                font-weight: 600 !important;
                cursor: pointer !important;
                text-decoration: none !important;
                box-sizing: border-box !important;
                transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
                box-shadow: 0 2px 10px rgba(229, 9, 20, 0.25) !important;
                font-family: 'Poppins', 'Inter', sans-serif !important;
            }
            .htw-header-btn:hover {
                background: linear-gradient(135deg, #E50914 0%, #d60813 100%) !important;
                border-color: #ff2d38 !important;
                color: #FFFFFF !important;
                transform: translateY(-1px) !important;
                box-shadow: 0 4px 16px rgba(229, 9, 20, 0.5) !important;
            }
            .htw-header-btn svg {
                fill: currentColor !important;
                flex-shrink: 0 !important;
            }

            .header-actions, .header-right {
                flex-shrink: 0;
            }

            @media (max-width: 1080px) and (min-width: 769px) {
                .htw-header-btn {
                    padding: 0 10px !important;
                    font-size: 11.5px !important;
                }
            }

            @media (max-width: 768px) {
                .htw-header-btn {
                    width: 34px !important;
                    min-width: 34px !important;
                    height: 34px !important;
                    padding: 0 !important;
                    border-radius: 50% !important;
                    gap: 0 !important;
                }
                .htw-header-btn span {
                    display: none !important;
                }
                .htw-header-btn svg {
                    width: 14px !important;
                    height: 14px !important;
                }
            }

            /* ===================================================
               HOW TO WATCH - BANNER CARD (Home / Movies / TV)
               =================================================== */
            .htw-banner {
                position: relative;
                background: linear-gradient(135deg, rgba(229, 9, 20, 0.14) 0%, rgba(18, 22, 32, 0.95) 100%);
                border: 1px solid rgba(229, 9, 20, 0.35);
                border-radius: 18px;
                padding: 16px 50px 16px 20px;
                margin: 16px auto;
                max-width: 1200px;
                width: calc(100% - 32px);
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 16px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.45);
                box-sizing: border-box;
                animation: htwFadeIn 0.3s ease;
            }
            @keyframes htwFadeIn {
                from { opacity: 0; transform: translateY(-6px); }
                to { opacity: 1; transform: translateY(0); }
            }

            /* Banner Close Button (X) */
            .htw-banner-close {
                position: absolute;
                top: 12px;
                right: 14px;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.16);
                color: #c5c5c5;
                font-size: 18px;
                line-height: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s ease;
                z-index: 10;
                padding: 0;
            }
            .htw-banner-close:hover {
                background: #E50914;
                border-color: #E50914;
                color: #ffffff;
                transform: scale(1.1);
            }

            .htw-banner-left {
                display: flex;
                align-items: center;
                gap: 14px;
            }
            .htw-banner-icon {
                width: 44px;
                height: 44px;
                border-radius: 12px;
                background: linear-gradient(135deg, #E50914, #900008);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #fff;
                font-size: 20px;
                box-shadow: 0 4px 12px rgba(229, 9, 20, 0.4);
                flex-shrink: 0;
            }
            .htw-banner-text h4 {
                color: #ffffff;
                font-size: 15px;
                font-weight: 700;
                margin: 0 0 4px 0;
                font-family: 'Poppins', sans-serif;
            }
            .htw-banner-text p {
                color: #9ba1a6;
                font-size: 12px;
                line-height: 1.4;
                margin: 0;
            }
            .htw-banner-playbtn {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                white-space: nowrap;
                flex-shrink: 0;
                background: #E50914;
                color: #ffffff;
                border: none;
                padding: 9px 20px;
                border-radius: 25px;
                font-size: 13px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.25s ease;
                box-shadow: 0 4px 15px rgba(229, 9, 20, 0.35);
                font-family: 'Poppins', sans-serif;
            }
            .htw-banner-playbtn:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(229, 9, 20, 0.55);
                background: #ff0f1b;
            }

            @media (max-width: 600px) {
                .htw-banner {
                    flex-direction: column;
                    text-align: center;
                    padding: 24px 16px 18px 16px !important;
                    gap: 14px;
                    width: calc(100% - 24px);
                    margin: 12px auto;
                }
                .htw-banner-close {
                    top: 10px;
                    right: 10px;
                    width: 26px;
                    height: 26px;
                    font-size: 16px;
                }
                .htw-banner-left {
                    flex-direction: column;
                    align-items: center;
                    gap: 10px;
                }
                .htw-banner-playbtn {
                    width: 100%;
                    justify-content: center;
                    padding: 10px 16px;
                }
            }

            /* ===================================================
               HOW TO WATCH - MODAL OVERLAY & POPUP
               =================================================== */
            .htw-modal-overlay {
                position: fixed;
                inset: 0;
                background: rgba(4, 6, 10, 0.88);
                -webkit-backdrop-filter: blur(14px);
                backdrop-filter: blur(14px);
                z-index: 99999;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 16px;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s ease, visibility 0.3s ease;
            }
            .htw-modal-overlay.active {
                opacity: 1;
                visibility: visible;
            }

            .htw-modal-box {
                background: linear-gradient(150deg, #121622 0%, #0a0c10 100%);
                border: 1px solid rgba(255, 255, 255, 0.12);
                border-radius: 22px;
                width: 100%;
                max-width: 720px;
                box-shadow: 0 25px 60px rgba(0, 0, 0, 0.85), 0 0 30px rgba(229, 9, 20, 0.15);
                overflow: hidden;
                transform: scale(0.92) translateY(20px);
                transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), width 0.3s ease, height 0.3s ease;
                display: flex;
                flex-direction: column;
                max-height: 92vh;
                position: relative;
            }
            .htw-modal-overlay.active .htw-modal-box {
                transform: scale(1) translateY(0);
            }

            .htw-modal-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 14px 18px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                background: rgba(255, 255, 255, 0.02);
                flex-shrink: 0;
            }
            .htw-header-title-wrap {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .htw-guide-badge {
                background: rgba(229, 9, 20, 0.2);
                border: 1px solid rgba(229, 9, 20, 0.45);
                color: #ff4d58;
                font-size: 10px;
                font-weight: 700;
                letter-spacing: 0.8px;
                padding: 3px 8px;
                border-radius: 6px;
                text-transform: uppercase;
            }
            .htw-modal-title {
                color: #ffffff;
                font-size: 16px;
                font-weight: 700;
                margin: 0;
                font-family: 'Poppins', sans-serif;
            }
            .htw-header-actions-group {
                display: flex;
                align-items: center;
                gap: 8px;
            }

            /* Header Fullscreen Button */
            .htw-fullscreen-btn {
                display: inline-flex;
                align-items: center;
                gap: 6px;
                background: rgba(229, 9, 20, 0.16);
                border: 1px solid rgba(229, 9, 20, 0.5);
                color: #ffffff;
                padding: 6px 12px;
                border-radius: 14px;
                font-size: 12px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                font-family: 'Poppins', sans-serif;
            }
            .htw-fullscreen-btn:hover {
                background: #E50914;
                border-color: #E50914;
                transform: translateY(-1px);
                box-shadow: 0 4px 12px rgba(229, 9, 20, 0.4);
            }
            .htw-fullscreen-btn svg {
                flex-shrink: 0;
            }

            .htw-close-btn {
                background: rgba(255, 255, 255, 0.06);
                border: 1px solid rgba(255, 255, 255, 0.12);
                color: #a0a0a0;
                width: 32px;
                height: 32px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                font-size: 20px;
                line-height: 1;
                transition: all 0.2s ease;
                padding: 0;
            }
            .htw-close-btn:hover {
                background: #E50914;
                color: #ffffff;
                border-color: #E50914;
                transform: rotate(90deg);
            }

            /* Video Frame Responsive Container */
            .htw-video-container {
                position: relative;
                width: 100%;
                background: #000000;
                height: 400px;
                max-height: 52vh;
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .htw-video-container iframe {
                width: 100%;
                height: 100%;
                border: 0;
                display: block;
            }

            /* Floating Fullscreen Button on Video */
            .htw-floating-fs-btn {
                position: absolute;
                top: 14px;
                right: 14px;
                display: inline-flex;
                align-items: center;
                gap: 6px;
                background: rgba(10, 14, 22, 0.85);
                -webkit-backdrop-filter: blur(8px);
                backdrop-filter: blur(8px);
                border: 1px solid rgba(255, 255, 255, 0.25);
                color: #ffffff;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.25s ease;
                z-index: 5;
                box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6);
                font-family: 'Poppins', sans-serif;
            }
            .htw-floating-fs-btn:hover {
                background: #E50914;
                border-color: #E50914;
                transform: scale(1.06);
            }

            /* Fallback & Fullscreen Action bar below video player */
            .htw-video-fallback-bar {
                display: flex;
                align-items: center;
                justify-content: space-between;
                flex-wrap: wrap;
                gap: 10px;
                padding: 8px 16px;
                background: rgba(0, 0, 0, 0.7);
                border-bottom: 1px solid rgba(255, 255, 255, 0.06);
                font-size: 11.5px;
            }
            .htw-fallback-note {
                color: #8a9099;
            }
            .htw-fallback-link {
                color: #38bdf8;
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                gap: 5px;
                font-weight: 500;
                transition: color 0.2s;
            }
            .htw-fallback-link:hover {
                color: #7dd3fc;
                text-decoration: underline;
            }
            .htw-bar-fs-btn {
                display: inline-flex;
                align-items: center;
                gap: 5px;
                background: rgba(229, 9, 20, 0.2);
                border: 1px solid rgba(229, 9, 20, 0.5);
                color: #ffffff;
                padding: 4px 10px;
                border-radius: 8px;
                font-size: 11.5px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                font-family: 'Poppins', sans-serif;
            }
            .htw-bar-fs-btn:hover {
                background: #E50914;
                border-color: #E50914;
            }

            /* Steps Section inside Modal */
            .htw-modal-body {
                padding: 16px 20px;
                overflow-y: auto;
            }
            .htw-steps-title {
                font-size: 12.5px;
                font-weight: 600;
                color: #9ba1a6;
                margin-bottom: 12px;
                text-transform: uppercase;
                letter-spacing: 0.6px;
            }
            .htw-steps-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                gap: 10px;
            }
            .htw-step-card {
                background: rgba(255, 255, 255, 0.03);
                border: 1px solid rgba(255, 255, 255, 0.06);
                border-radius: 12px;
                padding: 12px;
                display: flex;
                align-items: flex-start;
                gap: 10px;
            }
            .htw-step-num {
                background: linear-gradient(135deg, #E50914, #900008);
                color: #fff;
                width: 24px;
                height: 24px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 11px;
                font-weight: 700;
                flex-shrink: 0;
            }
            .htw-step-text h5 {
                color: #ffffff;
                font-size: 12.5px;
                font-weight: 600;
                margin: 0 0 2px 0;
            }
            .htw-step-text p {
                color: #8a9099;
                font-size: 11px;
                line-height: 1.4;
                margin: 0;
            }

            /* ===================================================
               NATIVE FULLSCREEN & THEATRE FULLSCREEN MODES
               =================================================== */
            .htw-video-container:fullscreen,
            .htw-video-container:-webkit-full-screen,
            .htw-video-container:-moz-full-screen {
                width: 100vw !important;
                height: 100vh !important;
                max-height: 100vh !important;
                background: #000000 !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                padding: 0 !important;
                margin: 0 !important;
            }
            .htw-video-container:fullscreen iframe,
            .htw-video-container:-webkit-full-screen iframe,
            .htw-video-container:-moz-full-screen iframe {
                width: 100% !important;
                height: 100% !important;
                max-width: 100vw !important;
                max-height: 100vh !important;
            }

            /* Modal Expanded Fullscreen Mode */
            .htw-modal-box.is-fullscreen {
                width: 100vw !important;
                max-width: 100vw !important;
                height: 100vh !important;
                max-height: 100vh !important;
                border-radius: 0 !important;
                border: none !important;
                margin: 0 !important;
                transform: none !important;
            }
            .htw-modal-box.is-fullscreen .htw-video-container {
                height: calc(100vh - 100px) !important;
                max-height: none !important;
                flex-grow: 1 !important;
            }
            .htw-modal-box.is-fullscreen .htw-modal-body {
                display: none !important;
            }

            /* ===================================================
               HOW TO WATCH - IN-PAGE SECTION (watch.html / player)
               =================================================== */
            .htw-section-card {
                background: linear-gradient(135deg, rgba(20, 24, 35, 0.95) 0%, rgba(10, 12, 16, 0.98) 100%);
                border: 1px solid rgba(229, 9, 20, 0.25);
                border-radius: 20px;
                padding: 22px;
                margin: 20px 0;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(229, 9, 20, 0.08);
                box-sizing: border-box;
                width: 100%;
            }
            .htw-sec-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 16px;
                flex-wrap: wrap;
                gap: 10px;
            }
            .htw-sec-title-wrap {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .htw-sec-icon {
                width: 32px;
                height: 32px;
                background: rgba(229, 9, 20, 0.15);
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #E50914;
            }
            .htw-sec-title-wrap h3 {
                color: #ffffff;
                font-size: 17px;
                font-weight: 700;
                margin: 0;
                font-family: 'Poppins', sans-serif;
            }
            .htw-sec-badge {
                background: rgba(76, 175, 80, 0.15);
                border: 1px solid rgba(76, 175, 80, 0.3);
                color: #4CAF50;
                font-size: 11px;
                font-weight: 600;
                padding: 4px 10px;
                border-radius: 20px;
            }
            .htw-sec-content {
                display: grid;
                grid-template-columns: 1fr;
                gap: 18px;
            }
            @media (min-width: 768px) {
                .htw-sec-content {
                    grid-template-columns: 1.2fr 1fr;
                    align-items: center;
                }
            }
            .htw-sec-video-box {
                position: relative;
                width: 100%;
                height: 240px;
                border-radius: 14px;
                overflow: hidden;
                background: #000;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            .htw-sec-video-box iframe {
                width: 100%;
                height: 100%;
                border: 0;
                display: block;
            }
            .htw-sec-info {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            .htw-sec-info h4 {
                color: #ffffff;
                font-size: 15px;
                font-weight: 600;
                margin: 0;
            }
            .htw-sec-info p {
                color: #9ba1a6;
                font-size: 12.5px;
                line-height: 1.5;
                margin: 0;
            }
            .htw-sec-popbtn {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                background: rgba(255, 255, 255, 0.08);
                border: 1px solid rgba(255, 255, 255, 0.15);
                color: #ffffff;
                padding: 9px 16px;
                border-radius: 12px;
                font-size: 12.5px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s ease;
                width: fit-content;
            }
            .htw-sec-popbtn:hover {
                background: #E50914;
                border-color: #E50914;
            }
        `;
        document.head.appendChild(style);
    }

    // Inject Modal DOM
    function injectModal() {
        if (document.getElementById('htw-modal-overlay')) return;

        const modalDiv = document.createElement('div');
        modalDiv.id = 'htw-modal-overlay';
        modalDiv.className = 'htw-modal-overlay';
        modalDiv.setAttribute('onclick', 'if(event.target===this) window.closeHowToWatchModal()');

        modalDiv.innerHTML = `
            <div class="htw-modal-box">
                <div class="htw-modal-header">
                    <div class="htw-header-title-wrap">
                        <span class="htw-guide-badge">VIDEO TUTORIAL</span>
                        <h3 class="htw-modal-title">How to Watch Movies</h3>
                    </div>
                    <div class="htw-header-actions-group">
                        <button class="htw-fullscreen-btn" onclick="window.toggleHowToWatchFullscreen()" aria-label="Toggle Full Screen" title="Full Screen View">
                            <svg class="htw-fs-icon-enter" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                            </svg>
                            <svg class="htw-fs-icon-exit" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
                                <path d="M4 14h6m0 0v6m0-6L3 21m17-7h-6m0 0v6m0-6l7 7M14 10h6m0 0V4m0 6l7-7M10 10H4m0 0V4m0 6L3 3"/>
                            </svg>
                            <span class="htw-fs-text">Full Screen</span>
                        </button>
                        <button class="htw-close-btn" onclick="window.closeHowToWatchModal()" aria-label="Close modal">&times;</button>
                    </div>
                </div>
                
                <div class="htw-video-container" id="htw-video-container">
                    <button class="htw-floating-fs-btn" onclick="window.toggleHowToWatchFullscreen()" title="Full Screen Video">
                        <svg class="htw-fs-icon-enter" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                        </svg>
                        <svg class="htw-fs-icon-exit" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" style="display:none;">
                            <path d="M4 14h6m0 0v6m0-6L3 21m17-7h-6m0 0v6m0-6l7 7M14 10h6m0 0V4m0 6l7-7M10 10H4m0 0V4m0 6L3 3"/>
                        </svg>
                        <span>Full Screen</span>
                    </button>
                    <iframe id="htw-vimeo-iframe" 
                        src="" 
                        allow="autoplay; fullscreen; picture-in-picture; encrypted-media; web-share" 
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen="true"
                        webkitallowfullscreen="true"
                        mozallowfullscreen="true"
                        title="How to Watch Movies Tutorial Video">
                    </iframe>
                </div>

                <div class="htw-video-fallback-bar">
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <span class="htw-fallback-note">Player not loading?</span>
                        <a href="${VIMEO_DIRECT_URL}" target="_blank" rel="noopener noreferrer" class="htw-fallback-link">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                            Direct Vimeo
                        </a>
                    </div>
                    <button class="htw-bar-fs-btn" onclick="window.toggleHowToWatchFullscreen()">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
                        </svg>
                        Full Screen
                    </button>
                </div>

                <div class="htw-modal-body">
                    <div class="htw-steps-title">Quick 3-Step Guide</div>
                    <div class="htw-steps-grid">
                        <div class="htw-step-card">
                            <div class="htw-step-num">1</div>
                            <div class="htw-step-text">
                                <h5>Choose Movie / TV Show</h5>
                                <p>Browse our catalog or search for any movie or series you want to watch.</p>
                            </div>
                        </div>
                        <div class="htw-step-card">
                            <div class="htw-step-num">2</div>
                            <div class="htw-step-text">
                                <h5>Select Your Device</h5>
                                <p>Click Android App, iOS App, or Web player depending on your device.</p>
                            </div>
                        </div>
                        <div class="htw-step-card">
                            <div class="htw-step-num">3</div>
                            <div class="htw-step-text">
                                <h5>Stream & Enjoy in HD</h5>
                                <p>Hit Watch Now to start instant high-definition streaming with no delays.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modalDiv);
    }

    // Modal Global Functions
    window.openHowToWatchModal = function () {
        injectStyles();
        injectModal();
        const overlay = document.getElementById('htw-modal-overlay');
        const iframe = document.getElementById('htw-vimeo-iframe');

        if (iframe) {
            // Re-assign src to ensure clean load
            iframe.src = VIMEO_URL;
        }

        if (overlay) {
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeHowToWatchModal = function () {
        const overlay = document.getElementById('htw-modal-overlay');
        const iframe = document.getElementById('htw-vimeo-iframe');
        const modalBox = overlay ? overlay.querySelector('.htw-modal-box') : null;

        // Exit fullscreen if open
        if (document.fullscreenElement || document.webkitFullscreenElement) {
            if (document.exitFullscreen) document.exitFullscreen().catch(() => {});
            else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        }
        if (modalBox) {
            modalBox.classList.remove('is-fullscreen');
        }
        updateFullscreenIcons(false);

        if (overlay) {
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        if (iframe) {
            // Stop playback by clearing src
            iframe.src = '';
        }
    };

    // Toggle Fullscreen Function
    window.toggleHowToWatchFullscreen = function () {
        const overlay = document.getElementById('htw-modal-overlay');
        const modalBox = overlay ? overlay.querySelector('.htw-modal-box') : null;
        const videoContainer = document.getElementById('htw-video-container');
        const iframe = document.getElementById('htw-vimeo-iframe');

        const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement || (modalBox && modalBox.classList.contains('is-fullscreen')));

        if (!isFs) {
            // Try HTML5 requestFullscreen on video container
            const targetEl = videoContainer || iframe;
            if (targetEl && targetEl.requestFullscreen) {
                targetEl.requestFullscreen().catch(() => {
                    // Fallback to CSS expanded fullscreen
                    if (modalBox) modalBox.classList.add('is-fullscreen');
                });
            } else if (targetEl && targetEl.webkitRequestFullscreen) {
                targetEl.webkitRequestFullscreen();
            } else if (modalBox) {
                // iOS Safari fallback
                modalBox.classList.add('is-fullscreen');
            }
            if (modalBox) modalBox.classList.add('is-fullscreen');
            updateFullscreenIcons(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen().catch(() => {});
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
            if (modalBox) modalBox.classList.remove('is-fullscreen');
            updateFullscreenIcons(false);
        }
    };

    function updateFullscreenIcons(isFs) {
        document.querySelectorAll('.htw-fs-icon-enter').forEach(el => el.style.display = isFs ? 'none' : 'inline-block');
        document.querySelectorAll('.htw-fs-icon-exit').forEach(el => el.style.display = isFs ? 'inline-block' : 'none');
        document.querySelectorAll('.htw-fs-text').forEach(el => el.textContent = isFs ? 'Exit Full' : 'Full Screen');
    }

    // Sync with browser native fullscreen change events
    ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange', 'MSFullscreenChange'].forEach(ev => {
        document.addEventListener(ev, function () {
            const isNativeFs = !!(document.fullscreenElement || document.webkitFullscreenElement);
            const modalBox = document.querySelector('.htw-modal-box');
            if (!isNativeFs && modalBox) {
                modalBox.classList.remove('is-fullscreen');
            }
            updateFullscreenIcons(isNativeFs);
        });
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const modalBox = document.querySelector('.htw-modal-box');
            if (modalBox && modalBox.classList.contains('is-fullscreen')) {
                window.toggleHowToWatchFullscreen();
            } else {
                window.closeHowToWatchModal();
            }
        }
    });

    // Helper to dismiss banner card
    window.dismissHowToWatchBanner = function (btn) {
        const banner = btn ? btn.closest('.htw-banner') : document.getElementById('htw-banner-card');
        if (banner) {
            banner.style.opacity = '0';
            banner.style.transform = 'scale(0.96)';
            banner.style.transition = 'all 0.25s ease';
            setTimeout(function () {
                banner.remove();
            }, 250);
        }
        try {
            sessionStorage.setItem('htw_banner_dismissed', 'true');
        } catch (e) {}
    };

    // Helper to generate in-page section HTML for watch.html
    window.getHowToWatchSectionHtml = function () {
        return `
            <div class="htw-section-card">
                <div class="htw-sec-header">
                    <div class="htw-sec-title-wrap">
                        <div class="htw-sec-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                        </div>
                        <h3>How to Watch Movies</h3>
                    </div>
                    <span class="htw-sec-badge">Official Video Guide</span>
                </div>
                <div class="htw-sec-content">
                    <div class="htw-sec-video-box">
                        <iframe src="${VIMEO_URL}" allow="autoplay; fullscreen; picture-in-picture; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true" title="How to Watch Movies Video Guide"></iframe>
                    </div>
                    <div class="htw-sec-info">
                        <h4>Need help playing movies?</h4>
                        <p>Watch our step-by-step tutorial video on how to select your device, start streaming, or download movies for offline viewing.</p>
                        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                            <button class="htw-sec-popbtn" onclick="window.openHowToWatchModal()">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 3h6v6M14 10l6-6M9 21H3v-6M10 14l-6 6"/></svg>
                                Expand Video Player
                            </button>
                            <a href="${VIMEO_DIRECT_URL}" target="_blank" rel="noopener noreferrer" class="htw-sec-popbtn" style="text-decoration:none;">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
                                Vimeo Direct
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    // Helper to generate banner HTML for index.html / movie.html / tvshow.html
    window.getHowToWatchBannerHtml = function () {
        try {
            if (sessionStorage.getItem('htw_banner_dismissed') === 'true') {
                return '';
            }
        } catch (e) {}

        return `
            <div class="htw-banner" id="htw-banner-card">
                <button class="htw-banner-close" onclick="window.dismissHowToWatchBanner(this)" aria-label="Close guide banner" title="Close banner">&times;</button>
                <div class="htw-banner-left">
                    <div class="htw-banner-icon">🎬</div>
                    <div class="htw-banner-text">
                        <h4>How to Watch Movies & Series</h4>
                        <p>Watch our 1-minute video guide to learn how to stream HD movies smoothly.</p>
                    </div>
                </div>
                <button class="htw-banner-playbtn" onclick="window.openHowToWatchModal()">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                    Watch Tutorial Video
                </button>
            </div>
        `;
    };

    // Auto Init on DOM Load
    function initHowToWatch() {
        injectStyles();
        injectModal();

        // Auto render banner containers
        document.querySelectorAll('.how-to-watch-banner-auto').forEach(function (el) {
            const html = window.getHowToWatchBannerHtml();
            if (html) {
                el.innerHTML = html;
            } else {
                el.style.display = 'none';
            }
        });

        // Auto render section containers
        document.querySelectorAll('.how-to-watch-section-auto').forEach(function (el) {
            el.innerHTML = window.getHowToWatchSectionHtml();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initHowToWatch);
    } else {
        initHowToWatch();
    }
})();
