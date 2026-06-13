const fs = require('fs');
let content = fs.readFileSync('f:/WEBSITE/series update/admin.html', 'utf8');
const adRegex = /<div style=\"display: flex; justify-content: center; margin: 20px 0; width: 100%; overflow: hidden;\"(?: class=\"banner-ad\")?>[\s\S]*?<\/div>/g;
content = content.replace(adRegex, '');
fs.writeFileSync('f:/WEBSITE/series update/admin.html', content);
console.log('Ads removed from admin.html');
