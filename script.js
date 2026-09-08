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

  const directWaBtn = document.getElementById('directWhatsappQuoteBtn');
  const instantWaBtn = document.getElementById('instantWhatsappBtn');

  // Helper to construct current formatted message
  function getFormattedMessage() {
    const name = document.getElementById('quoteName')?.value.trim() || '';
    const phone = document.getElementById('quotePhone')?.value.trim() || '';
    const email = document.getElementById('quoteEmail')?.value.trim() || '';
    const date = document.getElementById('quoteDate')?.value.trim() || '';
    const eventType = document.getElementById('quoteType')?.value || '';
    const age = document.getElementById('quoteAge')?.value.trim() || '';
    const guests = document.getElementById('quoteGuests')?.value.trim() || '';
    const theme = document.getElementById('quoteTheme')?.value.trim() || '';
    const notes = document.getElementById('quoteNotes')?.value.trim() || '';

    const serviceBoxes = document.querySelectorAll('input[name="services"]:checked');
    const services = Array.from(serviceBoxes).map(cb => cb.value);

    let msg = `Hello Spark Joy Event Management! ✨\nI would like to ask about booking an event / requesting a quotation in Qatar:\n\n`;
    if (name) msg += `👤 *Name:* ${name}\n`;
    if (phone) msg += `📱 *Phone:* ${phone}\n`;
    if (email) msg += `📧 *Email:* ${email}\n`;
    if (date) msg += `📅 *Event Date:* ${date}\n`;
    if (eventType) msg += `🎈 *Event Type:* ${eventType}\n`;
    if (age) msg += `👶 *Child's Age:* ${age}\n`;
    if (guests) msg += `👥 *Number of Guests:* ${guests}\n`;
    if (theme) msg += `🎨 *Preferred Theme:* ${theme}\n`;
    if (services.length > 0) msg += `⭐ *Services Needed:* ${services.join(', ')}\n`;
    if (notes) msg += `📝 *Additional Details:* ${notes}\n`;

    return msg;
  }

  // Update dynamic links in real time
  function updateWhatsappLinks() {
    const msg = getFormattedMessage();
    const encoded = encodeURIComponent(msg);
    const waUrl = `https://wa.me/97471716286?text=${encoded}`;

    if (directWaBtn) directWaBtn.href = waUrl;
    if (instantWaBtn) instantWaBtn.href = waUrl;
  }

  // Attach input & change listeners
  form.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', updateWhatsappLinks);
    input.addEventListener('change', updateWhatsappLinks);
  });

  // Preset Chips Handler
  document.querySelectorAll('.preset-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const serviceName = chip.getAttribute('data-service');
      const typeName = chip.getAttribute('data-type');

      // Toggle active class on chips
      document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      if (serviceName) {
        const checkbox = Array.from(document.querySelectorAll('input[name="services"]'))
          .find(cb => cb.value.toLowerCase().includes(serviceName.toLowerCase()) || serviceName.toLowerCase().includes(cb.value.toLowerCase()));
        if (checkbox) checkbox.checked = true;
      }

      if (typeName) {
        const selectEl = document.getElementById('quoteType');
        if (selectEl) {
          const matchingOpt = Array.from(selectEl.options).find(opt => opt.value.toLowerCase().includes(typeName.toLowerCase()));
          if (matchingOpt) selectEl.value = matchingOpt.value;
        }
      }

      updateWhatsappLinks();
      showToast(`Selected service: ${serviceName || typeName} ✨`);
    });
  });

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
    const eventType = document.getElementById('quoteType')?.value || '';
    const notes = document.getElementById('quoteNotes')?.value.trim() || '';

    const serviceBoxes = document.querySelectorAll('input[name="services"]:checked');
    const services = Array.from(serviceBoxes).map(cb => cb.value);

    const whatsappUrl = directWaBtn?.href || `https://wa.me/97471716286?text=${encodeURIComponent(getFormattedMessage())}`;

    // Show Toast Confirmation
    showToast("Quote Request Formatted! Opening WhatsApp... ✨");

    // Display In-Page Success Card
    if (successCard) {
      successCard.innerHTML = `
        <div class="success-card-content text-center">
          <div class="success-icon-badge">🎉</div>
          <h3 class="success-title">Quote Request Ready!</h3>
          <p class="success-subtitle">Thank you, <strong>${escapeHtml(name)}</strong>! We have formatted your event inquiry for Spark Joy Event Management Qatar.</p>
          
          <div class="quote-summary-box">
            <div class="summary-item"><strong>Name:</strong> ${escapeHtml(name)}</div>
            <div class="summary-item"><strong>Phone / WhatsApp:</strong> ${escapeHtml(phone)}</div>
            ${services.length ? `<div class="summary-item"><strong>Services Needed:</strong> ${escapeHtml(services.join(', '))}</div>` : ''}
            ${eventType ? `<div class="summary-item"><strong>Event Type:</strong> ${escapeHtml(eventType)}</div>` : ''}
            ${notes ? `<div class="summary-item"><strong>Notes:</strong> ${escapeHtml(notes)}</div>` : ''}
          </div>

          <div class="success-actions">
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-block-sm" style="padding: 16px 24px; font-weight: 700;">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 6px;">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 13.85 2.5 15.58 3.38 17.08L2 22L7.08 20.62C8.54 21.5 10.22 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C10.42 20 8.93 19.57 7.64 18.82L7.33 18.63L4.31 19.42L5.11 16.48L4.9 16.15C4.08 14.82 3.65 13.27 3.65 11.65C3.65 7.04 7.39 3.3 12 3.3C16.61 3.3 20.35 7.04 20.35 11.65C20.35 16.26 16.61 20 12 20ZM16.32 14.18C16.08 14.06 14.9 13.48 14.68 13.4C14.46 13.32 14.3 13.28 14.14 13.52C13.98 13.76 13.52 14.3 13.38 14.46C13.24 14.62 13.1 14.64 12.86 14.52C12.62 14.4 11.85 14.15 10.94 13.34C10.23 12.71 9.75 11.93 9.61 11.69C9.47 11.45 9.6 11.32 9.72 11.2C9.83 11.09 9.97 10.91 10.09 10.77C10.21 10.63 10.37 10.07 10.31 9.95C10.25 9.83 9.79 8.7 9.6 8.24C9.41 7.79 9.22 7.85 9.08 7.84C8.95 7.83 8.8 7.83 8.65 7.83C8.5 7.83 8.26 7.89 8.06 8.11C7.86 8.33 7.3 8.85 7.3 9.92C7.3 10.99 8.08 12.02 8.19 12.17C8.3 12.32 9.72 14.5 11.91 15.45C12.43 15.68 12.84 15.82 13.16 15.92C13.8 16.12 14.38 16.09 14.84 16.02C15.35 15.94 16.41 15.38 16.63 14.76C16.85 14.14 16.85 13.61 16.78 13.5C16.72 13.38 16.56 13.3 16.32 14.18Z"/>
              </svg>
              TAP TO OPEN WHATSAPP CHAT NOW
            </a>
            <button type="button" id="resetQuoteBtn" class="btn btn-outline btn-sm" style="margin-top: 10px;">Send Another Inquiry</button>
          </div>
        </div>
      `;
      form.classList.add('hidden');
      successCard.classList.remove('hidden');

      const resetBtn = document.getElementById('resetQuoteBtn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          form.reset();
          document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
          form.classList.remove('hidden');
          successCard.classList.add('hidden');
          const notice = document.getElementById('serviceSelectedNotice');
          if (notice) notice.classList.add('hidden');
          updateWhatsappLinks();
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
  updateWhatsappLinks();
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

      const serviceName = btn.getAttribute('data-service');
      const notesInput = document.getElementById('quoteNotes');

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
            const quickMsg = encodeURIComponent(`Hello Spark Joy Event Management! ✨ I am asking for a quotation for ${serviceName} in Qatar.`);
            instantWhatsappBtn.href = `https://wa.me/97471716286?text=${quickMsg}`;
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
   10. Language Switcher (English / Arabic i18n)
   ========================================================================== */
const I18N_TRANSLATIONS = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_services: "Services",
    nav_gallery: "Social Gallery",
    nav_contact: "Contact",
    nav_quote_btn: "✨ REQUEST A QUOTE",
    lang_btn: "🌐 العربية",

    hero_tag: "PREMIER CHILDREN'S EVENT MANAGEMENT IN QATAR",
    hero_title1: "Creating Magical",
    hero_title2: "Spark Joy",
    hero_title3: "Moments for Kids",
    hero_sub: "Custom piñatas, themed birthday celebrations, kids' workshops & bespoke party packages delivered across Doha & Qatar.",
    hero_btn_quote: "✨ REQUEST A QUOTE",
    hero_btn_whatsapp: "💬 CHAT ON WHATSAPP",
    hero_badge_rating: "4.9/5 Rating across Qatar Events",
    hero_card1_title: "Custom Piñatas",
    hero_card1_sub: "100% Handcrafted in Qatar",
    hero_card2_title: "Kids' Workshops",
    hero_card2_sub: "Slime & Cookie decorating",

    about_tag: "ABOUT OUR BUSINESS",
    about_title: "Welcome to Spark Joy Qatar",
    about_text: "Spark Joy Event Management is dedicated to creating fun, creative and unforgettable experiences for children and families across Qatar. From colorful birthday celebrations to themed parties and special events, we take care of all details so parents can simply enjoy the moment.",
    about_feat1: "Bespoke Event Themes",
    about_feat2: "Qatar Location Experts",
    about_feat3: "Handcrafted Piñatas",
    about_feat4: "Stress-Free Planning",
    about_cta: "CONTACT US TODAY",

    services_tag: "WHAT WE OFFER",
    services_title: "Our Event Services",
    services_subtitle: "Everything you need to turn your child's celebration into a magical memory in Qatar.",
    service1_badge: "8 Real Samples",
    service1_title: "Custom Piñatas",
    service1_desc: "Handcrafted 3D and round character piñatas built in-house in Qatar to match your exact party theme — featuring Minecraft Creeper, Frozen, Squishmallow Axolotl, Stitch & Angel, Bluey, Olaf, Superman, and Mermaid.",
    service1_samples: "✨ SAMPLE DESIGNS (Tap to enlarge):",
    service2_badge: "Workshops & Crafts",
    service2_title: "Kids’ Workshops & Arts Crafts",
    service2_desc: "Fun, interactive learning workshops and creative activity stations — including cookie decorating, slime making, salt painting, clay sculpting, squishy painting, canvas art, toy crafting, and mask painting guided by friendly instructors.",
    service2_samples: "🎨 WORKSHOP KITS (Tap to enlarge):",
    service3_badge: "Favors",
    service3_title: "Custom Goodie Bags",
    service3_desc: "Personalized giveaway bags loaded with custom coloring books, markers, slime tubs, bubbles, and themed party favors for every guest.",
    service3_samples: "🛍️ FAVOR THEMES (Tap to enlarge):",
    service4_badge: "School Flyers",
    service4_title: "School Events & Workshops",
    service4_desc: "Exciting school fun days, graduation celebrations, class activity booths, and 1-hour creative workshop packages tailored for Qatar schools and nurseries.",
    service4_samples: "🏫 SCHOOL FLYERS & WORKSHOPS (Tap to enlarge):",
    service_btn_quote: "ASK FOR A QUOTE",

    why_tag: "THE SPARK JOY DIFFERENCE",
    why_title: "Why Parents in Qatar Choose Spark Joy",
    why_subtitle: "We combine creative magic with seamless professional management for stress-free celebrations.",
    why1_title: "Creative & Unique Concepts",
    why1_desc: "Innovative party themes, custom decorations, and imaginative activity ideas crafted for every child in Qatar.",
    why2_title: "Customized Events",
    why2_desc: "Every detail is tailored specifically around your preferences, child's age, and favorite characters.",
    why3_title: "Fun & Engaging Activities",
    why3_desc: "Hands-on workshops and games that keep little guests happy, active, and entertained throughout.",
    why4_title: "Attention to Detail",
    why4_desc: "Meticulous care in every element, from personalized goodie bags to color-coordinated balloon setups.",
    why5_title: "Family-Friendly Experience",
    why5_desc: "A warm, welcoming, and safe environment designed for kids and families to create cherished memories.",
    why6_title: "Professional Event Management",
    why6_desc: "Reliable, punctual, and comprehensive coordination so parents can relax and enjoy the moment.",

    how_tag: "SIMPLE PROCESS",
    how_title: "Making Your Celebration Easy",
    how_subtitle: "Four easy steps to plan your child's dream event in Qatar without stress.",
    step1_title: "Tell Us Your Ideas",
    step1_desc: "Share your event date, child's age, guest count, and theme ideas via WhatsApp or our quote form.",
    step2_title: "Choose Theme & Services",
    step2_desc: "Select from custom themes, workshops, piñatas, goodie bags, and activity stations in Qatar.",
    step3_title: "We Plan Everything",
    step3_desc: "Our team handles crafting, styling, supplies, and complete setup with meticulous attention to detail.",
    step4_title: "You Enjoy the Celebration!",
    step4_desc: "Sit back, relax, and create unforgettable joyful memories with your family and little guests.",

    social_tag: "SOCIAL GALLERY",
    social_title: "See More Spark Joy Moments ✨",
    social_subtitle: "Follow us on Instagram for our latest events, decorations, ideas and inspiration in Qatar.",
    insta_caption1: "Custom Handcrafted Piñatas",
    insta_caption2: "Kids Workshops",
    insta_caption3: "Slime & Clay Craft Station",
    insta_caption4: "Custom Favors & Goodies",
    insta_caption5: "Creative Party Stations",
    insta_caption6: "Event Highlights",
    social_follow_btn: "FOLLOW @JOJO.SPARK.JOY",

    contact_tag: "GET IN TOUCH",
    contact_title: "Let's Create Something Magical",
    contact_subtitle: "Fill out your event details below and we will send a customized proposal directly to your WhatsApp in Qatar.",
    quick_preset_label: "⚡ QUICK SELECT SERVICE:",
    chip_pinatas: "🪅 Custom Piñatas",
    chip_workshops: "🎨 Kids' Workshops",
    chip_goodies: "🛍️ Goodie Bags",
    chip_school: "🏫 School Events",
    chip_crafts: "🖌️ Arts & Crafts",
    notice_tag: "SERVICE SELECTED",
    notice_desc: "Fill out your details below or tap the button to chat with us instantly on WhatsApp!",
    chat_whatsapp_btn: "CHAT ON WHATSAPP",

    form_label_name: "Name *",
    form_placeholder_name: "Your Full Name",
    form_label_phone: "Phone Number / WhatsApp *",
    form_placeholder_phone: "+974 XXXX XXXX",
    form_label_email: "Email Address",
    form_placeholder_email: "yourname@domain.com",
    form_label_date: "Event Date",
    form_label_event_type: "Event Type",
    opt_select_type: "Select Event Type",
    opt_birthday: "Birthday Party",
    opt_workshop: "Kids' Workshop",
    opt_school: "School Event",
    opt_corporate: "Corporate Children's Event",
    opt_other: "Other Celebration",
    form_label_age: "Child's Age",
    form_placeholder_age: "e.g. 5 Years Old",
    form_label_guests: "Number of Guests",
    form_placeholder_guests: "e.g. 25 Children",
    form_label_theme: "Preferred Theme",
    form_placeholder_theme: "e.g. Frozen, Bluey, Fairies, Superhero",
    form_label_services: "Services Needed",
    chk_pinatas: "Custom Piñatas",
    chk_workshops: "Kids’ Workshops",
    chk_goodies: "Custom Goodie Bags",
    chk_crafts: "Arts & Crafts Activities",
    chk_school: "School Events",
    chk_corporate: "Corporate Children's Events",
    form_label_notes: "Additional Requirements / Venue Location in Qatar",
    form_placeholder_notes: "Tell us more about your venue in Qatar, special requests, or preferred timeline...",
    form_btn_submit: "✨ REQUEST A QUOTE NOW",
    or_divider: "— OR FOR INSTANT RESPONSE —",
    btn_instant_wa_quote: "💬 CHAT INSTANTLY ON WHATSAPP (+974 7171 6286)",

    footer_tagline: '"Creating magical moments, one celebration at a time. ✨"',
    footer_desc: "Premier children's event management company based in Qatar, specializing in bespoke birthday parties, custom piñatas, and creative workshops.",
    footer_col1_title: "Quick Links",
    footer_col2_title: "Our Services",
    footer_col3_title: "Contact Us",
    location_doha: "Doha, Qatar",
    footer_copyright: "© 2026 Spark Joy Event Management. All rights reserved."
  },

  ar: {
    nav_home: "الرئيسية",
    nav_about: "من نحن",
    nav_services: "خدماتنا",
    nav_gallery: "معرض الصور",
    nav_contact: "اتصل بنا",
    nav_quote_btn: "✨ طلب عرض سعر",
    lang_btn: "🌐 English",

    hero_tag: "الشركة الرائدة لتنظيم فعاليات الأطفال في قطر",
    hero_title1: "صناعة لحظات",
    hero_title2: "سبارك جوي",
    hero_title3: "السحرية للأطفال",
    hero_sub: "بينياتا مخصصة، أعياد ميلاد مميزة، ورش عمل للأطفال وباقات حفلات فريدة في الدوحة وجميع أنحاء قطر.",
    hero_btn_quote: "✨ طلب عرض سعر",
    hero_btn_whatsapp: "💬 المحادثة عبر واتساب",
    hero_badge_rating: "تقييم 4.9/5 في جميع فعاليات قطر",
    hero_card1_title: "بينياتا مخصصة",
    hero_card1_sub: "مصنوعة يدوياً 100% في قطر",
    hero_card2_title: "ورش عمل للأطفال",
    hero_card2_sub: "تزيين الكوكيز وصنع السلايم",

    about_tag: "عن شركتنا",
    about_title: "أهلاً بكم في سبارك جوي قطر",
    about_text: "تكرس سبارك جوي لتنظيم الفعاليات جهودها لخلق تجارب ممتعة ومبتكرة ولا تُنسى للأطفال والعائلات في قطر. من أعياد الميلاد الملونة إلى الحفلات والفعاليات الخاصة، ننظم جميع التفاصيل ليستمتع الوالدان بكل لحظة.",
    about_feat1: "ثيمات حفلات مخصصة",
    about_feat2: "خبراء فعاليات قطر",
    about_feat3: "بينياتا يدوية الصنع",
    about_feat4: "تخطيط سلس ومريح",
    about_cta: "تواصل معنا اليوم",

    services_tag: "ما نقدمه",
    services_title: "خدمات الفعاليات",
    services_subtitle: "كل ما تحتاجه لتحويل احتفال طفلك إلى ذكرى سحرية في قطر.",
    service1_badge: "8 نماذج حقيقية",
    service1_title: "بينياتا مخصصة",
    service1_desc: "بينياتا مخصصة ثلاثية الأبعاد وشخصيات كرتونية مصنوعة يدوياً في قطر لتناسب ثيم حفلتك تماماً — بما في ذلك ماينكرافت، فروزن، أكسولوتل، ستيتش، بلوي، أولاف، سوبرمان والعروسة.",
    service1_samples: "✨ تصاميم نموذجية (اضغط للتكبير):",
    service2_badge: "ورش عمل وأنشطة",
    service2_title: "ورش عمل وأنشطة فنية للأطفال",
    service2_desc: "ورش عمل تفاعلية ومحطات أنشطة مبتكرة — تشمل تزيين الكوكيز، صنع السلايم، الرسم بالملح، النحت بالصلصال، وتلوين الأقنعة برعاية مدربين متخصصين.",
    service2_samples: "🎨 أدوات ورش العمل (اضغط للتكبير):",
    service3_badge: "توزيعات وهدايا",
    service3_title: "أكياس هدايا وتوزيعات مخصصة",
    service3_desc: "أكياس هدايا مخصصة مليئة بكتب التلوين، الأقلام، السلايم، الفقاعات، وهدايا الحفلات المميزة لكل ضيف.",
    service3_samples: "🛍️ ثيمات التوزيعات (اضغط للتكبير):",
    service4_badge: "منشورات المدارس",
    service4_title: "فعاليات وورش المدارس",
    service4_desc: "أيام ترفيهية مدرسية، احتفالات التخرج، أكشاك أنشطة، وباقات ورش عمل إبداعية مخصصة لمدارس وحضانات قطر.",
    service4_samples: "🏫 منشورات وورش المدارس (اضغط للتكبير):",
    service_btn_quote: "طلب عرض سعر",

    why_tag: "تميز سبارك جوي",
    why_title: "لماذا يختارنا أولياء الأمور في قطر",
    why_subtitle: "نجمع بين السحر الإبداعي والتنظيم الاحترافي لضمان احتفالات خالية من التوتر.",
    why1_title: "أفكار إبداعية وفريدة",
    why1_desc: "ثيمات حفلات مبتكرة وديكورات مخصصة وأنشطة خيالية مصممة لكل طفل في قطر.",
    why2_title: "فعاليات مخصصة بالكامل",
    why2_desc: "كل تفصيلة مصممة خصيصاً حسب تفضيلاتكم، عمر طفلكم، وشخصياته المفضلة.",
    why3_title: "أنشطة ممتعة وتفاعلية",
    why3_desc: "ورش عمل وألعاب تفاعلية تبقي ضيوفكم الصغار في قمة السعادة والنشاط.",
    why4_title: "اهتمام دقيق بالتفاصيل",
    why4_desc: "عناية فائقة بكل عنصر، من هدايا التوزيعات المخصصة إلى تنسيق البالونات.",
    why5_title: "تجربة عائلية ممتعة",
    why5_desc: "بيئة دافئة وآمنة مصممة للأطفال والعائلات لخلق أجمل الذكريات.",
    why6_title: "إدارة احترافية للفعاليات",
    why6_desc: "تنظيم موثوق ودقيق في المواعيد ليتفرغ الوالدان للاستمتاع باللحظة.",

    how_tag: "خطوات بسيطة",
    how_title: "نجعل احتفالكم سهلاً وممتعاً",
    how_subtitle: "أربع خطوات سهلة لتخطيط حفلة أحلام طفلك في قطر بدون أي عناء.",
    step1_title: "شاركنا أفكارك",
    step1_desc: "أرسل تاريخ الحفل، عمر الطفل، عدد الضيوف وأفكار الثيم عبر الواتساب أو نموذج الطلب.",
    step2_title: "اختر الثيم والخدمات",
    step2_desc: "اختر من بين الثيمات المخصصة، ورش العمل، البينياتا، أكياس الهدايا، ومحطات الأنشطة.",
    step3_title: "نحن نتكفل بكل شيء",
    step3_desc: "يتكفل فريقنا بالصناعة، والتنسيق، والتجهيزات، والتركيب الكامل بكل دقة.",
    step4_title: "استمتع بالاحتفال!",
    step4_desc: "استرخِ واصنع ذكريات سعيدة لا تُنسى مع عائلتك وضيوفك الصغار.",

    social_tag: "المعرض الاجتماعي",
    social_title: "شاهد المزيد من لحظات سبارك جوي ✨",
    social_subtitle: "تابعونا على إنستغرام لردود الأفعال، الأفكار والديكورات الحديثة في قطر.",
    insta_caption1: "بينياتا مخصصة يدوياً",
    insta_caption2: "ورش عمل للأطفال",
    insta_caption3: "محطة السلايم والصلصال",
    insta_caption4: "توزيعات وهدايا مخصصة",
    insta_caption5: "محطات حفلات إبداعية",
    insta_caption6: "أبرز ملامح الفعاليات",
    social_follow_btn: "متابعة @JOJO.SPARK.JOY",

    contact_tag: "تواصل معنا",
    contact_title: "لنصنع شيئاً ساحراً معاً",
    contact_subtitle: "أدخل بيانات فعاليتك أدناه وسنرسل لك عرض سعر مخصص مباشرة على الواتساب.",
    quick_preset_label: "⚡ اختر الخدمة بشكل سريع:",
    chip_pinatas: "🪅 بينياتا مخصصة",
    chip_workshops: "🎨 ورش عمل للأطفال",
    chip_goodies: "🛍️ أكياس هدايا",
    chip_school: "🏫 فعاليات المدارس",
    chip_crafts: "🖌️ أشغال يدوية",
    notice_tag: "الخدمة المحددة",
    notice_desc: "أدخل بياناتك أدناه أو اضغط على الزر للمحادثة المباشرة عبر الواتساب!",
    chat_whatsapp_btn: "المحادثة عبر الواتساب",

    form_label_name: "الاسم *",
    form_placeholder_name: "اسمك الكامل",
    form_label_phone: "رقم الهاتف / الواتساب *",
    form_placeholder_phone: "+974 XXXX XXXX",
    form_label_email: "البريد الإلكتروني",
    form_placeholder_email: "yourname@domain.com",
    form_label_date: "تاريخ الفعالية",
    form_label_event_type: "نوع الفعالية",
    opt_select_type: "اختر نوع الفعالية",
    opt_birthday: "حفلة عيد ميلاد",
    opt_workshop: "ورشة عمل للأطفال",
    opt_school: "فعالية مدرسية",
    opt_corporate: "فعالية أطفال للشركات",
    opt_other: "احتفال آخر",
    form_label_age: "عمر الطفل",
    form_placeholder_age: "مثلاً: 5 سنوات",
    form_label_guests: "عدد الضيوف",
    form_placeholder_guests: "مثلاً: 25 طفلاً",
    form_label_theme: "الثيم المفضل",
    form_placeholder_theme: "مثلاً: فروزن، بلوي، سوبرمان",
    form_label_services: "الخدمات المطلوبة",
    chk_pinatas: "بينياتا مخصصة",
    chk_workshops: "ورش عمل للأطفال",
    chk_goodies: "أكياس هدايا مخصصة",
    chk_crafts: "أنشطة أشغال يدوية وفنون",
    chk_school: "فعاليات المدارس",
    chk_corporate: "فعاليات الشركات للأطفال",
    form_label_notes: "متطلبات إضافية / موقع الحفل في قطر",
    form_placeholder_notes: "أخبرنا المزيد عن موقع الحفل في قطر، أو أي طلبات خاصة...",
    form_btn_submit: "✨ طلب عرض سعر الآن",
    or_divider: "— أو للاستجابة الفورية —",
    btn_instant_wa_quote: "💬 محادثة فورية عبر الواتساب (+974 7171 6286)",

    footer_tagline: '"نصنع لحظات سحرية، احتفالاً تلو الآخر. ✨"',
    footer_desc: "الشركة الرائدة في تنظيم فعاليات الأطفال في قطر، المتخصصة في أعياد الميلاد المخصصة، البينياتا، وورش العمل.",
    footer_col1_title: "روابط سريعة",
    footer_col2_title: "خدماتنا",
    footer_col3_title: "اتصل بنا",
    location_doha: "الدوحة، قطر",
    footer_copyright: "© 2026 سبارك جوي لتنظيم الفعاليات. جميع الحقوق محفوظة."
  }
};

