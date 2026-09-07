import sharp from 'sharp';
import fs from 'fs';

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="1000" height="1000">
  <defs>
    <!-- Soft watercolor pink radial background -->
    <radialGradient id="watercolorBg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" stop-color="#FFF3F8" />
      <stop offset="60%" stop-color="#FCE7F0" />
      <stop offset="100%" stop-color="#F9D2E2" />
    </radialGradient>

    <!-- Hot pink gradient for bow and accents -->
    <linearGradient id="hotPinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF3B81" />
      <stop offset="100%" stop-color="#E91E63" />
    </linearGradient>

    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#E91E63" flood-opacity="0.12"/>
    </filter>
  </defs>

  <!-- Background Canvas -->
  <rect width="1000" height="1000" fill="url(#watercolorBg)"/>

  <!-- Scattered Colorful Stars & Dots in background -->
  <!-- Yellow / Gold Stars -->
  <path d="M 140 135 L 145 152 L 162 155 L 149 167 L 153 184 L 140 174 L 127 184 L 131 167 L 118 155 L 135 152 Z" fill="#FFC107"/>
  <path d="M 910 105 L 915 120 L 930 122 L 919 133 L 922 148 L 910 139 L 898 148 L 901 133 L 890 122 L 905 120 Z" fill="#FFB300"/>
  <path d="M 870 380 L 873 392 L 885 394 L 876 403 L 878 415 L 870 408 L 862 415 L 864 403 L 855 394 L 867 392 Z" fill="#FFC107" opacity="0.8"/>

  <!-- Pink Stars -->
  <path d="M 85 305 L 90 322 L 107 325 L 94 337 L 98 354 L 85 344 L 72 354 L 76 337 L 63 325 L 80 322 Z" fill="#FF4081"/>
  <path d="M 940 330 L 943 342 L 955 344 L 946 353 L 948 365 L 940 358 L 932 365 L 934 353 L 925 344 L 937 342 Z" fill="#E91E63" opacity="0.85"/>

  <!-- Blue Stars & Dots -->
  <path d="M 980 220 L 983 232 L 995 234 L 986 243 L 988 255 L 980 248 L 972 255 L 974 243 L 965 234 L 977 232 Z" fill="#29B6F6"/>
  <circle cx="210" cy="350" r="10" fill="#7E57C2" opacity="0.8"/>

  <!-- Purple Stars & Dots -->
  <path d="M 935 340 L 938 348 L 947 349 L 940 355 L 942 364 L 935 359 L 928 364 L 930 355 L 923 349 L 932 348 Z" fill="#AB47BC"/>
  <circle cx="225" cy="78" r="8" fill="#EC407A" opacity="0.7"/>

  <!-- CENTER BALLOON BOUQUET GRAPHIC -->
  <g transform="translate(500, 280)" filter="url(#softGlow)">
    
    <!-- Balloon Strings (Black Line Art) -->
    <path d="M -22 18 Q -10 130 0 190" stroke="#0F172A" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M 0 35 Q 0 120 0 190" stroke="#0F172A" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M 22 18 Q 10 130 0 190" stroke="#0F172A" stroke-width="8" fill="none" stroke-linecap="round"/>

    <!-- Left Balloon: Solid Pastel Pink with Black Outline -->
    <g transform="translate(-85, -10)">
      <ellipse cx="0" cy="0" rx="90" ry="108" fill="#F8A3C4" stroke="#0F172A" stroke-width="9"/>
      <!-- Soft highlight arc -->
      <path d="M -50 -50 A 65 80 0 0 1 -10 -80" stroke="#FFFFFF" stroke-width="10" fill="none" stroke-linecap="round" opacity="0.7"/>
    </g>

    <!-- Right Balloon: Pink with White Diagonal Stripes -->
    <g transform="translate(85, -10)">
      <mask id="rightBalloonMask">
        <ellipse cx="0" cy="0" rx="90" ry="108" fill="#FFFFFF"/>
      </mask>
      <!-- Base pink -->
      <ellipse cx="0" cy="0" rx="90" ry="108" fill="#FF6B9D" stroke="#0F172A" stroke-width="9"/>
      <!-- White stripes masked to balloon -->
      <g mask="url(#rightBalloonMask)" stroke="#FFFFFF" stroke-width="14" stroke-linecap="round" opacity="0.9">
        <line x1="-120" y1="-70" x2="60" y2="110"/>
        <line x1="-100" y1="-120" x2="80" y2="60"/>
        <line x1="-80" y1="-170" x2="100" y2="10"/>
        <line x1="-140" y1="-20" x2="40" y2="160"/>
        <line x1="-60" y1="20" x2="120" y2="200"/>
      </g>
      <!-- Black stroke border on top -->
      <ellipse cx="0" cy="0" rx="90" ry="108" fill="none" stroke="#0F172A" stroke-width="9"/>
      <path d="M -50 -50 A 65 80 0 0 1 -10 -80" stroke="#FFFFFF" stroke-width="10" fill="none" stroke-linecap="round" opacity="0.7"/>
    </g>

    <!-- Top Center Balloon: Pink with Dark Pink Polka Dots -->
    <g transform="translate(0, -115)">
      <mask id="topBalloonMask">
        <ellipse cx="0" cy="0" rx="98" ry="118" fill="#FFFFFF"/>
      </mask>
      <!-- Base pink -->
      <ellipse cx="0" cy="0" rx="98" ry="118" fill="#FFA1C2" stroke="#0F172A" stroke-width="9"/>
      <!-- Polka dots -->
      <g mask="url(#topBalloonMask)" fill="#E91E63" opacity="0.85">
        <circle cx="-35" cy="-50" r="10"/>
        <circle cx="25" cy="-60" r="10"/>
        <circle cx="-60" cy="10" r="10"/>
        <circle cx="0" cy="0" r="10"/>
        <circle cx="55" cy="15" r="10"/>
        <circle cx="-25" cy="55" r="10"/>
        <circle cx="35" cy="65" r="10"/>
      </g>
      <!-- Black stroke border on top -->
      <ellipse cx="0" cy="0" rx="98" ry="118" fill="none" stroke="#0F172A" stroke-width="9"/>
      <!-- White highlight arc -->
      <path d="M -55 -55 A 72 90 0 0 1 -10 -88" stroke="#FFFFFF" stroke-width="11" fill="none" stroke-linecap="round" opacity="0.8"/>
    </g>

    <!-- Bow Tie at knot (Hot Pink with black knot detail) -->
    <g transform="translate(0, 192)">
      <!-- Left bow wing -->
      <path d="M 0 0 Q -28 -28 -48 -14 Q -68 0 -44 24 Q -20 40 0 0 Z" fill="url(#hotPinkGrad)" stroke="#0F172A" stroke-width="7"/>
      <!-- Right bow wing -->
      <path d="M 0 0 Q 28 -28 48 -14 Q 68 0 44 24 Q 20 40 0 0 Z" fill="url(#hotPinkGrad)" stroke="#0F172A" stroke-width="7"/>
      <!-- Center Knot -->
      <ellipse cx="0" cy="0" rx="14" ry="12" fill="url(#hotPinkGrad)" stroke="#0F172A" stroke-width="7"/>
      <circle cx="-4" cy="-3" r="3" fill="#FFFFFF" opacity="0.7"/>
    </g>
  </g>

  <!-- TYPOGRAPHY SECTION -->
  <!-- 1. SPARK JOY -->
  <text x="500" y="650" 
        font-family="'Plus Jakarta Sans', 'Outfit', 'Montserrat', Arial, sans-serif" 
        font-weight="900" 
        font-size="88" 
        fill="#0D1B3E" 
        text-anchor="middle" 
        letter-spacing="5">SPARK JOY</text>

  <!-- 2. — EVENT — -->
  <g transform="translate(500, 780)">
    <!-- Left Accent Line -->
    <path d="M -340 -20 L -170 -20 Q -155 -20 -150 -20" stroke="#E91E63" stroke-width="10" stroke-linecap="round"/>
    <polygon points="-150,-20 -170,-26 -170,-14" fill="#E91E63"/>

    <!-- EVENT Text -->
    <text x="0" y="12" 
          font-family="'Plus Jakarta Sans', 'Outfit', 'Montserrat', Arial, sans-serif" 
          font-weight="900" 
          font-size="92" 
          fill="#E91E63" 
          text-anchor="middle" 
          letter-spacing="12">EVENT</text>

    <!-- Right Accent Line -->
    <path d="M 150 -20 L 320 -20" stroke="#E91E63" stroke-width="10" stroke-linecap="round"/>
    <polygon points="150,-20 170,-26 170,-14" fill="#E91E63"/>
  </g>

  <!-- 3. MANAGEMENT -->
  <text x="500" y="875" 
        font-family="'Plus Jakarta Sans', 'Outfit', 'Montserrat', Arial, sans-serif" 
        font-weight="800" 
        font-size="44" 
        fill="#0D1B3E" 
        text-anchor="middle" 
        letter-spacing="24">MANAGEMENT</text>
</svg>
`;

fs.writeFileSync('assets/logo/logo.svg', svg.trim());

// Render high-resolution PNG spark-joy-logo.png
sharp(Buffer.from(svg))
  .resize(1000, 1000)
  .png({ quality: 100 })
  .toFile('assets/logo/spark-joy-logo.png')
  .then(() => {
    console.log('Successfully generated assets/logo/spark-joy-logo.png');
  })
  .catch(err => {
    console.error('Error generating logo PNG:', err);
  });
