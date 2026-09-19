// splash.js — Logika Splash Screen Brain IPA
// Terpisah dari HTML sesuai standar produksi (Pilar 3.C.4 & 3.C.5)

document.body.classList.add('splash-active');

const steps = [
  { pct: 15, text: 'Memuat materi...' },
  { pct: 38, text: 'Menyiapkan animasi...' },
  { pct: 62, text: 'Memuat permainan...' },
  { pct: 85, text: 'Hampir selesai...' },
  { pct: 100, text: 'Siap!' },
];

const bar = document.getElementById('splash-bar');
const loadingText = document.getElementById('splash-loading-text');
const splash = document.getElementById('splash-screen');
const skipBtn = document.getElementById('splash-skip-btn');
let step = 0;
let isRedirecting = false;

function redirectToHome() {
  if (isRedirecting) return;
  isRedirecting = true;
  if (splash) splash.classList.add('splash-hide');
  document.body.classList.remove('splash-active');
  setTimeout(() => {
    window.location.replace('indexhome.html');
  }, 450);
}

function skipSplash() {
  redirectToHome();
}

function nextSplashStep() {
  if (isRedirecting) return;

  if (step >= steps.length) {
    setTimeout(redirectToHome, 400);
    return;
  }

  const currentStep = steps[step++];
  if (bar) {
    bar.style.width = currentStep.pct + '%';
    bar.classList.add('active');
  }
  if (loadingText) {
    loadingText.style.opacity = '0';
    setTimeout(() => {
      loadingText.textContent = currentStep.text;
      loadingText.style.opacity = '1';
    }, 150);
  }

  const delay = step === steps.length ? 450 : 280 + Math.random() * 200;
  setTimeout(nextSplashStep, delay);
}

// Event delegation — Izinkan klik di area splash untuk skip
if (splash) {
  splash.addEventListener('click', redirectToHome);
}

// Event listener tombol skip — tanpa inline onclick
if (skipBtn) {
  skipBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    skipSplash();
  });
}

setTimeout(nextSplashStep, 250);
setTimeout(redirectToHome, 5000);