let currentLang = localStorage.getItem('sparkjoy_lang') || 'en';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('sparkjoy_lang', lang);

  // Set document direction and lang attribute
  if (lang === 'ar') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', 'en');
  }

  // Update text content for elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (I18N_TRANSLATIONS[lang] && I18N_TRANSLATIONS[lang][key]) {
      el.textContent = I18N_TRANSLATIONS[lang][key];
    }
  });

  // Update placeholders for inputs/textareas with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (I18N_TRANSLATIONS[lang] && I18N_TRANSLATIONS[lang][key]) {
      el.placeholder = I18N_TRANSLATIONS[lang][key];
    }
  });

  // Update language switcher buttons text
  const desktopBtn = document.getElementById('langSwitcherBtnDesktop');
  const mobileBtn = document.getElementById('langSwitcherBtnMobile');
  if (desktopBtn) {
    desktopBtn.textContent = lang === 'ar' ? '🌐 English' : '🌐 العربية';
  }
  if (mobileBtn) {
    mobileBtn.textContent = lang === 'ar' ? '🌐 English' : '🌐 العربية';
  }
}

function initLanguageSwitcher() {
  const desktopBtn = document.getElementById('langSwitcherBtnDesktop');
  const mobileBtn = document.getElementById('langSwitcherBtnMobile');

  const toggleLanguage = () => {
    const nextLang = currentLang === 'en' ? 'ar' : 'en';
    setLanguage(nextLang);
  };

  if (desktopBtn) desktopBtn.addEventListener('click', toggleLanguage);
  if (mobileBtn) mobileBtn.addEventListener('click', toggleLanguage);

  // Initial application of saved language
  setLanguage(currentLang);
}

