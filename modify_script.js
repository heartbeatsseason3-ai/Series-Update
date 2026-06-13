const fs = require('fs');
let content = fs.readFileSync('f:/WEBSITE/series update/script.js', 'utf8');

const r1 = `                    const rows = document.querySelectorAll('.episode-row');
                    rows.forEach(row => {
                        const title = row.querySelector('.ep-title-input').value;
                        const link = row.querySelector('.ep-link-input').value;
                        const downloadLink = row.querySelector('.ep-download-input').value;
                        const embedCode = row.querySelector('.ep-embed-input').value;
                        if (title && (link || embedCode)) episodes.push({ title, link, downloadLink, embedCode });
                    });`;
const d1 = `                    const rows = document.querySelectorAll('.episode-row');
                    rows.forEach(row => {
                        const title = row.querySelector('.ep-title-input').value;
                        const link = row.querySelector('.ep-link-input').value;
                        const link2 = row.querySelector('.ep-link2-input') ? row.querySelector('.ep-link2-input').value : '';
                        const link3 = row.querySelector('.ep-link3-input') ? row.querySelector('.ep-link3-input').value : '';
                        const downloadLink = row.querySelector('.ep-download-input').value;
                        const embedCode = row.querySelector('.ep-embed-input').value;
                        const embedCode2 = row.querySelector('.ep-embed2-input') ? row.querySelector('.ep-embed2-input').value : '';
                        const embedCode3 = row.querySelector('.ep-embed3-input') ? row.querySelector('.ep-embed3-input').value : '';
                        if (title && (link || embedCode)) {
                            episodes.push({ title, link, link2, link3, downloadLink, embedCode, embedCode2, embedCode3 });
                        }
                    });`;
content = content.replace(r1, d1);

const r2 = `                    quality: document.getElementById('quality') ? document.getElementById('quality').value : '4K Ultra HD',
                    videoLink: document.getElementById('videoLink').value,
                    downloadLink: document.getElementById('downloadLink').value,
                    embedCode: document.getElementById('embedCode').value || '',
                    episodes: episodes`;
const d2 = `                    quality: document.getElementById('quality') ? document.getElementById('quality').value : '4K Ultra HD',
                    videoLink: document.getElementById('videoLink').value,
                    downloadLink: document.getElementById('downloadLink').value,
                    embedCode: document.getElementById('embedCode').value || '',
                    embedCode2: document.getElementById('embedCode2') ? document.getElementById('embedCode2').value : '',
                    embedCode3: document.getElementById('embedCode3') ? document.getElementById('embedCode3').value : '',
                    episodes: episodes`;
content = content.replace(r2, d2);

const r3 = `            quality: newItem.quality,
            video_link: newItem.videoLink,
            download_link: newItem.downloadLink,
            embed_code: newItem.embedCode,
            episodes: newItem.episodes`;
const d3 = `            quality: newItem.quality,
            video_link: newItem.videoLink,
            download_link: newItem.downloadLink,
            embed_code: newItem.embedCode,
            embed_code2: newItem.embedCode2,
            embed_code3: newItem.embedCode3,
            episodes: newItem.episodes`;
content = content.replace(r3, d3);

const r4 = `        document.getElementById('videoLink').value = item.videoLink || '';
        document.getElementById('downloadLink').value = item.downloadLink || '';
        document.getElementById('embedCode').value = item.embedCode || '';

        // Handle Episodes`;
const d4 = `        document.getElementById('videoLink').value = item.videoLink || '';
        document.getElementById('downloadLink').value = item.downloadLink || '';
        document.getElementById('embedCode').value = item.embedCode || '';
        if (document.getElementById('embedCode2')) document.getElementById('embedCode2').value = item.embed_code2 || '';
        if (document.getElementById('embedCode3')) document.getElementById('embedCode3').value = item.embed_code3 || '';

        // Handle Episodes`;
content = content.replace(r4, d4);

