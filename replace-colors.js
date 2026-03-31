const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'components');
const files = ['HeroSection.tsx', 'WhySection.tsx', 'TeamPreview.tsx', 'EventsPreview.tsx', 'CultureSection.tsx', 'JoinCTA.tsx', 'Header.tsx', 'Footer.tsx'];

const dict = {
  '#0E0E12': '#050505',
  'rgba(14,14,18,0.82)': 'rgba(5,5,5,0.82)',
  'rgba(14,14,18,0.88)': 'rgba(5,5,5,0.88)',
  'rgba(14,14,18,0.85)': 'rgba(5,5,5,0.85)',
  '#F0EDE8': '#ededed',
  '#A8FF47': '#00F2FF',
  '#BFFF6E': '#33F5FF',
  '#16161C': '#0A0A0A',
  '#1A1A22': '#111111',
  '#1C1C24': '#111111',
  '#1C1C26': '#111111',
  '#1E1E28': '#111111',
  '240,237,232': '255,255,255',
  '168,255,71': '0,242,255',
  '#E8D5B0': '#FF8C00',
  '232,213,176': '255,140,0'
};

files.forEach(f => {
  const fp = path.join(dir, f);
  if (fs.existsSync(fp)) {
    let content = fs.readFileSync(fp, 'utf8');
    for (const [k, v] of Object.entries(dict)) {
      content = content.split(k).join(v);
    }
    fs.writeFileSync(fp, content);
  }
});

const filesToFix = ['app/page.tsx', 'app/globals.css', 'app/layout.tsx'];
filesToFix.forEach(f => {
  const fp = path.join(__dirname, f);
  if (fs.existsSync(fp)) {
    let content = fs.readFileSync(fp, 'utf8');
    for (const [k, v] of Object.entries(dict)) {
      content = content.split(k).join(v);
    }
    fs.writeFileSync(fp, content);
  }
});
