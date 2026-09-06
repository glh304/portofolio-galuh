/**
 * PORTFOLIO JAVASCRIPT LOGIC
 * Features: Theme Toggle, Project Filter, Modal Case Study,
 * 1-Click Copy with Toast, Stat Counter, Mobile Navigation, Scroll-Spy,
 * Page Loader, Custom Cursor, Scroll Progress, Scroll Reveal, 3D Tilt, Navbar Scroll
 */

/* ============================================================
   PREMIUM FEATURES (run immediately, before DOMContentLoaded)
   ============================================================ */

// ---- 1. Custom Cursor ----
(function initCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;
  let rafId;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    rafId = requestAnimationFrame(animateRing);
  }
  animateRing();

  // Enlarge ring on interactive elements
  const hoverTargets = 'a, button, .tilt-card, .skill-tag, .filter-btn, .cert-filter-btn, .h-switch-btn, .copy-btn, .channel-arrow, .cert-img-container, .view-cert-btn';
  document.querySelectorAll(hoverTargets).forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });

  // Hide cursor when leaving window
  document.addEventListener('mouseleave', () => {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    dot.style.opacity = '1';
    ring.style.opacity = '1';
  });
})();

// ---- 2. Scroll Progress Bar ----
(function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const scrollTop    = window.scrollY;
    const docHeight    = document.documentElement.scrollHeight - window.innerHeight;
    const pct          = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width    = pct + '%';
  }, { passive: true });
})();

// ---- 3. Navbar Scroll Shadow ----
(function initNavbarScroll() {
  const header = document.getElementById('header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
})();

// ---- 4. Scroll Reveal (IntersectionObserver) ----
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));
})();

