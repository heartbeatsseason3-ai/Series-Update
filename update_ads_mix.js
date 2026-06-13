const fs = require('fs');
const glob = require('fs').readdirSync;

const files = glob('f:/WEBSITE/series update').filter(f => f.endsWith('.html'));
const key1 = '41381acd9cf7f2701d35aa2372c93a8f';
const key2 = 'b695c55c7854dd20a9652ca53aa5c647';

for (let file of files) {
    const path = 'f:/WEBSITE/series update/' + file;
    let content = fs.readFileSync(path, 'utf8');
    
    let matchCount = 0;
    // Replace all instances of key2 (which currently populate everything)
    content = content.replace(new RegExp(key2, 'g'), (match) => {
        // Every ad block has 2 keys.
        // Block 0: matches 0, 1 -> keep key2
        // Block 1: matches 2, 3 -> use key1
        // Block 2: matches 4, 5 -> keep key2
        // Block 3: matches 6, 7 -> use key1
        const blockIndex = Math.floor(matchCount / 2);
        matchCount++;
        
        if (blockIndex % 2 === 0) {
            return key2; // Ad 2
        } else {
            return key1; // Ad 1
        }
    });
    
    fs.writeFileSync(path, content);
    console.log(`Mixed ads in ${file} (${matchCount / 2} ad blocks total)`);
}
