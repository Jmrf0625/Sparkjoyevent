const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const items = [
  // Birthday
  {
    folder: 'birthday',
    filename: 'birthday-01.jpg',
    bg: '#FFF0F5',
    primary: '#E92D72',
    accent: '#FFB6C1',
    title: 'Princess Birthday Celebration',
    subtitle: 'Colorful Children Birthday Decoration',
    icon: '👑'
  },
  {
    folder: 'birthday',
    filename: 'birthday-02.jpg',
    bg: '#F0F8FF',
    primary: '#1E90FF',
    accent: '#87CEFA',
    title: 'Superhero Birthday Party',
    subtitle: 'Spark Joy Themed Birthday Event',
    icon: '⚡'
  },
  {
    folder: 'birthday',
    filename: 'birthday-03.jpg',
    bg: '#FFF5EE',
    primary: '#FF6347',
    accent: '#FFD700',
    title: 'Carnival Birthday Bash',
    subtitle: 'Kids Birthday Party Experience',
    icon: '🎈'
  },

  // Decorations
  {
    folder: 'decorations',
    filename: 'decorations-01.jpg',
    bg: '#FAF0E6',
    primary: '#FF69B4',
    accent: '#FFD700',
    title: 'Pastel Balloon Arch & Backdrop',
    subtitle: 'Colorful Birthday Decoration Setup',
    icon: '🎈'
  },
  {
    folder: 'decorations',
    filename: 'decorations-02.jpg',
    bg: '#FDF5E6',
    primary: '#FF8C00',
    accent: '#FFE4B5',
    title: 'Royal Table Setting & Centerpieces',
    subtitle: 'Custom Event Styling & Decor',
    icon: '✨'
  },
  {
    folder: 'decorations',
    filename: 'decorations-03.jpg',
    bg: '#F5F5DC',
    primary: '#8B4513',
    accent: '#F4A460',
    title: 'Rustic Safari Party Setup',
    subtitle: 'Themed Table & Backdrop Decor',
    icon: '🦁'
  },

  // Activities
  {
    folder: 'activities',
    filename: 'activities-01.jpg',
    bg: '#F5FFFA',
    primary: '#2E8B57',
    accent: '#98FB98',
    title: 'Cookie Decorating Workshop',
    subtitle: 'Kids Arts and Crafts Activity',
    icon: '🎨'
  },
  {
    folder: 'activities',
    filename: 'activities-02.jpg',
    bg: '#FFF8DC',
    primary: '#DAA520',
    accent: '#F0E68C',
    title: 'Slime & Clay Craft Station',
    subtitle: 'Interactive Kids Workshop',
    icon: '🧪'
  },
  {
    folder: 'activities',
    filename: 'activities-03.jpg',
    bg: '#F0FFF0',
    primary: '#3CB371',
    accent: '#8FBC8F',
    title: 'Painting & Canvas Station',
    subtitle: 'Creative Workshop Session',
    icon: '🖌️'
  },

  // Entertainment
  {
    folder: 'entertainment',
    filename: 'entertainment-01.jpg',
    bg: '#F3E5F5',
    primary: '#8E24AA',
    accent: '#CE93D8',
    title: 'Magic & Clown Performance',
    subtitle: 'Children Party Entertainment',
    icon: '🎪'
  },
  {
    folder: 'entertainment',
    filename: 'entertainment-02.jpg',
    bg: '#E8EAF6',
    primary: '#3F51B5',
    accent: '#9FA8DA',
    title: 'Balloon Twisting & Games',
    subtitle: 'Interactive Party Entertainment',
    icon: '🎵'
  },
  {
    folder: 'entertainment',
    filename: 'entertainment-03.jpg',
    bg: '#E0F2F1',
    primary: '#00897B',
    accent: '#80CBC4',
    title: 'Mascot & Character Show',
    subtitle: 'Live Kids Party Entertainment',
    icon: '🎭'
  },

  // Themed Events
  {
    folder: 'themed-events',
    filename: 'themed-events-01.jpg',
    bg: '#E0F7FA',
    primary: '#00ACC1',
    accent: '#80DEEA',
    title: 'Frozen Ice Kingdom Theme',
    subtitle: 'Spark Joy Themed Children Event',
    icon: '❄️'
  },
  {
    folder: 'themed-events',
    filename: 'themed-events-02.jpg',
    bg: '#FFF3E0',
    primary: '#FB8C00',
    accent: '#FFCC80',
    title: 'Custom Handcrafted Piñatas',
    subtitle: 'Themed Party Feature Display',
    icon: '🦄'
  },
  {
    folder: 'themed-events',
    filename: 'themed-events-03.jpg',
    bg: '#F1F8E9',
    primary: '#7CB342',
    accent: '#AED581',
    title: 'Under The Sea Mermaid Theme',
    subtitle: 'Bespoke Children Event Styling',
    icon: '🧜‍♀️'
  },

  // Extras for Hero and About
  {
    folder: 'decorations',
    filename: 'hero-decor.jpg',
    bg: '#FFF0F5',
    primary: '#E92D72',
    accent: '#FFB6C1',
    title: 'Spark Joy Event Decor',
    subtitle: 'Premier Qatar Event Management',
    icon: '🎉'
  },
  {
    folder: 'birthday',
    filename: 'about-celebration.jpg',
    bg: '#F0F8FF',
    primary: '#1E90FF',
    accent: '#87CEFA',
    title: 'Creating Magical Moments',
    subtitle: 'Spark Joy Event Management',
    icon: '🥳'
  }
];

