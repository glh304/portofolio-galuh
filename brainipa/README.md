# 🧠 Brain IPA — Media Pembelajaran Interaktif Sistem Organ Manusia

Media pembelajaran interaktif berbasis web (Progressive Web App) untuk membantu siswa SMP Kelas VIII mempelajari sistem organ tubuh manusia secara visual, interaktif, dan aplikatif.

---

## 📚 Fitur Utama

| Fitur | Keterangan |
|---|---|
| 📖 **5 Materi Lengkap** | Organ Tubuh, Pencernaan, Pernapasan, Peredaran Darah, dan Ekskresi |
| 🎮 **5 Game Edukatif** | Interaktif drag & drop label organ anatomi (mendukung sentuhan layar HP) |
| 📝 **Kuis Pilihan Ganda** | 10 soal evaluasi pemahaman dengan timer dan skor langsung |
| 📚 **Kamus Istilah IPA** | Glosarium interaktif dengan fitur pencarian cepat & penyorotan kata kunci |
| 🎓 **Sertifikat Digital** | Generator sertifikat kelulusan dinamis berbasis HTML5 Canvas (unduh format PNG) |
| 🔊 **Narasi & Audio SFX** | Narasi suara ramah belajar serta efek suara interaktif |
| 📲 **Offline-First PWA** | Dapat diakses tanpa kuota internet dan di-install ke layar utama HP/laptop |
| 🌙 **Mode Gelap (Dark Mode)** | Tampilan nyaman di mata dengan penyimpanan preferensi otomatis |
| 📊 **Pelacak Progres** | Melacak progres baca materi dan latihan kuis |

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
