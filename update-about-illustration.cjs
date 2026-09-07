const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function createRichIllustrationAboutImage() {
  const width = 1200;
  const height = 675; // 16:9 ratio like photo 2

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675">
    <defs>
      <!-- Background Watercolor Gradients -->
      <radialGradient id="bgWash" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stop-color="#FFFFFF"/>
        <stop offset="60%" stop-color="#FFF0F5"/>
        <stop offset="100%" stop-color="#F8BBD0"/>
      </radialGradient>

      <!-- Soft Drop Shadows for Toys -->
      <filter id="toyShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#880E4F" flood-opacity="0.15"/>
      </filter>

      <filter id="textShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#000000" flood-opacity="0.1"/>
      </filter>
    </defs>

    <!-- Background -->
    <rect width="1200" height="675" fill="url(#bgWash)"/>

    <!-- Background Confetti, Streamers & Stars -->
    <g opacity="0.85">
      <!-- Stars -->
      <path d="M 80 80 L 88 100 L 108 108 L 88 116 L 80 136 L 72 116 L 52 108 L 72 100 Z" fill="#FFD166"/>
      <path d="M 1120 80 L 1128 100 L 1148 108 L 1128 116 L 1120 136 L 1112 116 L 1092 108 L 1112 100 Z" fill="#4EA8DE"/>
      <path d="M 380 60 L 386 75 L 401 81 L 386 87 L 380 102 L 374 87 L 359 81 L 374 75 Z" fill="#FF4D6D"/>
      <path d="M 820 60 L 826 75 L 841 81 L 826 87 L 820 102 L 814 87 L 799 81 L 814 75 Z" fill="#FFD166"/>

      <!-- Floating Streamers -->
      <path d="M 420 110 Q 430 130 420 150 T 420 190" fill="none" stroke="#8338EC" stroke-width="5" stroke-linecap="round"/>
      <path d="M 760 110 Q 770 130 760 150 T 760 190" fill="none" stroke="#FFB703" stroke-width="5" stroke-linecap="round"/>
      <path d="M 180 150 Q 195 170 180 190" fill="none" stroke="#06D6A0" stroke-width="4" stroke-linecap="round"/>
      <path d="M 1020 150 Q 1035 170 1020 190" fill="none" stroke="#FF4D6D" stroke-width="4" stroke-linecap="round"/>

      <!-- Small Dots & Hearts -->
      <circle cx="150" cy="120" r="6" fill="#FF4D6D"/>
      <circle cx="280" cy="80" r="5" fill="#8338EC"/>
      <circle cx="920" cy="90" r="7" fill="#06D6A0"/>
      <circle cx="1060" cy="130" r="6" fill="#FFB703"/>
    </g>

    <!-- CENTER HEADER / LOGO BRANDING -->
    <g transform="translate(600, 160)" filter="url(#textShadow)">
      <!-- Balloon Trio -->
      <g transform="translate(0, -60)">
        <!-- Left Balloon -->
        <path d="M -25 -20 Q -50 -55 -15 -80 Q 20 -55 -25 -20 Z" fill="#FF80AB"/>
        <circle cx="-20" cy="-55" r="30" fill="#FF4081"/>
        <!-- Right Balloon -->
        <path d="M 25 -20 Q 0 -55 35 -80 Q 70 -55 25 -20 Z" fill="#EA80FC"/>
        <circle cx="25" cy="-55" r="30" fill="#E040FB"/>
        <!-- Center Main Pink Balloon -->
        <circle cx="0" cy="-65" r="35" fill="#E92D72"/>
        <path d="M -15 -80 Q -25 -60 -5 -40" fill="none" stroke="#FFFFFF" stroke-width="3" opacity="0.5"/>
        <!-- Ribbon Bow -->
        <polygon points="0,-25 8,-18 8,-32" fill="#C2185B"/>
        <polygon points="0,-25 -8,-18 -8,-32" fill="#C2185B"/>
        <!-- Strings -->
        <path d="M -15 -25 Q -10 10 0 25" fill="none" stroke="#880E4F" stroke-width="2"/>
        <path d="M 15 -25 Q 10 10 0 25" fill="none" stroke="#880E4F" stroke-width="2"/>
        <path d="M 0 -25 L 0 25" fill="none" stroke="#880E4F" stroke-width="2"/>
      </g>

      <!-- Main Title Typography -->
      <text x="0" y="80" font-family="'Segoe UI', Roboto, Helvetica, sans-serif" font-weight="900" font-size="52" fill="#111B3A" text-anchor="middle" letter-spacing="4">SPARK JOY</text>
      <text x="0" y="125" font-family="'Segoe UI', Roboto, Helvetica, sans-serif" font-weight="800" font-size="34" fill="#E92D72" text-anchor="middle" letter-spacing="6">— EVENT —</text>
      <text x="0" y="160" font-family="'Segoe UI', Roboto, Helvetica, sans-serif" font-weight="700" font-size="22" fill="#111B3A" text-anchor="middle" letter-spacing="8">MANAGEMENT</text>

      <!-- Dashed Line with Star -->
      <line x1="-120" y1="185" x2="-20" y2="185" stroke="#E92D72" stroke-width="3" stroke-dasharray="6 4"/>
      <path d="M 0 178 L 4 186 L 12 188 L 6 194 L 8 202 L 0 197 L -8 202 L -6 194 L -12 188 L -4 186 Z" fill="#E92D72"/>
      <line x1="20" y1="185" x2="120" y2="185" stroke="#E92D72" stroke-width="3" stroke-dasharray="6 4"/>
    </g>

    <!-- TOP LEFT: PAINT PALETTE & BRUSH -->
    <g transform="translate(60, 80)" filter="url(#toyShadow)">
      <!-- Palette Board -->
      <path d="M 40 180 C 10 120, 20 40, 120 20 C 220 0, 280 80, 260 160 C 240 230, 160 260, 100 240 C 60 220, 70 200, 40 180 Z" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="4"/>
      <!-- Thumb hole -->
      <ellipse cx="90" cy="200" rx="18" ry="24" fill="#F8BBD0" stroke="#E0E0E0" stroke-width="2"/>

      <!-- Paint Wells -->
      <circle cx="70" cy="130" r="18" fill="#FF5252"/>
      <circle cx="105" cy="80" r="18" fill="#FFB703"/>
      <circle cx="160" cy="55" r="18" fill="#06D6A0"/>
      <circle cx="215" cy="80" r="18" fill="#4EA8DE"/>
      <circle cx="230" cy="135" r="18" fill="#8338EC"/>

      <!-- Paint Brush -->
      <g transform="translate(140, 70) rotate(45)">
        <rect x="0" y="0" width="14" height="180" rx="7" fill="#D4A373"/>
        <rect x="-1" y="20" width="16" height="30" fill="#C0C0C0"/>
        <path d="M 0 20 Q 7 -15 14 20 Z" fill="#8B4513"/>
      </g>
    </g>

    <!-- TOP RIGHT: RAINBOW UNICORN PIÑATA -->
    <g transform="translate(880, 70)" filter="url(#toyShadow)">
      <!-- Body -->
      <ellipse cx="140" cy="200" rx="80" ry="60" fill="#FF80AB"/>
      <!-- Fringes -->
      <path d="M 70 180 L 210 180" stroke="#06D6A0" stroke-width="12" stroke-dasharray="14 6"/>
      <path d="M 65 200 L 215 200" stroke="#FFD166" stroke-width="12" stroke-dasharray="14 6"/>
      <path d="M 70 220 L 210 220" stroke="#4EA8DE" stroke-width="12" stroke-dasharray="14 6"/>
      <path d="M 80 240 L 200 240" stroke="#8338EC" stroke-width="12" stroke-dasharray="14 6"/>

      <!-- Legs -->
      <rect x="80" y="250" width="22" height="70" fill="#4EA8DE" rx="5"/>
      <rect x="115" y="250" width="22" height="70" fill="#06D6A0" rx="5"/>
      <rect x="150" y="250" width="22" height="70" fill="#FFD166" rx="5"/>
      <rect x="185" y="250" width="22" height="70" fill="#FF4D6D" rx="5"/>

      <!-- Neck & Head -->
      <path d="M 180 170 L 210 90 Q 230 70 250 100 Q 250 140 210 180 Z" fill="#FF80AB"/>
      <circle cx="225" cy="100" r="30" fill="#FF80AB"/>
      <!-- Eye -->
      <path d="M 220 98 Q 228 106 235 98" fill="none" stroke="#111B3A" stroke-width="3" stroke-linecap="round"/>

      <!-- Horn -->
      <polygon points="215,75 225,20 235,70" fill="#FFD166" stroke="#FFB703" stroke-width="2"/>

      <!-- Mane & Ears -->
      <path d="M 205 70 Q 190 50 180 75 Q 170 40 195 90 Q 180 110 200 130" fill="#06D6A0"/>
      <path d="M 195 60 Q 180 30 170 65" fill="#FF4D6D"/>

      <!-- Tail -->
      <path d="M 60 190 Q 30 180 20 220 Q 30 250 55 230" fill="#FFD166" stroke="#8338EC" stroke-width="4"/>

      <!-- Hanging Loop -->
      <path d="M 140 140 Q 140 90 155 90 Q 170 90 170 140" fill="none" stroke="#FF4D6D" stroke-dasharray="6 4" stroke-width="4"/>
    </g>

    <!-- BOTTOM LEFT: TEDDY BEAR & COLORED PENCILS -->
    <g transform="translate(40, 340)" filter="url(#toyShadow)">
      <!-- Teddy Bear -->
      <g transform="translate(50, 40)">
        <!-- Ears -->
        <circle cx="30" cy="40" r="28" fill="#D4A373"/>
        <circle cx="30" cy="40" r="16" fill="#FFCDB2"/>
        <circle cx="150" cy="40" r="28" fill="#D4A373"/>
        <circle cx="150" cy="40" r="16" fill="#FFCDB2"/>

        <!-- Head -->
        <circle cx="90" cy="80" r="65" fill="#E6B8A2"/>
        <!-- Snout -->
        <ellipse cx="90" cy="98" rx="28" ry="22" fill="#FFE5D9"/>
        <ellipse cx="90" cy="90" rx="12" ry="8" fill="#6B705C"/>
        <path d="M 90 98 L 90 110 Q 82 118 75 112 M 90 110 Q 98 118 105 112" fill="none" stroke="#6B705C" stroke-width="3" stroke-linecap="round"/>
        <!-- Eyes -->
        <circle cx="65" cy="72" r="8" fill="#2B2D42"/>
        <circle cx="62" cy="69" r="3" fill="#FFFFFF"/>
        <circle cx="115" cy="72" r="8" fill="#2B2D42"/>
        <circle cx="112" cy="69" r="3" fill="#FFFFFF"/>

        <!-- Body -->
        <ellipse cx="90" cy="180" rx="60" ry="55" fill="#E6B8A2"/>
        <ellipse cx="90" cy="180" rx="40" ry="36" fill="#FFE5D9"/>

        <!-- Bowtie -->
        <polygon points="90,135 70,120 70,150" fill="#FF4D6D"/>
        <polygon points="90,135 110,120 110,150" fill="#FF4D6D"/>
        <circle cx="90" cy="135" r="7" fill="#C2185B"/>

        <!-- Paws -->
        <circle cx="25" cy="190" r="24" fill="#D4A373"/>
        <circle cx="155" cy="190" r="24" fill="#D4A373"/>
      </g>

      <!-- Colored Pencils in Cup -->
      <g transform="translate(200, 100)">
        <!-- Cup -->
        <rect x="20" y="80" width="70" height="90" rx="12" fill="#8338EC"/>
        <!-- Pencils -->
        <rect x="28" y="10" width="10" height="80" fill="#FF4D6D"/>
        <polygon points="28,10 33,-8 38,10" fill="#FFD166"/>

        <rect x="42" y="0" width="10" height="90" fill="#FFB703"/>
        <polygon points="42,0 47,-18 52,0" fill="#FF4D6D"/>

        <rect x="56" y="15" width="10" height="75" fill="#06D6A0"/>
        <polygon points="56,15 61,-3 66,15" fill="#4EA8DE"/>

        <rect x="70" y="25" width="10" height="65" fill="#4EA8DE"/>
        <polygon points="70,25 75,7 80,25" fill="#8338EC"/>
      </g>

      <!-- Building Blocks -->
      <g transform="translate(280, 200)">
        <rect x="0" y="20" width="30" height="30" rx="4" fill="#06D6A0"/>
        <rect x="34" y="0" width="30" height="30" rx="4" fill="#8338EC"/>
      </g>
    </g>

    <!-- BOTTOM CENTER: SLINKY, STAR & TOY CAR -->
    <g transform="translate(480, 480)" filter="url(#toyShadow)">
      <!-- Rainbow Slinky -->
      <path d="M 10 70 Q 25 20 40 70 Q 55 20 70 70 Q 85 20 100 70 Q 115 20 130 70 Q 145 20 160 70" fill="none" stroke="#FF4D6D" stroke-width="8" stroke-linecap="round"/>
      <path d="M 14 74 Q 29 24 44 74 Q 59 24 74 74 Q 89 24 104 74 Q 119 24 134 74 Q 149 24 164 74" fill="none" stroke="#FFB703" stroke-width="6" stroke-linecap="round"/>
      <path d="M 18 78 Q 33 28 48 78 Q 63 28 78 78 Q 93 28 108 78 Q 123 28 138 78" fill="none" stroke="#06D6A0" stroke-width="4" stroke-linecap="round"/>

      <!-- Smiling Star -->
      <g transform="translate(185, 30)">
        <path d="M 0 -35 L 10 -10 L 35 -5 L 16 12 L 22 36 L 0 22 L -22 36 L -16 12 L -35 -5 L -10 -10 Z" fill="#FFD166" stroke="#FFB703" stroke-width="3"/>
        <circle cx="-8" cy="-2" r="3" fill="#111B3A"/>
        <circle cx="8" cy="-2" r="3" fill="#111B3A"/>
        <path d="M -6 8 Q 0 14 6 8" fill="none" stroke="#111B3A" stroke-width="2" stroke-linecap="round"/>
      </g>

      <!-- Blue Toy Car -->
      <g transform="translate(240, 40)">
        <!-- Car Body -->
        <path d="M 10 35 Q 20 15 40 10 L 70 10 Q 90 15 100 35 L 115 35 Q 120 35 120 48 L 120 58 L 0 58 L 0 45 Q 0 35 10 35 Z" fill="#118AB2"/>
        <!-- Windows -->
        <path d="M 25 32 L 40 18 L 65 18 L 65 32 Z" fill="#E0F7FA"/>
        <path d="M 70 18 L 88 18 L 95 32 L 70 32 Z" fill="#E0F7FA"/>
        <!-- Wheels -->
        <circle cx="30" cy="58" r="14" fill="#2B2D42"/>
        <circle cx="30" cy="58" r="6" fill="#E0E0E0"/>
        <circle cx="90" cy="58" r="14" fill="#2B2D42"/>
        <circle cx="90" cy="58" r="6" fill="#E0E0E0"/>
      </g>
    </g>

    <!-- BOTTOM RIGHT: RING TOWER & GIFT BOXES -->
    <g transform="translate(850, 420)" filter="url(#toyShadow)">
      <!-- Stacking Ring Tower -->
      <g transform="translate(0, 0)">
        <!-- Stand Base -->
        <rect x="20" y="150" width="80" height="15" rx="5" fill="#D4A373"/>
        <rect x="55" y="20" width="10" height="130" fill="#D4A373"/>
        <!-- Rings -->
        <rect x="25" y="125" width="70" height="22" rx="11" fill="#118AB2"/>
        <rect x="30" y="100" width="60" height="22" rx="11" fill="#06D6A0"/>
        <rect x="35" y="75" width="50" height="22" rx="11" fill="#FFD166"/>
        <rect x="40" y="50" width="40" height="22" rx="11" fill="#FF9F1C"/>
        <!-- Ball Top -->
        <circle cx="60" cy="35" r="15" fill="#FF4D6D"/>
      </g>

      <!-- Gift Box 1 (Small Pink) -->
      <g transform="translate(80, 80)">
        <rect x="0" y="20" width="80" height="70" rx="8" fill="#FF80AB"/>
        <rect x="-4" y="10" width="88" height="16" rx="4" fill="#FF4081"/>
        <!-- Ribbon -->
        <rect x="34" y="10" width="12" height="80" fill="#FFFFFF"/>
        <!-- Bow -->
        <path d="M 40 10 Q 20 -10 35 -15 Q 40 10 40 10 Z" fill="#FFD166"/>
        <path d="M 40 10 Q 60 -10 45 -15 Q 40 10 40 10 Z" fill="#FFD166"/>
      </g>

      <!-- Gift Box 2 (Large Pink Polka-Dot) -->
      <g transform="translate(170, 50)">
        <rect x="0" y="25" width="100" height="90" rx="10" fill="#FF4081"/>
        <circle cx="25" cy="50" r="6" fill="#FFFFFF" opacity="0.6"/>
        <circle cx="75" cy="50" r="6" fill="#FFFFFF" opacity="0.6"/>
        <circle cx="50" cy="80" r="6" fill="#FFFFFF" opacity="0.6"/>
        <circle cx="25" cy="100" r="6" fill="#FFFFFF" opacity="0.6"/>
        <circle cx="75" cy="100" r="6" fill="#FFFFFF" opacity="0.6"/>

        <rect x="-5" y="12" width="110" height="20" rx="5" fill="#F50057"/>
        <!-- Ribbon -->
        <rect x="42" y="12" width="16" height="103" fill="#FFD166"/>
        <!-- Bow -->
        <circle cx="50" cy="10" r="12" fill="#FFD166"/>
      </g>
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

  console.log('Successfully created vector watercolor celebration illustration for about-celebration.jpg!');
}

createRichIllustrationAboutImage().catch(err => {
  console.error('Error generating rich illustration:', err);
  process.exit(1);
});
