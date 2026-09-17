# 🧠 Brain IPA — Media Pembelajaran Interaktif Sistem Organ Manusia

> Aplikasi web edukasi interaktif untuk siswa SMP Kelas VIII. Membantu pemahaman materi IPA secara visual, terstruktur, dan menyenangkan.

[![Version](https://img.shields.io/badge/Version-1.0.0-green?style=flat-square)]()
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)]()
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)]()

---

## 📚 Fitur Utama

| Fitur | Keterangan |
|-------|------------|
| 📖 **5 Materi Lengkap** | Organ Tubuh, Pencernaan, Pernapasan, Peredaran Darah, Ekskresi |
| 🎮 **5 Game Interaktif** | Drag & drop label organ ke diagram anatomi yang tepat |
| 📝 **Kuis Pilihan Ganda** | 10 soal acak dengan timer dan skor otomatis |
| 🔊 **Narasi Audio** | Penjelasan audio per materi dan menu |
| 🌙 **Dark Mode** | Toggle mode gelap/terang yang tersimpan otomatis |
| 📊 **Progress Tracking** | Melacak materi yang sudah dibaca & game yang dimainkan |
| 🎓 **Sertifikat Digital** | Generator sertifikat kelulusan berbasis HTML5 Canvas dengan unduh PNG |
| 📲 **PWA & Offline Mode** | Bisa di-install ke homescreen HP & dimainkan tanpa koneksi internet |
| 💯 **Splash Screen** | Loading screen animasi yang bisa di-skip |
| 📱 **Responsive** | Mendukung HP, tablet, dan desktop |

---

## 🏗️ Struktur Proyek

```
brainipa/
├── index.html                  # Splash screen
├── indexhome.html              # Halaman beranda
├── menu-materi.html            # Menu materi & progress
├── permainan-interaktif.html   # Menu game & kuis
├── pengembang.html             # Profil pengembang
├── organ-tubuh.html            # Materi organ tubuh
├── pencernaan.html             # Materi sistem pencernaan
├── pernapasan.html             # Materi sistem pernapasan
├── peredaran-darah.html        # Materi sistem peredaran darah
├── ekskresi.html               # Materi sistem ekskresi
├── game-organ-tubuh.html       # Game drag & drop organ
├── game-pencernaan.html        # Game drag & drop pencernaan
├── game-pernapasan.html        # Game drag & drop pernapasan
├── game-peredaran-darah.html   # Game drag & drop peredaran darah
├── game-ekskresi.html          # Game drag & drop ekskresi
├── kuis-pilihan-ganda.html     # Kuis pilihan ganda 10 soal
├── manifest.json               # Web App Manifest PWA
├── sw.js                       # Service Worker (Offline Cache)
├── app.js                      # Logika utama (~3.900 baris)
├── style.css                   # Semua styling (dark mode, responsif)
└── assets/
    ├── images/                 # Diagram anatomi, ikon PWA & foto organ
    └── audio/                  # Narasi audio per materi
```

---

## 🛠️ Teknologi

- **HTML5** — Struktur semantik multi-halaman
- **CSS3** — Custom properties, flexbox, grid, animasi, dark mode
- **Vanilla JavaScript** — Tanpa framework/library, logika murni
- **Progressive Web App (PWA)** — Web App Manifest, Service Worker & Cache Storage (Offline-First)
- **HTML5 Canvas API** — Generator sertifikat kelulusan dinamis & ekspor PNG
- **Web Audio API** — Narasi audio per materi dan efek suara synthesizer (SFX)
- **LocalStorage** — Menyimpan progress belajar & preferensi tema
- **Drag & Drop API** — Mekanisme game interaktif drag-and-drop & fallback klik

---

## 🎮 Cara Penggunaan

1. Buka index.html → Splash screen loading
2. Masuk ke Beranda → Klik Mulai Belajar
3. Pilih Materi → Pelajari diagram interaktif dengan klik organ
4. Pilih Game → Drag label organ ke posisi yang benar di diagram
5. Pilih Kuis Pilihan Ganda → Jawab 10 soal acak dalam waktu yang ditentukan

---

## 📝 Catatan Teknis

- Aplikasi ini dibangun **100% tanpa framework** (Pure HTML, CSS, JavaScript)
- Seluruh logika aplikasi terpusat di app.js (~3.900 baris)
- Data materi tersimpan sebagai JavaScript object (materiData) — pola data-driven rendering
- Game menggunakan **Drag & Drop API native browser** + fallback klik untuk mobile
- Progress belajar tersimpan di **localStorage** dan persisten antar sesi

---

## 👨‍💻 Pengembang

**Galuh Wibowo**
Mahasiswa S1 Sistem Informasi — Universitas Bina Sarana Informatika (UBSI)

- Email: galuhwibowo304@gmail.com
- LinkedIn: https://www.linkedin.com/in/galuh-wibowo
- GitHub: https://github.com/glh304

---

© 2026 Brain IPA — Galuh Wibowo
