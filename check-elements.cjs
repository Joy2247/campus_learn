const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

console.log('=== DETAILED AUDIT OF ALL LINKS (<a>) ===');
const linkRegex = /<a\s+([^>]*)>([\s\S]*?)<\/a>/gi;
let m;
let count = 0;
while ((m = linkRegex.exec(html)) !== null) {
  count++;
  const attrs = m[1];
  const text = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const href = (attrs.match(/href="([^"]*)"/i) || [])[1] || '';
  const onclick = (attrs.match(/onclick="([^"]*)"/i) || [])[1] || '';
  const target = (attrs.match(/target="([^"]*)"/i) || [])[1] || '';
  const id = (attrs.match(/id="([^"]*)"/i) || [])[1] || '';
  let anchorExists = '';
  if (href.startsWith('#')) {
    const anchorId = href.slice(1);
    const hasAnchor = html.includes(`id="${anchorId}"`) || html.includes(`name="${anchorId}"`);
    anchorExists = hasAnchor ? ' (VALID ANCHOR)' : ' (ANCHOR MISSING!)';
  }
  console.log(`${count}. TEXT: "${text}" | HREF: "${href}"${anchorExists} | ONCLICK: "${onclick}" | TARGET: "${target}" | ID: "${id}"`);
}

console.log('\n=== ALL IDS IN INDEX.HTML ===');
const allIds = [...html.matchAll(/id="([^"]+)"/gi)].map(m => m[1]);
console.log(allIds.join(', '));
