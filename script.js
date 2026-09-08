/**
 * Spark Joy Event Management - Main Interactive Script (Qatar Edition)
 * Pure Vanilla JavaScript (No Frameworks or External Dependencies Required)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all interactive modules
  initHeaderScroll();
  initMobileMenu();
  initSmoothScroll();
  initGalleryFilter();
  initGalleryLightbox();
  initServiceSlideGallery();
  initQuotationForm();
  initServiceQuoteButtons();
  initScrollReveal();
  initLanguageSwitcher();
});

/* ==========================================================================
   1. Header Scroll Effect
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* ==========================================================================
   2. Mobile Menu Toggle
   ========================================================================== */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-menu .nav-link, .mobile-menu .btn');

  if (!hamburger || !mobileMenu) return;

  function toggleMenu() {
    const isOpen = hamburger.classList.contains('open');
    if (isOpen) {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    } else {
      hamburger.classList.add('open');
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
      hamburger.setAttribute('aria-expanded', 'true');
    }
  }

  hamburger.addEventListener('click', toggleMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   3. Smooth Scroll & Section Observer
   ========================================================================== */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : (window.innerWidth <= 768 ? 68 : 88);
        const targetPosition = targetElement.offsetTop - headerHeight + 5;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active section observer
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   4. Gallery Category Filter
   ========================================================================== */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (!filterBtns.length || !galleryItems.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterCategory = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategoryString = item.getAttribute('data-category') || '';
        const itemCategories = itemCategoryString.split(' ');

        if (filterCategory === 'all' || itemCategories.includes(filterCategory)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   5. Gallery Lightbox Modal
   ========================================================================== */
let currentLightboxIndex = 0;
let visibleGalleryItems = [];

function initGalleryLightbox() {
  const lightbox = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');

  if (!lightbox) return;

  function updateVisibleItems() {
    visibleGalleryItems = Array.from(document.querySelectorAll('.gallery-item')).filter(
      item => item.style.display !== 'none'
    );
  }

  function showLightboxImage(index) {
    if (!visibleGalleryItems.length) return;
    if (index < 0) index = visibleGalleryItems.length - 1;
    if (index >= visibleGalleryItems.length) index = 0;

    currentLightboxIndex = index;
    const currentItem = visibleGalleryItems[currentLightboxIndex];
    const imgEl = currentItem.querySelector('img');
    const titleEl = currentItem.querySelector('.gallery-title');

    if (imgEl && lightboxImg) {
      lightboxImg.src = imgEl.src;
      lightboxImg.alt = imgEl.alt || 'Spark Joy Event Moment';
    }

    if (titleEl && lightboxCaption) {
      lightboxCaption.textContent = titleEl.textContent;
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      updateVisibleItems();
      const index = visibleGalleryItems.indexOf(item);
      showLightboxImage(index !== -1 ? index : 0);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', () => showLightboxImage(currentLightboxIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showLightboxImage(currentLightboxIndex + 1));

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showLightboxImage(currentLightboxIndex - 1);
    if (e.key === 'ArrowRight') showLightboxImage(currentLightboxIndex + 1);
  });
}

/* ==========================================================================
   7. Quotation Form & WhatsApp Integration
   ========================================================================== */
function initQuotationForm() {
  const form = document.getElementById('quoteForm');
  const successCard = document.getElementById('quoteSuccessCard');
  if (!form) return;

  window.submitQuoteForm = function(e) {
    if (e && e.preventDefault) e.preventDefault();

    const nameInput = document.getElementById('quoteName');
    const phoneInput = document.getElementById('quotePhone');
    const name = nameInput?.value.trim() || '';
    const phone = phoneInput?.value.trim() || '';

    // Clear previous error styles
    if (nameInput) nameInput.style.borderColor = '';
    if (phoneInput) phoneInput.style.borderColor = '';

    if (!name || !phone) {
      if (!name && nameInput) {
        nameInput.style.borderColor = '#E92D72';
        nameInput.focus();
      } else if (!phone && phoneInput) {
        phoneInput.style.borderColor = '#E92D72';
        phoneInput.focus();
      }
      showToast("Please enter your Name and Phone Number to request a quote. ✨");
      return false;
    }

    const email = document.getElementById('quoteEmail')?.value.trim() || '';
    const date = document.getElementById('quoteDate')?.value.trim() || '';
    const eventType = document.getElementById('quoteType')?.value || '';
    const age = document.getElementById('quoteAge')?.value.trim() || '';
    const guests = document.getElementById('quoteGuests')?.value.trim() || '';
    const theme = document.getElementById('quoteTheme')?.value.trim() || '';
    const notes = document.getElementById('quoteNotes')?.value.trim() || '';

    // Selected Services
    const serviceBoxes = document.querySelectorAll('input[name="services"]:checked');
    const services = Array.from(serviceBoxes).map(cb => cb.value);

    // Build WhatsApp Message
    let message = `Hello Spark Joy Event Management! ✨\nI would like to ask about booking an event / requesting a quotation in Qatar:\n\n`;
    if (name) message += `👤 *Name:* ${name}\n`;
    if (phone) message += `📱 *Phone:* ${phone}\n`;
    if (email) message += `📧 *Email:* ${email}\n`;
    if (date) message += `📅 *Event Date:* ${date}\n`;
    if (eventType) message += `🎈 *Event Type:* ${eventType}\n`;
    if (age) message += `👶 *Child's Age:* ${age}\n`;
    if (guests) message += `👥 *Number of Guests:* ${guests}\n`;
    if (theme) message += `🎨 *Preferred Theme:* ${theme}\n`;
    if (services.length > 0) message += `⭐ *Services Needed:* ${services.join(', ')}\n`;
    if (notes) message += `📝 *Additional Details:* ${notes}\n`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/97471716286?text=${encodedMessage}`;

    // Show Toast Confirmation
    showToast("Quote Request Ready! Tap WhatsApp button to open chat... ✨");

    // Display In-Page Success Card
    if (successCard) {
      successCard.innerHTML = `
        <div class="success-card-content text-center">
          <div class="success-icon-badge">🎉</div>
          <h3 class="success-title">Quote Request Ready!</h3>
          <p class="success-subtitle">Thank you, <strong>${escapeHtml(name)}</strong>! We have formatted your event inquiry for Spark Joy Event Management Qatar.</p>
          
          <div class="quote-summary-box">
            <div class="summary-item"><strong>Phone / WhatsApp:</strong> ${escapeHtml(phone)}</div>
            ${services.length ? `<div class="summary-item"><strong>Services Needed:</strong> ${escapeHtml(services.join(', '))}</div>` : ''}
            ${eventType ? `<div class="summary-item"><strong>Event Type:</strong> ${escapeHtml(eventType)}</div>` : ''}
            ${notes ? `<div class="summary-item"><strong>Notes:</strong> ${escapeHtml(notes)}</div>` : ''}
          </div>

          <div class="success-actions">
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-block-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 13.85 2.5 15.58 3.38 17.08L2 22L7.08 20.62C8.54 21.5 10.22 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C10.42 20 8.93 19.57 7.64 18.82L7.33 18.63L4.31 19.42L5.11 16.48L4.9 16.15C4.08 14.82 3.65 13.27 3.65 11.65C3.65 7.04 7.39 3.3 12 3.3C16.61 3.3 20.35 7.04 20.35 11.65C20.35 16.26 16.61 20 12 20ZM16.32 14.18C16.08 14.06 14.9 13.48 14.68 13.4C14.46 13.32 14.3 13.28 14.14 13.52C13.98 13.76 13.52 14.3 13.38 14.46C13.24 14.62 13.1 14.64 12.86 14.52C12.62 14.4 11.85 14.15 10.94 13.34C10.23 12.71 9.75 11.93 9.61 11.69C9.47 11.45 9.6 11.32 9.72 11.2C9.83 11.09 9.97 10.91 10.09 10.77C10.21 10.63 10.37 10.07 10.31 9.95C10.25 9.83 9.79 8.7 9.6 8.24C9.41 7.79 9.22 7.85 9.08 7.84C8.95 7.83 8.8 7.83 8.65 7.83C8.5 7.83 8.26 7.89 8.06 8.11C7.86 8.33 7.3 8.85 7.3 9.92C7.3 10.99 8.08 12.02 8.19 12.17C8.3 12.32 9.72 14.5 11.91 15.45C12.43 15.68 12.84 15.82 13.16 15.92C13.8 16.12 14.38 16.09 14.84 16.02C15.35 15.94 16.41 15.38 16.63 14.76C16.85 14.14 16.85 13.61 16.78 13.5C16.72 13.38 16.56 13.3 16.32 14.18Z"/>
              </svg>
              TAP TO OPEN WHATSAPP CHAT
            </a>
            <button type="button" id="resetQuoteBtn" class="btn btn-outline btn-sm" style="margin-top: 12px;">Send Another Inquiry</button>
          </div>
        </div>
      `;
      form.classList.add('hidden');
      successCard.classList.remove('hidden');

      const resetBtn = document.getElementById('resetQuoteBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          form.reset();
          form.classList.remove('hidden');
          successCard.classList.add('hidden');
          const notice = document.getElementById('serviceSelectedNotice');
          if (notice) notice.classList.add('hidden');
        });
      }
    }

    // Direct trigger for WhatsApp via dynamic link to bypass popup blockers
    try {
      const link = document.createElement('a');
      link.href = whatsappUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }

    return false;
  };

  form.addEventListener('submit', window.submitQuoteForm);
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/* ==========================================================================
   8. Service "ASK FOR A QUOTE" Button Handler
   ========================================================================== */
function initServiceQuoteButtons() {
  const serviceQuoteBtns = document.querySelectorAll('.service-quote-btn');
  const contactSection = document.getElementById('contact');
  const noticeBox = document.getElementById('serviceSelectedNotice');
  const noticeTitle = document.getElementById('selectedServiceTitle');
  const instantWhatsappBtn = document.getElementById('instantWhatsappBtn');

  serviceQuoteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const serviceName = btn.getAttribute('data-service') || 'Event Services';
      const notesInput = document.getElementById('quoteNotes');

      const waText = encodeURIComponent(`Hi Spark Joy Event Management! ✨ I would like to request a quote for: ${serviceName}`);
      const whatsappUrl = `https://wa.me/97471716286?text=${waText}`;

      // Trigger WhatsApp in new tab via dynamic anchor element
      try {
        const link = document.createElement('a');
        link.href = whatsappUrl;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (err) {
        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
      }

      if (serviceName) {
        // Pre-check matching service checkbox
        const matchingCheckbox = Array.from(document.querySelectorAll('input[name="services"]'))
          .find(cb => cb.value.toLowerCase().includes(serviceName.toLowerCase()) || serviceName.toLowerCase().includes(cb.value.toLowerCase()));

        if (matchingCheckbox) {
          matchingCheckbox.checked = true;
        }
        if (notesInput) {
          notesInput.value = `Interested in quote for: ${serviceName}`;
        }

        // Show Service Selected Notice above form
        if (noticeBox && noticeTitle) {
          noticeTitle.textContent = serviceName;
          noticeBox.classList.remove('hidden');

          if (instantWhatsappBtn) {
            instantWhatsappBtn.href = whatsappUrl;
          }
        }
      }

      if (contactSection) {
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 88;
        const targetPosition = contactSection.offsetTop - headerHeight + 10;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Pulse glow on contact wrapper
        const wrapper = contactSection.querySelector('.contact-wrapper');
        if (wrapper) {
          wrapper.classList.remove('pulse-glow');
          void wrapper.offsetWidth;
          wrapper.classList.add('pulse-glow');
        }
      }
    });
  });
}

/* ==========================================================================
   9. Scroll Reveal Animations
   ========================================================================== */
function initScrollReveal() {
  const elementsToReveal = document.querySelectorAll(
    '.service-card, .why-card, .gallery-item, .step-card, .section-tag, .section-title, .section-subtitle, .about-content, .about-img-frame, .hero-text, .hero-visual, .contact-wrapper'
  );

  elementsToReveal.forEach((el) => {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elementsToReveal.forEach(el => observer.observe(el));
}

/* ==========================================================================
   Toast Notification Helper
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('toastNotice');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotice';
    toast.className = 'toast-notice';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

/* ==========================================================================
   10. Service Photo Slide Lightbox Modal Manager
   ========================================================================== */
const servicePiñatas = [
  {
    id: 'creeper',
    title: 'Minecraft Creeper Piñata',
    category: 'Custom Cube',
    imageUrl: 'https://i.postimg.cc/tCYds0bD/44.png'
  },
  {
    id: 'frozen',
    title: 'Frozen Anna & Elsa Piñata',
    category: 'Round Themed',
    imageUrl: 'https://i.postimg.cc/5yPmZbV2/22.jpg'
  },
  {
    id: 'axolotl',
    title: 'Squishmallow Axolotl ',
    category: '3D Sculpted',
    imageUrl: 'https://i.postimg.cc/VNcXZdCj/33.png'
  },
  {
    id: 'stitch',
    title: 'Stitch & Angel Floral Piñata',
    category: 'Round Themed',
    imageUrl: 'https://i.postimg.cc/C5d8n83w/55.png'
  },
  {
    id: 'bluey',
    title: 'Bluey Character Piñata',
    category: 'Full 3D Character',
    imageUrl: 'https://i.postimg.cc/dQSrPWCh/66.jpg'
  },
  {
    id: 'olaf',
    title: 'Olaf Snowman Piñata',
    category: 'Shaped Character',
    imageUrl: 'https://i.postimg.cc/CL38dzmg/77.jpg'
  },
  {
    id: 'superman',
    title: 'Superman Shield Emblem',
    category: 'Custom Emblem',
    imageUrl: 'https://i.postimg.cc/ZqZyF2Gs/88.jpg'
  },
  {
    id: 'mermaid',
    title: 'Mermaid Ruffle Piñata',
    category: 'Custom Layered Round',
    imageUrl: 'https://i.postimg.cc/3Rx4zpJk/pinata.jpg'
  }
];

const goodieBags = [
  {
    id: 'soccer-bag',
    title: "Soccer / Football Favor Set",
    theme: "Sports & Games",
    imageUrl: "https://i.postimg.cc/vZDQRzW4/2.jpg"
  },
  {
    id: 'squishmallow-bag',
    title: "Squishmallow Pastel Favor Set",
    theme: "Pastel & Characters",
    imageUrl: "https://i.postimg.cc/L5HpxB9K/3.jpg"
  },
  {
    id: 'glow-bag',
    title: "Let's Glow Party Favor Set",
    theme: "Neon & Glow Theme",
    imageUrl: "https://i.postimg.cc/7hmydGhT/4.jpg"
  },
  {
    id: 'frozen-bag',
    title: "Frozen Castle Favor Set",
    theme: "Princess & Winter",
    imageUrl: "https://i.postimg.cc/zXGNWj2w/5.jpg"
  },
  {
    id: 'kpop-bag',
    title: "K-Pop Star Favor Set",
    theme: "Music & Glitter",
    imageUrl: "https://i.postimg.cc/qMDTG390/6.jpg"
  },
  {
    id: 'hero-bag',
    title: "Little Hero Girl Favor Set",
    theme: "Custom Superhero",
    imageUrl: "https://i.postimg.cc/zGL12frp/goodies-1.jpg"
  }
];

const SERVICE_SLIDE_GALLERIES = {
  pinatas: {
    title: "Custom Handcrafted Piñatas - Photo Samples",
    serviceName: "Custom Piñatas",
    photos: [
      {
        src: "https://i.postimg.cc/tCYds0bD/44.png",
        fallback: "assets/gallery/44.jpeg",
        imageUrl: "https://i.postimg.cc/tCYds0bD/44.png",
        caption: "Minecraft Creeper Piñata (Custom Cube)",
        alt: "Minecraft Creeper Piñata"
      },
      {
        src: "https://i.postimg.cc/5yPmZbV2/22.jpg",
        fallback: "assets/gallery/22.jpeg",
        imageUrl: "https://i.postimg.cc/5yPmZbV2/22.jpg",
        caption: "Frozen Anna & Elsa Piñata (Round Themed)",
        alt: "Frozen Anna & Elsa Piñata"
      },
      {
        src: "https://i.postimg.cc/VNcXZdCj/33.png",
        fallback: "assets/gallery/33.jpeg",
        imageUrl: "https://i.postimg.cc/VNcXZdCj/33.png",
        caption: "Squishmallow Axolotl (3D Sculpted)",
        alt: "Squishmallow Axolotl"
      },
      {
        src: "https://i.postimg.cc/C5d8n83w/55.png",
        fallback: "assets/gallery/55.jpeg",
        imageUrl: "https://i.postimg.cc/C5d8n83w/55.png",
        caption: "Stitch & Angel Floral Piñata (Round Themed)",
        alt: "Stitch & Angel Floral Piñata"
      },
      {
        src: "https://i.postimg.cc/dQSrPWCh/66.jpg",
        fallback: "assets/gallery/66.jpeg",
        imageUrl: "https://i.postimg.cc/dQSrPWCh/66.jpg",
        caption: "Bluey Character Piñata (Full 3D Character)",
        alt: "Bluey Character Piñata"
      },
      {
        src: "https://i.postimg.cc/CL38dzmg/77.jpg",
        fallback: "assets/gallery/77.jpeg",
        imageUrl: "https://i.postimg.cc/CL38dzmg/77.jpg",
        caption: "Olaf Snowman Piñata (Shaped Character)",
        alt: "Olaf Snowman Piñata"
      },
      {
        src: "https://i.postimg.cc/ZqZyF2Gs/88.jpg",
        fallback: "assets/gallery/88.jpeg",
        imageUrl: "https://i.postimg.cc/ZqZyF2Gs/88.jpg",
        caption: "Superman Shield Emblem (Custom Emblem)",
        alt: "Superman Shield Emblem"
      },
      {
        src: "https://i.postimg.cc/3Rx4zpJk/pinata.jpg",
        fallback: "assets/gallery/pinata.jpeg",
        imageUrl: "https://i.postimg.cc/3Rx4zpJk/pinata.jpg",
        caption: "Mermaid Ruffle Piñata (Custom Layered Round)",
        alt: "Mermaid Ruffle Piñata"
      }
    ]
  },
  workshops: {
    title: "Kids' Workshops & Arts Crafts - Photo Samples",
    serviceName: "Kids’ Workshops & Arts Crafts",
    photos: [
      {
        src: "https://i.postimg.cc/8CmXTmZx/Whats-App-Image-2026-09-04-at-5-20-45-PM-(1).jpg",
        fallback: "assets/gallery/33.jpeg",
        imageUrl: "https://i.postimg.cc/8CmXTmZx/Whats-App-Image-2026-09-04-at-5-20-45-PM-(1).jpg",
        caption: "DIY Slime Activity Box (Sensory & Slime)",
        alt: "DIY Slime Activity Box"
      },
      {
        src: "https://i.postimg.cc/Y9SRMKGm/Whats-App-Image-2026-09-04-at-5-20-45-PM-(3).jpg",
        fallback: "assets/gallery/33.jpeg",
        imageUrl: "https://i.postimg.cc/Y9SRMKGm/Whats-App-Image-2026-09-04-at-5-20-45-PM-(3).jpg",
        caption: "Superhero & Hello Kitty Cookie Kit (Edible Art)",
        alt: "Superhero & Hello Kitty Cookie Kit"
      },
      {
        src: "https://i.postimg.cc/VkB2Nw6W/Whats-App-Image-2026-09-04-at-5-20-46-PM-(1).jpg",
        fallback: "assets/gallery/33.jpeg",
        imageUrl: "https://i.postimg.cc/VkB2Nw6W/Whats-App-Image-2026-09-04-at-5-20-46-PM-(1).jpg",
        caption: "Eid Mubarak Cookie Decorating Kit (Seasonal Workshop)",
        alt: "Eid Mubarak Cookie Decorating Kit"
      },
      {
        src: "https://i.postimg.cc/ZRgMQK7N/Whats-App-Image-2026-09-04-at-5-20-46-PM-(2).jpg",
        fallback: "assets/gallery/33.jpeg",
        imageUrl: "https://i.postimg.cc/ZRgMQK7N/Whats-App-Image-2026-09-04-at-5-20-46-PM-(2).jpg",
        caption: "Ramadan Mosque Cookie House (3D Edible Craft)",
        alt: "Ramadan Mosque Cookie House"
      },
      {
        src: "https://i.postimg.cc/ryBHCsRG/Whats-App-Image-2026-09-04-at-5-20-46-PM-(3).jpg",
        fallback: "assets/gallery/33.jpeg",
        imageUrl: "https://i.postimg.cc/ryBHCsRG/Whats-App-Image-2026-09-04-at-5-20-46-PM-(3).jpg",
        caption: "Ramadan Crescent & Star Cookie Kit (Seasonal Workshop)",
        alt: "Ramadan Crescent & Star Cookie Kit"
      },
      {
        src: "https://i.postimg.cc/sD5Nnzp3/Whats-App-Image-2026-09-04-at-5-20-46-PM-(4).jpg",
        fallback: "assets/gallery/33.jpeg",
        imageUrl: "https://i.postimg.cc/sD5Nnzp3/Whats-App-Image-2026-09-04-at-5-20-46-PM-(4).jpg",
        caption: "Unicorn Cookie Activity Kit (Edible Art)",
        alt: "Unicorn Cookie Activity Kit"
      },
      {
        src: "https://i.postimg.cc/2jZc6Y95/Whats-App-Image-2026-09-04-at-5-20-47-PM.jpg",
        fallback: "assets/gallery/33.jpeg",
        imageUrl: "https://i.postimg.cc/2jZc6Y95/Whats-App-Image-2026-09-04-at-5-20-47-PM.jpg",
        caption: "Summer Slime Workshop Set (Sensory & Slime)",
        alt: "Summer Slime Workshop Set"
      }
    ]
  },
  goodies: {
    title: "Custom Favors & Goodie Bags - Photo Samples",
    serviceName: "Custom Goodie Bags",
    photos: [
      {
        src: "https://i.postimg.cc/vZDQRzW4/2.jpg",
        fallback: "assets/gallery/22.jpeg",
        imageUrl: "https://i.postimg.cc/vZDQRzW4/2.jpg",
        caption: "Soccer / Football Favor Set (Sports & Games)",
        alt: "Soccer / Football Favor Set"
      },
      {
        src: "https://i.postimg.cc/L5HpxB9K/3.jpg",
        fallback: "assets/gallery/33.jpeg",
        imageUrl: "https://i.postimg.cc/L5HpxB9K/3.jpg",
        caption: "Squishmallow Pastel Favor Set (Pastel & Characters)",
        alt: "Squishmallow Pastel Favor Set"
      },
      {
        src: "https://i.postimg.cc/7hmydGhT/4.jpg",
        fallback: "assets/gallery/44.jpeg",
        imageUrl: "https://i.postimg.cc/7hmydGhT/4.jpg",
        caption: "Let's Glow Party Favor Set (Neon & Glow Theme)",
        alt: "Let's Glow Party Favor Set"
      },
      {
        src: "https://i.postimg.cc/zXGNWj2w/5.jpg",
        fallback: "assets/gallery/55.jpeg",
        imageUrl: "https://i.postimg.cc/zXGNWj2w/5.jpg",
        caption: "Frozen Castle Favor Set (Princess & Winter)",
        alt: "Frozen Castle Favor Set"
      },
      {
        src: "https://i.postimg.cc/qMDTG390/6.jpg",
        fallback: "assets/gallery/66.jpeg",
        imageUrl: "https://i.postimg.cc/qMDTG390/6.jpg",
        caption: "K-Pop Star Favor Set (Music & Glitter)",
        alt: "K-Pop Star Favor Set"
      },
      {
        src: "https://i.postimg.cc/zGL12frp/goodies-1.jpg",
        fallback: "assets/gallery/77.jpeg",
        imageUrl: "https://i.postimg.cc/zGL12frp/goodies-1.jpg",
        caption: "Little Hero Girl Favor Set (Custom Superhero)",
        alt: "Little Hero Girl Favor Set"
      }
    ]
  },
  school: {
    title: "School Events & Workshops - Photo Samples",
    serviceName: "School Events",
    photos: [
      {
        src: "https://i.postimg.cc/J7B4khsB/2c018ddc-b96d-4387-ab77-0df13b7847c4.jpg",
        fallback: "assets/gallery/55.jpeg",
        imageUrl: "https://i.postimg.cc/J7B4khsB/2c018ddc-b96d-4387-ab77-0df13b7847c4.jpg",
        caption: "3D Plasticine Picture Art & Cookie Creations (1-Hour Workshop)",
        alt: "3D Plasticine Picture Art & Cookie Creations"
      },
      {
        src: "https://i.postimg.cc/zfV1YdWJ/7a04e402-5517-4aa6-afd3-fcea35819b0f.jpg",
        fallback: "assets/gallery/55.jpeg",
        imageUrl: "https://i.postimg.cc/zfV1YdWJ/7a04e402-5517-4aa6-afd3-fcea35819b0f.jpg",
        caption: "Woven Ocean Fish & Glowing Garden Lantern (1-Hour Workshop)",
        alt: "Woven Ocean Fish & Glowing Garden Lantern"
      },
      {
        src: "https://i.postimg.cc/J7bC8HyX/26f21bf7-1b86-4ffa-b72a-00f9c138734f.jpg",
        fallback: "assets/gallery/55.jpeg",
        imageUrl: "https://i.postimg.cc/J7bC8HyX/26f21bf7-1b86-4ffa-b72a-00f9c138734f.jpg",
        caption: "Rainbow Salt Painting & Sticky String Drawing (1-Hour Workshop)",
        alt: "Rainbow Salt Painting & Sticky String Drawing"
      },
      {
        src: "https://i.postimg.cc/J4xwDw5B/392bc624-3d30-480c-8270-5c9c84c3d747.jpg",
        fallback: "assets/gallery/55.jpeg",
        imageUrl: "https://i.postimg.cc/J4xwDw5B/392bc624-3d30-480c-8270-5c9c84c3d747.jpg",
        caption: "Slime Lab & Textured Paper Painting (1-Hour Workshop)",
        alt: "Slime Lab & Textured Paper Painting"
      },
      {
        src: "https://i.postimg.cc/wT6ZdfYv/677dce16-eaa0-46ce-a4a6-e7e54de49f92.jpg",
        fallback: "assets/gallery/55.jpeg",
        imageUrl: "https://i.postimg.cc/wT6ZdfYv/677dce16-eaa0-46ce-a4a6-e7e54de49f92.jpg",
        caption: "My Mini Piñata & Clay Character Creations (1-Hour Workshop)",
        alt: "My Mini Piñata & Clay Character Creations"
      },
      {
        src: "https://i.postimg.cc/ZRtssjxF/18190707-77de-42ed-bf47-2d40cfc0009b.jpg",
        fallback: "assets/gallery/55.jpeg",
        imageUrl: "https://i.postimg.cc/ZRtssjxF/18190707-77de-42ed-bf47-2d40cfc0009b.jpg",
        caption: "Squeeze & Smile Stress Buddies & Rainbow Sand Bottle (1-Hour Workshop)",
        alt: "Squeeze & Smile Stress Buddies & Rainbow Sand Bottle"
      },
      {
        src: "https://i.postimg.cc/zvqt8BMp/bc854609-892e-4a05-a2e4-28660fa1a735.jpg",
        fallback: "assets/gallery/55.jpeg",
        imageUrl: "https://i.postimg.cc/zvqt8BMp/bc854609-892e-4a05-a2e4-28660fa1a735.jpg",
        caption: "My Own Toy Factory & Magical Mask Makers (1-Hour Workshop)",
        alt: "My Own Toy Factory & Magical Mask Makers"
      },
      {
        src: "https://i.postimg.cc/VLLGhJX5/c518f3bd-28cf-4843-9a34-aa37c079ffc4.jpg",
        fallback: "assets/gallery/55.jpeg",
        imageUrl: "https://i.postimg.cc/VLLGhJX5/c518f3bd-28cf-4843-9a34-aa37c079ffc4.jpg",
        caption: "Orbeez Squishy Ball & Design Your Own Tote Bag (1-Hour Workshop)",
        alt: "Orbeez Squishy Ball & Design Your Own Tote Bag"
      },
      {
        src: "https://i.postimg.cc/TYddHJkb/e685c40a-ce21-46cd-9446-d9ff398c6f62.jpg",
        fallback: "assets/gallery/55.jpeg",
        imageUrl: "https://i.postimg.cc/TYddHJkb/e685c40a-ce21-46cd-9446-d9ff398c6f62.jpg",
        caption: "Colourful Bean Mosaic & Rainbow Parrot Paper Art (1-Hour Workshop)",
        alt: "Colourful Bean Mosaic & Rainbow Parrot Paper Art"
      }
    ]
  },
  corporate: {
    title: "Corporate Children's Events - Photo Samples",
    serviceName: "Corporate Children's Events",
    photos: [
      {
        src: "assets/gallery/66.jpeg",
        fallback: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80",
        caption: "Corporate Kid Zone & Family Day Entertainment Setups",
        alt: "Corporate Family Day Events"
      },
      {
        src: "assets/gallery/55.jpeg",
        fallback: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&w=800&q=80",
        caption: "Festive Holiday Corporate Family Day Celebrations",
        alt: "Festive Holiday Corporate Celebration"
      }
    ]
  }
};

function initServiceSlideGallery() {
  const modal = document.getElementById('serviceSlideModal');
  if (!modal) return;

  const closeBtn = document.getElementById('slideModalClose');
  const backdrop = modal.querySelector('.slide-modal-backdrop');
  const titleEl = document.getElementById('slideModalTitle');
  const counterEl = document.getElementById('slideCounter');
  const activeImg = document.getElementById('slideActiveImg');
  const captionEl = document.getElementById('slideCaptionText');
  const thumbsBar = document.getElementById('slideThumbnailsBar');
  const prevBtn = document.getElementById('slidePrevBtn');
  const nextBtn = document.getElementById('slideNextBtn');
  const quoteBtn = document.getElementById('slideQuoteBtn');

  let currentGalleryKey = 'pinatas';
  let currentSlideIndex = 0;

  function openGallery(key, startIndex = 0) {
    if (!SERVICE_SLIDE_GALLERIES[key]) key = 'pinatas';
    currentGalleryKey = key;
    currentSlideIndex = Math.max(0, Math.min(startIndex, SERVICE_SLIDE_GALLERIES[key].photos.length - 1));

    const galleryData = SERVICE_SLIDE_GALLERIES[key];
    if (titleEl) titleEl.textContent = galleryData.title;

    // Render thumbnails
    if (thumbsBar) {
      thumbsBar.innerHTML = '';
      galleryData.photos.forEach((photo, idx) => {
        const thumb = document.createElement('img');
        thumb.src = photo.src;
        thumb.alt = photo.alt;
        thumb.className = `slide-thumb ${idx === 0 ? 'active' : ''}`;
        thumb.onerror = () => { thumb.src = photo.fallback; };
        thumb.addEventListener('click', () => {
          goToSlide(idx);
        });
        thumbsBar.appendChild(thumb);
      });
    }

    updateSlideView();
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  // Attach globally to window for direct click handlers and Netlify deployment
  window.openGallery = openGallery;
  window.openModal = function(imageUrl, title) {
    let key = 'pinatas';
    if (title) {
      const lower = title.toLowerCase();
      if (lower.includes('workshop') || lower.includes('craft')) key = 'workshops';
      else if (lower.includes('goodie') || lower.includes('favor') || lower.includes('bag')) key = 'goodies';
      else if (lower.includes('school')) key = 'school';
    }
    openGallery(key, 0);
    if (imageUrl && activeImg) {
      activeImg.src = imageUrl;
    }
    if (title && titleEl) {
      titleEl.textContent = title;
    }
  };

  function closeGallery() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function goToSlide(index) {
    const photos = SERVICE_SLIDE_GALLERIES[currentGalleryKey].photos;
    if (index < 0) index = photos.length - 1;
    if (index >= photos.length) index = 0;
    currentSlideIndex = index;

    updateSlideView();
  }

  function updateSlideView() {
    const galleryData = SERVICE_SLIDE_GALLERIES[currentGalleryKey];
    const photo = galleryData.photos[currentSlideIndex];

    if (activeImg) {
      activeImg.style.opacity = '0';
      setTimeout(() => {
        activeImg.src = photo.src;
        activeImg.alt = photo.alt;
        activeImg.onerror = () => { activeImg.src = photo.fallback; };
        activeImg.style.opacity = '1';
      }, 120);
    }

    if (counterEl) counterEl.textContent = `${currentSlideIndex + 1} of ${galleryData.photos.length}`;
    if (captionEl) captionEl.textContent = photo.caption;

    // Update active thumb
    if (thumbsBar) {
      const thumbs = thumbsBar.querySelectorAll('.slide-thumb');
      thumbs.forEach((t, i) => {
        if (i === currentSlideIndex) {
          t.classList.add('active');
          t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        } else {
          t.classList.remove('active');
        }
      });
    }

    // Update quote button behavior
    if (quoteBtn) {
      quoteBtn.onclick = (e) => {
        e.preventDefault();
        closeGallery();

        const serviceName = galleryData.serviceName;
        const matchingCheckbox = Array.from(document.querySelectorAll('input[name="services"]'))
          .find(cb => cb.value.toLowerCase().includes(serviceName.toLowerCase()) || serviceName.toLowerCase().includes(cb.value.toLowerCase()));

        if (matchingCheckbox) {
          matchingCheckbox.checked = true;
        }

        const notesInput = document.getElementById('quoteNotes');
        if (notesInput) {
          notesInput.value = `Inquiry regarding ${serviceName}: ${photo.caption}`;
        }

        const contactSection = document.getElementById('contact');
        if (contactSection) {
          const header = document.querySelector('.header');
          const headerHeight = header ? header.offsetHeight : 88;
          const targetPosition = contactSection.offsetTop - headerHeight + 10;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      };
    }
  }

  // Attach event triggers to service card media wrappers & slide buttons
  document.querySelectorAll('.service-slide-trigger, .service-slide-btn').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const galleryKey = trigger.getAttribute('data-gallery-type') || 'pinatas';
      openGallery(galleryKey, 0);
    });
  });

  // Attach interactive click handling to sample design thumbnails
  document.querySelectorAll('.sample-thumb').forEach(thumb => {
    thumb.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const card = thumb.closest('.service-card');
      const sampleSrc = thumb.getAttribute('data-sample-src') || thumb.querySelector('img')?.src;
      const galleryKey = thumb.getAttribute('data-gallery-type') || card?.getAttribute('data-service-gallery') || 'pinatas';

      if (card && sampleSrc) {
        // Update main image in service card
        const mainImg = card.querySelector('.service-card-img');
        if (mainImg) {
          mainImg.style.transition = 'opacity 0.2s ease-in-out';
          mainImg.style.opacity = '0.2';
          setTimeout(() => {
            mainImg.src = sampleSrc;
            mainImg.style.opacity = '1';
          }, 150);
        }

        // Highlight active thumbnail in this carousel strip
        card.querySelectorAll('.sample-thumb').forEach(t => {
          t.classList.remove('ring-2', 'ring-rose-500', 'border-rose-500');
        });
        thumb.classList.add('ring-2', 'ring-rose-500', 'border-rose-500');
      }

      // Find index of clicked thumb within its container strip
      const strip = thumb.closest('#pinataCarousel, #workshopCarousel, #goodieCarousel, #schoolCarousel, .service-card');
      let startIndex = 0;
      if (strip) {
        const thumbsInStrip = Array.from(strip.querySelectorAll('.sample-thumb'));
        const foundIndex = thumbsInStrip.indexOf(thumb);
        if (foundIndex >= 0) startIndex = foundIndex;
      }

      // Open full slideshow modal at this exact photo
      openGallery(galleryKey, startIndex);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeGallery);
  if (backdrop) backdrop.addEventListener('click', closeGallery);
  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlideIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlideIndex + 1));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowLeft') goToSlide(currentSlideIndex - 1);
    if (e.key === 'ArrowRight') goToSlide(currentSlideIndex + 1);
  });
}