// ---- 5. 3D Card Tilt Effect ----
(function initTiltEffect() {
  const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
  if (isTouchDevice) return;

  const tiltCards = document.querySelectorAll('.tilt-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);  // -1 to 1
      const dy     = (e.clientY - cy) / (rect.height / 2);  // -1 to 1
      const rotateY =  dx * 6;   // max 6deg
      const rotateX = -dy * 4;   // max 4deg
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      card.style.boxShadow = `
        ${-rotateY * 1.5}px ${rotateX * 1.5}px 36px rgba(99,102,241,0.18),
        0 20px 60px rgba(0,0,0,0.35)
      `;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform  = '';
      card.style.boxShadow  = '';
    });
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  // ---- Page Loader: hide after animation completes ----
  const pageLoader = document.getElementById('page-loader');
  if (pageLoader) {
    const hideLoader = () => {
      // Use direct style instead of class — works even if external CSS hasn't loaded
      pageLoader.style.transition = 'opacity 0.6s ease, visibility 0.6s ease';
      pageLoader.style.opacity = '0';
      pageLoader.style.visibility = 'hidden';
      pageLoader.style.pointerEvents = 'none';
      setTimeout(() => { pageLoader.style.display = 'none'; }, 700);
    };
    // Hide after 1s (allows loader bar animation to finish) or on full page load
    const loaderTimer = setTimeout(hideLoader, 1000);
    window.addEventListener('load', () => {
      clearTimeout(loaderTimer);
      setTimeout(hideLoader, 200);
    });
    // Hard fallback: force hide after 4s no matter what
    setTimeout(hideLoader, 4000);
  }

  // Safe Storage helper (prevents crashing in Private/Incognito or restricted iframe environments)
  const safeStorage = {
    get(key) {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        return null;
      }
    },
    set(key, val) {
      try {
        localStorage.setItem(key, val);
      } catch (e) {}
    }
  };

  // --- 1. Theme Toggle (Dark/Light Mode) ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const mobileThemeBtn = document.getElementById('mobile-theme-btn');
  const htmlRoot = document.documentElement;

  // Retrieve saved preference or default to dark
  const savedTheme = safeStorage.get('portfolio-theme') || 'dark';
  htmlRoot.setAttribute('data-theme', savedTheme);

  function switchTheme() {
    const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlRoot.setAttribute('data-theme', newTheme);
    safeStorage.set('portfolio-theme', newTheme);
    showToast(`Beralih ke mode ${newTheme === 'dark' ? 'Gelap (Dark)' : 'Terang (Light)'}`);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switchTheme();
    });
  }

  if (mobileThemeBtn) {
    mobileThemeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      switchTheme();
    });
  }

  // --- 2. Mobile Drawer Navigation ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-drawer-cta, .mobile-drawer-wa');

  function openMobileMenu() {
    if (!mobileMenuBtn || !mobileDrawer) return;
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileMenuBtn || !mobileDrawer) return;
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function toggleMobileMenu(e) {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!mobileDrawer) return;
    if (mobileDrawer.classList.contains('open')) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close drawer on ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer && mobileDrawer.classList.contains('open')) {
      closeMobileMenu();
    }
  });

  // --- 2b. Project Category Filter Pills ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.horizontal-project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.classList.remove('hidden');
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // --- 3. Scoped Horizontal Project Tab Switcher ---
  const projectCardElements = document.querySelectorAll('.horizontal-project-card');

  projectCardElements.forEach(card => {
    const cardTabBtns = card.querySelectorAll('.h-tab-btn');
    const cardTabPanels = card.querySelectorAll('.h-tab-panel');

    cardTabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        cardTabBtns.forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        const targetTab = btn.getAttribute('data-tab');
        const cardKey = btn.getAttribute('data-card');

        cardTabPanels.forEach(panel => {
          panel.classList.remove('active');
        });

        const activePanel = card.querySelector(`#tab-${cardKey ? cardKey + '-' : ''}${targetTab}`);
        if (activePanel) {
          activePanel.classList.add('active');
        }
      });
    });
  });

  // --- 3b. Interactive Organ Switcher Showcase (Brain IPA) ---
  const switchBtns = document.querySelectorAll('.h-switch-btn:not(.ecom-switch-btn)');
  const showcaseImg = document.getElementById('showcase-organ-img');
  const hotspotLabel1 = document.getElementById('hotspot-label-1');
  const hotspotLabel2 = document.getElementById('hotspot-label-2');

  if (switchBtns.length > 0 && showcaseImg) {
    switchBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        switchBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const newImg = btn.getAttribute('data-organ');
        const p1 = btn.getAttribute('data-p1');
        const p2 = btn.getAttribute('data-p2');

        showcaseImg.style.opacity = '0';
        showcaseImg.style.transform = 'scale(0.85)';

        setTimeout(() => {
          showcaseImg.src = newImg;
          if (hotspotLabel1) hotspotLabel1.textContent = p1;
          if (hotspotLabel2) hotspotLabel2.textContent = p2;
          showcaseImg.style.opacity = '1';
          showcaseImg.style.transform = 'scale(1)';
        }, 150);
      });
    });
  }

  // --- 3c. Interactive E-Commerce Theme Switcher Showcase ---
  const ecomSwitchBtns = document.querySelectorAll('.ecom-switch-btn');
  const ecomCanvas = document.getElementById('ecom-canvas-theme');
  const ecomViews = document.querySelectorAll('.ecom-visual-view');

  if (ecomSwitchBtns.length > 0 && ecomCanvas) {
    ecomSwitchBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        ecomSwitchBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const theme = btn.getAttribute('data-ecom-theme');

        // Update canvas theme class
        ecomCanvas.classList.remove('theme-men', 'theme-women', 'theme-unavailable');
        ecomCanvas.classList.add(`theme-${theme}`);

        // Update active visual stage view
        ecomViews.forEach(v => v.classList.remove('active'));
        const targetView = document.getElementById(`ecom-view-${theme}`);
        if (targetView) {
          targetView.classList.add('active');
        }
      });
    });
  }

  // --- 4. Project Modal Case Study Data ---
  const caseStudyData = {
    brainipa: {
      title: 'Brain IPA – Media Pembelajaran Interaktif Sistem Organ Manusia',
      type: 'Interactive EdTech Web Application (SMP Kelas VIII)',
      overview: 'Brain IPA adalah aplikasi media pembelajaran mandiri dan interaktif yang dirancang untuk membantu siswa SMP memahami konsep biologi sistem organ manusia secara visual, terstruktur, dan menyenangkan.',
      problem: 'Buku teks statis sulit memvisualisasikan dinamika proses organ tubuh (misal: proses filtrasi ginjal atau siklus peredaran darah). Diperlukan aplikasi web tanpa ketergantungan koneksi berat yang dapat dijalankan secara instan di smartphone maupun desktop.',
      techStack: ['Vanilla JavaScript (ES6+)', 'HTML5 Semantik', 'Modern CSS3', 'Web Audio API', 'Resource Preload', 'PWA Architecture'],
      frontendArchitecture: [
        'Arsitektur multi-halaman berbasis vanilla JavaScript dengan lebih dari 3.900+ baris kode terstruktur.',
        '5 Modul Materi Interaktif (Organ Tubuh, Pencernaan, Pernapasan, Peredaran Darah, Ekskresi) dengan visualisasi diagram kaya grafis.',
        '5 Mini Games Edukasi dan 10 Kuis Pilihan Ganda dengan kalkulasi skor real-time dan feedback audio interaktif.',
        'Sistem Splashscreen dinamis dengan prefetching sumber daya untuk kecepatan perpindahan halaman tanpa jeda (0ms).',
        'Fitur Dark/Light Mode terintegrasi dan tata letak mobile-first yang responsif.'
      ],
      metrics: [
        '100% Native performa tinggi tanpa framework berat (First Contentful Paint < 0.8 detik)',
        'Meningkatkan pemahaman materi biologi siswa melalui penggabungan teori dan mini game interaktif',
        'Kinerja mulus 60 FPS pada animasi dan navigasi kuis'
      ]
    },
    ecommerce: {
      title: 'E-Commerce Product Catalog – Dynamic Theming & REST API',
      type: 'Virtual Internship Experience – Frontend Developer (Core Initiative)',
      overview: 'Aplikasi Single Page Application (SPA) katalog produk interaktif berbasis Vue.js 2.7 dan Vite yang mengonsumsi REST API FakeStore secara asinkron dengan fitur dynamic color theming otomatis berdasarkan kategori busana.',
      problem: 'Katalog belanja harus mampu beradaptasi terhadap perubahan kategori produk secara dinamis, mengelola siklus state pemuatan (loading skeleton/spinner), serta menangani fallback produk yang tidak termasuk kategori busana tanpa membuat antarmuka rusak.',
      techStack: ['Vue.js (v2.7)', 'Vite', 'FakeStore REST API', 'CSS Custom Properties / Theming', 'JavaScript (ES6+)', 'Responsive Layout'],
      frontendArchitecture: [
        'Dynamic Theming: Menggunakan computed properties Vue untuk mengotomatisasi switch tema warna (Men: Biru, Women: Ungu, Unavailable: Abu-abu).',
        'Asynchronous API Handling: Logika pemanggilan fetch() terenkapsulasi dengan blok try-catch-finally untuk penanganan loading state dan error yang stabil.',
        'Custom Rating Indicator: Komponen visual rating 5 lingkaran dinamis yang membaca data rating numerik dari API.',
        'Next Product Engine: Logika pergantian indeks produk secara sirkular (1–20) dengan fetching instan.',
        'Vite Optimized Bundling: Konfigurasi build Vite dengan plugin legacy polyfill untuk kompatibilitas peramban luas.'
      ],
      metrics: [
        'Zero Layout Shifts (CLS: 0) saat pergantian tema dan transisi data produk',
        'Memenuhi 100% acceptance criteria program Frontend Virtual Internship Experience (VIX)',
        'Desain adaptif mobile-first yang responsif dan fleksibel di berbagai perangkat'
      ]
    }
  };

  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');
  const viewDetailBtns = document.querySelectorAll('.view-detail-btn');

  viewDetailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projectId = btn.getAttribute('data-project');
      const data = caseStudyData[projectId];

      if (data) {
        modalTitle.textContent = data.title;
        modalBody.innerHTML = `
          <div style="margin-bottom: 1rem;">
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--accent-secondary); text-transform: uppercase;">${data.type}</span>
            <p style="margin-top: 0.5rem; color: var(--text-secondary); line-height: 1.6;">${data.overview}</p>
          </div>

          <div style="margin-bottom: 1.25rem; background: var(--bg-tertiary); padding: 1rem; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle);">
            <strong style="color: var(--text-primary); font-size: 0.9rem;">Tantangan &amp; Solusi Kunci:</strong>
            <p style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.35rem;">${data.problem}</p>
          </div>

          <div style="margin-bottom: 1.25rem;">
            <strong style="display: block; margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--text-primary);">Tech Stack:</strong>
            <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
              ${data.techStack.map(tech => `<span class="tech-pill">${tech}</span>`).join('')}
            </div>
          </div>

          <div style="margin-bottom: 1.25rem;">
            <strong style="display: block; margin-bottom: 0.5rem; font-size: 0.9rem; color: var(--text-primary);">Sorotan Arsitektur Frontend:</strong>
            <ul class="solution-list">
              ${data.frontendArchitecture.map(item => `<li>${item}</li>`).join('')}
            </ul>
          </div>

          <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: var(--radius-sm); padding: 1rem;">
            <strong style="color: #10b981; font-size: 0.9rem; display: block; margin-bottom: 0.4rem;">Dampak Bisnis &amp; Teknis:</strong>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.3rem;">
              ${data.metrics.map(m => `<li style="font-size: 0.85rem; color: var(--text-primary);">✓ ${m}</li>`).join('')}
            </ul>
          </div>
        `;
        projectModal.showModal();
      }
    });
  });

  modalCloseBtn.addEventListener('click', () => {
    projectModal.close();
  });

  // --- 4b. Certificate Modal Viewer ---
  const viewCertBtns = document.querySelectorAll('.view-cert-btn');
  viewCertBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const imgSrc = btn.getAttribute('data-img');
      const title = btn.getAttribute('data-title');
      const downloadName = btn.getAttribute('data-download') || 'Sertifikat_Galuh_Wibowo.jpg';
      const pdfSrc = btn.getAttribute('data-pdf');
      
      modalTitle.textContent = title || 'Sertifikat Resmi';
      modalBody.innerHTML = `
        <div style="text-align: center; padding: 0.5rem 0;">
          <img src="${imgSrc}" alt="${title}" style="width: 100%; max-height: 65vh; object-fit: contain; border-radius: var(--radius-sm); box-shadow: var(--shadow-md); margin-bottom: 1.25rem;">
          <div class="modal-cert-actions" style="display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap;">
            <a href="${imgSrc}" target="_blank" class="btn btn-sm btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
              <span>Buka Tab Baru</span>
            </a>
            <a href="${imgSrc}" download="${downloadName}" class="btn btn-sm btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
              <span>Unduh Gambar</span>
            </a>
            ${pdfSrc ? `
            <a href="${pdfSrc}" target="_blank" class="btn btn-sm btn-outline" style="border-color: rgba(99, 102, 241, 0.4); color: var(--accent-primary);">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              <span>Buka Dokumen PDF</span>
            </a>
            ` : ''}
          </div>
        </div>
      `;
      projectModal.showModal();
    });
  });

  // Close modal on click outside
  projectModal.addEventListener('click', (e) => {
    const dialogDimensions = projectModal.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      projectModal.close();
    }
  });

  // --- 4c. Certificate Category Filter ---
  const certFilterBtns = document.querySelectorAll('.cert-filter-btn');
  const certCards = document.querySelectorAll('#cert-cards-container .cert-card');

  certFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      certFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-cert-filter');
      certCards.forEach(card => {
        const category = card.getAttribute('data-cert-category');
        if (filter === 'all' || filter === category) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 5. 1-Click Copy to Clipboard ---
  const copyButtons = document.querySelectorAll('.copy-btn');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', async () => {
      const textToCopy = btn.getAttribute('data-copy');
      try {
        await navigator.clipboard.writeText(textToCopy);
        showToast(`"${textToCopy}" berhasil disalin!`);
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast(`"${textToCopy}" berhasil disalin!`);
      }
    });
  });

  // --- 6. CV Download Alert / Interaction ---
  const cvBtn = document.getElementById('btn-cv');
  if (cvBtn) {
    cvBtn.addEventListener('click', () => {
      showToast('Mengunduh CV_Galuh_Wibowo_Frontend_Developer.pdf...');
    });
  }

  // --- 7. Stat Counters Animation on Scroll ---
  const counters = document.querySelectorAll('.counter');
  let animated = false;

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const speed = 25;
          const increment = Math.ceil(target / 40);

          const updateCount = () => {
            count += increment;
            if (count >= target) {
              counter.textContent = target;
            } else {
              counter.textContent = count;
              setTimeout(updateCount, speed);
            }
          };
          updateCount();
        });
      }
    });
  }, { threshold: 0.5 });

  const heroStats = document.querySelector('.hero-stats');
  if (heroStats) {
    countObserver.observe(heroStats);
  }

  // --- 8. Scroll-Spy Navigation Indicator ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // --- 9. Direct WhatsApp Contact Form ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('name').value.trim();
      const emailInput = document.getElementById('email').value.trim();
      const msgInput = document.getElementById('message').value.trim();

      showToast(`Terima kasih ${nameInput}! Membuka WhatsApp...`);
      const waText = encodeURIComponent(`Halo Galuh, nama saya ${nameInput} (${emailInput}).\n\n${msgInput}`);
      const waUrl = `https://wa.me/628971629061?text=${waText}`;
      window.open(waUrl, '_blank');
      contactForm.reset();
    });
  }

  // --- 10. Back to Top Smooth Scroll ---
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --- Toast Helper Function ---
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  let toastTimer;

  function showToast(message) {
    if (!toast) return;
    toastMsg.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }
});
