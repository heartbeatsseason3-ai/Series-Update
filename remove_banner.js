const fs = require('fs');

const path = 'f:/WEBSITE/series update/index.html';
let content = fs.readFileSync(path, 'utf8');

// Find the <style> tag specifically for App Download Banner
const styleStartStr = '<style>\\n        /* App Download Banner */';
const styleStart = content.indexOf('<style>\r\n        /* App Download Banner */') !== -1 
    ? content.indexOf('<style>\r\n        /* App Download Banner */')
    : content.indexOf('<style>\n        /* App Download Banner */');

if (styleStart !== -1) {
    const bannerStart = content.indexOf('<div class="app-download-banner">', styleStart);
    if (bannerStart !== -1) {
        let aTagEnd = content.indexOf('</a>', bannerStart);
        let divEnd = content.indexOf('</div>', aTagEnd) + 6;
        
        let toRemove = content.substring(styleStart, divEnd);
        content = content.replace(toRemove, '');
        fs.writeFileSync(path, content);
        console.log('Successfully removed the App Download banner and its styles from index.html');
    } else {
        console.log('Could not find the banner div.');
    }
} else {
    // maybe there's no style block, just the div
    const bannerStart = content.indexOf('<div class="app-download-banner">');
    if (bannerStart !== -1) {
        let aTagEnd = content.indexOf('</a>', bannerStart);
        let divEnd = content.indexOf('</div>', aTagEnd) + 6;
        let toRemove = content.substring(bannerStart, divEnd);
        content = content.replace(toRemove, '');
        fs.writeFileSync(path, content);
        console.log('Successfully removed the App Download banner from index.html');
    } else {
        console.log('Banner not found at all.');
    }
}
