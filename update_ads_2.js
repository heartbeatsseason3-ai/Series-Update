const fs = require('fs');
const filesToUpdate = ['admin.html', 'login.html'];
const adHtml = `
<div style="display: flex; justify-content: center; margin: 20px 0; width: 100%; overflow: hidden;">
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
</div>
`;

for (const file of filesToUpdate) {
    const path = 'f:/WEBSITE/series update/' + file;
    if (fs.existsSync(path)) {
        let content = fs.readFileSync(path, 'utf8');
        content = content.replace(/<body[^>]*>/, match => match + adHtml);
        fs.writeFileSync(path, content);
        console.log('Added to ' + file);
    }
}
