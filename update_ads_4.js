const fs = require('fs');
const glob = require('fs').readdirSync;

const files = glob('f:/WEBSITE/series update').filter(f => f.endsWith('.html') && f !== 'downloaded_index.html' && f !== 'ui-clone.html');
const key1 = '41381acd9cf7f2701d35aa2372c93a8f';
const key2 = 'b695c55c7854dd20a9652ca53aa5c647';

function getAdHtml(key) {
    return `
<div style="display: flex; justify-content: center; margin: 20px 0; width: 100%; overflow: hidden;" class="banner-ad">
    <script>
        atOptions = {
            'key' : '${key}',
            'format' : 'iframe',
            'height' : 60,
            'width' : 468,
            'params' : {}
        };
    </script>
    <script src="https://www.highperformanceformat.com/${key}/invoke.js"></script>
</div>
`;
}

const adRegex = /<div style=\"display: flex; justify-content: center; margin: 20px 0; width: 100%; overflow: hidden;\"(?: class=\"banner-ad\")?>\s*<script>[\s\S]*?<\/script>\s*<script src=\"[\s\S]*?\"><\/script>\s*<\/div>/g;

for (let file of files) {
    const path = 'f:/WEBSITE/series update/' + file;
    let content = fs.readFileSync(path, 'utf8');
    
    // First, remove ALL existing ad blocks of this type.
    content = content.replace(adRegex, '');
    
    // Now we need to inject exactly 4 ad blocks.
    // Ad 1, Ad 2, Ad 1, Ad 2
    const adsToInject = [getAdHtml(key1), getAdHtml(key2), getAdHtml(key1), getAdHtml(key2)];
    
    // Where to inject? 
    // 1. After <header> (if exists) or <body>
    // 2. Before <main> (if exists) or before bottom-nav
    // 3. Before <footer> (if exists) or before scripts
    // 4. Before </body>
    
    let injected = 0;
    
    // Helper to inject
    function injectAfter(searchStr, adIndex) {
        if (injected >= 4) return;
        const idx = content.indexOf(searchStr);
        if (idx !== -1) {
            content = content.substring(0, idx + searchStr.length) + adsToInject[adIndex] + content.substring(idx + searchStr.length);
            injected++;
        }
    }

    function injectBefore(searchStr, adIndex) {
        if (injected >= 4) return;
        const idx = content.lastIndexOf(searchStr); // use last to avoid injecting inside comments
        if (idx !== -1) {
            content = content.substring(0, idx) + adsToInject[adIndex] + content.substring(idx);
            injected++;
        }
    }
    
    // Try to spread them out
    injectAfter('</header>', injected);
    if (injected === 0) injectAfter('<body', injected); // Fallback if no header, wait, <body class="..."> requires regex
    
    if (injected === 0) {
        content = content.replace(/<body[^>]*>/, match => match + adsToInject[injected++]);
    }

    injectBefore('<main id="content-container">', injected);
    injectBefore('<nav class="bottom-nav">', injected);
    
    // For the remaining ads, just put them before </body>
    while(injected < 4) {
        let idx = content.lastIndexOf('</body>');
        if (idx !== -1) {
            content = content.substring(0, idx) + adsToInject[injected++] + content.substring(idx);
        } else {
            // Append to end if no body
            content += adsToInject[injected++];
        }
    }
    
    fs.writeFileSync(path, content);
    console.log(`Updated ${file} with 4 mixed ads.`);
}
