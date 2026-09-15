const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
const now = Date.now();

for (const file of files) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/src=["']supabase-config\.js(\?v=\d+)?["']/g, `src="supabase-config.js?v=${now}"`);
    fs.writeFileSync(filePath, content, 'utf8');
}

console.log(`Updated supabase-config.js version strings to ${now} across ${files.length} HTML files.`);
