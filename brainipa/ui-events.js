/**
 * ui-events.js — Centralized UI Event Listeners (Brain IPA)
 * Menggantikan semua onclick inline di seluruh halaman (Pilar 3.C.4 & 3.C.5)
 * Diload oleh app.js atau langsung oleh setiap halaman
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- BACK BUTTONS -------------------------------------------
  const btnBack = document.querySelector('.btn-back');
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      const pageId = document.body.dataset.pageId;
      const backMap = {
        'page-home'              : 'indexhome.html',
        'page-developer'         : 'indexhome.html',
        'page-menu'              : 'indexhome.html',
        'page-materi'            : 'menu-materi.html',
        'page-game-menu'         : 'menu-materi.html',
        'page-game-pencernaan'   : 'permainan-interaktif.html',
        'page-game-pernapasan'   : 'permainan-interaktif.html',
        'page-game-peredaran'    : 'permainan-interaktif.html',
        'page-game-ekskresi'     : 'permainan-interaktif.html',
        'page-game-organ'        : 'permainan-interaktif.html',
        'page-quiz'              : 'permainan-interaktif.html',
      };
      const dest = backMap[pageId];
      if (!dest) return;

      // Halaman kuis perlu cancel timers dulu
      if (pageId === 'page-quiz' && typeof cancelAllGameTimers === 'function') {
        cancelAllGameTimers();
      }
      location.href = dest;
    });
  }

  // --- DARK MODE BUTTON ----------------------------------------
  const btnDark = document.querySelector('.btn-darkmode');
  if (btnDark && typeof toggleDarkMode === 'function') {
    btnDark.addEventListener('click', toggleDarkMode);
  }

  // Tombol dark mode halaman home (id spesifik)
  const btnHomeDark = document.getElementById('home-dark-btn');
  if (btnHomeDark && typeof toggleDarkMode === 'function') {
    btnHomeDark.addEventListener('click', toggleDarkMode);
  }

  // --- SFX BUTTON (halaman home) -------------------------------
  const btnSfx = document.getElementById('home-sfx-btn');
  if (btnSfx && typeof toggleSFX === 'function') {
    btnSfx.addEventListener('click', toggleSFX);
  }

  // --- NARASI / SOUND TOGGLE -----------------------------------
  const btnMenuSound = document.getElementById('menu-sound-toggle');
  if (btnMenuSound && typeof toggleMenuNarration === 'function') {
    btnMenuSound.addEventListener('click', toggleMenuNarration);
  }

  const btnGameSound = document.getElementById('game-menu-sound-toggle');
  if (btnGameSound && typeof toggleGameMenuNarration === 'function') {
    btnGameSound.addEventListener('click', toggleGameMenuNarration);
  }

  // --- HOME: MULAI BELAJAR -------------------------------------
  const btnPrimary = document.querySelector('.btn-primary');
  if (btnPrimary && typeof mulaiNarasi === 'function') {
    btnPrimary.addEventListener('click', mulaiNarasi);
  }

  // --- HOME: HALAMAN PENGEMBANG --------------------------------
  const btnDev = document.querySelector('.btn-dev');
  if (btnDev) {
    btnDev.addEventListener('click', () => { location.href = 'pengembang.html'; });
  }

  // --- MENU MATERI: MENU CARDS (navigasi via <a>) --------------
  // Handled by HTML <a href> tags — tidak perlu addEventListener di sini

  // --- MENU MATERI: RESET PROGRESS ----------------------------
  const btnResetAll = document.querySelector('[data-action="reset-all"]');
  if (btnResetAll && typeof resetAllProgress === 'function') {
    btnResetAll.addEventListener('click', resetAllProgress);
  }

  // --- PERMAINAN INTERAKTIF: RESET SCORE -----------------------
  const btnResetScore = document.querySelector('[data-action="reset-score"]');
  if (btnResetScore && typeof resetScoreOnly === 'function') {
    btnResetScore.addEventListener('click', resetScoreOnly);
  }

  // --- MENU MATERI: KAMUS BANNER -------------------------------
  const kamusBanner = document.querySelector('.kamus-banner');
  if (kamusBanner && typeof openKamusModal === 'function') {
    kamusBanner.addEventListener('click', openKamusModal);
    kamusBanner.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openKamusModal();
      }
    });
  }

  // --- MATERI HALAMAN: TAB SWITCHER ----------------------------
  const tabDiagram = document.getElementById('tab-btn-diagram');
  const tabMateri  = document.getElementById('tab-btn-materi');
  if (tabDiagram && typeof switchMateriTab === 'function') {
    tabDiagram.addEventListener('click', () => switchMateriTab('diagram'));
  }
  if (tabMateri && typeof switchMateriTab === 'function') {
    tabMateri.addEventListener('click', () => switchMateriTab('materi'));
  }

  // --- PENGEMBANG: EMAIL COPY + SHARE --------------------------
  const emailRow = document.querySelector('.dev-info-email');
  if (emailRow && typeof copyEmail === 'function') {
    emailRow.addEventListener('click', copyEmail);
  }

  const btnShare = document.querySelector('.dev-share-btn');
  if (btnShare && typeof shareApp === 'function') {
    btnShare.addEventListener('click', shareApp);
  }

});
