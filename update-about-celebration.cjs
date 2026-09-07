const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function createBrochureAboutImage() {
  const logoPath = path.join(__dirname, 'assets', 'logo', 'spark-joy-logo.png');
  let logoBase64 = '';
  if (fs.existsSync(logoPath)) {
    const logoBuffer = fs.readFileSync(logoPath);
    logoBase64 = `data:image/png;base64,${logoBuffer.toString('base64')}`;
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF0F5"/>
        <stop offset="50%" stop-color="#FCE4EC"/>
        <stop offset="100%" stop-color="#F8BBD0"/>
      </linearGradient>

      <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="100%" stop-color="#FFF8FA"/>
      </linearGradient>

      <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#E92D72" flood-opacity="0.15"/>
      </filter>

      <filter id="brightShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#D81B60" flood-opacity="0.2"/>
      </filter>
    </defs>

    <!-- Background -->
    <rect width="1200" height="800" fill="url(#bgGrad)"/>

    <!-- Decorative Stars & Sparkles -->
    <g fill="#FFB74D" opacity="0.8">
      <path d="M 80 80 L 88 100 L 108 108 L 88 116 L 80 136 L 72 116 L 52 108 L 72 100 Z"/>
      <path d="M 1120 120 L 1126 135 L 1141 141 L 1126 147 L 1120 162 L 1114 147 L 1099 141 L 1114 135 Z"/>
      <path d="M 150 700 L 156 712 L 168 718 L 156 724 L 150 736 L 144 724 L 132 718 L 144 712 Z"/>
      <path d="M 1050 680 L 1058 698 L 1076 706 L 1058 714 L 1050 732 L 1042 714 L 1024 706 L 1042 698 Z"/>
    </g>

    <g fill="#E92D72" opacity="0.5">
      <circle cx="200" cy="140" r="8"/>
      <circle cx="1000" cy="180" r="10"/>
      <circle cx="110" cy="520" r="7"/>
      <circle cx="1120" cy="540" r="9"/>
    </g>

    <!-- Main Brochure Frame Panel -->
    <rect x="60" y="50" width="1080" height="700" rx="30" fill="url(#cardGrad)" stroke="#F48FB1" stroke-width="4" filter="url(#softShadow)"/>

    <!-- Top Center Balloon Cluster & Header -->
    <g transform="translate(600, 110)">
      <!-- Balloons -->
      <path d="M -30 -30 Q -60 -70 -20 -100 Q 20 -70 -30 -30 Z" fill="#FF80AB"/>
      <circle cx="-30" cy="-65" r="35" fill="#FF4081"/>
      <circle cx="30" cy="-65" r="35" fill="#EC407A"/>
      <circle cx="0" cy="-45" r="38" fill="#E92D72"/>
      <polygon points="0,-7 6,-1 6,-13" fill="#D81B60"/>
    </g>

    <!-- Logo / Brand Header -->
    <text x="600" y="220" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="44" fill="#111B3A" text-anchor="middle" letter-spacing="4">SPARK JOY</text>
    <text x="600" y="260" font-family="'Segoe UI', Roboto, sans-serif" font-weight="800" font-size="32" fill="#E92D72" text-anchor="middle" letter-spacing="6">— EVENT —</text>
    <text x="600" y="295" font-family="'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="22" fill="#111B3A" text-anchor="middle" letter-spacing="8">MANAGEMENT</text>
    
    <text x="600" y="340" font-family="'Georgia', 'Brush Script MT', cursive" font-style="italic" font-size="32" fill="#D81B60" text-anchor="middle">"Creating Joy, One Event at a Time!" ✨</text>

    <line x1="400" y1="365" x2="800" y2="365" stroke="#F48FB1" stroke-width="3" stroke-dasharray="8 6"/>

    <!-- 3 Columns / Cards of Content from Brochure -->

    <!-- Left Column: Toys & Thank You Badge -->
    <g transform="translate(100, 395)">
      <rect width="300" height="320" rx="20" fill="#FFF0F5" stroke="#F8BBD0" stroke-width="2"/>
      
      <!-- Thank You Circle Badge -->
      <circle cx="150" cy="80" r="55" fill="#E92D72" filter="url(#brightShadow)"/>
      <circle cx="150" cy="80" r="48" fill="none" stroke="#FFFFFF" stroke-width="2" stroke-dasharray="4 3"/>
      <text x="150" y="70" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="15" fill="#FFFFFF" text-anchor="middle">THANK YOU</text>
      <text x="150" y="90" font-family="'Segoe UI', sans-serif" font-size="12" fill="#FFFFFF" text-anchor="middle">for being a part of</text>
      <text x="150" y="106" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="13" fill="#FFFFFF" text-anchor="middle">our joy! ❤️</text>

      <!-- Toys Illustrations (Teddy bear, Pencils, Paint palette, Star) -->
      <text x="70" y="210" font-size="60">🧸</text>
      <text x="150" y="210" font-size="55">🎨</text>
      <text x="220" y="210" font-size="55">✏️</text>
      
      <text x="150" y="270" font-family="'Segoe UI', sans-serif" font-weight="600" font-size="16" fill="#111B3A" text-anchor="middle">Custom Goodie Bags &amp; Favors</text>
      <text x="150" y="295" font-family="'Segoe UI', sans-serif" font-size="13" fill="#880E4F" text-anchor="middle">Personalized for Every Celebration</text>
    </g>

    <!-- Middle Column: What We Do Services Badge -->
    <g transform="translate(450, 395)">
      <rect width="300" height="320" rx="20" fill="#FCE4EC" stroke="#F48FB1" stroke-width="2"/>

      <!-- Ribbon Header -->
      <path d="M 40 20 L 260 20 L 250 50 L 260 80 L 40 80 L 50 50 Z" fill="#E92D72"/>
      <text x="150" y="55" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="20" fill="#FFFFFF" text-anchor="middle">WHAT WE DO</text>

      <!-- Grid of Service Icons -->
      <text x="80" y="140" font-size="38">🍪</text>
      <text x="70" y="170" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#AD1457" text-anchor="middle">Cookie Decor</text>

      <text x="220" y="140" font-size="38">🧪</text>
      <text x="230" y="170" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#AD1457" text-anchor="middle">Slime Making</text>

      <text x="80" y="230" font-size="38">🪅</text>
      <text x="70" y="260" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#AD1457" text-anchor="middle">Custom Piñatas</text>

      <text x="220" y="230" font-size="38">🎭</text>
      <text x="230" y="260" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="12" fill="#AD1457" text-anchor="middle">Kids Workshops</text>

      <text x="150" y="298" font-family="'Segoe UI', sans-serif" font-weight="600" font-size="13" fill="#880E4F" text-anchor="middle">Engaging Activities for All Ages</text>
    </g>

    <!-- Right Column: Unicorn Piñata & Spreading Joy Banner -->
    <g transform="translate(800, 395)">
      <rect width="300" height="320" rx="20" fill="#FFF0F5" stroke="#F8BBD0" stroke-width="2"/>

      <text x="150" y="50" font-family="'Georgia', cursive" font-style="italic" font-weight="bold" font-size="20" fill="#D81B60" text-anchor="middle">Spreading Joy</text>
      <text x="150" y="75" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="15" fill="#111B3A" text-anchor="middle">Through Every Celebration!</text>

      <!-- Unicorn & Balloon Graphic -->
      <text x="150" y="180" font-size="80" text-anchor="middle">🦄</text>
      <text x="80" y="140" font-size="30">🎈</text>
      <text x="220" y="140" font-size="30">🎁</text>

      <text x="150" y="250" font-family="'Segoe UI', sans-serif" font-weight="bold" font-size="15" fill="#E92D72" text-anchor="middle">Why Choose Us?</text>
      <text x="150" y="275" font-family="'Segoe UI', sans-serif" font-size="12" fill="#880E4F" text-anchor="middle">✨ Fun &amp; Creative Activities</text>
      <text x="150" y="295" font-family="'Segoe UI', sans-serif" font-size="12" fill="#880E4F" text-anchor="middle">💖 Made with Love &amp; Attention</text>
    </g>
  </svg>`;

  const targetJpg1 = path.join(__dirname, 'assets', 'gallery', 'birthday', 'about-celebration.jpg');
  const targetJpg2 = path.join(__dirname, 'public', 'assets', 'gallery', 'birthday', 'about-celebration.jpg');

  fs.mkdirSync(path.dirname(targetJpg1), { recursive: true });
  fs.mkdirSync(path.dirname(targetJpg2), { recursive: true });

  await sharp(Buffer.from(svg))
    .jpeg({ quality: 95 })
    .toFile(targetJpg1);

  fs.copyFileSync(targetJpg1, targetJpg2);

  console.log('Successfully updated about-celebration.jpg with Spark Joy brochure design!');
}

createBrochureAboutImage().catch(err => {
  console.error('Error updating brochure image:', err);
  process.exit(1);
});