async function generateImages() {
  for (const item of items) {
    const titleText = item.title.toUpperCase().replace(/&/g, '&amp;');
    const subtitleText = item.subtitle.toUpperCase().replace(/&/g, '&amp;');

    const svg = `<svg width="1000" height="750" viewBox="0 0 1000 750" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${item.bg}"/>
          <stop offset="100%" stop-color="#FFFFFF"/>
        </linearGradient>
        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="10" stdDeviation="15" flood-color="${item.primary}" flood-opacity="0.15"/>
        </filter>
      </defs>

      <!-- Background -->
      <rect width="1000" height="750" fill="url(#bgGrad)"/>
      <circle cx="900" cy="100" r="250" fill="${item.accent}" opacity="0.3"/>
      <circle cx="100" cy="650" r="200" fill="${item.accent}" opacity="0.2"/>

      <!-- Inner Frame -->
      <rect x="50" y="50" width="900" height="650" rx="30" fill="white" filter="url(#shadow)" opacity="0.95"/>
      <rect x="65" y="65" width="870" height="620" rx="20" fill="none" stroke="${item.primary}" stroke-width="3" stroke-dasharray="10 10" opacity="0.4"/>

      <!-- Icon & Text -->
      <text x="500" y="280" font-family="'Segoe UI', Roboto, sans-serif" font-size="120" text-anchor="middle">${item.icon}</text>
      
      <text x="500" y="420" font-family="'Segoe UI', Roboto, sans-serif" font-weight="bold" font-size="40" fill="#1A202C" text-anchor="middle">${titleText}</text>
      
      <text x="500" y="480" font-family="'Segoe UI', Roboto, sans-serif" font-weight="600" font-size="22" fill="${item.primary}" text-anchor="middle" letter-spacing="2">${subtitleText}</text>

      <rect x="350" y="520" width="300" height="4" rx="2" fill="${item.primary}"/>
      
      <text x="500" y="580" font-family="'Segoe UI', Roboto, sans-serif" font-size="20" fill="#718096" text-anchor="middle">Spark Joy Event Management • Qatar</text>
    </svg>`;

    const targetDir1 = path.join(__dirname, 'assets', 'gallery', item.folder);
    const targetDir2 = path.join(__dirname, 'public', 'assets', 'gallery', item.folder);

    fs.mkdirSync(targetDir1, { recursive: true });
    fs.mkdirSync(targetDir2, { recursive: true });

    const file1 = path.join(targetDir1, item.filename);
    const file2 = path.join(targetDir2, item.filename);

    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90 })
      .toFile(file1);

    fs.copyFileSync(file1, file2);
    console.log(`Generated ${item.folder}/${item.filename}`);
  }
}

generateImages().then(() => console.log('All gallery JPEGs updated successfully!'));
