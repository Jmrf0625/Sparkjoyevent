const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function createHeroDecor() {
  const logoPath = path.join(__dirname, 'assets', 'logo', 'spark-joy-logo.png');
  
  // Convert logo PNG to base64
  const logoBuffer = fs.readFileSync(logoPath);
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;

  // SVG with Balloon Arch (Photo 1) + Spark Joy Logo in Center Box (Photo 2)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
    <defs>
      <linearGradient id="heroBg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF0F5" />
        <stop offset="100%" stop-color="#FCE4EC" />
      </linearGradient>
      <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#E92D72" flood-opacity="0.18"/>
      </filter>
    </defs>

    <!-- Pink Background -->
    <rect width="1200" height="800" fill="url(#heroBg)"/>

    <!-- Top Balloon Garland Arch (Photo 1 design) -->
    <g opacity="0.95">
      <circle cx="150" cy="200" r="120" fill="#E92D72"/>
      <circle cx="310" cy="130" r="130" fill="#F8C7DC"/>
      <circle cx="490" cy="90" r="135" fill="#FFD166"/>
      <circle cx="670" cy="80" r="140" fill="#E92D72"/>
      <circle cx="850" cy="110" r="130" fill="#8338EC"/>
      <circle cx="1010" cy="180" r="120" fill="#06D6A0"/>
      <circle cx="1130" cy="290" r="100" fill="#FF9F1C"/>
    </g>

    <!-- Sparkles -->
    <!-- Left Star Sparkle -->
    <path d="M 150 420 L 162 450 L 192 462 L 162 474 L 150 504 L 138 474 L 108 462 L 138 450 Z" fill="#FFD166"/>
    <!-- Right Star Sparkle -->
    <path d="M 1050 490 L 1062 520 L 1092 532 L 1062 544 L 1050 574 L 1038 544 L 1008 532 L 1038 520 Z" fill="#8338EC"/>

    <!-- Center White Stage Box (Photo 2 box) -->
    <rect x="200" y="460" width="800" height="260" rx="28" fill="#FFFFFF" stroke="#111B3A" stroke-width="6" filter="url(#shadow)"/>

    <!-- Spark Joy Logo inside White Box -->
    <image href="${logoBase64}" x="250" y="480" width="700" height="220" preserveAspectRatio="xMidYMid meet"/>
  </svg>`;

  // Targets
  const targetJpg1 = path.join(__dirname, 'assets', 'gallery', 'decorations', 'hero-decor.jpg');
  const targetJpg2 = path.join(__dirname, 'public', 'assets', 'gallery', 'decorations', 'hero-decor.jpg');
  const targetSvg1 = path.join(__dirname, 'assets', 'gallery', 'hero-decor.svg');
  const targetSvg2 = path.join(__dirname, 'public', 'assets', 'gallery', 'hero-decor.svg');

  // Ensure directories
  fs.mkdirSync(path.dirname(targetJpg1), { recursive: true });
  fs.mkdirSync(path.dirname(targetJpg2), { recursive: true });
  fs.mkdirSync(path.dirname(targetSvg1), { recursive: true });
  fs.mkdirSync(path.dirname(targetSvg2), { recursive: true });

  // Save SVG
  fs.writeFileSync(targetSvg1, svg);
  fs.writeFileSync(targetSvg2, svg);

  // Convert SVG to high quality JPEG
  await sharp(Buffer.from(svg))
    .jpeg({ quality: 95 })
    .toFile(targetJpg1);

  fs.copyFileSync(targetJpg1, targetJpg2);

  console.log('Successfully updated hero decor image with Balloon Arch + Spark Joy logo!');
}

createHeroDecor().catch(err => {
  console.error('Error generating hero decor image:', err);
  process.exit(1);
});