/* ==========================================================================
   10. Language Switcher & Arabic Localization (Qatar Edition)
   ========================================================================== */
const i18nData = {
  en: {
    lang_btn: "العربية",
    nav_home: "HOME",
    nav_about: "ABOUT",
    nav_services: "SERVICES",
    nav_gallery: "SOCIAL GALLERY",
    nav_contact: "CONTACT",
    btn_get_quote: "GET A QUOTE",
    btn_get_quote_sparkle: "✨ GET A QUOTE",
    btn_chat_whatsapp: "CHAT ON WHATSAPP",
    hero_badge: "<span>✨</span> Qatar's Premier Kids Event Management",
    hero_title: "LET US SPARK THE <span>JOY!</span>",
    hero_subtitle: "Creating magical birthday celebrations, handcrafted piñatas, and engaging creative workshops for children and families across Qatar.",
    hero_location: "📍 <span style=\"font-weight: 800; color: var(--primary-pink);\">Locations Served:</span> Doha <span class=\"location-dot\">•</span> Lusail <span class=\"location-dot\">•</span> Pearl-Qatar <span class=\"location-dot\">•</span> West Bay <span class=\"location-dot\">•</span> Al Rayyan <span class=\"location-dot\">•</span> Al Waab",
    btn_whatsapp_us: "WHATSAPP US",
    btn_book_event: "✨ BOOK YOUR EVENT"
  },
  ar: {
    lang_btn: "English",
    nav_home: "الرئيسية",
    nav_about: "من نحن",
    nav_services: "خدماتنا",
    nav_gallery: "معرض الصور",
    nav_contact: "اتصل بنا",
    btn_get_quote: "احصل على عرض سعر",
    btn_get_quote_sparkle: "✨ احصل على عرض سعر",
    btn_chat_whatsapp: "تحدث معنا عبر واتساب",
    hero_badge: "<span>✨</span> الشركة الرائدة لتنظيم فعاليات الأطفال في قطر",
    hero_title: "دعنا نشرك <span>الفرحة!</span>",
    hero_subtitle: "نبتكر احتفالات أعياد ميلاد ساحرة، وبينياتا مصممة يدوياً، وورش عمل إبداعية وممتعة للأطفال والعائلات في جميع أنحاء قطر.",
    hero_location: "📍 <span style=\"font-weight: 800; color: var(--primary-pink);\">مناطق الخدمة:</span> الدوحة <span class=\"location-dot\">•</span> لوسيل <span class=\"location-dot\">•</span> اللؤلؤة <span class=\"location-dot\">•</span> الخليج الغربي <span class=\"location-dot\">•</span> الريان <span class=\"location-dot\">•</span> الوعب",
    btn_whatsapp_us: "تواصل عبر واتساب",
    btn_book_event: "✨ احجز فعاليتك الآن"
  }
};

function initLanguageSwitcher() {
  let currentLang = localStorage.getItem('sparkjoy_lang') || 'en';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('sparkjoy_lang', lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = (lang === 'ar') ? 'rtl' : 'ltr';

    const dict = i18nData[lang] || i18nData.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });

    // Update button text labels
    document.querySelectorAll('.langToggleBtn .lang-text').forEach(btnText => {
      btnText.textContent = (lang === 'ar') ? 'English' : 'العربية';
    });
  }

  // Initial language application
  applyLanguage(currentLang);

  // Attach event listener to language toggle buttons
  document.querySelectorAll('.langToggleBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const nextLang = (currentLang === 'ar') ? 'en' : 'ar';
      applyLanguage(nextLang);
    });
  });
}
