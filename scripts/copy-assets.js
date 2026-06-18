#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function copy(src, dest) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
  console.log(`  ${src} → ${dest}`);
}

console.log('Copying assets from node_modules...');

// jQuery
copy('node_modules/jquery/dist/jquery.min.js', 'assets/js/jquery.min.js');

// jQuery plugins
copy('node_modules/jquery.scrollex/jquery.scrollex.min.js', 'assets/js/jquery.scrollex.min.js');
copy('node_modules/jquery.scrolly/jquery.scrolly.js', 'assets/js/jquery.scrolly.min.js');

// Font Awesome CSS
copy('node_modules/@fortawesome/fontawesome-free/css/all.min.css', 'assets/css/fontawesome-all.min.css');

// Font Awesome webfonts — remove legacy FA5 formats, keep only woff2
const destWebfonts = 'assets/webfonts';
if (fs.existsSync(destWebfonts)) {
  for (const file of fs.readdirSync(destWebfonts)) {
    if (!file.endsWith('.woff2')) fs.rmSync(path.join(destWebfonts, file));
  }
}
const webfontsDir = 'node_modules/@fortawesome/fontawesome-free/webfonts';
for (const file of fs.readdirSync(webfontsDir)) {
  copy(path.join(webfontsDir, file), path.join(destWebfonts, file));
}

console.log('Done.');
