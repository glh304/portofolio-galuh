/**
 * pengembang.js — Logika halaman Pengembang (Brain IPA)
 * Dipisah dari pengembang.html sesuai Pilar 3.C.5
 */

function copyEmail() {
  const email = 'galuhwibowo304@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    showDevToast('Email berhasil disalin ke clipboard!');
  }).catch(() => {
    showDevToast('Email: ' + email);
  });
}

function shareApp() {
  if (navigator.share) {
    navigator.share({
      title: 'Brain IPA - Sistem Organ Manusia',
      text: 'Ayo belajar sistem organ manusia secara interaktif dengan aplikasi Brain IPA!',
      url: window.location.origin + window.location.pathname.replace('pengembang.html', 'indexhome.html')
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(window.location.href);
    showDevToast('Link aplikasi berhasil disalin!');
  }
}

function showDevToast(msg) {
  const toast = document.getElementById('dev-toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}
