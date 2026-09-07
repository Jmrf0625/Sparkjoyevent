const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const pinatas = [
  {
    filename: 'pinata.jpeg',
    title: 'Squishmallow Axolotl Piñata',
    bg1: '#FFF0F5',
    bg2: '#FFE4E1',
    primary: '#FF8C00',
    accent: '#FF69B4',
    text: 'SUSAN 8',
    sub: 'Custom Axolotl Squishmallow',
    badge: 'CUSTOM PIÑATA'
  },
  {
    filename: '22.jpeg',
    title: 'Frozen Fairytale Piñata',
    bg1: '#E6E6FA',
    bg2: '#D8BFD8',
    primary: '#8A2BE2',
    accent: '#00BFFF',
    text: 'FROZEN',
    sub: 'Elsa, Anna &amp; Olaf Round Piñata',
    badge: 'FAIRYTALE THEME'
  },
  {
    filename: '33.jpeg',
    title: 'Minecraft Creeper Piñata',
    bg1: '#E8F5E9',
    bg2: '#C8E6C9',
    primary: '#2E7D32',
    accent: '#1B5E20',
    text: 'MINECRAFT',
    sub: '3D Fringed Creeper Block',
    badge: '3D CHARACTER'
  },
  {
    filename: '44.jpeg',
    title: 'Stitch &amp; Angel Piñata',
    bg1: '#E0F7FA',
    bg2: '#B2EBF2',
    primary: '#0288D1',
    accent: '#EC407A',
    text: 'STITCH &amp; ANGEL',
    sub: 'Floral Crepe Fringe Round Piñata',
    badge: 'HANDCRAFTED'
  },
  {
    filename: '55.jpeg',
    title: 'Bluey 3D Character Piñata',
    bg1: '#E3F2FD',
    bg2: '#BBDEFB',
    primary: '#1565C0',
    accent: '#1976D2',
    text: 'BLUEY',
    sub: 'Full Standing 3D Character',
    badge: 'PARTY FAVORITE'
  },
  {
    filename: '66.jpeg',
    title: 'Olaf Snowman Piñata',
    bg1: '#F5F5F5',
    bg2: '#E0E0E0',
    primary: '#0097A7',
    accent: '#FF9800',
    text: 'OLAF',
    sub: 'Frozen Snowman 3D Piñata',
    badge: 'CUSTOM SHAPE'
  },
  {
    filename: '77.jpeg',
    title: 'Superman Shield Piñata',
    bg1: '#FFEBEE',
    bg2: '#FFCDD2',
    primary: '#D32F2F',
    accent: '#FBC02D',
    text: 'SUPERMAN',
    sub: 'Diamond Emblem Shield Piñata',
    badge: 'SUPERHERO'
  },
  {
    filename: '88.jpeg',
    title: 'Yara Mermaid Piñata',
    bg1: '#F3E5F5',
    bg2: '#E1BEE7',
    primary: '#7B1FA2',
    accent: '#00ACC1',
    text: 'YARA',
    sub: 'Layered Purple &amp; Teal Mermaid',
    badge: 'Bespoke Order'
  }
];

async function generate() {
  const dirs = [
    path.join(__dirname, 'assets', 'gallery'),
    path.join(__dirname, 'public', 'assets', 'gallery')
  ];

  dirs.forEach(d => fs.mkdirSync(d, { recursive: true }));

  for (const item of pinatas) {
    const svg = `<svg width="1200" height="1600" viewBox="0 0 1200 1600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${item.bg1}"/>
          <stop offset="100%" stop-color="${item.bg2}"/>
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="16" stdDeviation="24" flood-color="#000000" flood-opacity="0.12"/>
        </filter>
        <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF"/>
          <stop offset="100%" stop-color="#FAFAFA"/>
        </linearGradient>
      </defs>

      <!-- Background Wall Studio Photo Environment -->
      <rect width="1200" height="1600" fill="url(#bg)"/>
      <rect x="0" y="1200" width="1200" height="400" fill="#EAEAEA" opacity="0.6"/>

      <!-- Main Photo Frame -->
      <rect x="80" y="120" width="1040" height="1360" rx="36" fill="url(#cardGrad)" filter="url(#shadow)"/>
      <rect x="110" y="150" width="980" height="1060" rx="24" fill="${item.bg1}"/>

      <!-- Studio Subject Graphic / Photo Placeholder Frame -->
      <circle cx="600" cy="650" r="380" fill="${item.primary}" opacity="0.15"/>
      <circle cx="600" cy="650" r="320" fill="white" opacity="0.8"/>
      
      <!-- Display Title Inside Subject Frame -->
      <text x="600" y="610" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="72" fill="${item.primary}" text-anchor="middle" letter-spacing="2">${item.text}</text>
      <text x="600" y="690" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="36" fill="#4A5568" text-anchor="middle">${item.title}</text>
      <text x="600" y="740" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="28" fill="#718096" text-anchor="middle">${item.sub}</text>

      <!-- Badge Overlay -->
      <rect x="160" y="200" width="280" height="60" rx="30" fill="${item.primary}"/>
      <text x="300" y="238" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="22" fill="white" text-anchor="middle" letter-spacing="1">${item.badge}</text>

      <!-- Photo Footer Info -->
      <rect x="110" y="1240" width="980" height="230" rx="20" fill="#FFFFFF"/>
      <text x="160" y="1310" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="44" fill="#1A202C">${item.title}</text>
      <text x="160" y="1360" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="28" fill="${item.primary}">Spark Joy Handcrafted Piñatas • Qatar</text>
      <text x="160" y="1410" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="24" fill="#718096">${item.sub}</text>
    </svg>`;

    for (const dir of dirs) {
      const target = path.join(dir, item.filename);
      await sharp(Buffer.from(svg))
        .jpeg({ quality: 95 })
        .toFile(target);
      console.log(`Saved ${target}`);
    }
  }
}

generate().then(() => console.log('All 8 piñata photo JPEGs created successfully!'));
