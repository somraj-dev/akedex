const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'out');

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace absolute leading slash references for Next.js assets
  content = content.replace(/(href|src|content)="\/(?!_next\/static\/image\/)/g, '$1="./');
  // Replace absolute _next paths inside chunks/bundles
  content = content.replace(/\/_next\//g, './_next/');

  fs.writeFileSync(filePath, content, 'utf8');
}

function traverse(dir) {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.lstatSync(fullPath).isDirectory()) {
      traverse(fullPath);
    } else if (file.endsWith('.html') || file.endsWith('.js') || file.endsWith('.css')) {
      processFile(fullPath);
    }
  });
}

console.log('📦 Running post-export path relative-patcher for Electron compatibility...');
traverse(outDir);
console.log('✅ Path patch completed successfully!');
