# 🌐 Portofolio Frontend Developer – Galuh.dev

Portofolio web modern, responsif, dan *ATS-Friendly* yang dirancang khusus untuk posisi **Frontend Developer**. Dibuat dengan arsitektur **HTML5 Semantik**, **Modern Vanilla CSS (Glassmorphism & Theme Tokens)**, dan **Vanilla JavaScript** tanpa dependensi eksternal yang berat.

---

## ✨ Fitur Utama

1. **Dark & Light Mode Switcher** – Dilengkapi penyimpanan *preference* di `localStorage`.
2. **Interactive Project Case Studies & Modal** – Tampilan detail masalah, solusi arsitektur frontend, tech stack, dan metrik hasil (Lighthouse & load time).
3. **Dynamic Category Filters** – Memfilter proyek berdasarkan kategori (*All, E-Commerce, SaaS & Dashboard*).
4. **1-Click Copy Contact & Toast Notification** – Fitur instan untuk menyalin alamat email atau profil dengan konfirmasi visual.
5. **Interactive Number Counter** – Animasi kenaikan angka statistik pada saat halaman di-*scroll*.
6. **Mobile-Responsive Drawer Navigation** – Navigasi mulus pada seluruh ukuran layar (*Mobile, Tablet, Desktop*).
7. **Clean Code & Accessible (A11y)** – Menggunakan HTML semantik dan standar aksesibilitas WCAG.

---

## 📂 Struktur File

```
portofolio-galuh/
├── index.html                   # Struktur HTML5, SEO Meta Tags, dan Konten Portofolio
├── style.css                    # Sistem Desain CSS, Variabel Warna, Layout Showcase, dan Animasi
├── script.js                    # Logika Interaktif (Mode Gelap/Terang, Modal, Mockup Switcher, Filter, Copy)
├── assets/                      # Gambar profil, visual organ Brain IPA, dan sertifikat resmi (Core Initiative, BNSP, CAMP404, LSP Odoo)
├── brainipa/                    # Proyek Real Case 1: Brain IPA (Pure JS EdTech App)
├── VIX_CI_FE_Galuh Wibowo/     # Proyek Real Case 2: E-Commerce Product Catalog (Vue.js & FakeStore API)
└── README.md                    # Panduan dan Dokumentasi Portofolio
```

---

## 🏆 Studi Kasus Nyata (Real Case Projects)

1. **Brain IPA – Media Pembelajaran Interaktif Sistem Organ Manusia**
   - *Tech Stack:* Vanilla JavaScript (3.900+ baris), HTML5 Semantik, CSS3 Modern, Web Audio API.
   - *Fitur:* 5 modul materi biologi, visualisasi organ tubuh interaktif, 5 mini-game, dan 10 kuis dengan audio responsif.
2. **E-Commerce Product Catalog – Dynamic Theming & REST API**
   - *Tech Stack:* Vue.js 2.7, Vite, FakeStore REST API, CSS Custom Properties (Dynamic Theming).
   - **Visual Mockup Holografik Berkinerja Tinggi**: Mengganti kotak preview flat sebelumnya dengan panggung cyber holografik gelap yang mewah (*matching* dengan Brain IPA), dilengkapi:
  - Pencahayaan *ambient glow* dinamis (Electric Blue untuk Men's, Neon Fuchsia untuk Women's, Amber Warning untuk Unavailable).
  - Grafis vektor 3D beranimasi halus (*floating animation*) yang bebas ketergantungan koneksi gambar luar.
  - Pin penanda interaktif (*hotspot pills*) bercahaya neon yang menampilkan harga, rating, dan status tema CSS `#002772` / `#720060`.
   - *Fitur:* Dynamic color theming (Men/Women/Unavailable), penanganan asynchronous lifecycle data, dan custom rating circles.

---

## 🚀 Cara Menjalankan

Anda dapat langsung membuka file `index.html` di browser Anda:
1. **Langsung:** Klik dua kali file `index.html`.
2. **Live Server (VS Code / Extension):** Klik kanan pada `index.html` lalu pilih *Open with Live Server*.
3. **NPM / NPX (Opsional):** Jalankan perintah `npx serve .` di terminal.