const r5 = `    addEpisodeRow(data = { title: '', link: '', downloadLink: '', embedCode: '' }) {
        const container = document.getElementById('episodes-container');
        const row = document.createElement('div');
        row.className = 'episode-row';
        row.style.display = 'block';
        row.style.background = 'rgba(255,255,255,0.03)';
        row.style.padding = '1rem';
        row.style.borderRadius = '8px';
        row.style.border = '1px solid rgba(255,255,255,0.1)';
        row.style.marginBottom = '1rem';
        
        row.innerHTML = \`
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
                <input type="text" placeholder="Ep Title (e.g. S1 E1)" value="\${data.title || ''}" class="ep-title-input" required style="flex: 1; margin: 0; margin-right: 1rem;">
                <button type="button" class="btn btn-secondary btn-small" onclick="this.closest('.episode-row').remove()" style="padding: 0.4rem 0.8rem; background: #e57373; color: white; border: none; min-width: auto; height: auto;">Remove</button>
            </div>
            <input type="url" placeholder="Watch Now Link (Stream URL)" value="\${data.link || ''}" class="ep-link-input" style="margin-bottom: 0.8rem; width: 100%;">
            <input type="url" placeholder="Download Link (Optional)" value="\${data.downloadLink || ''}" class="ep-download-input" style="margin-bottom: 0.8rem; width: 100%;">
            <textarea placeholder="Embed Code or Video Link (e.g. YouTube, MP4, <iframe>)" class="ep-embed-input" rows="2" style="margin-bottom: 0; width: 100%; border-radius: 8px; padding: 0.8rem; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255, 255, 255, 0.2); font-family: monospace;">\${data.embedCode || ''}</textarea>
        \`;
        container.appendChild(row);
    }`;
const d5 = `    addEpisodeRow(data = { title: '', link: '', downloadLink: '', embedCode: '', embedCode2: '', embedCode3: '', link2: '', link3: '' }) {
        const container = document.getElementById('episodes-container');
        const row = document.createElement('div');
        row.className = 'episode-row';
        row.style.display = 'block';
        row.style.background = 'rgba(255,255,255,0.03)';
        row.style.padding = '1rem';
        row.style.borderRadius = '8px';
        row.style.border = '1px solid rgba(255,255,255,0.1)';
        row.style.marginBottom = '1rem';
        
        row.innerHTML = \`
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
                <input type="text" placeholder="Ep Title (e.g. S1 E1)" value="\${data.title || ''}" class="ep-title-input" required style="flex: 1; margin: 0; margin-right: 1rem;">
                <button type="button" class="btn btn-secondary btn-small" onclick="this.closest('.episode-row').remove()" style="padding: 0.4rem 0.8rem; background: #e57373; color: white; border: none; min-width: auto; height: auto;">Remove</button>
            </div>
            
            <label style="font-size:0.8rem; color:#aaa;">Server 1 (Default)</label>
            <input type="url" placeholder="Watch Now Link (Stream URL)" value="\${data.link || ''}" class="ep-link-input" style="margin-bottom: 0.4rem; width: 100%;">
            <textarea placeholder="Embed Code or Video Link (Server 1)" class="ep-embed-input" rows="2" style="margin-bottom: 0.8rem; width: 100%; border-radius: 8px; padding: 0.8rem; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255, 255, 255, 0.2); font-family: monospace;">\${data.embedCode || ''}</textarea>
            
            <label style="font-size:0.8rem; color:#aaa;">Server 2 (Optional)</label>
            <input type="url" placeholder="Server 2 Link" value="\${data.link2 || ''}" class="ep-link2-input" style="margin-bottom: 0.4rem; width: 100%;">
            <textarea placeholder="Server 2 Embed Code" class="ep-embed2-input" rows="2" style="margin-bottom: 0.8rem; width: 100%; border-radius: 8px; padding: 0.8rem; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255, 255, 255, 0.2); font-family: monospace;">\${data.embedCode2 || ''}</textarea>

            <label style="font-size:0.8rem; color:#aaa;">Server 3 (Optional)</label>
            <input type="url" placeholder="Server 3 Link" value="\${data.link3 || ''}" class="ep-link3-input" style="margin-bottom: 0.4rem; width: 100%;">
            <textarea placeholder="Server 3 Embed Code" class="ep-embed3-input" rows="2" style="margin-bottom: 0.8rem; width: 100%; border-radius: 8px; padding: 0.8rem; background: rgba(255,255,255,0.05); color: #fff; border: 1px solid rgba(255, 255, 255, 0.2); font-family: monospace;">\${data.embedCode3 || ''}</textarea>

            <label style="font-size:0.8rem; color:#aaa;">Download</label>
            <input type="url" placeholder="Download Link (Optional)" value="\${data.downloadLink || ''}" class="ep-download-input" style="margin-bottom: 0.8rem; width: 100%;">
        \`;
        container.appendChild(row);
    }`;
content = content.replace(r5, d5);

fs.writeFileSync('f:/WEBSITE/series update/script.js', content);
console.log('Script updated!');
