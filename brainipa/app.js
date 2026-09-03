// ============ NAVIGATION ============
const PAGE_URLS = {
  'page-home': 'indexhome.html',
  'page-developer': 'pengembang.html',
  'page-menu': 'menu-materi.html',
  'page-game-menu': 'permainan-interaktif.html',
  'page-materi': 'organ-tubuh.html',
  'page-quiz': 'kuis-pilihan-ganda.html',
  'page-game-organ': 'game-organ-tubuh.html',
  'page-game-pencernaan': 'game-pencernaan.html',
  'page-game-pernapasan': 'game-pernapasan.html',
  'page-game-peredaran': 'game-peredaran-darah.html',
  'page-game-ekskresi': 'game-ekskresi.html',
};

const MATERI_URLS = {
  organ: 'organ-tubuh.html',
  pencernaan: 'pencernaan.html',
  pernapasan: 'pernapasan.html',
  peredaran: 'peredaran-darah.html',
  ekskresi: 'ekskresi.html',
};

function navigateToUrl(url) {
  if (!url) return;
  window.location.href = url;
}
function updatePageDebugLabel(pageId) {
  const label = document.getElementById('page-debug-label');
  if (!label) return;

  const pageNames = {
    'page-home': 'Halaman Beranda',
    'page-developer': 'Halaman Pengembang',
    'page-menu': 'Halaman Menu Materi',
    'page-game-menu': 'Halaman Permainan Interaktif',
    'page-game-organ': 'Halaman Game Organ Tubuh',
    'page-game-pencernaan': 'Halaman Game Pencernaan',
    'page-game-pernapasan': 'Halaman Game Pernapasan',
    'page-game-peredaran': 'Halaman Game Peredaran Darah',
    'page-game-ekskresi': 'Halaman Game Ekskresi',
    'page-materi': 'Halaman Materi',
    'page-quiz': 'Halaman Kuis Pilihan Ganda',
  };

  const materiPageNames = {
    organ: 'Halaman Organ Tubuh',
    pencernaan: 'Halaman Pencernaan',
    pernapasan: 'Halaman Pernapasan',
    peredaran: 'Halaman Peredaran Darah',
    ekskresi: 'Halaman Ekskresi',
  };

  if (pageId === 'page-materi' && activeMateri && materiData[activeMateri]) {
    label.textContent = materiPageNames[activeMateri] || ('Halaman ' + materiData[activeMateri].title);
    return;
  }

  label.textContent = pageNames[pageId] || pageId;
}

// Arah transisi berdasarkan hierarki halaman
const PAGE_DEPTH = {
  'page-home': 0,
  'page-developer': 1,
  'page-menu': 1,
  'page-game-menu': 2,
  'page-materi': 2,
  'page-game-organ': 3,
  'page-game-pencernaan': 3,
  'page-game-pernapasan': 3,
  'page-game-peredaran': 3,
  'page-game-ekskresi': 3,
  'page-quiz': 3,
};

let _currentPage = document.body.dataset.pageId || 'page-home';
let _transitioning = false;

function showPage(id) {
  if (id === _currentPage) {
    updatePageDebugLabel(id);
    window.scrollTo(0, 0);
    if (id === 'page-menu') setTimeout(updateProgressUI, 80);
    if (id === 'page-game-menu') setTimeout(updateGameMenuUI, 80);
    return;
  }

  if (typeof stopNarasi === 'function' && id !== 'page-menu') stopNarasi();
  if (typeof cancelAllGameTimers === 'function') cancelAllGameTimers();

  const targetUrl = PAGE_URLS[id];
  if (targetUrl) {
    navigateToUrl(targetUrl);
    return;
  }
}

// ============ MATERI DATA ============
const materiData = {
  organ: {
    title: 'Organ Tubuh Manusia',
    icon: '🫀',
    badge: { text: 'Anatomi Dasar', color: '#6366F1', bg: '#EEF2FF' },
    pengertian: 'Organ tubuh manusia adalah bagian-bagian terstruktur yang memiliki fungsi spesifik dan bekerja sama membentuk sistem tubuh yang lengkap.',
    proses: [],
    organs: [
      { id: 'otak', label: 'Otak', x: 170, y: 30, w: 55, h: 42, color: '#818CF8', emoji: '🧠', fungsi: 'Pusat kendali seluruh aktivitas tubuh. Memproses informasi, mengatur gerakan, memori, dan emosi.', detail: 'Otak adalah organ paling kompleks dalam tubuh manusia, terletak di dalam rongga tengkorak yang melindunginya. Beratnya sekitar 1,4 kg dan terdiri dari sekitar 86 miliar neuron (sel saraf) yang saling terhubung melalui triliunan sinapsis.\n\nOtak terbagi menjadi beberapa bagian utama:\n• Otak besar (Serebrum) — mengatur kesadaran, berpikir, ingatan, bahasa, dan gerakan sadar\n• Otak kecil (Serebelum) — mengkoordinasikan keseimbangan dan gerakan halus\n• Batang otak — mengatur fungsi vital otomatis seperti pernapasan, detak jantung, dan tekanan darah\n• Hipotalamus — mengatur suhu tubuh, rasa lapar, haus, dan hormon\n\nOtak mengonsumsi sekitar 20% dari total energi tubuh meskipun hanya 2% dari berat tubuh. Otak dilindungi oleh tiga lapisan selaput (meninges) dan cairan serebrospinal.' },
      { id: 'jantung', label: 'Jantung', x: 148, y: 140, w: 44, h: 40, color: '#F87171', emoji: '❤️', fungsi: 'Memompa darah ke seluruh tubuh. Berdetak sekitar 60–100 kali per menit.', detail: 'Jantung adalah pompa otot berongga seukuran kepalan tangan yang terletak di rongga dada, sedikit ke kiri dari tengah. Beratnya sekitar 250–350 gram.\n\nJantung memiliki 4 ruang:\n• Serambi kanan (atrium kanan) — menerima darah kotor dari seluruh tubuh\n• Bilik kanan (ventrikel kanan) — memompa darah kotor ke paru-paru\n• Serambi kiri (atrium kiri) — menerima darah bersih dari paru-paru\n• Bilik kiri (ventrikel kiri) — memompa darah bersih ke seluruh tubuh\n\nJantung berdetak 60–100 kali per menit, dan memompa sekitar 5 liter darah per menit. Dalam seumur hidup (70 tahun), jantung berdetak lebih dari 2,5 miliar kali! Dinding bilik kiri lebih tebal karena harus memompa darah ke seluruh tubuh.' },
      { id: 'paru', label: 'Paru-paru', x: 108, y: 132, w: 38, h: 52, color: '#60A5FA', emoji: '🫁', fungsi: 'Tempat pertukaran gas O₂ (oksigen) masuk dan CO₂ (karbon dioksida) keluar.', detail: 'Paru-paru adalah sepasang organ pernapasan yang mengisi sebagian besar rongga dada. Paru-paru kanan sedikit lebih besar (3 lobus) dibanding paru-paru kiri (2 lobus, karena berbagi ruang dengan jantung).\n\nDi dalam paru-paru terdapat sekitar 300–500 juta alveolus (kantung udara kecil) dengan total luas permukaan sekitar 70–80 m² — seukuran lapangan tenis!\n\nProses pertukaran gas:\n• Saat menarik napas → O₂ masuk alveolus → berdifusi ke kapiler darah\n• Saat membuang napas → CO₂ dari darah → berdifusi ke alveolus → keluar\n\nParu-paru dilindungi oleh dua lapisan selaput (pleura). Kapasitas total paru-paru orang dewasa sekitar 6 liter udara, namun rata-rata kita hanya menggunakan 0,5 liter per napas normal.' },
      { id: 'hati', label: 'Hati', x: 148, y: 188, w: 45, h: 38, color: '#FB923C', emoji: '🟫', fungsi: 'Menyaring racun dari darah, memproduksi empedu, dan menyimpan glikogen.', detail: 'Hati adalah kelenjar terbesar dalam tubuh manusia, terletak di perut kanan atas di bawah diafragma. Beratnya sekitar 1,5 kg dan berwarna merah kecoklatan.\n\nHati menjalankan lebih dari 500 fungsi vital, di antaranya:\n• Detoksifikasi — menyaring dan menetralisir racun, alkohol, dan obat-obatan dari darah\n• Produksi empedu — cairan hijau-kuning yang membantu mencerna lemak di usus halus\n• Metabolisme — mengubah glukosa menjadi glikogen (disimpan) dan sebaliknya sesuai kebutuhan energi\n• Sintesis protein — membuat albumin (protein darah) dan faktor pembekuan darah\n• Penyimpanan — menyimpan vitamin A, D, E, K, B12, dan mineral besi\n\nHati memiliki kemampuan regenerasi luar biasa — bahkan jika 70% hati diangkat, organ ini bisa tumbuh kembali dalam beberapa minggu!' },
      { id: 'lambung', label: 'Lambung', x: 152, y: 228, w: 40, h: 36, color: '#A78BFA', emoji: '🫙', fungsi: 'Mencerna makanan secara mekanik dan kimiawi menggunakan asam lambung dan enzim.', detail: 'Lambung adalah organ berotot berbentuk kantung yang terletak di perut kiri atas, tepat di bawah diafragma. Kapasitasnya sekitar 1–1,5 liter (bisa mengembang hingga 4 liter).\n\nLambung melakukan dua jenis pencernaan:\n• Mekanik — otot lambung berkontraksi dan meremas makanan menjadi bubur (kim)\n• Kimiawi — dinding lambung menghasilkan:\n  - Asam klorida (HCl, pH 1,5–3,5) untuk membunuh kuman dan mengaktifkan enzim\n  - Enzim pepsin untuk memecah protein menjadi peptida\n  - Lendir untuk melindungi dinding lambung dari asam\n\nMakanan dicerna di lambung selama 2–4 jam sebelum perlahan didorong ke usus halus. Lambung juga menghasilkan hormon ghrelin yang memberi sinyal lapar ke otak.' },
      { id: 'usus', label: 'Usus', x: 145, y: 268, w: 50, h: 50, color: '#34D399', emoji: '🌀', fungsi: 'Menyerap sari-sari makanan (usus halus) dan menyerap air serta membentuk feses (usus besar).', detail: 'Usus terdiri dari dua bagian utama dengan peran yang berbeda:\n\n🌀 Usus Halus (panjang ±6–7 meter):\n• Dibagi menjadi duodenum (usus dua belas jari), jejunum, dan ileum\n• Menerima enzim dari pankreas dan empedu dari hati untuk mencerna karbohidrat, lemak, dan protein\n• Dindingnya memiliki vili dan mikrovili (jonjot usus) yang memperluas permukaan penyerapan hingga 200 m²\n• Di sinilah 90% nutrisi (glukosa, asam amino, asam lemak, vitamin) diserap ke aliran darah\n\n🔄 Usus Besar (panjang ±1,5 meter):\n• Terdiri dari sekum, kolon (naik, melintang, turun), dan rektum\n• Menyerap sisa air dan elektrolit dari ampas makanan\n• Mengandung triliunan bakteri baik (flora usus) yang membantu produksi vitamin K dan B\n• Membentuk dan menyimpan feses sebelum dikeluarkan melalui anus' },
      { id: 'ginjal', label: 'Ginjal', x: 108, y: 210, w: 36, h: 42, color: '#F59E0B', emoji: '🫘', fungsi: 'Menyaring darah dan menghasilkan urine. Mengatur keseimbangan cairan dan elektrolit.', detail: 'Ginjal adalah sepasang organ berbentuk kacang merah berukuran sekitar 10–12 cm, terletak di punggung bawah di kanan dan kiri tulang belakang. Berat masing-masing sekitar 150 gram.\n\nSetiap ginjal mengandung sekitar 1 juta unit penyaring kecil bernama nefron. Cara kerja ginjal:\n• Filtrasi — darah disaring di glomerulus; sekitar 180 liter darah disaring setiap hari\n• Reabsorpsi — zat berguna (glukosa, air, elektrolit) diserap kembali ke darah\n• Sekresi — zat sisa tambahan (ion H⁺, obat) dibuang ke dalam urine\n• Ekskresi — urine akhir (±1,5 liter/hari) dialirkan ke kandung kemih\n\nSelain menyaring, ginjal juga:\n• Mengatur tekanan darah (hormon renin)\n• Merangsang produksi sel darah merah (hormon eritropoietin)\n• Mengaktifkan vitamin D untuk kesehatan tulang\n• Menjaga keseimbangan pH darah' },
      { id: 'kandung', label: 'Kand. Kemih', x: 152, y: 316, w: 40, h: 30, color: '#38BDF8', emoji: '💧', fungsi: 'Menampung urine sebelum dikeluarkan dari tubuh melalui uretra.', detail: 'Kandung kemih adalah organ berotot berongga yang terletak di rongga panggul. Bentuknya seperti balon yang bisa mengembang sesuai volume urine.\n\nKapasitas dan fungsi:\n• Kapasitas normal 400–600 mL, namun rasa ingin buang air kecil sudah muncul saat terisi ±150–300 mL\n• Dinding kandung kemih dilapisi epitel transisional yang bisa meregang dan mengempis\n• Terdapat dua sfingter (katup otot) yang mengontrol keluarnya urine:\n  - Sfingter internal (involunter/otomatis)\n  - Sfingter eksternal (volunter/bisa dikontrol)\n\nProses pengeluaran urine (miksi):\n1. Kandung kemih penuh → dinding meregang → sinyal dikirim ke otak\n2. Otak memberi perintah → otot detrusor berkontraksi\n3. Kedua sfingter membuka → urine mengalir keluar lewat uretra\n\nUrine normal berwarna kuning jernih akibat pigmen urobilin, dengan komposisi 95% air dan 5% zat buangan.' },
    ],
  },
  pencernaan: {
    title: 'Sistem Pencernaan',
    icon: '🥗',
    badge: { text: 'Sistem Pencernaan', color: '#3B82F6', bg: '#EFF6FF' },
    pengertian: 'Sistem pencernaan adalah sistem organ yang bertugas mengubah makanan menjadi zat-zat nutrisi yang dapat diserap oleh tubuh.',
    proses: [
      'Mulut → mengunyah & mencampur saliva',
      'Kerongkongan → mendorong makanan ke lambung',
      'Lambung → mencerna dengan asam & enzim',
      'Usus halus → menyerap sari makanan',
      'Usus besar → menyerap air & membentuk feses',
      'Anus → mengeluarkan sisa pencernaan',
    ],
    organs: [
      { id: 'mulut', label: 'Mulut', x: 170, y: 35, w: 40, h: 28, color: '#F87171', emoji: '👄', fungsi: 'Tempat masuk makanan. Gigi mengunyah, lidah membantu menelan, saliva mengandung enzim amilase.' },
      { id: 'kerongkongan', label: 'Kerongkongan', x: 170, y: 75, w: 20, h: 55, color: '#FB923C', emoji: '📏', fungsi: 'Saluran berotot sepanjang ±25cm yang mendorong makanan dari mulut ke lambung (gerak peristaltik).' },
      { id: 'lambung2', label: 'Lambung', x: 155, y: 138, w: 48, h: 48, color: '#A78BFA', emoji: '🫙', fungsi: 'Mencerna makanan selama 2–4 jam dengan asam klorida (HCl) dan enzim pepsin.' },
      { id: 'usus-halus', label: 'Usus Halus', x: 140, y: 200, w: 60, h: 70, color: '#60A5FA', emoji: '〰️', fungsi: 'Saluran sepanjang 6–7 meter tempat penyerapan nutrisi (glukosa, asam amino, lemak) ke darah.' },
      { id: 'usus-besar', label: 'Usus Besar', x: 115, y: 190, w: 80, h: 90, color: '#34D399', emoji: '🔄', fungsi: 'Menyerap air dan elektrolit dari sisa makanan. Membentuk dan menyimpan feses.' },
      { id: 'anus', label: 'Anus', x: 168, y: 288, w: 24, h: 22, color: '#6B7280', emoji: '⬇️', fungsi: 'Lubang akhir saluran pencernaan tempat feses dikeluarkan dari tubuh.' },
    ],
  },
  pernapasan: {
    title: 'Sistem Pernapasan',
    icon: '🫁',
    badge: { text: 'Sistem Pernapasan', color: '#0EA5E9', bg: '#F0F9FF' },
    pengertian: 'Sistem pernapasan adalah sistem yang memungkinkan pertukaran gas O₂ dari udara ke darah dan CO₂ dari darah ke udara.',
    proses: [
      'Hidung → menyaring, menghangatkan udara',
      'Trakea → menyalurkan udara ke paru',
      'Bronkus → membagi udara ke tiap paru',
      'Bronkiolus → meneruskan udara ke alveolus',
      'Alveolus → pertukaran O₂ dan CO₂ terjadi',
      'Diafragma → mengatur mekanisme inspirasi & ekspirasi',
      'O₂ masuk darah → CO₂ dikeluarkan napas',
    ],
    organs: [
      { id: 'hidung', label: 'Hidung', x: 168, y: 30, w: 24, h: 30, color: '#FCD34D', emoji: '👃', fungsi: 'Menyaring debu, menghangatkan & melembabkan udara. Rambut hidung menangkap partikel kotor.' },
      { id: 'trakea', label: 'Trakea', x: 176, y: 68, w: 14, h: 55, color: '#60A5FA', emoji: '📏', fungsi: 'Pipa napas sepanjang ±10cm, bercincin tulang rawan. Menghubungkan tenggorokan ke bronkus.' },
      { id: 'bronkus', label: 'Bronkus', x: 148, y: 130, w: 64, h: 30, color: '#A78BFA', emoji: '🌿', fungsi: 'Cabang dari trakea yang masuk ke paru-paru kiri dan kanan, kemudian bercabang jadi bronkiolus.' },
      { id: 'bronkiolus', label: 'Bronkiolus', x: 148, y: 160, w: 64, h: 30, color: '#F97316', emoji: '🌱', fungsi: 'Cabang-cabang kecil bronkus di dalam paru-paru. Menyalurkan udara ke alveolus tanpa tulang rawan.' },
      { id: 'paru2', label: 'Paru-paru', x: 115, y: 148, w: 130, h: 110, color: '#38BDF8', emoji: '🫁', fungsi: 'Organ utama pernapasan. Terdiri dari jaringan berpori yang mengandung jutaan alveolus.' },
      { id: 'alveolus', label: 'Alveolus', x: 148, y: 200, w: 64, h: 48, color: '#34D399', emoji: '🟢', fungsi: 'Kantong udara kecil di ujung bronkiolus. Tempat pertukaran O₂ dan CO₂ antara udara dan darah.' },
      { id: 'diafragma', label: 'Diafragma', x: 115, y: 268, w: 130, h: 20, color: '#EC4899', emoji: '〽️', fungsi: 'Otot berbentuk kubah di bawah paru-paru. Berkontraksi saat menarik napas (inspirasi) dan relaksasi saat membuang napas (ekspirasi).' },
    ],
  },
  peredaran: {
    title: 'Sistem Peredaran Darah',
    icon: '❤️',
    badge: { text: 'Sistem Peredaran', color: '#EF4444', bg: '#FEF2F2' },
    pengertian: 'Sistem peredaran darah adalah sistem organ yang berfungsi mengalirkan darah ke seluruh tubuh. Darah membawa oksigen (O₂), nutrisi, hormon, dan membuang karbon dioksida (CO₂) serta zat sisa metabolisme. Sistem ini terdiri dari dua sirkuit: sirkulasi pulmonal (jantung ↔ paru-paru) dan sirkulasi sistemik (jantung ↔ seluruh tubuh).',
    proses: [
      '🔵 SIRKULASI PULMONAL: Jantung kanan (bilik kanan) memompa darah kaya CO₂ melalui arteri pulmonalis menuju paru-paru',
      'Di kapiler paru (sekitar alveolus) → CO₂ dilepas ke udara & O₂ diserap masuk ke darah',
      'Darah kaya O₂ mengalir kembali melalui vena pulmonalis ke jantung kiri (serambi kiri)',
      '🔴 SIRKULASI SISTEMIK: Jantung kiri (bilik kiri) memompa darah kaya O₂ ke seluruh tubuh melalui aorta (pembuluh terbesar)',
      'Aorta bercabang menjadi arteri-arteri yang menyalurkan darah beroksigen ke semua organ dan jaringan',
      'Di kapiler tubuh → O₂ & nutrisi diberikan ke sel-sel tubuh, lalu CO₂ & zat sisa diserap darah',
      'Darah kaya CO₂ dikumpulkan vena cava (atas & bawah) → kembali ke jantung kanan (serambi kanan)',
      '🔄 Siklus berulang terus-menerus selama jantung berdenyut ±60–100 kali per menit',
    ],
    organs: [
      { id: 'jantung2', label: 'Jantung', x: 148, y: 10, w: 64, h: 36, color: '#F87171', emoji: '❤️', fungsi: 'Pompa muskular beruang 4 (2 serambi + 2 bilik). Bilik kiri pompa ke seluruh tubuh, bilik kanan pompa ke paru-paru. Berdetak ±60–100x/menit, memompa ±5 liter darah per menit.' },
      { id: 'paru-peredaran', label: 'Paru-paru', x: 148, y: 55, w: 64, h: 36, color: '#60A5FA', emoji: '🫁', fungsi: 'Organ pertukaran gas dalam sirkulasi pulmonal. Menerima darah kaya CO₂ dari jantung kanan lewat arteri pulmonalis, lalu mengembalikan darah kaya O₂ ke jantung kiri lewat vena pulmonalis.' },
      { id: 'arteri', label: 'Arteri', x: 148, y: 100, w: 64, h: 36, color: '#EF4444', emoji: '🔴', fungsi: 'Pembuluh darah berdinding tebal & elastis. Membawa darah beroksigen dari jantung ke seluruh tubuh. Denyutan arteri bisa dirasakan sebagai denyut nadi. Arteri terbesar disebut aorta.' },
      { id: 'vena', label: 'Vena', x: 148, y: 145, w: 64, h: 36, color: '#6366F1', emoji: '🔵', fungsi: 'Pembuluh darah berdinding tipis dengan katup satu arah. Membawa darah kaya CO₂ dari jaringan kembali ke jantung. Vena terbesar: vena cava superior (atas) & vena cava inferior (bawah).' },
      { id: 'kapiler-paru', label: 'Kapiler Paru', x: 148, y: 190, w: 64, h: 36, color: '#34D399', emoji: '🪷', fungsi: 'Pembuluh darah sangat halus di sekitar alveolus paru-paru (sirkulasi pulmonal). Dindingnya setipis 1 sel sehingga gas bisa berdifusi: CO₂ keluar dari darah → alveolus, O₂ masuk dari alveolus → darah.' },
      { id: 'kapiler-tubuh', label: 'Kapiler Tubuh', x: 148, y: 235, w: 64, h: 36, color: '#059669', emoji: '🕸️', fungsi: 'Jaringan pembuluh kapiler di seluruh organ & jaringan tubuh (sirkulasi sistemik). Tempat pertukaran: O₂ + nutrisi dari darah → sel tubuh, CO₂ + zat sisa dari sel → darah. Luas total kapiler tubuh ±6.000 km².' },
    ],
  },
  ekskresi: {
    title: 'Sistem Ekskresi',
    icon: '🧪',
    badge: { text: 'Sistem Ekskresi', color: '#10B981', bg: '#ECFDF5' },
    pengertian: 'Sistem ekskresi adalah sistem yang bertugas membuang zat-zat sisa metabolisme yang tidak diperlukan oleh tubuh agar tidak menimbulkan racun.',
    proses: [
      'Ginjal menyaring darah → menghasilkan urine',
      'Ureter mengalirkan urine dari ginjal ke kandung kemih',
      'Kandung kemih menampung urine sementara',
      'Uretra mengeluarkan urine dari tubuh',
      'Kulit mengeluarkan keringat mengandung air, garam, dan urea',
      'Paru-paru mengeluarkan karbon dioksida dan uap air',
      'Hati mengubah hemoglobin menjadi empedu',
    ],
    organs: [
      { id: 'ginjal2', label: 'Ginjal', x: 120, y: 120, w: 36, h: 55, color: '#F59E0B', emoji: '🫘', fungsi: 'Organ berbentuk kacang yang menyaring ±200L darah per hari menghasilkan ±1.5L urine.' },
      { id: 'ginjal3', label: 'Ginjal (kanan)', x: 204, y: 120, w: 36, h: 55, color: '#F59E0B', emoji: '🫘', fungsi: 'Ginjal kanan bekerja sama dengan ginjal kiri menyaring darah dan mempertahankan keseimbangan elektrolit.' },
      { id: 'ureter', label: 'Ureter', x: 148, y: 175, w: 64, h: 65, color: '#60A5FA', emoji: '📏', fungsi: 'Dua saluran berotot sepanjang 25–30cm yang mengalirkan urine dari ginjal ke kandung kemih.' },
      { id: 'kandung2', label: 'Kand. Kemih', x: 155, y: 248, w: 50, h: 45, color: '#38BDF8', emoji: '💧', fungsi: 'Organ berotot yang menampung urine hingga 400–600mL sebelum dikeluarkan.' },
      { id: 'uretra2', label: 'Uretra', x: 172, y: 298, w: 16, h: 30, color: '#6B7280', emoji: '⬇️', fungsi: 'Saluran akhir tempat urine keluar dari tubuh. Panjang 4cm (wanita) atau 20cm (pria).' },
    ],
  },
};

let activeOrgan = null;
let activeMateri = null;

// ===== FOTO ORGAN =====
const organPhotoMap = {
  'otak':    { src: 'assets/images/otak.jpg', caption: 'Foto otak manusia' },
  'jantung': { src: 'assets/images/jantung2.jpg', caption: 'Foto jantung manusia' },
  'paru':    { src: 'assets/images/paru2.jpg', caption: 'Foto paru-paru manusia' },
  'hati':    { src: 'assets/images/hati.jpg', caption: 'Foto hati manusia' },
  'lambung': { src: 'assets/images/lambung2.jpg', caption: 'Foto lambung manusia' },
  'usus':    { src: 'assets/images/usus-halus.jpg', caption: 'Foto usus manusia' },
  'ginjal':  { src: 'assets/images/ginjal3.jpg', caption: 'Foto ginjal manusia' },
  'kandung': { src: 'assets/images/kandung2.jpg', caption: 'Foto kandung kemih' },
  'lambung2':   { src: 'assets/images/lambung2.jpg', caption: 'Foto lambung manusia' },
  'usus-halus': { src: 'assets/images/usus-halus.jpg', caption: 'Foto usus manusia' },
  'paru2':    { src: 'assets/images/paru2.jpg', caption: 'Foto paru-paru manusia' },
  'jantung2': { src: 'assets/images/jantung2.jpg', caption: 'Foto jantung manusia' },
  'ginjal2':  { src: 'assets/images/ginjal3.jpg', caption: 'Foto ginjal manusia' },
  'ginjal3':  { src: 'assets/images/ginjal3.jpg', caption: 'Foto ginjal manusia' },
  'kandung2': { src: 'assets/images/kandung2.jpg', caption: 'Foto kandung kemih' },
};

const digestivePhotoMap = {
  'mulut':        { src: 'assets/images/asset_c431380d.png', caption: 'Gambar mulut' },
  'kerongkongan': { src: 'assets/images/asset_77905e2b.png', caption: 'Gambar kerongkongan' },
  'lambung2':     { src: 'assets/images/asset_6b6bd69e.png', caption: 'Gambar lambung' },
  'usus-halus':   { src: 'assets/images/asset_582e9009.png', caption: 'Gambar usus halus' },
  'usus-besar':   { src: 'assets/images/asset_7513425a.png', caption: 'Gambar usus besar' },
  'anus':         { src: 'assets/images/asset_51c8a8bd.png', caption: 'Gambar anus' },
};

const respiratoryPhotoMap = {
  'hidung':     { src: 'assets/images/asset_6b7ff22c.png', caption: 'Gambar hidung' },
  'trakea':     { src: 'assets/images/asset_792144bf.png', caption: 'Gambar trakea' },
  'bronkus':    { src: 'assets/images/asset_61a2155b.png', caption: 'Gambar bronkus' },
  'bronkiolus': { src: 'assets/images/asset_e33c79d8.png', caption: 'Gambar bronkiolus' },
  'alveolus':   { src: 'assets/images/asset_915b8955.png', caption: 'Gambar alveolus' },
  'diafragma':  { src: 'assets/images/asset_6dd3e2c9.png', caption: 'Gambar diafragma' },
  'paru2':      { src: 'assets/images/asset_0e766104.png', caption: 'Gambar paru-paru' },
};

const circulationPhotoMap = {
  'jantung2':       { src: 'assets/images/asset_0d0fc443.png', caption: 'Gambar jantung' },
  'paru-peredaran': { src: 'assets/images/asset_7d73b903.png', caption: 'Gambar kapiler paru' },
  'arteri':         { src: 'assets/images/asset_e3babdae.png', caption: 'Gambar arteri' },
  'vena':           { src: 'assets/images/asset_fb6d8ea4.png', caption: 'Gambar vena' },
  'kapiler-paru':   { src: 'assets/images/asset_7d73b903.png', caption: 'Gambar kapiler paru' },
  'kapiler-tubuh':  { src: 'assets/images/asset_918169cd.png', caption: 'Gambar kapiler tubuh' },
};

const excretionPhotoMap = {
  'ginjal2':  { src: 'assets/images/asset_45c30ffd.png', caption: 'Gambar ginjal kiri' },
  'ginjal3':  { src: 'assets/images/asset_78a537ab.png', caption: 'Gambar ginjal kanan' },
  'ureter':   { src: 'assets/images/asset_739007af.png', caption: 'Gambar ureter' },
  'kandung2': { src: 'assets/images/asset_adffe8f3.png', caption: 'Gambar kandung kemih' },
  'uretra2':  { src: 'assets/images/asset_53a20125.png', caption: 'Gambar uretra' },
};

// Kumpulan detail per organ ID
const organDetailMap = {};
(function buildDetailMap() {
  Object.values(materiData).forEach(sys => {
    sys.organs.forEach(o => {
      organDetailMap[o.id] = { label: o.label, emoji: o.emoji, detail: o.detail || o.fungsi };
    });
  });
})();

function selectOrganById(id) {
  const organ = organDetailMap[id];
  if (!organ) return;
  selectOrgan(id, organ.label, organ.emoji, organ.detail);
}

const digestiveImageClickAreas = [
  { id: 'mulut', cx: 161, cy: 185, rx: 46, ry: 26 },
  { id: 'kerongkongan', cx: 254, cy: 260, rx: 24, ry: 62 },
  { id: 'lambung2', cx: 300, cy: 500, rx: 54, ry: 44 },
  { id: 'usus-halus', cx: 252, cy: 665, rx: 62, ry: 68 },
  { id: 'usus-besar', cx: 155, cy: 660, rx: 52, ry: 68 },
  { id: 'anus', cx: 248, cy: 840, rx: 28, ry: 22 },
];

function handleDigestiveImageClick(event) {
  if (event.target.closest && event.target.closest('.organ-label-btn')) return;

  const svg = event.currentTarget;
  const rect = svg.getBoundingClientRect();
  if (!rect.width || !rect.height) return;

  const x = ((event.clientX - rect.left) / rect.width) * 500;
  const y = ((event.clientY - rect.top) / rect.height) * 900;

  const hit = digestiveImageClickAreas
    .map(area => {
      const dx = (x - area.cx) / area.rx;
      const dy = (y - area.cy) / area.ry;
      return { area, score: (dx * dx) + (dy * dy) };
    })
    .filter(item => item.score <= 1)
    .sort((a, b) => a.score - b.score)[0];

  if (hit) {
    event.stopPropagation();
    selectOrganById(hit.area.id);
  }
}

const organGameTargets = [
  { id: 'otak', line: { x1: 238, y1: 143, x2: 360, y2: 50 }, box: { x: 355, y: 28, w: 140, h: 44 }, color: '#818CF8' },
  { id: 'paru', line: { x1: 296, y1: 402, x2: 80, y2: 220 }, box: { x: 5, y: 198, w: 135, h: 44 }, color: '#60A5FA' },
  { id: 'jantung', line: { x1: 252, y1: 407, x2: 360, y2: 260 }, box: { x: 355, y: 238, w: 140, h: 44 }, color: '#F87171' },
  { id: 'hati', line: { x1: 187, y1: 481, x2: 80, y2: 360 }, box: { x: 5, y: 338, w: 130, h: 44 }, color: '#FB923C' },
  { id: 'lambung', line: { x1: 283, y1: 488, x2: 360, y2: 330 }, box: { x: 355, y: 308, w: 140, h: 44 }, color: '#A78BFA' },
  { id: 'ginjal', line: { x1: 269, y1: 517, x2: 80, y2: 460 }, box: { x: 5, y: 438, w: 130, h: 44 }, color: '#F59E0B' },
  { id: 'usus', line: { x1: 238, y1: 597, x2: 360, y2: 580 }, box: { x: 355, y: 558, w: 135, h: 44 }, color: '#34D399' },
  { id: 'kandung', line: { x1: 238, y1: 690, x2: 350, y2: 710 }, box: { x: 345, y: 688, w: 150, h: 44 }, color: '#38BDF8' },
];

let organGameState = { score: 0, placed: {}, selectedId: null };

function shuffleItems(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function showOrganGame() {
  if (!document.getElementById('organ-game-visual')) { navigateToUrl(PAGE_URLS['page-game-organ']); return; }
  const organs = materiData.organ.organs;
  organGameState = { score: 0, placed: {}, selectedId: null };

  const targetHtml = organGameTargets.map(target => `
    <line x1="${target.line.x1}" y1="${target.line.y1}" x2="${target.line.x2}" y2="${target.line.y2}"
      stroke="${target.color}" stroke-width="1.5"/>
    <foreignObject x="${target.box.x}" y="${target.box.y}" width="${target.box.w}" height="${target.box.h}">
      <div xmlns="http://www.w3.org/1999/xhtml" class="organ-drop-zone"
        data-target="${target.id}"
        ondragover="handleOrganGameDragOver(event)"
        ondragleave="handleOrganGameDragLeave(event)"
        ondrop="handleOrganGameDrop(event)"
        onclick="placeSelectedOrganGameLabel('${target.id}', this)">
        Letakkan di sini
      </div>
    </foreignObject>
  `).join('');

  const shuffledOrgans = shuffleItems(organs);
  const leftLabels = shuffledOrgans.slice(0, Math.ceil(shuffledOrgans.length / 2));
  const rightLabels = shuffledOrgans.slice(Math.ceil(shuffledOrgans.length / 2));
  const labelHtml = items => items.map(o => `
    <div class="game-label" id="game-label-${o.id}" draggable="true"
      data-organ="${o.id}"
      onclick="selectOrganGameLabel('${o.id}')"
      ondragstart="handleOrganGameDragStart(event)">
      ${o.emoji} ${o.label}
    </div>
  `).join('');

  document.getElementById('organ-game-visual').innerHTML = `
    <div class="game-side-labels game-side-labels-left">
      <div class="game-label-bank">${labelHtml(leftLabels)}</div>
    </div>
    <div class="pencernaan-img-wrap organ-game-board">
      <img src="assets/images/diagram-organ-tubuh.jpg" alt="Organ Tubuh Manusia" class="pencernaan-img" />
      <svg class="pencernaan-svg-overlay" viewBox="0 0 500 900" xmlns="http://www.w3.org/2000/svg">
        ${targetHtml}
      </svg>
      <div class="game-result-alert" id="organ-game-alert">Benar</div>
    </div>
    <div class="game-side-labels game-side-labels-right">
      <div class="game-label-bank">${labelHtml(rightLabels)}</div>
    </div>
  `;

  updateOrganGameScore('Mulai dari label mana saja.');
  showPage('page-game-organ');
}

function handleOrganGameDragStart(event) {
  const organId = event.currentTarget.dataset.organ;
  organGameState.selectedId = organId;
  event.dataTransfer.setData('text/plain', organId);
  event.dataTransfer.effectAllowed = 'move';
  selectOrganGameLabel(organId);
}

function handleOrganGameDragOver(event) {
  event.preventDefault();
  event.currentTarget.classList.add('drag-over');
}

function handleOrganGameDragLeave(event) {
  event.currentTarget.classList.remove('drag-over');
}

function handleOrganGameDrop(event) {
  event.preventDefault();
  const target = event.currentTarget;
  const organId = event.dataTransfer.getData('text/plain');
  target.classList.remove('drag-over');
  checkOrganGameAnswer(organId, target.dataset.target, target);
}

function selectOrganGameLabel(organId) {
  if (organGameState.placed[organId]) return;
  organGameState.selectedId = organId;
  document.querySelectorAll('.game-label').forEach(label => label.classList.remove('selected'));
  const label = document.getElementById('game-label-' + organId);
  if (label) label.classList.add('selected');
}

function placeSelectedOrganGameLabel(targetId, targetEl) {
  if (!organGameState.selectedId) {
    updateOrganGameScore('Pilih atau drag salah satu label dulu.', 'wrong');
    return;
  }
  checkOrganGameAnswer(organGameState.selectedId, targetId, targetEl);
}

function checkOrganGameAnswer(organId, targetId, targetEl) {
  if (!organId || organGameState.placed[targetId] || organGameState.placed[organId]) return;

  if (organId === targetId) {
    const organ = organDetailMap[organId];
    organGameState.placed[organId] = true;
    organGameState.score += 1;
    targetEl.classList.remove('wrong');
    targetEl.classList.add('correct');
    targetEl.textContent = organ.emoji + ' ' + organ.label;

    const label = document.getElementById('game-label-' + organId);
    if (label) label.classList.add('placed');

    organGameState.selectedId = null;
    document.querySelectorAll('.game-label').forEach(item => item.classList.remove('selected'));

    const done = organGameState.score === organGameTargets.length;
    updateOrganGameScore(done ? 'Hebat, semua label sudah benar!' : 'Benar! Score bertambah.', 'correct');
    showOrganGameAlert('Benar', 'correct');
    return;
  }

  targetEl.classList.add('wrong');
  updateOrganGameScore('', 'wrong');
  showOrganGameAlert('Salah', 'wrong');
  setTimeout(() => targetEl.classList.remove('wrong'), 350);
}

let organGameAlertTimer = null;

function showOrganGameAlert(message, state) {
  const alert = document.getElementById('organ-game-alert');
  if (!alert) return;

  clearTimeout(organGameAlertTimer);
  alert.textContent = message;
  alert.className = 'game-result-alert ' + state + ' show';

  organGameAlertTimer = setTimeout(() => {
    alert.classList.remove('show');
  }, 500);
}

function updateOrganGameScore(message, state = '') {
  const score = document.getElementById('organ-game-score');
  const feedback = document.getElementById('organ-game-feedback');
  if (score) score.textContent = `⭐ ${organGameState.score} / ${organGameTargets.length}`;
  if (feedback) {
    feedback.textContent = message;
    feedback.className = 'game-feedback' + (state ? ' ' + state : '');
  }
}

const digestiveGameTargets = [
  { id: 'mulut', line: { x1: 175, y1: 185, x2: 350, y2: 170 }, box: { x: 345, y: 148, w: 145, h: 44 }, color: '#3B82F6' },
  { id: 'kerongkongan', line: { x1: 254, y1: 234, x2: 340, y2: 210 }, box: { x: 335, y: 188, w: 160, h: 44 }, color: '#FB923C' },
  { id: 'lambung2', line: { x1: 314, y1: 492, x2: 350, y2: 455 }, box: { x: 345, y: 433, w: 145, h: 44 }, color: '#A78BFA' },
  { id: 'usus-halus', line: { x1: 252, y1: 665, x2: 350, y2: 640 }, box: { x: 345, y: 618, w: 150, h: 44 }, color: '#60A5FA' },
  { id: 'usus-besar', line: { x1: 142, y1: 677, x2: 80, y2: 610 }, box: { x: 5, y: 588, w: 150, h: 44 }, color: '#34D399' },
  { id: 'anus', line: { x1: 248, y1: 840, x2: 350, y2: 830 }, box: { x: 345, y: 808, w: 145, h: 44 }, color: '#6B7280' },
];

let digestiveGameState = { score: 0, placed: {}, selectedId: null };
let digestiveGameAlertTimer = null;

function showDigestiveGame() {
  if (!document.getElementById('digestive-game-visual')) { navigateToUrl(PAGE_URLS['page-game-pencernaan']); return; }
  const organs = materiData.pencernaan.organs;
  digestiveGameState = { score: 0, placed: {}, selectedId: null };

  const targetHtml = digestiveGameTargets.map(target => `
    <line x1="${target.line.x1}" y1="${target.line.y1}" x2="${target.line.x2}" y2="${target.line.y2}"
      stroke="${target.color}" stroke-width="1.5"/>
    <foreignObject x="${target.box.x}" y="${target.box.y}" width="${target.box.w}" height="${target.box.h}">
      <div xmlns="http://www.w3.org/1999/xhtml" class="organ-drop-zone"
        data-target="${target.id}"
        ondragover="handleDigestiveGameDragOver(event)"
        ondragleave="handleDigestiveGameDragLeave(event)"
        ondrop="handleDigestiveGameDrop(event)"
        onclick="placeSelectedDigestiveGameLabel('${target.id}', this)">
        Letakkan di sini
      </div>
    </foreignObject>
  `).join('');

  const shuffledOrgans = shuffleItems(organs);
  const leftLabels = shuffledOrgans.slice(0, Math.ceil(shuffledOrgans.length / 2));
  const rightLabels = shuffledOrgans.slice(Math.ceil(shuffledOrgans.length / 2));
  const labelHtml = items => items.map(o => `
    <div class="game-label" id="digestive-game-label-${o.id}" draggable="true"
      data-organ="${o.id}"
      onclick="selectDigestiveGameLabel('${o.id}')"
      ondragstart="handleDigestiveGameDragStart(event)">
      ${o.emoji} ${o.label}
    </div>
  `).join('');

  document.getElementById('digestive-game-visual').innerHTML = `
    <div class="game-side-labels game-side-labels-left">
      <div class="game-label-bank">${labelHtml(leftLabels)}</div>
    </div>
    <div class="pencernaan-img-wrap organ-game-board">
      <img src="assets/images/diagram-pencernaan.jpg" alt="Sistem Pencernaan" class="pencernaan-img" />
      <svg class="pencernaan-svg-overlay" viewBox="0 0 500 900" xmlns="http://www.w3.org/2000/svg">
        ${targetHtml}
      </svg>
      <div class="game-result-alert" id="digestive-game-alert">Benar</div>
    </div>
    <div class="game-side-labels game-side-labels-right">
      <div class="game-label-bank">${labelHtml(rightLabels)}</div>
    </div>
  `;

  updateDigestiveGameScore('Mulai dari label mana saja.');
  showPage('page-game-pencernaan');
}

function handleDigestiveGameDragStart(event) {
  const organId = event.currentTarget.dataset.organ;
  digestiveGameState.selectedId = organId;
  event.dataTransfer.setData('text/plain', organId);
  event.dataTransfer.effectAllowed = 'move';
  selectDigestiveGameLabel(organId);
}

function handleDigestiveGameDragOver(event) {
  event.preventDefault();
  event.currentTarget.classList.add('drag-over');
}

function handleDigestiveGameDragLeave(event) {
  event.currentTarget.classList.remove('drag-over');
}

function handleDigestiveGameDrop(event) {
  event.preventDefault();
  const target = event.currentTarget;
  const organId = event.dataTransfer.getData('text/plain');
  target.classList.remove('drag-over');
  checkDigestiveGameAnswer(organId, target.dataset.target, target);
}

function selectDigestiveGameLabel(organId) {
  if (digestiveGameState.placed[organId]) return;
  digestiveGameState.selectedId = organId;
  document.querySelectorAll('.game-label').forEach(label => label.classList.remove('selected'));
  const label = document.getElementById('digestive-game-label-' + organId);
  if (label) label.classList.add('selected');
}

function placeSelectedDigestiveGameLabel(targetId, targetEl) {
  if (!digestiveGameState.selectedId) {
    updateDigestiveGameScore('Pilih atau drag salah satu label dulu.', 'wrong');
    return;
  }
  checkDigestiveGameAnswer(digestiveGameState.selectedId, targetId, targetEl);
}

function checkDigestiveGameAnswer(organId, targetId, targetEl) {
  if (!organId || digestiveGameState.placed[targetId] || digestiveGameState.placed[organId]) return;

  if (organId === targetId) {
    const organ = organDetailMap[organId];
    digestiveGameState.placed[organId] = true;
    digestiveGameState.score += 1;
    targetEl.classList.remove('wrong');
    targetEl.classList.add('correct');
    targetEl.textContent = organ.emoji + ' ' + organ.label;

    const label = document.getElementById('digestive-game-label-' + organId);
    if (label) label.classList.add('placed');

    digestiveGameState.selectedId = null;
    document.querySelectorAll('.game-label').forEach(item => item.classList.remove('selected'));

    const done = digestiveGameState.score === digestiveGameTargets.length;
    updateDigestiveGameScore(done ? 'Hebat, semua label sudah benar!' : 'Benar! Score bertambah.', 'correct');
    showDigestiveGameAlert('Benar', 'correct');
    return;
  }

  targetEl.classList.add('wrong');
  updateDigestiveGameScore('', 'wrong');
  showDigestiveGameAlert('Salah', 'wrong');
  setTimeout(() => targetEl.classList.remove('wrong'), 350);
}

function showDigestiveGameAlert(message, state) {
  const alert = document.getElementById('digestive-game-alert');
  if (!alert) return;

  clearTimeout(digestiveGameAlertTimer);
  alert.textContent = message;
  alert.className = 'game-result-alert ' + state + ' show';

  digestiveGameAlertTimer = setTimeout(() => {
    alert.classList.remove('show');
  }, 500);
}

function updateDigestiveGameScore(message, state = '') {
  const score = document.getElementById('digestive-game-score');
  const feedback = document.getElementById('digestive-game-feedback');
  if (score) score.textContent = `⭐ ${digestiveGameState.score} / ${digestiveGameTargets.length}`;
  if (feedback) {
    feedback.textContent = message;
    feedback.className = 'game-feedback' + (state ? ' ' + state : '');
  }
}

const breathingGameTargets = [
  { id: 'hidung', line: { x1: 138, y1: 117, x2: 60, y2: 75 }, box: { x: 5, y: 52, w: 140, h: 44 }, color: '#FCD34D' },
  { id: 'trakea', line: { x1: 258, y1: 319, x2: 360, y2: 260 }, box: { x: 355, y: 238, w: 140, h: 44 }, color: '#60A5FA' },
  { id: 'bronkus', line: { x1: 254, y1: 369, x2: 65, y2: 330 }, box: { x: 5, y: 308, w: 140, h: 44 }, color: '#A78BFA' },
  { id: 'paru2', line: { x1: 195, y1: 403, x2: 365, y2: 400 }, box: { x: 360, y: 378, w: 135, h: 44 }, color: '#38BDF8' },
  { id: 'alveolus', line: { x1: 321, y1: 448, x2: 60, y2: 490 }, box: { x: 5, y: 468, w: 145, h: 44 }, color: '#34D399' },
  { id: 'bronkiolus', line: { x1: 305, y1: 339, x2: 355, y2: 320 }, box: { x: 350, y: 298, w: 145, h: 44 }, color: '#F97316' },
  { id: 'diafragma', line: { x1: 173, y1: 548, x2: 65, y2: 580 }, box: { x: 5, y: 558, w: 145, h: 44 }, color: '#EC4899' },
];

let breathingGameState = { score: 0, placed: {}, selectedId: null };
let breathingGameAlertTimer = null;

function showBreathingGame() {
  if (!document.getElementById('breathing-game-visual')) { navigateToUrl(PAGE_URLS['page-game-pernapasan']); return; }
  const organs = materiData.pernapasan.organs;
  breathingGameState = { score: 0, placed: {}, selectedId: null };

  const targetHtml = breathingGameTargets.map(target => `
    <line x1="${target.line.x1}" y1="${target.line.y1}" x2="${target.line.x2}" y2="${target.line.y2}"
      stroke="${target.color}" stroke-width="1.5"/>
    <foreignObject x="${target.box.x}" y="${target.box.y}" width="${target.box.w}" height="${target.box.h}">
      <div xmlns="http://www.w3.org/1999/xhtml" class="organ-drop-zone"
        data-target="${target.id}"
        ondragover="handleBreathingGameDragOver(event)"
        ondragleave="handleBreathingGameDragLeave(event)"
        ondrop="handleBreathingGameDrop(event)"
        onclick="placeSelectedBreathingGameLabel('${target.id}', this)">
        Letakkan di sini
      </div>
    </foreignObject>
  `).join('');

  const shuffledOrgans = shuffleItems(organs);
  const leftLabels = shuffledOrgans.slice(0, Math.ceil(shuffledOrgans.length / 2));
  const rightLabels = shuffledOrgans.slice(Math.ceil(shuffledOrgans.length / 2));
  const labelHtml = items => items.map(o => `
    <div class="game-label" id="breathing-game-label-${o.id}" draggable="true"
      data-organ="${o.id}"
      onclick="selectBreathingGameLabel('${o.id}')"
      ondragstart="handleBreathingGameDragStart(event)">
      ${o.emoji} ${o.label}
    </div>
  `).join('');

  document.getElementById('breathing-game-visual').innerHTML = `
    <div class="game-side-labels game-side-labels-left">
      <div class="game-label-bank">${labelHtml(leftLabels)}</div>
    </div>
    <div class="pencernaan-img-wrap organ-game-board">
      <img src="assets/images/diagram-pernapasan.jpg" alt="Sistem Pernapasan" class="pencernaan-img" />
      <svg class="pencernaan-svg-overlay" viewBox="0 0 500 700" xmlns="http://www.w3.org/2000/svg">
        ${targetHtml}
      </svg>
      <div class="game-result-alert" id="breathing-game-alert">Benar</div>
    </div>
    <div class="game-side-labels game-side-labels-right">
      <div class="game-label-bank">${labelHtml(rightLabels)}</div>
    </div>
  `;

  updateBreathingGameScore('Mulai dari label mana saja.');
  showPage('page-game-pernapasan');
}

function handleBreathingGameDragStart(event) {
  const organId = event.currentTarget.dataset.organ;
  breathingGameState.selectedId = organId;
  event.dataTransfer.setData('text/plain', organId);
  event.dataTransfer.effectAllowed = 'move';
  selectBreathingGameLabel(organId);
}

function handleBreathingGameDragOver(event) {
  event.preventDefault();
  event.currentTarget.classList.add('drag-over');
}

function handleBreathingGameDragLeave(event) {
  event.currentTarget.classList.remove('drag-over');
}

function handleBreathingGameDrop(event) {
  event.preventDefault();
  const target = event.currentTarget;
  const organId = event.dataTransfer.getData('text/plain');
  target.classList.remove('drag-over');
  checkBreathingGameAnswer(organId, target.dataset.target, target);
}

function selectBreathingGameLabel(organId) {
  if (breathingGameState.placed[organId]) return;
  breathingGameState.selectedId = organId;
  document.querySelectorAll('.game-label').forEach(label => label.classList.remove('selected'));
  const label = document.getElementById('breathing-game-label-' + organId);
  if (label) label.classList.add('selected');
}

function placeSelectedBreathingGameLabel(targetId, targetEl) {
  if (!breathingGameState.selectedId) {
    updateBreathingGameScore('Pilih atau drag salah satu label dulu.', 'wrong');
    return;
  }
  checkBreathingGameAnswer(breathingGameState.selectedId, targetId, targetEl);
}

function checkBreathingGameAnswer(organId, targetId, targetEl) {
  if (!organId || breathingGameState.placed[targetId] || breathingGameState.placed[organId]) return;

  if (organId === targetId) {
    const organ = organDetailMap[organId];
    breathingGameState.placed[organId] = true;
    breathingGameState.score += 1;
    targetEl.classList.remove('wrong');
    targetEl.classList.add('correct');
    targetEl.textContent = organ.emoji + ' ' + organ.label;

    const label = document.getElementById('breathing-game-label-' + organId);
    if (label) label.classList.add('placed');

    breathingGameState.selectedId = null;
    document.querySelectorAll('.game-label').forEach(item => item.classList.remove('selected'));

    const done = breathingGameState.score === breathingGameTargets.length;
    updateBreathingGameScore(done ? 'Hebat, semua label sudah benar!' : 'Benar! Score bertambah.', 'correct');
    showBreathingGameAlert('Benar', 'correct');
    return;
  }

  targetEl.classList.add('wrong');
  updateBreathingGameScore('', 'wrong');
  showBreathingGameAlert('Salah', 'wrong');
  setTimeout(() => targetEl.classList.remove('wrong'), 350);
}

function showBreathingGameAlert(message, state) {
  const alert = document.getElementById('breathing-game-alert');
  if (!alert) return;

  clearTimeout(breathingGameAlertTimer);
  alert.textContent = message;
  alert.className = 'game-result-alert ' + state + ' show';

  breathingGameAlertTimer = setTimeout(() => {
    alert.classList.remove('show');
  }, 500);
}

function updateBreathingGameScore(message, state = '') {
  const score = document.getElementById('breathing-game-score');
  const feedback = document.getElementById('breathing-game-feedback');
  if (score) score.textContent = `⭐ ${breathingGameState.score} / ${breathingGameTargets.length}`;
  if (feedback) {
    feedback.textContent = message;
    feedback.className = 'game-feedback' + (state ? ' ' + state : '');
  }
}

const circulationGameTargets = [
  { id: 'paru-peredaran', line: { x1: 720, y1: 100, x2: 960, y2: 60 }, box: { x: 960, y: 4, w: 250, h: 112 }, color: '#60A5FA' },
  { id: 'jantung2', line: { x1: 550, y1: 440, x2: 260, y2: 360 }, box: { x: 10, y: 304, w: 250, h: 112 }, color: '#F87171' },
  { id: 'arteri', line: { x1: 980, y1: 260, x2: 1150, y2: 200 }, box: { x: 1150, y: 144, w: 220, h: 112 }, color: '#EF4444' },
  { id: 'vena', line: { x1: 300, y1: 260, x2: 100, y2: 200 }, box: { x: -120, y: 144, w: 220, h: 112 }, color: '#6366F1' },
  { id: 'kapiler-paru', line: { x1: 500, y1: 80, x2: 100, y2: 40 }, box: { x: -170, y: -16, w: 270, h: 112 }, color: '#34D399' },
  { id: 'kapiler-tubuh', line: { x1: 640, y1: 840, x2: 1100, y2: 880 }, box: { x: 1100, y: 824, w: 280, h: 112 }, color: '#059669' },
];

let circulationGameState = { score: 0, placed: {}, selectedId: null };
let circulationGameAlertTimer = null;

function showCirculationGame() {
  if (!document.getElementById('circulation-game-visual')) { navigateToUrl(PAGE_URLS['page-game-peredaran']); return; }
  const organs = materiData.peredaran.organs;
  circulationGameState = { score: 0, placed: {}, selectedId: null };
  const visual = document.getElementById('circulation-game-visual');
  visual.classList.add('circulation-game-panel');

  const targetHtml = circulationGameTargets.map(target => `
    <line x1="${target.line.x1}" y1="${target.line.y1}" x2="${target.line.x2}" y2="${target.line.y2}"
      stroke="${target.color}" stroke-width="2"/>
    <foreignObject x="${target.box.x}" y="${target.box.y}" width="${target.box.w}" height="${target.box.h}">
      <div xmlns="http://www.w3.org/1999/xhtml" class="organ-drop-zone"
        data-target="${target.id}"
        ondragover="handleCirculationGameDragOver(event)"
        ondragleave="handleCirculationGameDragLeave(event)"
        ondrop="handleCirculationGameDrop(event)"
        onclick="placeSelectedCirculationGameLabel('${target.id}', this)">
        Letakkan di sini
      </div>
    </foreignObject>
  `).join('');

  const shuffledOrgans = shuffleItems(organs);
  const leftLabels = shuffledOrgans.slice(0, Math.ceil(shuffledOrgans.length / 2));
  const rightLabels = shuffledOrgans.slice(Math.ceil(shuffledOrgans.length / 2));
  const labelHtml = items => items.map(o => `
    <div class="game-label" id="circulation-game-label-${o.id}" draggable="true"
      data-organ="${o.id}"
      onclick="selectCirculationGameLabel('${o.id}')"
      ondragstart="handleCirculationGameDragStart(event)">
      ${o.emoji} ${o.label}
    </div>
  `).join('');

  visual.innerHTML = `
    <div class="game-side-labels game-side-labels-left">
      <div class="game-label-bank">${labelHtml(leftLabels)}</div>
    </div>
    <div class="pencernaan-img-wrap organ-game-board circulation-game-board">
      <img src="assets/images/diagram-peredaran-darah.jpg" alt="Sistem Peredaran Darah" class="pencernaan-img" />
      <svg class="pencernaan-svg-overlay" viewBox="0 0 1280 960" xmlns="http://www.w3.org/2000/svg">
        ${targetHtml}
      </svg>
      <div class="game-result-alert" id="circulation-game-alert">Benar</div>
    </div>
    <div class="game-side-labels game-side-labels-right">
      <div class="game-label-bank">${labelHtml(rightLabels)}</div>
    </div>
  `;

  updateCirculationGameScore('Mulai dari label mana saja.');
  showPage('page-game-peredaran');
}

function handleCirculationGameDragStart(event) {
  const organId = event.currentTarget.dataset.organ;
  circulationGameState.selectedId = organId;
  event.dataTransfer.setData('text/plain', organId);
  event.dataTransfer.effectAllowed = 'move';
  selectCirculationGameLabel(organId);
}

function handleCirculationGameDragOver(event) {
  event.preventDefault();
  event.currentTarget.classList.add('drag-over');
}

function handleCirculationGameDragLeave(event) {
  event.currentTarget.classList.remove('drag-over');
}

function handleCirculationGameDrop(event) {
  event.preventDefault();
  const target = event.currentTarget;
  const organId = event.dataTransfer.getData('text/plain');
  target.classList.remove('drag-over');
  checkCirculationGameAnswer(organId, target.dataset.target, target);
}

function selectCirculationGameLabel(organId) {
  if (circulationGameState.placed[organId]) return;
  circulationGameState.selectedId = organId;
  document.querySelectorAll('.game-label').forEach(label => label.classList.remove('selected'));
  const label = document.getElementById('circulation-game-label-' + organId);
  if (label) label.classList.add('selected');
}

function placeSelectedCirculationGameLabel(targetId, targetEl) {
  if (!circulationGameState.selectedId) {
    updateCirculationGameScore('Pilih atau drag salah satu label dulu.', 'wrong');
    return;
  }
  checkCirculationGameAnswer(circulationGameState.selectedId, targetId, targetEl);
}

function checkCirculationGameAnswer(organId, targetId, targetEl) {
  if (!organId || circulationGameState.placed[targetId] || circulationGameState.placed[organId]) return;

  if (organId === targetId) {
    const organ = organDetailMap[organId];
    circulationGameState.placed[organId] = true;
    circulationGameState.score += 1;
    targetEl.classList.remove('wrong');
    targetEl.classList.add('correct');
    targetEl.textContent = organ.emoji + ' ' + organ.label;

    const label = document.getElementById('circulation-game-label-' + organId);
    if (label) label.classList.add('placed');

    circulationGameState.selectedId = null;
    document.querySelectorAll('.game-label').forEach(item => item.classList.remove('selected'));

    const done = circulationGameState.score === circulationGameTargets.length;
    updateCirculationGameScore(done ? 'Hebat, semua label sudah benar!' : 'Benar! Score bertambah.', 'correct');
    showCirculationGameAlert('Benar', 'correct');
    return;
  }

  targetEl.classList.add('wrong');
  updateCirculationGameScore('', 'wrong');
  showCirculationGameAlert('Salah', 'wrong');
  setTimeout(() => targetEl.classList.remove('wrong'), 350);
}

function showCirculationGameAlert(message, state) {
  const alert = document.getElementById('circulation-game-alert');
  if (!alert) return;

  clearTimeout(circulationGameAlertTimer);
  alert.textContent = message;
  alert.className = 'game-result-alert ' + state + ' show';

  circulationGameAlertTimer = setTimeout(() => {
    alert.classList.remove('show');
  }, 500);
}

function updateCirculationGameScore(message, state = '') {
  const score = document.getElementById('circulation-game-score');
  const feedback = document.getElementById('circulation-game-feedback');
  if (score) score.textContent = `⭐ ${circulationGameState.score} / ${circulationGameTargets.length}`;
  if (feedback) {
    feedback.textContent = message;
    feedback.className = 'game-feedback' + (state ? ' ' + state : '');
  }
}

const excretionGameTargets = [
  { id: 'ginjal2', line: { x1: 100, y1: 140, x2: 30, y2: 80 }, box: { x: -20, y: 44, w: 160, h: 62 }, color: '#F59E0B' },
  { id: 'ginjal3', line: { x1: 400, y1: 140, x2: 470, y2: 80 }, box: { x: 360, y: 44, w: 160, h: 62 }, color: '#F59E0B' },
  { id: 'ureter', line: { x1: 190, y1: 350, x2: 30, y2: 330 }, box: { x: -20, y: 300, w: 130, h: 62 }, color: '#60A5FA' },
  { id: 'kandung2', line: { x1: 320, y1: 530, x2: 430, y2: 510 }, box: { x: 350, y: 480, w: 160, h: 62 }, color: '#38BDF8' },
  { id: 'uretra2', line: { x1: 260, y1: 648, x2: 380, y2: 650 }, box: { x: 360, y: 620, w: 130, h: 62 }, color: '#6B7280' },
];

let excretionGameState = { score: 0, placed: {}, selectedId: null };
let excretionGameAlertTimer = null;

function showExcretionGame() {
  if (!document.getElementById('excretion-game-visual')) { navigateToUrl(PAGE_URLS['page-game-ekskresi']); return; }
  const organs = materiData.ekskresi.organs;
  excretionGameState = { score: 0, placed: {}, selectedId: null };
  const visual = document.getElementById('excretion-game-visual');
  visual.classList.add('excretion-game-panel');

  const targetHtml = excretionGameTargets.map(target => `
    <line x1="${target.line.x1}" y1="${target.line.y1}" x2="${target.line.x2}" y2="${target.line.y2}"
      stroke="${target.color}" stroke-width="1.5"/>
    <foreignObject x="${target.box.x}" y="${target.box.y}" width="${target.box.w}" height="${target.box.h}">
      <div xmlns="http://www.w3.org/1999/xhtml" class="organ-drop-zone"
        data-target="${target.id}"
        ondragover="handleExcretionGameDragOver(event)"
        ondragleave="handleExcretionGameDragLeave(event)"
        ondrop="handleExcretionGameDrop(event)"
        onclick="placeSelectedExcretionGameLabel('${target.id}', this)">
        Letakkan di sini
      </div>
    </foreignObject>
  `).join('');

  const shuffledOrgans = shuffleItems(organs);
  const leftLabels = shuffledOrgans.slice(0, Math.ceil(shuffledOrgans.length / 2));
  const rightLabels = shuffledOrgans.slice(Math.ceil(shuffledOrgans.length / 2));
  const labelHtml = items => items.map(o => `
    <div class="game-label" id="excretion-game-label-${o.id}" draggable="true"
      data-organ="${o.id}"
      onclick="selectExcretionGameLabel('${o.id}')"
      ondragstart="handleExcretionGameDragStart(event)">
      ${o.emoji} ${o.label}
    </div>
  `).join('');

  visual.innerHTML = `
    <div class="game-side-labels game-side-labels-left">
      <div class="game-label-bank">${labelHtml(leftLabels)}</div>
    </div>
    <div class="pencernaan-img-wrap organ-game-board excretion-game-board">
      <img src="assets/images/diagram-ekskresi.jpg" alt="Sistem Ekskresi" class="pencernaan-img" />
      <svg class="pencernaan-svg-overlay" viewBox="0 0 500 700" xmlns="http://www.w3.org/2000/svg">
        ${targetHtml}
      </svg>
      <div class="game-result-alert" id="excretion-game-alert">Benar</div>
    </div>
    <div class="game-side-labels game-side-labels-right">
      <div class="game-label-bank">${labelHtml(rightLabels)}</div>
    </div>
  `;

  updateExcretionGameScore('Mulai dari label mana saja.');
  showPage('page-game-ekskresi');
}

function handleExcretionGameDragStart(event) {
  const organId = event.currentTarget.dataset.organ;
  excretionGameState.selectedId = organId;
  event.dataTransfer.setData('text/plain', organId);
  event.dataTransfer.effectAllowed = 'move';
  selectExcretionGameLabel(organId);
}

function handleExcretionGameDragOver(event) {
  event.preventDefault();
  event.currentTarget.classList.add('drag-over');
}

function handleExcretionGameDragLeave(event) {
  event.currentTarget.classList.remove('drag-over');
}

function handleExcretionGameDrop(event) {
  event.preventDefault();
  const target = event.currentTarget;
  const organId = event.dataTransfer.getData('text/plain');
  target.classList.remove('drag-over');
  checkExcretionGameAnswer(organId, target.dataset.target, target);
}

function selectExcretionGameLabel(organId) {
  if (excretionGameState.placed[organId]) return;
  excretionGameState.selectedId = organId;
  document.querySelectorAll('.game-label').forEach(label => label.classList.remove('selected'));
  const label = document.getElementById('excretion-game-label-' + organId);
  if (label) label.classList.add('selected');
}

function placeSelectedExcretionGameLabel(targetId, targetEl) {
  if (!excretionGameState.selectedId) {
    updateExcretionGameScore('Pilih atau drag salah satu label dulu.', 'wrong');
    return;
  }
  checkExcretionGameAnswer(excretionGameState.selectedId, targetId, targetEl);
}

function checkExcretionGameAnswer(organId, targetId, targetEl) {
  if (!organId || excretionGameState.placed[targetId] || excretionGameState.placed[organId]) return;

  if (organId === targetId) {
    const organ = organDetailMap[organId];
    excretionGameState.placed[organId] = true;
    excretionGameState.score += 1;
    targetEl.classList.remove('wrong');
    targetEl.classList.add('correct');
    targetEl.textContent = organ.emoji + ' ' + organ.label;

    const label = document.getElementById('excretion-game-label-' + organId);
    if (label) label.classList.add('placed');

    excretionGameState.selectedId = null;
    document.querySelectorAll('.game-label').forEach(item => item.classList.remove('selected'));

    const done = excretionGameState.score === excretionGameTargets.length;
    updateExcretionGameScore(done ? 'Hebat, semua label sudah benar!' : 'Benar! Score bertambah.', 'correct');
    showExcretionGameAlert('Benar', 'correct');
    return;
  }

  targetEl.classList.add('wrong');
  updateExcretionGameScore('', 'wrong');
  showExcretionGameAlert('Salah', 'wrong');
  setTimeout(() => targetEl.classList.remove('wrong'), 350);
}

function showExcretionGameAlert(message, state) {
  const alert = document.getElementById('excretion-game-alert');
  if (!alert) return;

  clearTimeout(excretionGameAlertTimer);
  alert.textContent = message;
  alert.className = 'game-result-alert ' + state + ' show';

  excretionGameAlertTimer = setTimeout(() => {
    alert.classList.remove('show');
  }, 500);
}

function updateExcretionGameScore(message, state = '') {
  const score = document.getElementById('excretion-game-score');
  const feedback = document.getElementById('excretion-game-feedback');
  if (score) score.textContent = `⭐ ${excretionGameState.score} / ${excretionGameTargets.length}`;
  if (feedback) {
    feedback.textContent = message;
    feedback.className = 'game-feedback' + (state ? ' ' + state : '');
  }
}

function showMateri(key) {
  const data = materiData[key];
  if (!document.getElementById('panel-left') || !document.getElementById('panel-right')) {
    navigateToUrl(MATERI_URLS[key]);
    return;
  }
  document.getElementById('materi-top-title').textContent = data.icon + ' ' + data.title;
  activeOrgan = null;
  activeMateri = key;
  resetMateriTab();
  // Tandai materi sebagai sudah dibaca
  markMateriRead(key);

  // Build SVG diagram
  const svgH = Math.max(...data.organs.map(o => o.y + o.h)) + 40;
  let svgOrganHtml = '';
  data.organs.forEach(o => {
    const detailEscaped = (o.detail || o.fungsi).replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\n/g,'\\n');
    svgOrganHtml += `
      <g class="organ-hotspot" id="hot-${o.id}" onclick="selectOrgan('${o.id}','${o.label.replace(/'/g,"\\'")}','${o.emoji}','${o.fungsi.replace(/'/g,"\\'")}','${detailEscaped}')">
        <rect class="organ-shape" x="${o.x}" y="${o.y}" width="${o.w}" height="${o.h}"
          rx="12" fill="${o.color}" fill-opacity="0.85" stroke="${o.color}" stroke-width="2"/>
        <text x="${o.x + o.w/2}" y="${o.y + o.h/2 - 2}" text-anchor="middle" dominant-baseline="middle"
          style="font-size:18px;pointer-events:none;">${o.emoji}</text>
      </g>
    `;
  });

  // Labels outside
  let labelHtml = '';
  data.organs.forEach(o => {
    const detailEscaped = (o.detail || o.fungsi).replace(/\\/g,'\\\\').replace(/'/g,"\\'").replace(/\n/g,'\\n');
    labelHtml += `<div class="organ-chip" id="chip-${o.id}"
      onclick="selectOrgan('${o.id}','${o.label.replace(/'/g,"\\'")}','${o.emoji}','${o.fungsi.replace(/'/g,"\\'")}','${detailEscaped}')">
      ${o.emoji} ${o.label}
    </div>`;
  });

  if (key === 'pencernaan') {
    document.getElementById('panel-left').innerHTML = `
      <div class="pencernaan-img-wrap">
        <img src="assets/images/diagram-pencernaan.jpg" alt="Sistem Pencernaan" class="pencernaan-img" />
        <div class="digestive-controls" aria-label="Kontrol animasi pencernaan">
          <button type="button" id="digestive-play-btn" class="digestive-control-btn active" onclick="setDigestiveAnimation(true)">▶ Play</button>
          <button type="button" id="digestive-pause-btn" class="digestive-control-btn" onclick="setDigestiveAnimation(false)">⏸ Pause</button>
        </div>
        <svg id="pencernaan-svg" class="pencernaan-svg-overlay" viewBox="0 0 500 900" xmlns="http://www.w3.org/2000/svg">
          <!-- Animasi alur makanan dari mulut sampai anus -->
          <path id="digestive-route" class="digestive-flow-route"
            d="M 160 185
               C 183 188, 214 202, 236 223
               C 256 248, 254 315, 253 378
               C 252 431, 272 454, 304 474
               C 337 494, 355 526, 334 551
               C 309 581, 256 573, 221 565
               C 194 560, 179 580, 190 603
               C 207 636, 282 604, 319 630
               C 350 652, 313 688, 260 681
               C 207 674, 179 694, 203 721
               C 230 750, 321 705, 335 746
               C 349 787, 221 806, 190 745
               C 166 698, 142 637, 164 596
               C 191 547, 354 557, 363 624
               C 374 704, 352 770, 301 786
               C 266 797, 247 810, 248 840" />

          <g class="digestive-stage digestive-stage-food">
            <image href="assets/images/anim-pencernaan-1.png" x="-30" y="-21" width="60" height="42" preserveAspectRatio="xMidYMid meet"/>
            <animate attributeName="opacity" dur="11s" repeatCount="indefinite"
              keyTimes="0;0.16;0.21;1" values="1;1;0;0"/>
            <animateMotion dur="11s" repeatCount="indefinite" rotate="auto">
              <mpath href="#digestive-route"/>
            </animateMotion>
          </g>

          <g class="digestive-stage digestive-stage-kerongkongan">
            <image href="assets/images/anim-pencernaan-2.png" x="-30" y="-20" width="60" height="40" preserveAspectRatio="xMidYMid meet"/>
            <animate attributeName="opacity" dur="11s" repeatCount="indefinite"
              keyTimes="0;0.13;0.18;0.31;0.36;1" values="0;0;1;1;0;0"/>
            <animateMotion dur="11s" repeatCount="indefinite" rotate="auto">
              <mpath href="#digestive-route"/>
            </animateMotion>
          </g>

          <g class="digestive-stage digestive-stage-lambung">
            <image href="assets/images/anim-pencernaan-3.png" x="-32" y="-22" width="64" height="44" preserveAspectRatio="xMidYMid meet"/>
            <animate attributeName="opacity" dur="11s" repeatCount="indefinite"
              keyTimes="0;0.28;0.34;0.47;0.53;1" values="0;0;1;1;0;0"/>
            <animateMotion dur="11s" repeatCount="indefinite" rotate="auto">
              <mpath href="#digestive-route"/>
            </animateMotion>
          </g>

          <g class="digestive-stage digestive-stage-usus-halus">
            <image href="assets/images/anim-pencernaan-4.png" x="-32" y="-20" width="64" height="40" preserveAspectRatio="xMidYMid meet"/>
            <animate attributeName="opacity" dur="11s" repeatCount="indefinite"
              keyTimes="0;0.44;0.50;0.65;0.71;1" values="0;0;1;1;0;0"/>
            <animateMotion dur="11s" repeatCount="indefinite" rotate="auto">
              <mpath href="#digestive-route"/>
            </animateMotion>
          </g>

          <g class="digestive-stage digestive-stage-usus-besar">
            <image href="assets/images/anim-pencernaan-5.png" x="-33" y="-20" width="66" height="40" preserveAspectRatio="xMidYMid meet"/>
            <animate attributeName="opacity" dur="11s" repeatCount="indefinite"
              keyTimes="0;0.62;0.68;0.82;0.88;1" values="0;0;1;1;0;0"/>
            <animateMotion dur="11s" repeatCount="indefinite" rotate="auto">
              <mpath href="#digestive-route"/>
            </animateMotion>
          </g>

          <g class="digestive-stage digestive-stage-anus">
            <image href="assets/images/anim-pencernaan-6.png" x="-27" y="-20" width="54" height="40" preserveAspectRatio="xMidYMid meet"/>
            <animate attributeName="opacity" dur="11s" repeatCount="indefinite"
              keyTimes="0;0.82;0.88;0.98;1" values="0;0;1;1;0"/>
            <animateMotion dur="11s" repeatCount="indefinite" rotate="auto">
              <mpath href="#digestive-route"/>
            </animateMotion>
          </g>

          <!-- Hotspot area organ -->
          <ellipse class="digestive-click-area" cx="161" cy="185" rx="46" ry="26" onclick="event.stopPropagation(); selectOrganById('mulut')"/>
          <ellipse class="digestive-click-area" cx="254" cy="260" rx="24" ry="62" onclick="event.stopPropagation(); selectOrganById('kerongkongan')"/>
          <ellipse class="digestive-click-area" cx="300" cy="500" rx="54" ry="44" onclick="event.stopPropagation(); selectOrganById('lambung2')"/>
          <ellipse class="digestive-click-area" cx="252" cy="665" rx="62" ry="68" onclick="event.stopPropagation(); selectOrganById('usus-halus')"/>
          <ellipse class="digestive-click-area" cx="155" cy="660" rx="52" ry="68" onclick="event.stopPropagation(); selectOrganById('usus-besar')"/>
          <ellipse class="digestive-click-area" cx="248" cy="840" rx="28" ry="22" onclick="event.stopPropagation(); selectOrganById('anus')"/>

          <!-- Mulut -->
          <line id="line-mulut" x1="175" y1="185" x2="350" y2="170" stroke="#3B82F6" stroke-width="1.5"/>
          <foreignObject id="fo-mulut" x="345" y="148" width="145" height="44">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" onclick="selectOrgan('mulut','Mulut','👄','Tempat masuk makanan. Gigi mengunyah, lidah membantu menelan, saliva mengandung enzim amilase.')"><img class="organ-label-icon" src="assets/images/asset_c431380d.png" alt="" /> Mulut</div>
          </foreignObject>
          <!-- Kerongkongan -->
          <line id="line-kerongkongan" x1="254" y1="234" x2="340" y2="210" stroke="#FB923C" stroke-width="1.5"/>
          <foreignObject id="fo-kerongkongan" x="335" y="188" width="160" height="44">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#FB923C22;border-color:#FB923C;color:#C2410C" onclick="selectOrgan('kerongkongan','Kerongkongan','📏','Saluran berotot sepanjang ±25cm yang mendorong makanan dari mulut ke lambung (gerak peristaltik).')"><img class="organ-label-icon" src="assets/images/asset_77905e2b.png" alt="" /> Kerongkongan</div>
          </foreignObject>

          <!-- Lambung -->
          <line id="line-lambung" x1="314" y1="492" x2="350" y2="455" stroke="#A78BFA" stroke-width="1.5"/>
          <foreignObject id="fo-lambung" x="345" y="433" width="145" height="44">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#EDE9FE22;border-color:#A78BFA;color:#5B21B6" onclick="selectOrgan('lambung2','Lambung','🫙','Mencerna makanan selama 2–4 jam dengan asam klorida (HCl) dan enzim pepsin.')"><img class="organ-label-icon" src="assets/images/asset_6b6bd69e.png" alt="" /> Lambung</div>
          </foreignObject>
          <!-- Usus Halus -->
          <line id="line-usushalus" x1="252" y1="665" x2="350" y2="640" stroke="#60A5FA" stroke-width="1.5"/>
          <foreignObject id="fo-usushalus" x="345" y="618" width="150" height="44">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#EFF6FF22;border-color:#60A5FA;color:#1D4ED8" onclick="selectOrgan('usus-halus','Usus Halus','〰️','Saluran sepanjang 6–7 meter tempat penyerapan nutrisi (glukosa, asam amino, lemak) ke darah.')"><img class="organ-label-icon" src="assets/images/asset_582e9009.png" alt="" /> Usus Halus</div>
          </foreignObject>
          <!-- Usus Besar -->
          <line id="line-ususbesarr" x1="142" y1="677" x2="80" y2="610" stroke="#34D399" stroke-width="1.5"/>
          <foreignObject id="fo-ususbesar" x="5" y="588" width="150" height="44">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#ECFDF522;border-color:#34D399;color:#065F46" onclick="selectOrgan('usus-besar','Usus Besar','🔄','Menyerap air dan elektrolit dari sisa makanan. Membentuk dan menyimpan feses.')"><img class="organ-label-icon" src="assets/images/asset_7513425a.png" alt="" /> Usus Besar</div>
          </foreignObject>
          <!-- Anus -->
          <line id="line-anus" x1="248" y1="840" x2="350" y2="830" stroke="#6B7280" stroke-width="1.5"/>
          <foreignObject id="fo-anus" x="345" y="808" width="145" height="44">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#F9FAFB22;border-color:#6B7280;color:#374151" onclick="selectOrgan('anus','Anus','⬇️','Lubang akhir saluran pencernaan tempat feses dikeluarkan dari tubuh.')"><img class="organ-label-icon" src="assets/images/asset_51c8a8bd.png" alt="" /> Anus</div>
          </foreignObject>
        </svg>

      </div>
      <p class="hint-text"><span>👆</span> Klik label organ untuk melihat fungsinya</p>
    `;
    const digestiveSvg = document.querySelector('#panel-left .pencernaan-svg-overlay');
    if (digestiveSvg) digestiveSvg.addEventListener('click', handleDigestiveImageClick);
  } else if (key === 'organ') {
    document.getElementById('panel-left').innerHTML = `
      <div class="pencernaan-img-wrap">
        <img src="assets/images/diagram-organ-tubuh.jpg" alt="Organ Tubuh Manusia" class="pencernaan-img" />
        <svg class="pencernaan-svg-overlay" viewBox="0 0 500 900" xmlns="http://www.w3.org/2000/svg">
          <!-- Hotspot tiap organ -->
          <ellipse cx="265" cy="75"  rx="55" ry="60" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('otak','Otak','🧠','Pusat kendali seluruh aktivitas tubuh. Memproses informasi, mengatur gerakan, memori, dan emosi.')"/>
          <!-- Otak -->
          <ellipse cx="238" cy="120" rx="45" ry="50" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('otak','Otak','🧠','Pusat kendali seluruh aktivitas tubuh. Memproses informasi, mengatur gerakan, memori, dan emosi.')"/>
          <!-- Paru kiri & kanan -->
          <ellipse cx="220" cy="395" rx="40" ry="55" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('paru','Paru-paru','🫁','Tempat pertukaran gas O₂ (oksigen) masuk dan CO₂ (karbon dioksida) keluar.')"/>
          <ellipse cx="305" cy="395" rx="40" ry="55" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('paru','Paru-paru','🫁','Tempat pertukaran gas O₂ (oksigen) masuk dan CO₂ (karbon dioksida) keluar.')"/>
          <!-- Jantung -->
          <ellipse cx="252" cy="407" rx="32" ry="28" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('jantung','Jantung','❤️','Memompa darah ke seluruh tubuh. Berdetak sekitar 60–100 kali per menit.')"/>
          <!-- Hati -->
          <ellipse cx="200" cy="470" rx="52" ry="38" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('hati','Hati','🟫','Menyaring racun dari darah, memproduksi empedu, dan menyimpan glikogen.')"/>
          <!-- Lambung -->
          <ellipse cx="283" cy="488" rx="38" ry="30" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('lambung','Lambung','🫙','Mencerna makanan secara mekanik dan kimiawi menggunakan asam lambung dan enzim.')"/>
          <!-- Ginjal kiri & kanan -->
          <ellipse cx="215" cy="517" rx="28" ry="35" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('ginjal','Ginjal','🫘','Menyaring darah dan menghasilkan urine. Mengatur keseimbangan cairan dan elektrolit.')"/>
          <ellipse cx="285" cy="517" rx="28" ry="35" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('ginjal','Ginjal','🫘','Menyaring darah dan menghasilkan urine. Mengatur keseimbangan cairan dan elektrolit.')"/>
          <!-- Usus -->
          <ellipse cx="238" cy="597" rx="55" ry="65" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('usus','Usus','🌀','Menyerap sari-sari makanan (usus halus) dan menyerap air serta membentuk feses (usus besar).')"/>
          <!-- Kandung Kemih -->
          <ellipse cx="238" cy="685" rx="35" ry="28" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('kandung','Kand. Kemih','💧','Menampung urine sebelum dikeluarkan dari tubuh melalui uretra.')"/>



          <!-- Otak -->
          <line id="organ-line-otak" x1="238" y1="143" x2="360" y2="50"  stroke="#818CF8" stroke-width="1.5"/>
          <foreignObject id="organ-fo-otak" x="355" y="28" width="140" height="44">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#EEF2FF22;border-color:#818CF8;color:#4338CA" onclick="selectOrgan('otak','Otak','🧠','Pusat kendali seluruh aktivitas tubuh. Memproses informasi, mengatur gerakan, memori, dan emosi.')">🧠 Otak</div>
          </foreignObject>

          <!-- Paru-paru -->
          <line id="organ-line-paru" x1="296" y1="402" x2="80" y2="220" stroke="#60A5FA" stroke-width="1.5"/>
          <foreignObject id="organ-fo-paru" x="5" y="198" width="135" height="44">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#EFF6FF22;border-color:#60A5FA;color:#1D4ED8" onclick="selectOrgan('paru','Paru-paru','🫁','Tempat pertukaran gas O₂ (oksigen) masuk dan CO₂ (karbon dioksida) keluar.')">🫁 Paru</div>
          </foreignObject>

          <!-- Jantung -->
          <line id="organ-line-jantung" x1="252" y1="407" x2="360" y2="260" stroke="#F87171" stroke-width="1.5"/>
          <foreignObject id="organ-fo-jantung" x="355" y="238" width="140" height="44">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#FEF2F222;border-color:#F87171;color:#B91C1C" onclick="selectOrgan('jantung','Jantung','❤️','Memompa darah ke seluruh tubuh. Berdetak sekitar 60–100 kali per menit.')">❤️ Jantung</div>
          </foreignObject>

          <!-- Hati -->
          <line id="organ-line-hati" x1="187" y1="481" x2="80" y2="360" stroke="#FB923C" stroke-width="1.5"/>
          <foreignObject id="organ-fo-hati" x="5" y="338" width="130" height="44">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#FFF7ED22;border-color:#FB923C;color:#C2410C" onclick="selectOrgan('hati','Hati','🟫','Menyaring racun dari darah, memproduksi empedu, dan menyimpan glikogen.')">🟫 Hati</div>
          </foreignObject>

          <!-- Lambung -->
          <line id="organ-line-lambung" x1="283" y1="488" x2="360" y2="330" stroke="#A78BFA" stroke-width="1.5"/>
          <foreignObject id="organ-fo-lambung" x="355" y="308" width="140" height="44">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#EDE9FE22;border-color:#A78BFA;color:#5B21B6" onclick="selectOrgan('lambung','Lambung','🫙','Mencerna makanan secara mekanik dan kimiawi menggunakan asam lambung dan enzim.')">🫙 Lambung</div>
          </foreignObject>

          <!-- Ginjal -->
          <line id="organ-line-ginjal" x1="269" y1="517" x2="80" y2="460" stroke="#F59E0B" stroke-width="1.5"/>
          <foreignObject id="organ-fo-ginjal" x="5" y="438" width="130" height="44">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#FFFBEB22;border-color:#F59E0B;color:#92400E" onclick="selectOrgan('ginjal','Ginjal','🫘','Menyaring darah dan menghasilkan urine. Mengatur keseimbangan cairan dan elektrolit.')">🫘 Ginjal</div>
          </foreignObject>

          <!-- Usus -->
          <line id="organ-line-usus" x1="238" y1="597" x2="360" y2="580" stroke="#34D399" stroke-width="1.5"/>
          <foreignObject id="organ-fo-usus" x="355" y="558" width="135" height="44">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#ECFDF522;border-color:#34D399;color:#065F46" onclick="selectOrgan('usus','Usus','🌀','Menyerap sari-sari makanan (usus halus) dan menyerap air serta membentuk feses (usus besar).')">🌀 Usus</div>
          </foreignObject>
          <!-- Kandung Kemih -->
          <line id="organ-line-kandung" x1="238" y1="690" x2="350" y2="710" stroke="#38BDF8" stroke-width="1.5"/>
          <foreignObject id="organ-fo-kandung" x="345" y="688" width="150" height="44">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#E0F7FF22;border-color:#38BDF8;color:#0369A1" onclick="selectOrgan('kandung','Kand. Kemih','💧','Menampung urine sebelum dikeluarkan dari tubuh melalui uretra.')">💧 Kand. Kemih</div>
          </foreignObject>
        </svg>
      </div>
      <p class="hint-text"><span>👆</span> Klik label organ untuk melihat fungsinya</p>
    `;
  } else if (key === 'pernapasan') {
    document.getElementById('panel-left').innerHTML = `
      <div class="pencernaan-img-wrap">
        <img src="assets/images/diagram-pernapasan.jpg" alt="Sistem Pernapasan" class="pencernaan-img" />
        <div class="digestive-controls" aria-label="Kontrol animasi pernapasan">
          <button type="button" id="breathing-play-btn" class="digestive-control-btn active" onclick="setBreathingAnimation(true)">▶ Play</button>
          <button type="button" id="breathing-pause-btn" class="digestive-control-btn" onclick="setBreathingAnimation(false)">⏸ Pause</button>
        </div>
        
<svg id="pernapasan-svg" class="pencernaan-svg-overlay" viewBox="0 0 500 700" xmlns="http://www.w3.org/2000/svg">
  <!-- Animasi mekanisme pernapasan mengikuti gambar: udara dari lubang hidung/mulut ke trakea, bercabang ke paru-paru, lalu keluar kembali -->
  <g class="breathing-lungs" transform="translate(256 406)">
    <g>
      <animateTransform attributeName="transform" type="scale" dur="6s" repeatCount="indefinite"
        keyTimes="0;0.5;1" values="1 1;1.16 1.16;1 1" calcMode="spline"
        keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/>
      <image href="assets/images/anim-pernapasan-paru.png" x="-141" y="-130" width="282" height="259"
        opacity="1" preserveAspectRatio="xMidYMid meet"/>
    </g>
  </g>

  <path id="breathing-route-nose-left" class="breathing-route"
    d="M 128 110
       C 158 107, 190 115, 212 135
       C 232 153, 235 186, 240 218
       C 246 252, 251 292, 254 336
       C 257 361, 262 374, 265 382
       C 238 394, 211 416, 192 442
       C 178 461, 169 473, 166 475" />
  <path id="breathing-route-mouth-left" class="breathing-route"
    d="M 128 145
       C 160 145, 196 154, 218 178
       C 234 195, 240 210, 246 218
       C 251 252, 254 292, 254 336
       C 257 361, 262 374, 265 382
       C 238 394, 211 416, 192 442
       C 178 461, 169 473, 166 475" />
  <path id="breathing-route-nose-right" class="breathing-route"
    d="M 128 110
       C 158 107, 190 115, 212 135
       C 232 153, 235 186, 240 218
       C 246 252, 251 292, 254 336
       C 257 361, 262 374, 265 382
       C 292 393, 315 421, 326 452
       C 330 463, 332 471, 332 474" />
  <path id="breathing-route-mouth-right" class="breathing-route"
    d="M 128 145
       C 160 145, 196 154, 218 178
       C 234 195, 240 210, 246 218
       C 251 252, 254 292, 254 336
       C 257 361, 262 374, 265 382
       C 292 393, 315 421, 326 452
       C 330 463, 332 471, 332 474" />
  <path id="breathing-route-out-left-nose" class="breathing-route breathing-route-out"
    d="M 166 475
       C 169 473, 178 461, 192 442
       C 211 416, 238 394, 265 382
       C 262 374, 257 361, 254 336
       C 251 292, 246 252, 240 218
       C 235 186, 232 153, 212 135
       C 190 115, 158 107, 128 110" />
  <path id="breathing-route-out-right-mouth" class="breathing-route breathing-route-out"
    d="M 332 474
       C 332 471, 330 463, 326 452
       C 315 421, 292 393, 265 382
       C 262 374, 257 361, 254 336
       C 254 292, 251 252, 246 218
       C 240 210, 234 195, 218 178
       C 196 154, 160 145, 128 145" />

  <g class="breathing-air">
    <image href="assets/images/anim-pernapasan-flow.png" x="-24" y="-24" width="48" height="48" preserveAspectRatio="xMidYMid meet">
      <animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.48;0.52;1" values="1;1;0;0"/>
      <animateMotion dur="6s" repeatCount="indefinite" keyTimes="0;0.5;1" keyPoints="0;1;1" calcMode="linear">
        <mpath href="#breathing-route-nose-left"/>
      </animateMotion>
    </image>
    <image href="assets/images/anim-pernapasan-flow.png" x="-22" y="-22" width="44" height="44" preserveAspectRatio="xMidYMid meet">
      <animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.48;0.52;1" values="1;1;0;0"/>
      <animateMotion dur="6s" repeatCount="indefinite" keyTimes="0;0.5;1" keyPoints="0;1;1" calcMode="linear">
        <mpath href="#breathing-route-mouth-right"/>
      </animateMotion>
    </image>
    <image href="assets/images/anim-pernapasan-flow.png" x="-20" y="-20" width="40" height="40" preserveAspectRatio="xMidYMid meet">
      <animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.48;0.52;1" values="1;1;0;0"/>
      <animateMotion dur="6s" repeatCount="indefinite" keyTimes="0;0.5;1" keyPoints="0;1;1" calcMode="linear">
        <mpath href="#breathing-route-nose-right"/>
      </animateMotion>
    </image>
    <image href="assets/images/anim-pernapasan-flow.png" x="-20" y="-20" width="40" height="40" preserveAspectRatio="xMidYMid meet">
      <animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.48;0.52;1" values="1;1;0;0"/>
      <animateMotion dur="6s" repeatCount="indefinite" keyTimes="0;0.5;1" keyPoints="0;1;1" calcMode="linear">
        <mpath href="#breathing-route-mouth-left"/>
      </animateMotion>
    </image>
  </g>

  <g class="breathing-air breathing-air-out">
    <image href="assets/images/anim-pernapasan-alveolus.png" x="-24" y="-24" width="48" height="48" preserveAspectRatio="xMidYMid meet">
      <animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.48;0.54;1" values="0;0;1;1"/>
      <animateMotion dur="6s" repeatCount="indefinite" keyTimes="0;0.5;1" keyPoints="0;0;1" calcMode="linear">
        <mpath href="#breathing-route-out-left-nose"/>
      </animateMotion>
    </image>
    <image href="assets/images/anim-pernapasan-alveolus.png" x="-22" y="-22" width="44" height="44" preserveAspectRatio="xMidYMid meet">
      <animate attributeName="opacity" dur="6s" repeatCount="indefinite" keyTimes="0;0.48;0.54;1" values="0;0;1;1"/>
      <animateMotion dur="6s" repeatCount="indefinite" keyTimes="0;0.5;1" keyPoints="0;0;1" calcMode="linear">
        <mpath href="#breathing-route-out-right-mouth"/>
      </animateMotion>
    </image>
  </g>

  <!-- Hidung -->
  <ellipse cx="220" cy="155" rx="70" ry="80" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('hidung','Hidung','👃','Menyaring debu, menghangatkan &amp; melembabkan udara. Rambut hidung menangkap partikel kotor.')"/>
  <!-- Trakea -->
  <ellipse cx="248" cy="260" rx="18" ry="55" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('trakea','Trakea','📏','Pipa napas sepanjang ±10cm, bercincin tulang rawan. Menghubungkan tenggorokan ke bronkus.')"/>
  <!-- Bronkus kiri -->
  <ellipse cx="175" cy="360" rx="35" ry="20" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('bronkus','Bronkus','🌿','Cabang dari trakea yang masuk ke paru-paru kiri dan kanan, kemudian bercabang jadi bronkiolus.')"/>
  <!-- Bronkus kanan -->
  <ellipse cx="280" cy="360" rx="35" ry="20" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('bronkus','Bronkus','🌿','Cabang dari trakea yang masuk ke paru-paru kiri dan kanan, kemudian bercabang jadi bronkiolus.')"/>
  <!-- Paru kiri -->
  <ellipse cx="165" cy="455" rx="65" ry="95" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('paru2','Paru-paru','🫁','Organ utama pernapasan. Terdiri dari jaringan berpori yang mengandung jutaan alveolus.')"/>
  <!-- Paru kanan -->
  <ellipse cx="330" cy="455" rx="65" ry="95" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('paru2','Paru-paru','🫁','Organ utama pernapasan. Terdiri dari jaringan berpori yang mengandung jutaan alveolus.')"/>
  <!-- Alveolus / bagian dalam paru -->
  <ellipse cx="300" cy="462" rx="40" ry="50" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('alveolus','Alveolus','🟢','Kantong udara kecil di ujung bronkiolus. Tempat pertukaran O₂ dan CO₂ antara udara dan darah.')"/>
  <!-- Bronkiolus kiri -->
  <ellipse cx="185" cy="337" rx="30" ry="18" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('bronkiolus','Bronkiolus','🌱','Cabang-cabang kecil bronkus di dalam paru-paru. Menyalurkan udara ke alveolus tanpa tulang rawan.')"/>
  <!-- Bronkiolus kanan -->
  <ellipse cx="308" cy="337" rx="30" ry="18" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('bronkiolus','Bronkiolus','🌱','Cabang-cabang kecil bronkus di dalam paru-paru. Menyalurkan udara ke alveolus tanpa tulang rawan.')"/>
  <!-- Diafragma -->
  <ellipse cx="173" cy="540" rx="90" ry="14" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('diafragma','Diafragma','〽️','Otot berbentuk kubah di bawah paru-paru. Berkontraksi saat menarik napas (inspirasi) dan relaksasi saat membuang napas (ekspirasi).')"/>

  <!-- Label Hidung -->
  <line id="organ-line-hidung" x1="138" y1="117" x2="60" y2="75" stroke="#FCD34D" stroke-width="1.5"/>
  <foreignObject id="organ-fo-hidung" x="5" y="52" width="140" height="44">
    <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#FFFBEB22;border-color:#FCD34D;color:#78350F" onclick="selectOrgan('hidung','Hidung','👃','Menyaring debu, menghangatkan &amp; melembabkan udara. Rambut hidung menangkap partikel kotor.')"><img class="organ-label-icon" src="assets/images/asset_6b7ff22c.png" alt="" /> Hidung</div>
  </foreignObject>

  <!-- Label Trakea -->
  <line id="organ-line-trakea" x1="258" y1="319" x2="360" y2="260" stroke="#60A5FA" stroke-width="1.5"/>
  <foreignObject id="organ-fo-trakea" x="355" y="238" width="140" height="44">
    <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#EFF6FF22;border-color:#60A5FA;color:#1D4ED8" onclick="selectOrgan('trakea','Trakea','📏','Pipa napas sepanjang ±10cm, bercincin tulang rawan. Menghubungkan tenggorokan ke bronkus.')"><img class="organ-label-icon" src="assets/images/asset_792144bf.png" alt="" /> Trakea</div>
  </foreignObject>

  <!-- Label Bronkus -->
  <line id="organ-line-bronkus" x1="254" y1="369" x2="65" y2="330" stroke="#A78BFA" stroke-width="1.5"/>
  <foreignObject id="organ-fo-bronkus" x="5" y="308" width="140" height="44">
    <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#EEF2FF22;border-color:#A78BFA;color:#5B21B6" onclick="selectOrgan('bronkus','Bronkus','🌿','Cabang dari trakea yang masuk ke paru-paru kiri dan kanan, kemudian bercabang jadi bronkiolus.')"><img class="organ-label-icon" src="assets/images/asset_61a2155b.png" alt="" /> Bronkus</div>
  </foreignObject>

  <!-- Label Paru-paru -->
  <line id="organ-line-paru2" x1="195" y1="403" x2="365" y2="400" stroke="#38BDF8" stroke-width="1.5"/>
  <foreignObject id="organ-fo-paru2" x="360" y="378" width="135" height="44">
    <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#F0F9FF22;border-color:#38BDF8;color:#0C4A6E" onclick="selectOrgan('paru2','Paru-paru','🫁','Organ utama pernapasan. Terdiri dari jaringan berpori yang mengandung jutaan alveolus.')"><img class="organ-label-icon" src="assets/images/asset_0e766104.png" alt="" /> Paru</div>
  </foreignObject>

  <!-- Label Alveolus -->
  <line id="organ-line-alveolus" x1="321" y1="448" x2="60" y2="490" stroke="#34D399" stroke-width="1.5"/>
  <foreignObject id="organ-fo-alveolus" x="5" y="468" width="145" height="44">
    <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#ECFDF522;border-color:#34D399;color:#065F46" onclick="selectOrgan('alveolus','Alveolus','🟢','Kantong udara kecil di ujung bronkiolus. Tempat pertukaran O₂ dan CO₂ antara udara dan darah.')"><img class="organ-label-icon" src="assets/images/asset_915b8955.png" alt="" /> Alveolus</div>
  </foreignObject>

  <!-- Label Bronkiolus (kanan) -->
  <line id="organ-line-bronkiolus" x1="305" y1="339" x2="355" y2="320" stroke="#F97316" stroke-width="1.5"/>
  <foreignObject id="organ-fo-bronkiolus" x="350" y="298" width="145" height="44">
    <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#FFF7ED22;border-color:#F97316;color:#9A3412" onclick="selectOrgan('bronkiolus','Bronkiolus','🌱','Cabang-cabang kecil bronkus di dalam paru-paru. Menyalurkan udara ke alveolus tanpa tulang rawan.')"><img class="organ-label-icon" src="assets/images/asset_e33c79d8.png" alt="" /> Bronkiolus</div>
  </foreignObject>

  <!-- Label Diafragma (kiri) -->
  <line id="organ-line-diafragma" x1="173" y1="548" x2="65" y2="580" stroke="#EC4899" stroke-width="1.5"/>
  <foreignObject id="organ-fo-diafragma" x="5" y="558" width="145" height="44">
    <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#FDF2F822;border-color:#EC4899;color:#9D174D" onclick="selectOrgan('diafragma','Diafragma','〽️','Otot berbentuk kubah di bawah paru-paru. Berkontraksi saat menarik napas (inspirasi) dan relaksasi saat membuang napas (ekspirasi).')"><img class="organ-label-icon" src="assets/images/asset_6dd3e2c9.png" alt="" /> Diafragma</div>
  </foreignObject>
</svg>
      </div>
      <p class="hint-text"><span>👆</span> Klik label organ untuk melihat fungsinya</p>
    `;
  } else if (key === 'peredaran') {
    const imgPeredaranSrc = 'assets/images/diagram-peredaran-darah.jpg';
    const imgJantungSrc = 'assets/images/anim-jantung-detail.png';
    document.getElementById('panel-left').innerHTML = `
      <div class="peredaran-img-wrap">
        <img class="pencernaan-img" src="${imgPeredaranSrc}" alt="Sistem Peredaran Darah"/>
        <img class="circulation-heart-img" src="${imgJantungSrc}" alt="Jantung berdetak"/>
        <div class="digestive-controls" aria-label="Kontrol animasi peredaran darah">
          <button type="button" id="circulation-play-btn" class="digestive-control-btn active" onclick="setCirculationAnimation(true)">▶ Play</button>
          <button type="button" id="circulation-pause-btn" class="digestive-control-btn" onclick="setCirculationAnimation(false)">⏸ Pause</button>
        </div>
        <svg id="peredaran-svg" class="pencernaan-svg-overlay" viewBox="0 0 1536 1024" xmlns="http://www.w3.org/2000/svg">
          <!-- Animasi mekanisme peredaran darah: merah = darah kaya O2, biru = darah kaya CO2 -->
          <path id="circulation-route-systemic-red" class="circulation-route circulation-route-oxygen"
            d="M 850 455
               C 925 455, 985 470, 1022 508
               C 1052 540, 1056 590, 1056 650
               L 1056 760
               C 1056 805, 1028 830, 970 838
               C 900 846, 835 792, 760 794
               C 700 798, 650 822, 596 846" />
          <path id="circulation-route-systemic-blue" class="circulation-route circulation-route-carbon"
            d="M 596 846
               C 548 842, 486 828, 455 792
               C 435 764, 445 704, 445 642
               L 445 555
               C 445 510, 475 482, 520 482
               L 620 482
               C 655 482, 682 493, 706 524" />
          <path id="circulation-route-pulmonary-blue" class="circulation-route circulation-route-carbon"
            d="M 704 424
               C 650 372, 615 355, 555 355
               L 412 355
               C 365 355, 340 328, 340 284
               L 340 184
               C 340 152, 362 142, 396 142
               L 535 142
               C 575 142, 602 134, 632 122" />
          <path id="circulation-route-pulmonary-red" class="circulation-route circulation-route-oxygen"
            d="M 905 122
               C 940 134, 965 142, 1005 142
               L 1148 142
               C 1188 142, 1208 165, 1208 202
               L 1208 305
               C 1208 350, 1178 368, 1125 368
               L 965 368
               C 920 368, 880 386, 842 424" />

          <ellipse class="circulation-heart-pulse" cx="768" cy="500" rx="126" ry="150"/>

          <g class="circulation-blood">
            <circle r="14" fill="#EF4444" stroke="#FEE2E2" stroke-width="4">
              <animateMotion dur="7s" repeatCount="indefinite" keyTimes="0;1" keyPoints="0;1" calcMode="linear">
                <mpath href="#circulation-route-systemic-red"/>
              </animateMotion>
            </circle>
            <circle r="11" fill="#F87171" stroke="#FEE2E2" stroke-width="3">
              <animateMotion dur="7s" begin="1.4s" repeatCount="indefinite" keyTimes="0;1" keyPoints="0;1" calcMode="linear">
                <mpath href="#circulation-route-systemic-red"/>
              </animateMotion>
            </circle>
            <circle r="12" fill="#DC2626" stroke="#FEE2E2" stroke-width="3">
              <animateMotion dur="7s" begin="2.8s" repeatCount="indefinite" keyTimes="0;1" keyPoints="0;1" calcMode="linear">
                <mpath href="#circulation-route-systemic-red"/>
              </animateMotion>
            </circle>

            <circle r="14" fill="#2563EB" stroke="#DBEAFE" stroke-width="4">
              <animateMotion dur="7s" repeatCount="indefinite" keyTimes="0;1" keyPoints="0;1" calcMode="linear">
                <mpath href="#circulation-route-systemic-blue"/>
              </animateMotion>
            </circle>
            <circle r="11" fill="#60A5FA" stroke="#DBEAFE" stroke-width="3">
              <animateMotion dur="7s" begin="1.5s" repeatCount="indefinite" keyTimes="0;1" keyPoints="0;1" calcMode="linear">
                <mpath href="#circulation-route-systemic-blue"/>
              </animateMotion>
            </circle>
            <circle r="12" fill="#1D4ED8" stroke="#DBEAFE" stroke-width="3">
              <animateMotion dur="7s" begin="3s" repeatCount="indefinite" keyTimes="0;1" keyPoints="0;1" calcMode="linear">
                <mpath href="#circulation-route-systemic-blue"/>
              </animateMotion>
            </circle>

            <circle r="12" fill="#2563EB" stroke="#DBEAFE" stroke-width="3">
              <animateMotion dur="4.8s" repeatCount="indefinite" keyTimes="0;1" keyPoints="0;1" calcMode="linear">
                <mpath href="#circulation-route-pulmonary-blue"/>
              </animateMotion>
            </circle>
            <circle r="10" fill="#60A5FA" stroke="#DBEAFE" stroke-width="3">
              <animateMotion dur="4.8s" begin="1.6s" repeatCount="indefinite" keyTimes="0;1" keyPoints="0;1" calcMode="linear">
                <mpath href="#circulation-route-pulmonary-blue"/>
              </animateMotion>
            </circle>

            <circle r="12" fill="#EF4444" stroke="#FEE2E2" stroke-width="3">
              <animateMotion dur="4.8s" repeatCount="indefinite" keyTimes="0;1" keyPoints="0;1" calcMode="linear">
                <mpath href="#circulation-route-pulmonary-red"/>
              </animateMotion>
            </circle>
            <circle r="10" fill="#F87171" stroke="#FEE2E2" stroke-width="3">
              <animateMotion dur="4.8s" begin="1.6s" repeatCount="indefinite" keyTimes="0;1" keyPoints="0;1" calcMode="linear">
                <mpath href="#circulation-route-pulmonary-red"/>
              </animateMotion>
            </circle>
          </g>

          <!-- Paru-paru: area tengah (klik tengah = paru) -->
          <ellipse cx="768" cy="136" rx="260" ry="118" fill="rgba(0,0,0,0)" style="cursor:pointer"
            onclick="selectOrgan('paru-peredaran','Paru-paru','🫁','Tempat pertukaran gas: darah kaya CO₂ dari jantung kanan dilepaskan O₂nya di paru-paru. Paru-paru menerima darah dari arteri pulmonalis dan mengembalikan darah kaya O₂ via vena pulmonalis.')"/>
          <ellipse cx="768" cy="500" rx="172" ry="195" fill="rgba(0,0,0,0)" style="cursor:pointer"
            onclick="selectOrgan('jantung2','Jantung','❤️','Pompa muskular beruang 4. Memompa ±5 liter darah per menit, berdetak 60–100x/menit.')"/>
          <ellipse cx="1065" cy="405" rx="130" ry="310" fill="rgba(0,0,0,0)" style="cursor:pointer"
            onclick="selectOrgan('arteri','Arteri','🔴','Pembuluh darah tebal &amp; elastis yang membawa darah beroksigen dari jantung ke seluruh tubuh.')"/>
          <ellipse cx="455" cy="395" rx="130" ry="315" fill="rgba(0,0,0,0)" style="cursor:pointer"
            onclick="selectOrgan('vena','Vena','🔵','Pembuluh darah tipis dengan katup yang membawa darah CO₂ dari jaringan kembali ke jantung.')"/>
          <!-- Kapiler Tubuh -->
          <ellipse cx="768" cy="850" rx="350" ry="112" fill="rgba(0,0,0,0)" style="cursor:pointer"
            onclick="selectOrgan('kapiler-tubuh','Kapiler Tubuh','🕸️','Jaringan kapiler di seluruh jaringan tubuh. Tempat pertukaran O₂ dan nutrisi dari darah ke sel, serta CO₂ dan sisa metabolisme dari sel ke darah (sirkulasi sistemik).')"/>
          <!-- Kapiler Paru: ditulis SETELAH paru agar menang event klik saat overlap -->
          <!-- Area kiri paru (paru-kiri) dan kanan paru (paru-kanan) -->
          <ellipse cx="610" cy="138" rx="110" ry="82" fill="rgba(0,0,0,0)" style="cursor:pointer"
            onclick="selectOrgan('kapiler-paru','Kapiler Paru','🪷','Jaringan kapiler di sekitar alveolus paru-paru. Tempat pertukaran gas: CO₂ dilepas dari darah dan O₂ diserap masuk ke darah (sirkulasi pulmonal).')"/>
          <ellipse cx="925" cy="138" rx="110" ry="82" fill="rgba(0,0,0,0)" style="cursor:pointer"
            onclick="selectOrgan('kapiler-paru','Kapiler Paru','🪷','Jaringan kapiler di sekitar alveolus paru-paru. Tempat pertukaran gas: CO₂ dilepas dari darah dan O₂ diserap masuk ke darah (sirkulasi pulmonal).')"/>
          <line id="organ-line-paru-peredaran" x1="850" y1="95" x2="1140" y2="54" stroke="#60A5FA" stroke-width="2"/>
          <foreignObject id="organ-fo-paru-peredaran" x="1135" y="25" width="220" height="50">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#EFF6FF22;border-color:#60A5FA;color:#1D4ED8"
              onclick="selectOrgan('paru-peredaran','Paru-paru','🫁','Tempat pertukaran gas: darah kaya CO₂ dari jantung kanan dilepaskan O₂nya di paru-paru. Paru-paru menerima darah dari arteri pulmonalis dan mengembalikan darah kaya O₂ via vena pulmonalis.')"><img class="organ-label-icon" src="assets/images/asset_7d73b903.png" alt="" /> Paru</div>
          </foreignObject>
          <line id="organ-line-jantung2" x1="660" y1="500" x2="180" y2="386" stroke="#F87171" stroke-width="2"/>
          <foreignObject id="organ-fo-jantung2" x="50" y="360" width="220" height="50">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#FEF2F222;border-color:#F87171;color:#991B1B"
              onclick="selectOrgan('jantung2','Jantung','❤️','Pompa muskular beruang 4. Memompa ±5 liter darah per menit, berdetak 60–100x/menit.')"><img class="organ-label-icon" src="assets/images/asset_0d0fc443.png" alt="" /> Jantung</div>
          </foreignObject>
          <line id="organ-line-arteri" x1="1065" y1="300" x2="1240" y2="224" stroke="#EF4444" stroke-width="2"/>
          <foreignObject id="organ-fo-arteri" x="1235" y="196" width="200" height="50">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#FEF2F222;border-color:#EF4444;color:#991B1B"
              onclick="selectOrgan('arteri','Arteri','🔴','Pembuluh darah tebal &amp; elastis yang membawa darah beroksigen dari jantung ke seluruh tubuh.')"><img class="organ-label-icon" src="assets/images/asset_e3babdae.png" alt="" /> Arteri</div>
          </foreignObject>
          <line id="organ-line-vena" x1="455" y1="300" x2="180" y2="224" stroke="#6366F1" stroke-width="2"/>
          <foreignObject id="organ-fo-vena" x="50" y="196" width="200" height="50">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#EEF2FF22;border-color:#6366F1;color:#3730A3"
              onclick="selectOrgan('vena','Vena','🔵','Pembuluh darah tipis dengan katup yang membawa darah CO₂ dari jaringan kembali ke jantung.')"><img class="organ-label-icon" src="assets/images/asset_fb6d8ea4.png" alt="" /> Vena</div>
          </foreignObject>
          <!-- Label Kapiler Paru -->
          <line id="organ-line-kapiler-paru" x1="610" y1="88" x2="180" y2="48" stroke="#34D399" stroke-width="2"/>
          <foreignObject id="organ-fo-kapiler-paru" x="40" y="20" width="240" height="50">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#ECFDF522;border-color:#34D399;color:#065F46"
              onclick="selectOrgan('kapiler-paru','Kapiler Paru','🪷','Jaringan kapiler di sekitar alveolus paru-paru. Tempat pertukaran gas: CO₂ dilepas dari darah dan O₂ diserap masuk ke darah (sirkulasi pulmonal).')"><img class="organ-label-icon" src="assets/images/asset_7d73b903.png" alt="" /> Kap. Paru</div>
          </foreignObject>
          <!-- Label Kapiler Tubuh -->
          <line id="organ-line-kapiler-tubuh" x1="768" y1="850" x2="1220" y2="900" stroke="#059669" stroke-width="2"/>
          <foreignObject id="organ-fo-kapiler-tubuh" x="1215" y="872" width="240" height="50">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#ECFDF522;border-color:#059669;color:#064e3b"
              onclick="selectOrgan('kapiler-tubuh','Kapiler Tubuh','🕸️','Jaringan kapiler di seluruh jaringan tubuh. Tempat pertukaran O₂ dan nutrisi dari darah ke sel, serta CO₂ dan sisa metabolisme dari sel ke darah (sirkulasi sistemik.')"><img class="organ-label-icon" src="assets/images/asset_918169cd.png" alt="" /> Kap. Tubuh</div>
          </foreignObject>
        </svg>
      </div>
      <p class="hint-text"><span>👆</span> Klik organ untuk melihat fungsinya</p>
    `;
  } else if (key === 'ekskresi') {
    document.getElementById('panel-left').innerHTML = `
      <div class="pencernaan-img-wrap">
        <img src="assets/images/diagram-ekskresi.jpg" alt="Sistem Ekskresi" class="pencernaan-img" />
        <div class="digestive-controls" aria-label="Kontrol animasi ekskresi">
          <button type="button" id="excretion-play-btn" class="digestive-control-btn active" onclick="setExcretionAnimation(true)">▶ Play</button>
          <button type="button" id="excretion-pause-btn" class="digestive-control-btn" onclick="setExcretionAnimation(false)">⏸ Pause</button>
        </div>
        <svg id="ekskresi-svg" class="pencernaan-svg-overlay" viewBox="0 0 500 700" xmlns="http://www.w3.org/2000/svg">
          <!-- Animasi mekanisme ekskresi: ginjal menyaring darah, urine mengalir ke kandung kemih lalu keluar melalui uretra -->
          <path id="excretion-route-left" class="excretion-route"
            d="M 147 150 C 156 160, 164 174, 167 187 C 174 205, 178 225, 176 243 C 172 282, 158 323, 148 368 C 142 403, 145 438, 153 455 C 160 478, 171 496, 182 518"/>
          <path id="excretion-route-right" class="excretion-route"
            d="M 353 150 C 344 160, 336 174, 333 187 C 326 205, 322 225, 324 243 C 328 282, 342 323, 352 368 C 358 403, 355 438, 347 455 C 340 478, 329 496, 318 518"/>
          <path id="excretion-route-out" class="excretion-route"
            d="M 250 535 C 250 575, 250 610, 250 668"/>
          <path id="excretion-route-filter-left" class="excretion-route excretion-route-waste"
            d="M 90 130 C 118 146, 132 154, 158 172"/>
          <path id="excretion-route-filter-right" class="excretion-route excretion-route-waste"
            d="M 410 130 C 382 146, 368 154, 342 172"/>
          <g class="excretion-drop">
            <circle r="8" fill="#38BDF8">
              <animateMotion dur="4.8s" repeatCount="indefinite" begin="0s">
                <mpath href="#excretion-route-left"/>
              </animateMotion>
            </circle>
            <circle r="7" fill="#7DD3FC">
              <animateMotion dur="4.8s" repeatCount="indefinite" begin="1.2s">
                <mpath href="#excretion-route-right"/>
              </animateMotion>
            </circle>
            <circle r="7" fill="#0EA5E9">
              <animateMotion dur="3.2s" repeatCount="indefinite" begin="2.1s">
                <mpath href="#excretion-route-out"/>
              </animateMotion>
            </circle>
            <circle r="5" fill="#F59E0B">
              <animateMotion dur="3.4s" repeatCount="indefinite" begin="0.4s">
                <mpath href="#excretion-route-filter-left"/>
              </animateMotion>
            </circle>
            <circle r="5" fill="#F59E0B">
              <animateMotion dur="3.4s" repeatCount="indefinite" begin="1.4s">
                <mpath href="#excretion-route-filter-right"/>
              </animateMotion>
            </circle>
          </g>
          <!-- Hotspot Ginjal Kiri -->
          <ellipse cx="130" cy="165" rx="75" ry="90" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('ginjal2','Ginjal Kiri','🫘','Organ berbentuk kacang yang menyaring ±200L darah per hari menghasilkan ±1.5L urine.')"/>
          <!-- Hotspot Ginjal Kanan -->
          <ellipse cx="370" cy="165" rx="75" ry="90" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('ginjal3','Ginjal Kanan','🫘','Ginjal kanan bekerja sama dengan ginjal kiri menyaring darah dan mempertahankan keseimbangan elektrolit.')"/>
          <!-- Hotspot Ureter -->
          <ellipse cx="175" cy="360" rx="18" ry="100" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('ureter','Ureter','📏','Dua saluran berotot sepanjang 25–30cm yang mengalirkan urine dari ginjal ke kandung kemih.')"/>
          <ellipse cx="325" cy="360" rx="18" ry="100" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('ureter','Ureter','📏','Dua saluran berotot sepanjang 25–30cm yang mengalirkan urine dari ginjal ke kandung kemih.')"/>
          <!-- Hotspot Kandung Kemih -->
          <ellipse cx="250" cy="530" rx="80" ry="65" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('kandung2','Kand. Kemih','💧','Organ berotot yang menampung urine hingga 400–600mL sebelum dikeluarkan.')"/>
          <!-- Hotspot Uretra -->
          <ellipse cx="250" cy="640" rx="18" ry="35" fill="rgba(0,0,0,0)" style="cursor:pointer" onclick="selectOrgan('uretra2','Uretra','⬇️','Saluran akhir tempat urine keluar dari tubuh. Panjang 4cm (wanita) atau 20cm (pria).')"/>

          <!-- Label Ginjal Kiri -->
          <line id="organ-line-ginjal2" x1="100" y1="140" x2="50" y2="80" stroke="#F59E0B" stroke-width="1.5"/>
          <foreignObject id="organ-fo-ginjal2" x="5" y="55" width="145" height="44">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#FFFBEB22;border-color:#F59E0B;color:#92400E" onclick="selectOrgan('ginjal2','Ginjal Kiri','🫘','Organ berbentuk kacang yang menyaring ±200L darah per hari menghasilkan ±1.5L urine.')"><img class="organ-label-icon" src="assets/images/asset_45c30ffd.png" alt="" /> Ginjal Kiri</div>
          </foreignObject>

          <!-- Label Ginjal Kanan -->
          <line id="organ-line-ginjal3" x1="400" y1="140" x2="355" y2="80" stroke="#F59E0B" stroke-width="1.5"/>
          <foreignObject id="organ-fo-ginjal3" x="350" y="55" width="145" height="44">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#FFFBEB22;border-color:#F59E0B;color:#92400E" onclick="selectOrgan('ginjal3','Ginjal Kanan','🫘','Ginjal kanan bekerja sama dengan ginjal kiri menyaring darah dan mempertahankan keseimbangan elektrolit.')"><img class="organ-label-icon" src="assets/images/asset_78a537ab.png" alt="" /> Ginjal Kanan</div>
          </foreignObject>

          <!-- Label Ureter -->
          <line id="organ-line-ureter" x1="190" y1="350" x2="50" y2="330" stroke="#60A5FA" stroke-width="1.5"/>
          <foreignObject id="organ-fo-ureter" x="5" y="308" width="130" height="44">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#EFF6FF22;border-color:#60A5FA;color:#1D4ED8" onclick="selectOrgan('ureter','Ureter','📏','Dua saluran berotot sepanjang 25–30cm yang mengalirkan urine dari ginjal ke kandung kemih.')"><img class="organ-label-icon" src="assets/images/asset_739007af.png" alt="" /> Ureter</div>
          </foreignObject>

          <!-- Label Kandung Kemih -->
          <line id="organ-line-kandung2" x1="320" y1="530" x2="350" y2="510" stroke="#38BDF8" stroke-width="1.5"/>
          <foreignObject id="organ-fo-kandung2" x="345" y="488" width="150" height="44">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#E0F7FF22;border-color:#38BDF8;color:#0369A1" onclick="selectOrgan('kandung2','Kand. Kemih','💧','Organ berotot yang menampung urine hingga 400–600mL sebelum dikeluarkan.')"><img class="organ-label-icon" src="assets/images/asset_adffe8f3.png" alt="" /> Kand. Kemih</div>
          </foreignObject>

          <!-- Label Uretra -->
          <line id="organ-line-uretra2" x1="260" y1="648" x2="360" y2="650" stroke="#6B7280" stroke-width="1.5"/>
          <foreignObject id="organ-fo-uretra2" x="355" y="628" width="135" height="44">
            <div xmlns="http://www.w3.org/1999/xhtml" class="organ-label-btn" style="background:#F9FAFB22;border-color:#6B7280;color:#374151" onclick="selectOrgan('uretra2','Uretra','⬇️','Saluran akhir tempat urine keluar dari tubuh. Panjang 4cm (wanita) atau 20cm (pria).')"><img class="organ-label-icon" src="assets/images/asset_53a20125.png" alt="" /> Uretra</div>
          </foreignObject>
        </svg>
      </div>
      <p class="hint-text"><span>👆</span> Klik organ untuk melihat fungsinya</p>
    `;
  } else {
    document.getElementById('panel-left').innerHTML = `
      <div class="organ-svg-container">
        <svg viewBox="0 0 360 ${svgH}" xmlns="http://www.w3.org/2000/svg">${svgOrganHtml}</svg>
        <div id="organ-popup" class="organ-popup">
          <div class="popup-name" id="popup-name"></div>
          <div class="popup-func" id="popup-func"></div>
        </div>
      </div>
      <p class="hint-text"><span>👆</span> Klik organ untuk melihat fungsinya</p>
    `;
  }

  const prosesHtml = data.proses && data.proses.length
    ? `<div class="section-block teal" style="margin-bottom:14px;">
        <div class="section-label">🔄 Alur Kerja</div>
        <div class="proses-list" id="proses-list">
          ${data.proses.map((p, i) => `
            <div class="proses-item" id="proses-item-${i}">
              <div class="proses-num">${i + 1}</div>
              <div>${p}</div>
            </div>
          `).join('')}
        </div>
       </div>`
    : '';

  // Susun teks narasi dari pengertian + proses
  const narasiText = [
    data.title + '.',
    data.pengertian,
    ...(data.proses && data.proses.length ? ['Alur kerja sistem ini adalah sebagai berikut.', ...data.proses] : [])
  ].join(' ');

  document.getElementById('panel-right').innerHTML = `
    <div class="animate-in">
      <div class="materi-title">${data.icon} ${data.title}</div>
      <div class="materi-badge" style="background:${data.badge.bg};color:${data.badge.color}">${data.badge.text}</div>

      <div style="display:flex;gap:8px;margin-bottom:14px;align-items:center;">
        <button id="btn-narasi-play" onclick="narasiPlay()" style="display:flex;align-items:center;gap:6px;padding:8px 18px;border-radius:50px;border:none;background:linear-gradient(135deg,#3B82F6,#6366F1);color:white;font-family:'Nunito',sans-serif;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 3px 12px rgba(59,130,246,0.3);">
          🔊 Dengarkan Narasi
        </button>
        <button id="btn-narasi-stop" onclick="narasiStop()" style="display:none;align-items:center;gap:6px;padding:8px 18px;border-radius:50px;border:none;background:#EF4444;color:white;font-family:'Nunito',sans-serif;font-size:13px;font-weight:700;cursor:pointer;box-shadow:0 3px 10px rgba(239,68,68,0.3);">
          ⏹ Stop
        </button>
        <span id="narasi-status" style="font-size:11px;color:var(--gray-500);font-weight:600;"></span>
      </div>

      <div class="section-block" style="margin-bottom:14px;">
        <div class="section-label">📖 Pengertian</div>
        <div class="section-text">${data.pengertian}</div>
      </div>

      <div class="organ-detail-section" id="organ-detail-section" style="display:none;">
        <div class="organ-detail-header" id="organ-detail-header"></div>
        <div class="organ-detail-body" id="organ-detail-body"></div>
      </div>

      ${prosesHtml}
    </div>
  `;

  window._narasiText = narasiText;
  showPage('page-materi');
}

// ============ NARASI (WEB SPEECH API) ============
// Audio narasi map — key = activeMateri
const narasiAudioMap = {
  'pencernaan': 'audio-narasi-pencernaan',
  'pernapasan': 'audio-narasi-pernapasan',
  'peredaran': 'audio-narasi-peredaran-darah',
  'ekskresi': 'audio-narasi-ekskresi',
  'organ': 'audio-narasi-organ-tubuh',
};

function narasiPlay() {
  narasiStop(); // stop apapun yang sedang jalan

  const audioId = narasiAudioMap[activeMateri];

  if (audioId) {
    // Pakai file audio asli
    const audio = document.getElementById(audioId);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    audio.onended = () => narasiResetBtn();
    audio.onerror = () => narasiResetBtn();
  } else {
    // Fallback Web Speech API
    if (!('speechSynthesis' in window)) {
      alert('Browser kamu tidak mendukung Text-to-Speech.');
      return;
    }
    const utt = new SpeechSynthesisUtterance(window._narasiText || '');
    utt.lang = 'id-ID';
    utt.rate = 0.92;
    utt.pitch = 1.05;
    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find(v => v.lang === 'id-ID') || voices.find(v => v.lang.startsWith('id'));
    if (idVoice) utt.voice = idVoice;
    utt.onend = utt.onerror = () => narasiResetBtn();
    window.speechSynthesis.speak(utt);
  }

  // Update tombol
  const p = document.getElementById('btn-narasi-play');
  const s = document.getElementById('btn-narasi-stop');
  const st = document.getElementById('narasi-status');
  if (p) p.style.display = 'none';
  if (s) s.style.display = 'flex';
  if (st) st.textContent = '🎙️ Sedang memutar...';
}

function narasiStop() {
  // Stop audio file
  Object.values(narasiAudioMap).forEach(id => {
    const a = document.getElementById(id);
    if (a) { a.pause(); a.currentTime = 0; }
  });
  // Stop speech synthesis
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  narasiResetBtn();
}

function narasiResetBtn() {
  const p = document.getElementById('btn-narasi-play');
  const s = document.getElementById('btn-narasi-stop');
  const st = document.getElementById('narasi-status');
  if (p) p.style.display = 'flex';
  if (s) s.style.display = 'none';
  if (st) st.textContent = '';
}

// ============ GAME TIMER ENGINE ============
const gameTimers = {};
let gameActive = false; // flag: game sedang berjalan

function startGameTimer(timerElId, totalSeconds, onExpire) {
  if (gameTimers[timerElId]) clearInterval(gameTimers[timerElId]);
  let remaining = totalSeconds;
  const el = document.getElementById(timerElId);
  if (!el) return;

  gameActive = true;

  function updateDisplay() {
    if (!el) return;
    el.textContent = '⏱ ' + remaining + 's';
    el.className = 'game-timer-wrap';
    if (remaining <= 15) el.classList.add('danger');
    else if (remaining <= 30) el.classList.add('warning');
  }

  updateDisplay();
  gameTimers[timerElId] = setInterval(() => {
    remaining--;
    updateDisplay();
    if (remaining <= 0) {
      clearInterval(gameTimers[timerElId]);
      // Hanya jalankan onExpire kalau game masih aktif (user belum keluar)
      if (onExpire && gameActive) onExpire();
    }
  }, 1000);
}

function stopGameTimer(timerElId) {
  if (gameTimers[timerElId]) {
    clearInterval(gameTimers[timerElId]);
    delete gameTimers[timerElId];
  }
}

// Batalkan semua timer game aktif saat user keluar
function cancelAllGameTimers() {
  gameActive = false;
  Object.keys(gameTimers).forEach(key => {
    clearInterval(gameTimers[key]);
    delete gameTimers[key];
  });
}

// ============ CONFETTI ============
function launchConfetti() {
  const colors = ['#6366F1','#3B82F6','#10B981','#F59E0B','#EF4444','#EC4899','#8B5CF6','#F97316'];
  const shapes = ['circle','square','rectangle'];
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = 8 + Math.random() * 10;
      el.style.cssText = `
        left:${Math.random()*100}vw;
        top:-20px;
        width:${size}px;
        height:${shape==='rectangle'?size*0.5:size}px;
        background:${color};
        border-radius:${shape==='circle'?'50%':'3px'};
        animation-duration:${1.5+Math.random()*2}s;
        animation-delay:${Math.random()*0.8}s;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4000);
    }, i * 20);
  }
}

// ============ GAME COMPLETE OVERLAY ============
function showGameComplete(score, total, timeTaken, gameKey, retryFn) {
  if (!gameActive) return; // user sudah keluar, abaikan
  gameActive = false;
  stopGameTimer(gameKey + '-game-timer');
  launchConfetti();
  SFX.complete();

  // Simpan skor
  const { isNew, prev } = saveScore(gameKey, score, total, timeTaken);

  const pct = Math.round((score / total) * 100);
  const emoji = pct === 100 ? '🏆' : pct >= 75 ? '🌟' : pct >= 50 ? '👍' : '💪';
  const title = pct === 100 ? 'Sempurna!' : pct >= 75 ? 'Luar Biasa!' : pct >= 50 ? 'Bagus!' : 'Terus Semangat!';

  // Pesan skor baru
  let bestScoreHtml = '';
  if (isNew && prev) {
    bestScoreHtml = `<div class="best-score-row">🎉 Rekor baru! (sebelumnya ${prev.score}/${prev.total})</div>`;
  } else if (isNew && !prev) {
    bestScoreHtml = `<div class="best-score-row">⭐ Skor pertamamu tersimpan!</div>`;
  } else if (prev) {
    bestScoreHtml = `<div class="best-score-row">🏅 Best: ${prev.score}/${prev.total} (${prev.pct}%)</div>`;
  }

  const overlay = document.createElement('div');
  overlay.className = 'game-complete-overlay';
  overlay.id = 'game-complete-overlay';
  overlay.innerHTML = `
    <div class="game-complete-card">
      <div class="game-complete-emoji">${emoji}</div>
      <div class="game-complete-title">${title}</div>
      <div class="game-complete-sub">Kamu menyelesaikan game ini!</div>
      ${bestScoreHtml}
      <div class="game-complete-stats">
        <div class="game-stat-box">
          <div class="game-stat-value">${score}/${total}</div>
          <div class="game-stat-label">Skor</div>
        </div>
        <div class="game-stat-box">
          <div class="game-stat-value">${pct}%</div>
          <div class="game-stat-label">Akurasi</div>
        </div>
        <div class="game-stat-box">
          <div class="game-stat-value">${timeTaken}s</div>
          <div class="game-stat-label">Waktu</div>
        </div>
      </div>
      <button class="game-complete-btn" onclick="document.getElementById('game-complete-overlay').remove(); (${retryFn})();">
        🔄 Main Lagi
      </button>
      <button class="game-complete-btn secondary" onclick="document.getElementById('game-complete-overlay').remove(); showPage('page-game-menu');">
        ← Kembali ke Menu
      </button>
    </div>
  `;
  document.body.appendChild(overlay);
}

// ============ PATCH showOrganGame ============
const _origShowOrganGame = showOrganGame;
showOrganGame = function() {
  _origShowOrganGame();
  organGameStartTime = Date.now();
  startGameTimer('organ-game-timer', 90, () => {
    const sc = organGameState ? organGameState.score : 0;
    showGameComplete(sc, organGameTargets.length, 90, 'organ', 'showOrganGame');
  });
};

// ============ PATCH showDigestiveGame ============
const _origShowDigestiveGame = showDigestiveGame;
showDigestiveGame = function() {
  _origShowDigestiveGame();
  digestiveGameStartTime = Date.now();
  startGameTimer('digestive-game-timer', 75, () => {
    const sc = digestiveGameState ? digestiveGameState.score : 0;
    showGameComplete(sc, digestiveGameTargets.length, 75, 'digestive', 'showDigestiveGame');
  });
};

// ============ PATCH showBreathingGame ============
const _origShowBreathingGame = showBreathingGame;
showBreathingGame = function() {
  _origShowBreathingGame();
  startGameTimer('breathing-game-timer', 75, () => {
    const sc = breathingGameState ? breathingGameState.score : 0;
    showGameComplete(sc, breathingGameTargets.length, 75, 'breathing', 'showBreathingGame');
  });
};

// ============ PATCH showCirculationGame ============
const _origShowCirculationGame = showCirculationGame;
showCirculationGame = function() {
  _origShowCirculationGame();
  startGameTimer('circulation-game-timer', 75, () => {
    const sc = circulationGameState ? circulationGameState.score : 0;
    showGameComplete(sc, circulationGameTargets.length, 75, 'circulation', 'showCirculationGame');
  });
};

// ============ PATCH showExcretionGame ============
const _origShowExcretionGame = showExcretionGame;
showExcretionGame = function() {
  _origShowExcretionGame();
  startGameTimer('excretion-game-timer', 60, () => {
    const sc = excretionGameState ? excretionGameState.score : 0;
    showGameComplete(sc, excretionGameTargets.length, 60, 'excretion', 'showExcretionGame');
  });
};

// ============ PATCH score updates to trigger complete overlay ============
const _origUpdateOrganGameScore = updateOrganGameScore;
let organGameStartTime = Date.now();
updateOrganGameScore = function(msg, state) {
  _origUpdateOrganGameScore(msg, state);
  if (organGameState && organGameState.score === organGameTargets.length) {
    const elapsed = Math.round((Date.now() - organGameStartTime) / 1000);
    stopGameTimer('organ-game-timer');
    setTimeout(() => showGameComplete(organGameTargets.length, organGameTargets.length, elapsed, 'organ', 'showOrganGame'), 600);
  }
};

const _origUpdateDigestiveGameScore = updateDigestiveGameScore;
let digestiveGameStartTime = Date.now();
updateDigestiveGameScore = function(msg, state) {
  _origUpdateDigestiveGameScore(msg, state);
  if (digestiveGameState && digestiveGameState.score === digestiveGameTargets.length) {
    const elapsed = Math.round((Date.now() - digestiveGameStartTime) / 1000);
    stopGameTimer('digestive-game-timer');
    setTimeout(() => showGameComplete(digestiveGameTargets.length, digestiveGameTargets.length, elapsed, 'digestive', 'showDigestiveGame'), 600);
  }
};

const _origUpdateBreathingGameScore = updateBreathingGameScore;
let breathingGameStartTime = Date.now();
updateBreathingGameScore = function(msg, state) {
  _origUpdateBreathingGameScore(msg, state);
  if (breathingGameState && breathingGameState.score === breathingGameTargets.length) {
    const elapsed = Math.round((Date.now() - breathingGameStartTime) / 1000);
    stopGameTimer('breathing-game-timer');
    setTimeout(() => showGameComplete(breathingGameTargets.length, breathingGameTargets.length, elapsed, 'breathing', 'showBreathingGame'), 600);
  }
};

const _origUpdateCirculationGameScore = updateCirculationGameScore;
let circulationGameStartTime = Date.now();
updateCirculationGameScore = function(msg, state) {
  _origUpdateCirculationGameScore(msg, state);
  if (circulationGameState && circulationGameState.score === circulationGameTargets.length) {
    const elapsed = Math.round((Date.now() - circulationGameStartTime) / 1000);
    stopGameTimer('circulation-game-timer');
    setTimeout(() => showGameComplete(circulationGameTargets.length, circulationGameTargets.length, elapsed, 'circulation', 'showCirculationGame'), 600);
  }
};

const _origUpdateExcretionGameScore = updateExcretionGameScore;
let excretionGameStartTime = Date.now();
updateExcretionGameScore = function(msg, state) {
  _origUpdateExcretionGameScore(msg, state);
  if (excretionGameState && excretionGameState.score === excretionGameTargets.length) {
    const elapsed = Math.round((Date.now() - excretionGameStartTime) / 1000);
    stopGameTimer('excretion-game-timer');
    setTimeout(() => showGameComplete(excretionGameTargets.length, excretionGameTargets.length, elapsed, 'excretion', 'showExcretionGame'), 600);
  }
};

// ============ PATCH score display format ============
(function patchScoreDisplay(){
  const patchUpdate = (fn) => {
    return function(msg, state) {
      fn.call(this, msg, state);
    };
  };
})();


let prosesTimer = null;
let prosesRunning = false;

function animateProses(auto = false) {
  const items = document.querySelectorAll('.proses-item');
  if (!items.length) return;

  const btn = document.getElementById('btn-play-proses');
  const progress = document.getElementById('proses-progress');

  // Jika sedang berjalan, hentikan
  if (prosesRunning && !auto) {
    clearTimeout(prosesTimer);
    prosesRunning = false;
    if (btn) { btn.textContent = '▶ Putar Ulang'; btn.disabled = false; }
    // Semua sudah revealed, hanya non-aktifkan highlight
    items.forEach(item => item.classList.remove('active-step'));
    if (progress) progress.textContent = '';
    return;
  }

  // Reset semua item ke state awal
  items.forEach(item => {
    item.classList.remove('revealed', 'active-step');
  });
  if (progress) progress.textContent = '';

  prosesRunning = true;
  if (btn) { btn.textContent = '⏹ Stop'; btn.disabled = false; }

  let i = 0;
  const total = items.length;
  const DELAY_REVEAL  = 480;   // jeda antar langkah muncul (ms)
  const DELAY_ACTIVE  = 200;   // jeda sebelum highlight aktif
  const DELAY_DEACT   = 900;   // durasi highlight bertahan

  function revealNext() {
    if (i >= total) {
      // Semua selesai
      prosesRunning = false;
      if (btn) { btn.textContent = '▶ Putar Ulang'; btn.disabled = false; }
      if (progress) progress.textContent = `✅ ${total}/${total}`;
      // Hapus highlight terakhir setelah sebentar
      setTimeout(() => {
        items.forEach(item => item.classList.remove('active-step'));
      }, 800);
      return;
    }

    const item = items[i];

    // 1) Reveal (slide in)
    item.classList.add('revealed');
    if (progress) progress.textContent = `${i + 1} / ${total}`;

    // 2) Highlight aktif setelah sedikit jeda
    prosesTimer = setTimeout(() => {
      // Hapus active dari item sebelumnya
      if (i > 0) items[i - 1].classList.remove('active-step');
      item.classList.add('active-step');

      // 3) Lanjut ke item berikutnya
      prosesTimer = setTimeout(() => {
        i++;
        revealNext();
      }, DELAY_DEACT);
    }, DELAY_ACTIVE);
  }

  // Mulai
  prosesTimer = setTimeout(revealNext, 200);
}

function selectOrgan(id, label, emoji, fungsi, detail) {
  // Reset prev label glow
  document.querySelectorAll('.organ-label-btn').forEach(btn => btn.classList.remove('active-organ'));
  // Reset prev line
  document.querySelectorAll('line[id^="line-"], line[id^="organ-line-"]').forEach(l => l.classList.remove('line-active'));

  // Reset prev chip/hot
  if (activeOrgan) {
    const prev = document.getElementById('hot-' + activeOrgan);
    if (prev) prev.classList.remove('selected');
    const prevChip = document.getElementById('chip-' + activeOrgan);
    if (prevChip) prevChip.classList.remove('active');
  }

  activeOrgan = id;

  // Highlight SVG
  const hot = document.getElementById('hot-' + id);
  if (hot) hot.classList.add('selected');

  // Highlight chip
  document.querySelectorAll('.organ-chip').forEach(c => c.classList.remove('active'));
  const chip = document.getElementById('chip-' + id);
  if (chip) chip.classList.add('active');

  // Glow pada label yang diklik
  const organIdMap = {
    'mulut': 'fo-mulut',
    'kerongkongan': 'fo-kerongkongan',
    'lambung2': 'fo-lambung',
    'usus-halus': 'fo-usushalus',
    'usus-besar': 'fo-ususbesar',
    'anus': 'fo-anus',
    // Organ Tubuh Manusia
    'otak':    'organ-fo-otak',
    'paru':    'organ-fo-paru',
    'jantung': 'organ-fo-jantung',
    'hati':    'organ-fo-hati',
    'lambung': 'organ-fo-lambung',
    'ginjal':  'organ-fo-ginjal',
    'usus':    'organ-fo-usus',
    'kandung': 'organ-fo-kandung',
    // Organ Ekskresi
    'ginjal2':  'organ-fo-ginjal2',
    'ginjal3':  'organ-fo-ginjal3',
    'ureter':   'organ-fo-ureter',
    'kandung2': 'organ-fo-kandung2',
    'uretra2':  'organ-fo-uretra2',
    // Organ Pernapasan
    'hidung':     'organ-fo-hidung',
    'trakea':     'organ-fo-trakea',
    'bronkus':    'organ-fo-bronkus',
    'bronkiolus': 'organ-fo-bronkiolus',
    'paru2':      'organ-fo-paru2',
    'alveolus':   'organ-fo-alveolus',
    'diafragma':  'organ-fo-diafragma',
    // Organ Peredaran Darah
    'jantung2':        'organ-fo-jantung2',
    'paru-peredaran':  'organ-fo-paru-peredaran',
    'arteri':          'organ-fo-arteri',
    'vena':            'organ-fo-vena',
    'kapiler-paru':    'organ-fo-kapiler-paru',
    'kapiler-tubuh':   'organ-fo-kapiler-tubuh',
  };
  const foId = organIdMap[id];
  if (foId) {
    const fo = document.getElementById(foId);
    if (fo) {
      const btn = fo.querySelector('.organ-label-btn');
      if (btn) {
        btn.classList.remove('active-organ');
        void btn.offsetWidth; // reflow untuk restart animasi
        btn.classList.add('active-organ');
      }
    }
    // Pulse garis
    const lineId = foId.replace('organ-fo-', 'organ-line-').replace('fo-', 'line-');
    const line = document.getElementById(lineId) || document.getElementById(lineId + 'r');
    if (line) {
      line.classList.remove('line-active');
      void line.offsetWidth;
      line.classList.add('line-active');
    }
  }

  // Show organ detail in right panel
  const detailSection = document.getElementById('organ-detail-section');
  if (detailSection) {
    const organInfo = organDetailMap[id] || {};
    const displayLabel = organInfo.label || label;
    const displayEmoji = organInfo.emoji || emoji;
    const displayDetail = organInfo.detail || fungsi;
    const htmlDetail = displayDetail
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n•/g, '<br>•')
      .replace(/\n  -/g, '<br>&nbsp;&nbsp;-')
      .replace(/\n/g, '<br>')
      .replace(/^/, '<p>')
      .replace(/$/, '</p>');
    document.getElementById('organ-detail-header').innerHTML = `<span style="font-size:28px;">${displayEmoji}</span> <span>${displayLabel}</span>`;

    const photoData =
      activeMateri === 'organ' ? organPhotoMap[id] :
      activeMateri === 'pencernaan' ? digestivePhotoMap[id] :
      activeMateri === 'pernapasan' ? respiratoryPhotoMap[id] :
      activeMateri === 'peredaran' ? circulationPhotoMap[id] :
      activeMateri === 'ekskresi' ? excretionPhotoMap[id] :
      null;
    const photoHtml = photoData
      ? `<div class="organ-photo-wrap">
           <img src="${photoData.src}" alt="${displayLabel}" onerror="this.parentElement.style.display='none'">
           <div class="organ-photo-caption">📷 ${photoData.caption}</div>
         </div>`
      : '';

    document.getElementById('organ-detail-body').innerHTML = photoHtml + htmlDetail;
    detailSection.style.display = 'block';
    detailSection.classList.remove('animate-in');
    void detailSection.offsetWidth;
    detailSection.classList.add('animate-in');
    detailSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    // Di mobile: otomatis pindah ke tab materi setelah organ dipilih
    autoSwitchToMateriTab();
  }
}

function setDigestiveAnimation(isPlaying) {
  const svg = document.getElementById('pencernaan-svg');
  const wrap = svg ? svg.closest('.pencernaan-img-wrap') : null;
  const playBtn = document.getElementById('digestive-play-btn');
  const pauseBtn = document.getElementById('digestive-pause-btn');

  if (svg) {
    if (isPlaying) {
      svg.unpauseAnimations();
    } else {
      svg.pauseAnimations();
    }
  }

  if (wrap) wrap.classList.toggle('digestive-paused', !isPlaying);
  if (playBtn) playBtn.classList.toggle('active', isPlaying);
  if (pauseBtn) pauseBtn.classList.toggle('active', !isPlaying);
}

function setBreathingAnimation(isPlaying) {
  const svg = document.getElementById('pernapasan-svg');
  const wrap = svg ? svg.closest('.pencernaan-img-wrap') : null;
  const playBtn = document.getElementById('breathing-play-btn');
  const pauseBtn = document.getElementById('breathing-pause-btn');

  if (svg) {
    if (isPlaying) {
      svg.unpauseAnimations();
    } else {
      svg.pauseAnimations();
    }
  }

  if (wrap) wrap.classList.toggle('breathing-paused', !isPlaying);
  if (playBtn) playBtn.classList.toggle('active', isPlaying);
  if (pauseBtn) pauseBtn.classList.toggle('active', !isPlaying);
}

function setCirculationAnimation(isPlaying) {
  const svg = document.getElementById('peredaran-svg');
  const wrap = svg ? svg.closest('.peredaran-img-wrap') : null;
  const playBtn = document.getElementById('circulation-play-btn');
  const pauseBtn = document.getElementById('circulation-pause-btn');

  if (svg) {
    if (isPlaying) {
      svg.unpauseAnimations();
    } else {
      svg.pauseAnimations();
    }
  }

  if (wrap) wrap.classList.toggle('circulation-paused', !isPlaying);
  if (playBtn) playBtn.classList.toggle('active', isPlaying);
  if (pauseBtn) pauseBtn.classList.toggle('active', !isPlaying);
}

function setExcretionAnimation(isPlaying) {
  const svg = document.getElementById('ekskresi-svg');
  const wrap = svg ? svg.closest('.pencernaan-img-wrap') : null;
  const playBtn = document.getElementById('excretion-play-btn');
  const pauseBtn = document.getElementById('excretion-pause-btn');

  if (svg) {
    if (isPlaying) {
      svg.unpauseAnimations();
    } else {
      svg.pauseAnimations();
    }
  }

  if (wrap) wrap.classList.toggle('excretion-paused', !isPlaying);
  if (playBtn) playBtn.classList.toggle('active', isPlaying);
  if (pauseBtn) pauseBtn.classList.toggle('active', !isPlaying);
}


// ============ OPENING NARASI ============
function mulaiNarasi() {
  sessionStorage.setItem('brainipa-play-menu-narration', '1');
  showPage('page-menu');
}

function stopNarasi() {
  const audio = document.getElementById('narasi-audio');
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
  updateMenuNarrationButton();
}

function showOpening() {}
function startNarasi() {}
function endOpening() {}
function skipOpening() {}

// ============ SPLASH SCREEN ============
(function() {
  const shouldShowSplash = document.body.dataset.splash === 'true';
  if (!shouldShowSplash) {
    const splash = document.getElementById('splash-screen');
    if (splash) splash.style.display = 'none';
    return;
  }
  document.body.classList.add('splash-active');

  const steps = [
    { pct: 15, text: 'Memuat materi...' },
    { pct: 38, text: 'Menyiapkan animasi...' },
    { pct: 62, text: 'Memuat permainan...' },
    { pct: 85, text: 'Hampir selesai...' },
    { pct: 100, text: 'Siap! 🎉' },
  ];

  const bar = document.getElementById('splash-bar');
  const loadingText = document.getElementById('splash-loading-text');
  const splash = document.getElementById('splash-screen');

  let step = 0;
  function nextStep() {
    if (step >= steps.length) {
      setTimeout(() => {
        if (splash) splash.classList.add('splash-hide');
        document.body.classList.remove('splash-active');
        setTimeout(() => {
          window.location.href = 'indexhome.html';
        }, 700);
      }, 400);
      return;
    }
    const s = steps[step++];
    if (bar) {
      bar.style.width = s.pct + '%';
      bar.classList.add('active');
    }
    if (loadingText) {
      loadingText.style.opacity = '0';
      setTimeout(() => {
        loadingText.textContent = s.text;
        loadingText.style.opacity = '1';
      }, 150);
    }
    const delay = step === steps.length ? 450 : 280 + Math.random() * 200;
    setTimeout(nextStep, delay);
  }

  setTimeout(nextStep, 800);
})();

function resetAllProgress() {
  if (!confirm('Reset semua progress belajar dan skor game?')) return;
  localStorage.removeItem('brainipa-read');
  localStorage.removeItem('brainipa-scores');
  updateProgressUI();
  updateGameMenuUI();
}

function resetScoreOnly() {
  if (!confirm('Reset semua skor game?')) return;
  localStorage.removeItem('brainipa-scores');
  updateGameMenuUI();
}

// ============ SCORE STORAGE ============
const GAME_KEYS = ['organ', 'digestive', 'breathing', 'circulation', 'excretion'];
const GAME_TOTALS = { organ: 8, digestive: 6, breathing: 7, circulation: 4, excretion: 4 };
const GAME_LABELS = {
  organ: 'Organ Tubuh', digestive: 'Pencernaan',
  breathing: 'Pernapasan', circulation: 'Peredaran Darah', excretion: 'Ekskresi'
};

function getScores() {
  try {
    const d = localStorage.getItem('brainipa-scores');
    return d ? JSON.parse(d) : {};
  } catch(e) { return {}; }
}

function saveScore(gameKey, score, total, timeTaken) {
  const scores = getScores();
  const prev = scores[gameKey];
  const pct = Math.round((score / total) * 100);
  const isNew = !prev || pct > prev.pct || (pct === prev.pct && timeTaken < prev.time);
  if (isNew) {
    scores[gameKey] = { score, total, pct, time: timeTaken, date: new Date().toLocaleDateString('id-ID') };
    localStorage.setItem('brainipa-scores', JSON.stringify(scores));
  }
  return { isNew, prev: prev || null };
}

function updateGameMenuUI() {
  const scores = getScores();
  let played = 0, totalPct = 0, perfect = 0;

  GAME_KEYS.forEach(key => {
    const card = document.getElementById('gcard-' + key);
    const sub = document.getElementById('gsub-' + key);
    const badge = document.getElementById('gbadge-' + key);
    if (!card) return;

    const s = scores[key];
    card.classList.remove('played', 'perfect', 'read');

    if (s) {
      played++;
      totalPct += s.pct;
      if (s.pct === 100) perfect++;

      // Sub text
      if (sub) sub.textContent = s.pct === 100 ? '🏆 Sempurna!' : `⭐ ${s.pct}% · ${s.score}/${s.total}`;

      // Badge
      if (badge) {
        badge.style.opacity = '1';
        badge.style.transform = 'scale(1)';
        badge.textContent = s.pct === 100 ? '🏆 Sempurna' : `⭐ ${s.pct}%`;
        badge.style.background = s.pct === 100 ? '#22C55E' : '#F59E0B';
      }

      card.classList.add('read');
      if (s.pct === 100) card.classList.add('perfect');
    } else {
      if (sub) sub.textContent = key === 'organ' ? '8 organ utama' : key === 'digestive' ? '6 bagian proses' : key === 'breathing' ? '7 organ pernapasan' : key === 'circulation' ? '4 komponen utama' : '4 organ ekskresi';
      if (badge) { badge.style.opacity = '0'; badge.style.transform = 'scale(0.7)'; }
    }
  });

  // Progress bar
  const bar = document.getElementById('game-progress-bar');
  const text = document.getElementById('game-progress-text');
  const pct = Math.round((played / 5) * 100);
  if (bar) bar.style.width = pct + '%';
  if (text) {
    if (played === 5) { text.textContent = '🎉 Semua game sudah dimainkan!'; text.style.color = '#22C55E'; }
    else { text.textContent = `${played} / 5 game dimainkan`; text.style.color = ''; }
  }
}

// Hook UI updates ke showPage — ditangani di dalam showPage langsung
// Init
document.addEventListener('DOMContentLoaded', updateGameMenuUI);

// ============ PROGRESS TRACKER ============
const MATERI_KEYS = ['organ', 'pencernaan', 'pernapasan', 'peredaran', 'ekskresi'];

function getReadMateri() {
  try {
    const data = localStorage.getItem('brainipa-read');
    return data ? JSON.parse(data) : [];
  } catch(e) { return []; }
}

function markMateriRead(key) {
  const read = getReadMateri();
  if (!read.includes(key)) {
    read.push(key);
    localStorage.setItem('brainipa-read', JSON.stringify(read));
  }
  updateProgressUI();
}

function updateProgressUI() {
  const read = getReadMateri();
  const total = MATERI_KEYS.length;
  const count = read.filter(k => MATERI_KEYS.includes(k)).length;
  const pct = Math.round((count / total) * 100);

  // Progress bar
  const bar = document.getElementById('materi-progress-bar');
  const text = document.getElementById('materi-progress-text');
  if (bar) bar.style.width = pct + '%';
  if (text) {
    if (count === total) {
      text.textContent = '🎉 Semua materi sudah dibaca!';
      text.style.color = '#22C55E';
    } else {
      text.textContent = `${count} / ${total} materi dibaca`;
      text.style.color = '';
    }
  }

  // Badge di kartu
  MATERI_KEYS.forEach(key => {
    const card = document.getElementById('card-' + key);
    if (card) {
      if (read.includes(key)) {
        card.classList.add('read');
      } else {
        card.classList.remove('read');
      }
    }
  });
}

// Init saat load
document.addEventListener('DOMContentLoaded', updateProgressUI);

// ============ MATERI TAB (mobile) ============
let activeMateriTab = 'diagram';

function switchMateriTab(tab) {
  activeMateriTab = tab;
  const left = document.getElementById('panel-left');
  const right = document.getElementById('panel-right');
  const btnDiagram = document.getElementById('tab-btn-diagram');
  const btnMateri = document.getElementById('tab-btn-materi');
  if (!left || !right) return;

  if (tab === 'diagram') {
    left.classList.remove('tab-hidden');
    right.classList.add('tab-hidden');
    btnDiagram && btnDiagram.classList.add('active');
    btnMateri && btnMateri.classList.remove('active');
  } else {
    right.classList.remove('tab-hidden');
    left.classList.add('tab-hidden');
    btnMateri && btnMateri.classList.add('active');
    btnDiagram && btnDiagram.classList.remove('active');
  }
}

// Reset tab ke diagram saat buka materi baru
function resetMateriTab() {
  activeMateriTab = 'diagram';
  const left = document.getElementById('panel-left');
  const right = document.getElementById('panel-right');
  if (left) left.classList.remove('tab-hidden');
  if (right) right.classList.remove('tab-hidden');
  const btnDiagram = document.getElementById('tab-btn-diagram');
  const btnMateri = document.getElementById('tab-btn-materi');
  if (btnDiagram) btnDiagram.classList.add('active');
  if (btnMateri) btnMateri.classList.remove('active');
  // Di mobile: mulai dari tab diagram
  if (window.innerWidth <= 767) {
    if (right) right.classList.add('tab-hidden');
  }
}

// Saat organ diklik di panel kiri → otomatis pindah ke tab materi di mobile
function autoSwitchToMateriTab() {
  if (window.innerWidth <= 767 && window.matchMedia('(orientation: portrait)').matches) {
    switchMateriTab('materi');
  }
}

// ============ DARK MODE ============
function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark');
  localStorage.setItem('brainipa-dark', isDark ? '1' : '0');
  updateDarkModeIcons();
}

function updateDarkModeIcons() {
  const isDark = document.body.classList.contains('dark');
  const icon = isDark ? '☀️' : '🌙';
  document.querySelectorAll('.btn-darkmode, .home-darkmode-btn').forEach(btn => {
    btn.textContent = icon;
    btn.title = isDark ? 'Mode Terang' : 'Mode Gelap';
  });
}

// Restore dark mode preference on load
(function() {
  if (localStorage.getItem('brainipa-dark') === '1') {
    document.body.classList.add('dark');
  }
  // Wait for DOM then update icons
  document.addEventListener('DOMContentLoaded', updateDarkModeIcons);
})();

// ============ MENU NARRATION CONTROL ============
function getMenuNarrationAudio() {
  return document.getElementById('narasi-audio');
}

function isMenuNarrationPlaying() {
  const audio = getMenuNarrationAudio();
  return !!audio && !audio.paused && !audio.ended;
}

function updateMenuNarrationButton() {
  const btn = document.getElementById('menu-sound-toggle');
  const icon = document.getElementById('menu-sound-icon');
  const text = document.getElementById('menu-sound-text');
  if (!btn) return;

  const playing = isMenuNarrationPlaying();
  btn.classList.toggle('playing', playing);
  btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
  btn.title = playing ? 'Pause narasi menu' : 'Dengarkan narasi menu';
  if (icon) icon.textContent = playing ? '⏸' : '🔊';
  if (text) text.textContent = playing ? 'Pause' : 'Dengarkan';
}

function playMenuNarration(restart = false) {
  const audio = getMenuNarrationAudio();
  if (!audio) return;

  audio.muted = false;
  audio.volume = 1.0;
  if (restart || audio.ended) audio.currentTime = 0;
  audio.play().then(updateMenuNarrationButton).catch(updateMenuNarrationButton);
}

function pauseMenuNarration() {
  const audio = getMenuNarrationAudio();
  if (!audio) return;

  audio.pause();
  updateMenuNarrationButton();
}

function toggleMenuNarration() {
  if (isMenuNarrationPlaying()) {
    pauseMenuNarration();
  } else {
    playMenuNarration(false);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  localStorage.removeItem('brainipa-sound-muted');
  const audio = getMenuNarrationAudio();
  if (audio) {
    audio.muted = false;
    audio.addEventListener('play', updateMenuNarrationButton);
    audio.addEventListener('pause', updateMenuNarrationButton);
    audio.addEventListener('ended', updateMenuNarrationButton);
  }
  updateMenuNarrationButton();
});

// ============ GAME MENU NARRATION CONTROL ============
let gameMenuNarrationPending = false;

function getGameMenuNarrationAudio() {
  return document.getElementById('kuis-audio');
}

function isGameMenuNarrationPlaying() {
  const audio = getGameMenuNarrationAudio();
  return !!audio && !audio.paused && !audio.ended;
}

function updateGameMenuNarrationButton() {
  const btn = document.getElementById('game-menu-sound-toggle');
  const icon = document.getElementById('game-menu-sound-icon');
  const text = document.getElementById('game-menu-sound-text');
  if (!btn) return;

  const playing = isGameMenuNarrationPlaying();
  btn.classList.toggle('playing', playing);
  btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
  btn.title = playing ? 'Pause narasi kuis' : 'Dengarkan narasi kuis';
  if (icon) icon.textContent = playing ? '⏸' : '🔊';
  if (text) text.textContent = playing ? 'Pause' : 'Dengarkan';
}

function playGameMenuNarration(restart = false) {
  const audio = getGameMenuNarrationAudio();
  if (!audio) return Promise.resolve(false);

  audio.muted = false;
  audio.defaultMuted = false;
  audio.volume = 1.0;
  if (restart || audio.ended) audio.currentTime = 0;

  const playPromise = audio.play();
  if (!playPromise || typeof playPromise.then !== 'function') {
    gameMenuNarrationPending = false;
    updateGameMenuNarrationButton();
    return Promise.resolve(true);
  }

  return playPromise
    .then(() => {
      gameMenuNarrationPending = false;
      updateGameMenuNarrationButton();
      return true;
    })
    .catch(() => {
      gameMenuNarrationPending = true;
      updateGameMenuNarrationButton();
      return false;
    });
}

function pauseGameMenuNarration() {
  const audio = getGameMenuNarrationAudio();
  if (!audio) return;

  audio.pause();
  updateGameMenuNarrationButton();
}

function toggleGameMenuNarration() {
  if (isGameMenuNarrationPlaying()) {
    pauseGameMenuNarration();
  } else {
    playGameMenuNarration(false);
  }
}

function armGameMenuNarrationAutoplay() {
  const audio = getGameMenuNarrationAudio();
  if (!audio) return;

  gameMenuNarrationPending = true;
  audio.muted = false;
  audio.defaultMuted = false;
  audio.volume = 1.0;
  audio.load();

  const tryPlay = () => playGameMenuNarration(true);
  setTimeout(tryPlay, 80);

  if (audio.readyState < 2) {
    audio.addEventListener('loadeddata', tryPlay, { once: true });
    audio.addEventListener('canplay', tryPlay, { once: true });
  }
}

function unlockGameMenuNarrationOnGesture(event) {
  if (_currentPage !== 'page-game-menu' || !gameMenuNarrationPending) return;
  if (event && event.target && event.target.closest('#game-menu-sound-toggle')) return;
  playGameMenuNarration(false);
}

document.addEventListener('DOMContentLoaded', () => {
  const audio = getGameMenuNarrationAudio();
  if (!audio) return;

  audio.muted = false;
  audio.defaultMuted = false;
  audio.volume = 1.0;
  audio.addEventListener('play', updateGameMenuNarrationButton);
  audio.addEventListener('pause', updateGameMenuNarrationButton);
  audio.addEventListener('ended', updateGameMenuNarrationButton);
  document.addEventListener('pointerdown', unlockGameMenuNarrationOnGesture);
  document.addEventListener('keydown', unlockGameMenuNarrationOnGesture);
  updateGameMenuNarrationButton();
});

// ============ SOUND EFFECTS (Web Audio API) ============

const SFX = (() => {
  let ctx = null;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  // Tone dasar: oscillator + envelope
  function playTone({ freq = 440, type = 'sine', duration = 0.12, vol = 0.18,
                       attack = 0.005, decay = 0.05, freqEnd = null, detune = 0 }) {
    try {
      const c = getCtx();
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.connect(gain); gain.connect(c.destination);

      osc.type = type;
      osc.frequency.setValueAtTime(freq, c.currentTime);
      if (freqEnd) osc.frequency.exponentialRampToValueAtTime(freqEnd, c.currentTime + duration);
      osc.detune.setValueAtTime(detune, c.currentTime);

      gain.gain.setValueAtTime(0, c.currentTime);
      gain.gain.linearRampToValueAtTime(vol, c.currentTime + attack);
      gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);

      osc.start(c.currentTime);
      osc.stop(c.currentTime + duration + 0.02);
    } catch(e) {}
  }

  // Suara klik tombol biasa — "pop" pendek
  function btnClick() {
    playTone({ freq: 520, type: 'sine', duration: 0.09, vol: 0.15, freqEnd: 480 });
  }

  // Suara tombol navigasi / back — sedikit lebih rendah
  function navClick() {
    playTone({ freq: 380, type: 'sine', duration: 0.1, vol: 0.13, freqEnd: 320 });
  }

  // Suara pilih menu card — "ting" cerah
  function menuSelect() {
    playTone({ freq: 660, type: 'triangle', duration: 0.15, vol: 0.16, freqEnd: 720, attack: 0.003 });
    setTimeout(() => playTone({ freq: 880, type: 'triangle', duration: 0.1, vol: 0.1 }), 80);
  }

  // Suara pilih organ chip — "click" ringan
  function chipSelect() {
    playTone({ freq: 600, type: 'triangle', duration: 0.1, vol: 0.13, freqEnd: 640 });
  }

  // Suara drag label game — "swoosh" kecil
  function gameLabel() {
    playTone({ freq: 300, type: 'sine', duration: 0.12, vol: 0.12, freqEnd: 500 });
  }

  // Suara jawaban benar — akord naik
  function correct() {
    [0, 80, 160].forEach((delay, i) => {
      const freqs = [523, 659, 784];
      setTimeout(() => playTone({ freq: freqs[i], type: 'triangle', duration: 0.25, vol: 0.18, attack: 0.01 }), delay);
    });
  }

  // Suara jawaban salah — turun
  function wrong() {
    playTone({ freq: 300, type: 'sawtooth', duration: 0.18, vol: 0.14, freqEnd: 200 });
    setTimeout(() => playTone({ freq: 200, type: 'sawtooth', duration: 0.15, vol: 0.1, freqEnd: 150 }), 120);
  }

  // Suara game complete — fanfare kecil
  function complete() {
    const melody = [523, 659, 784, 1047];
    melody.forEach((freq, i) => {
      setTimeout(() => playTone({ freq, type: 'triangle', duration: 0.22, vol: 0.2, attack: 0.01 }), i * 120);
    });
  }

  // Suara page/tab transition
  function pageIn() {
    playTone({ freq: 440, type: 'sine', duration: 0.12, vol: 0.1, freqEnd: 520, attack: 0.008 });
  }

  return { btnClick, navClick, menuSelect, chipSelect, gameLabel, correct, wrong, complete, pageIn };
})();

// Hook suara ke semua klik interaktif
document.addEventListener('click', function(e) {
  const t = e.target;

  // Tombol kembali / navigasi
  if (t.closest('.btn-back')) { SFX.navClick(); return; }

  // Tombol utama CTA
  if (t.closest('.btn-primary')) { SFX.menuSelect(); return; }

  // Dev button
  if (t.closest('.btn-dev')) { SFX.navClick(); return; }

  // Kartu menu
  if (t.closest('.menu-card')) { SFX.menuSelect(); return; }

  // Organ chip
  if (t.closest('.organ-chip')) { SFX.chipSelect(); return; }

  // Label game
  if (t.closest('.game-label')) { SFX.gameLabel(); return; }

  // Tombol play proses / tab / semua button lain
  if (t.closest('button')) { SFX.btnClick(); return; }

}, false);

// Hook suara ke jawaban benar/salah di game
// Intercept showFeedback atau fungsi drop zone correct/wrong
const _origCheckDrop = window.checkDrop;
// Patch drop-zone correct/wrong melalui MutationObserver pada class
const dropObserver = new MutationObserver(mutations => {
  mutations.forEach(m => {
    if (m.type === 'attributes' && m.attributeName === 'class') {
      const el = m.target;
      if (el.classList.contains('correct') && !el.dataset.soundPlayed) {
        el.dataset.soundPlayed = '1';
        SFX.correct();
        setTimeout(() => delete el.dataset.soundPlayed, 800);
      } else if (el.classList.contains('wrong')) {
        SFX.wrong();
      }
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  dropObserver.observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });

  // Game complete sound
  const origShowComplete = window.showGameComplete;
  if (typeof origShowComplete === 'function') {
    window.showGameComplete = function(...args) {
      SFX.complete();
      return origShowComplete(...args);
    };
  }

  // Page transition sound handled inside showPage directly
  });

// ============ KUIS PILIHAN GANDA ============

const QUIZ_QUESTIONS = [
  // 1. PENCERNAAN — Peristaltik
  { id: 'p1', category: 'Pencernaan', categoryColor: '#8B5CF6', categoryBg: 'rgba(139,92,246,0.1)',
    q: 'Gerak mendorong makanan dari kerongkongan ke lambung disebut gerak...', options: ['Osmosis', 'Peristaltik', 'Difusi', 'Absorbsi'], answer: 1,
    explanation: 'Gerak peristaltik adalah gerakan meremas dan mendorong otot kerongkongan yang mengalirkan makanan ke lambung.',
    svg: `<svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f5f3ff"/><stop offset="100%" stop-color="#ede9fe"/></linearGradient>
    <filter id="sh1"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#8B5CF6" flood-opacity="0.18"/></filter>
  </defs>
  <rect width="280" height="160" rx="20" fill="url(#bg1)"/>
  <!-- Kerongkongan tube -->
  <rect x="120" y="10" width="40" height="130" rx="20" fill="white" stroke="#c4b5fd" stroke-width="3" filter="url(#sh1)"/>
  <rect x="126" y="10" width="28" height="130" rx="14" fill="#ede9fe"/>
  <!-- Gelombang kontraksi -->
  <ellipse cx="140" cy="40" rx="14" ry="9" fill="#a78bfa" opacity="0.5">
    <animate attributeName="cy" values="35;125;35" dur="2.2s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0.1;0.6;0.1" dur="2.2s" repeatCount="indefinite"/>
  </ellipse>
  <ellipse cx="140" cy="20" rx="14" ry="9" fill="#c4b5fd" opacity="0.3">
    <animate attributeName="cy" values="15;105;15" dur="2.2s" repeatCount="indefinite" begin="0.3s"/>
    <animate attributeName="opacity" values="0.1;0.4;0.1" dur="2.2s" repeatCount="indefinite" begin="0.3s"/>
  </ellipse>
  <!-- Makanan (emoji) -->
  <text x="140" y="52" text-anchor="middle" font-size="22">🍞</text>
  <animateTransform attributeName="transform" type="translate" values="0,0;0,80;0,0" dur="2.2s" repeatCount="indefinite" xlink:href="#food1"/>
  <g id="food1">
    <text x="140" y="52" text-anchor="middle" font-size="22">🍞
      <animate attributeName="y" values="45;128;45" dur="2.2s" repeatCount="indefinite"/>
    </text>
  </g>
  <!-- Label kiri -->
  <g opacity="0"><animate attributeName="opacity" values="0;1;1;0" dur="2.2s" repeatCount="indefinite" begin="0.2s"/>
    <rect x="10" y="55" width="95" height="28" rx="10" fill="white" stroke="#a78bfa" stroke-width="1.5" filter="url(#sh1)"/>
    <text x="57" y="64" text-anchor="middle" font-size="9" fill="#7c3aed" font-weight="700">💪 Otot meremas</text>
    <text x="57" y="76" text-anchor="middle" font-size="8" fill="#a78bfa">kontraksi</text>
    <line x1="105" y1="69" x2="120" y2="69" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="3,2"/>
  </g>
  <!-- Label kanan -->
  <g opacity="0"><animate attributeName="opacity" values="0;0;1;0" dur="2.2s" repeatCount="indefinite" begin="0.8s"/>
    <rect x="175" y="85" width="90" height="28" rx="10" fill="white" stroke="#a78bfa" stroke-width="1.5" filter="url(#sh1)"/>
    <text x="220" y="94" text-anchor="middle" font-size="9" fill="#7c3aed" font-weight="700">⬇️ Mendorong</text>
    <text x="220" y="106" text-anchor="middle" font-size="8" fill="#a78bfa">ke lambung</text>
    <line x1="160" y1="99" x2="175" y2="99" stroke="#a78bfa" stroke-width="1.5" stroke-dasharray="3,2"/>
  </g>
  <!-- Title -->
  <rect x="80" y="142" width="120" height="14" rx="7" fill="#7c3aed" opacity="0.12"/>
  <text x="140" y="153" text-anchor="middle" font-size="9" fill="#7c3aed" font-weight="800">🍽️ Gerak Peristaltik</text>
</svg>` },

  // 2. PENCERNAAN — Usus Halus
  { id: 'p2', category: 'Pencernaan', categoryColor: '#8B5CF6', categoryBg: 'rgba(139,92,246,0.1)',
    q: 'Penyerapan sari makanan paling banyak terjadi di...', options: ['Lambung', 'Usus Besar', 'Usus Halus', 'Kerongkongan'], answer: 2,
    explanation: 'Usus halus memiliki vili dan mikrovili yang memperluas permukaan penyerapan nutrisi ke dalam darah.',
    svg: `<svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f5f3ff"/><stop offset="100%" stop-color="#ede9fe"/></linearGradient>
    <filter id="sh2"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#8B5CF6" flood-opacity="0.15"/></filter>
  </defs>
  <rect width="280" height="160" rx="20" fill="url(#bg2)"/>
  <!-- Usus berkelok -->
  <path d="M30,80 Q60,30 100,80 Q140,130 180,80 Q210,45 240,80" fill="none" stroke="#e9d5ff" stroke-width="22" stroke-linecap="round"/>
  <path d="M30,80 Q60,30 100,80 Q140,130 180,80 Q210,45 240,80" fill="none" stroke="#a78bfa" stroke-width="14" stroke-linecap="round"/>
  <path d="M30,80 Q60,30 100,80 Q140,130 180,80 Q210,45 240,80" fill="none" stroke="#ddd6fe" stroke-width="6" stroke-linecap="round" stroke-dasharray="8,6">
    <animate attributeName="stroke-dashoffset" values="0;-28" dur="1.5s" repeatCount="indefinite"/>
  </path>
  <!-- Nutrisi diserap keluar (partikel) -->
  <circle r="5" fill="#fbbf24" filter="url(#sh2)"><animate attributeName="cx" values="60;60;45;45" dur="2s" repeatCount="indefinite" begin="0s"/><animate attributeName="cy" values="55;55;30;30" dur="2s" repeatCount="indefinite" begin="0s"/><animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin="0s"/></circle>
  <circle r="5" fill="#34d399" filter="url(#sh2)"><animate attributeName="cx" values="100;100;100;100" dur="2s" repeatCount="indefinite" begin="0.5s"/><animate attributeName="cy" values="80;80;105;105" dur="2s" repeatCount="indefinite" begin="0.5s"/><animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin="0.5s"/></circle>
  <circle r="5" fill="#60a5fa" filter="url(#sh2)"><animate attributeName="cx" values="180;180;195;195" dur="2s" repeatCount="indefinite" begin="1s"/><animate attributeName="cy" values="80;80;55;55" dur="2s" repeatCount="indefinite" begin="1s"/><animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin="1s"/></circle>
  <circle r="5" fill="#f87171" filter="url(#sh2)"><animate attributeName="cx" values="140;140;155;155" dur="2s" repeatCount="indefinite" begin="1.5s"/><animate attributeName="cy" values="120;120;140;140" dur="2s" repeatCount="indefinite" begin="1.5s"/><animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin="1.5s"/></circle>
  <!-- Label -->
  <g opacity="0"><animate attributeName="opacity" values="0;1" dur="0.5s" fill="freeze" begin="0.3s"/>
    <rect x="8" y="8" width="110" height="30" rx="10" fill="white" stroke="#a78bfa" stroke-width="1.5" filter="url(#sh2)"/>
    <text x="63" y="20" text-anchor="middle" font-size="9" fill="#7c3aed" font-weight="700">🔬 Vili &amp; Mikrovili</text>
    <text x="63" y="32" text-anchor="middle" font-size="8" fill="#a78bfa">perluas permukaan serap</text>
  </g>
  <rect x="75" y="142" width="130" height="14" rx="7" fill="#7c3aed" opacity="0.12"/>
  <text x="140" y="153" text-anchor="middle" font-size="9" fill="#7c3aed" font-weight="800">🫧 Usus Halus — Penyerapan Nutrisi</text>
</svg>` },

  // 3. PERNAPASAN — Alveolus
  { id: 'r1', category: 'Pernapasan', categoryColor: '#0EA5E9', categoryBg: 'rgba(14,165,233,0.1)',
    q: 'Pertukaran gas O₂ dan CO₂ terjadi di...', options: ['Trakea', 'Bronkus', 'Alveolus', 'Diafragma'], answer: 2,
    explanation: 'Alveolus adalah kantung udara kecil di paru-paru tempat O₂ masuk ke darah dan CO₂ dikeluarkan.',
    svg: `<svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg3" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f0f9ff"/><stop offset="100%" stop-color="#e0f2fe"/></linearGradient>
    <linearGradient id="alv" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#bae6fd"/><stop offset="100%" stop-color="#38bdf8"/></linearGradient>
    <filter id="sh3"><feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#0EA5E9" flood-opacity="0.2"/></filter>
  </defs>
  <rect width="280" height="160" rx="20" fill="url(#bg3)"/>
  <!-- Kapiler darah (tube merah) -->
  <path d="M10,95 Q140,75 270,95" fill="none" stroke="#fca5a5" stroke-width="18" stroke-linecap="round"/>
  <path d="M10,95 Q140,75 270,95" fill="none" stroke="#ef4444" stroke-width="10" stroke-linecap="round"/>
  <!-- Alveolus kiri -->
  <circle cx="75" cy="72" r="38" fill="url(#alv)" stroke="#0ea5e9" stroke-width="2.5" filter="url(#sh3)">
    <animate attributeName="r" values="32;40;32" dur="2.5s" repeatCount="indefinite"/>
  </circle>
  <!-- Alveolus kanan -->
  <circle cx="195" cy="72" r="38" fill="url(#alv)" stroke="#0ea5e9" stroke-width="2.5" filter="url(#sh3)">
    <animate attributeName="r" values="32;40;32" dur="2.5s" repeatCount="indefinite" begin="0.4s"/>
  </circle>
  <!-- Emoji paru -->
  <text x="75" y="80" text-anchor="middle" font-size="28">🫧</text>
  <text x="195" y="80" text-anchor="middle" font-size="28">🫧</text>
  <!-- O2 masuk panah -->
  <g><animate attributeName="opacity" values="0;1;1;0" dur="2.5s" repeatCount="indefinite"/>
    <text x="75" y="28" text-anchor="middle" font-size="13" fill="#0ea5e9" font-weight="900">O₂ ↓</text>
    <animate attributeName="y" values="22;35;22" dur="2.5s" repeatCount="indefinite" xlink:href="nope"/>
  </g>
  <!-- CO2 keluar panah -->
  <g><animate attributeName="opacity" values="0;0;1;0" dur="2.5s" repeatCount="indefinite" begin="1.2s"/>
    <text x="195" y="130" text-anchor="middle" font-size="12" fill="#64748b" font-weight="900">CO₂ ↑</text>
  </g>
  <!-- Label kapiler -->
  <rect x="95" y="88" width="90" height="20" rx="10" fill="white" opacity="0.85" stroke="#fca5a5" stroke-width="1.5"/>
  <text x="140" y="102" text-anchor="middle" font-size="9" fill="#dc2626" font-weight="700">🩸 Kapiler Darah</text>
  <rect x="70" y="142" width="140" height="14" rx="7" fill="#0ea5e9" opacity="0.12"/>
  <text x="140" y="153" text-anchor="middle" font-size="9" fill="#0284c7" font-weight="800">🫧 Alveolus — Pertukaran Gas</text>
</svg>` },

  // 4. PERNAPASAN — Diafragma
  { id: 'r2', category: 'Pernapasan', categoryColor: '#0EA5E9', categoryBg: 'rgba(14,165,233,0.1)',
    q: 'Otot utama yang menggerakkan pernapasan adalah...', options: ['Otot jantung', 'Diafragma', 'Otot perut', 'Otot punggung'], answer: 1,
    explanation: 'Diafragma berkontraksi saat inspirasi (udara masuk) dan relaksasi saat ekspirasi (udara keluar).',
    svg: `<svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg4" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f0f9ff"/><stop offset="100%" stop-color="#e0f2fe"/></linearGradient>
    <linearGradient id="lung4" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#bae6fd"/><stop offset="100%" stop-color="#7dd3fc"/></linearGradient>
    <filter id="sh4"><feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0EA5E9" flood-opacity="0.18"/></filter>
  </defs>
  <rect width="280" height="160" rx="20" fill="url(#bg4)"/>
  <!-- Paru kiri -->
  <ellipse cx="88" cy="72" rx="52" ry="48" fill="url(#lung4)" stroke="#38bdf8" stroke-width="2" filter="url(#sh4)">
    <animate attributeName="ry" values="38;52;38" dur="3s" repeatCount="indefinite"/>
    <animate attributeName="cy" values="76;68;76" dur="3s" repeatCount="indefinite"/>
  </ellipse>
  <!-- Paru kanan -->
  <ellipse cx="192" cy="72" rx="52" ry="48" fill="url(#lung4)" stroke="#38bdf8" stroke-width="2" filter="url(#sh4)">
    <animate attributeName="ry" values="38;52;38" dur="3s" repeatCount="indefinite" begin="0.2s"/>
    <animate attributeName="cy" values="76;68;76" dur="3s" repeatCount="indefinite" begin="0.2s"/>
  </ellipse>
  <!-- Emoji -->
  <text x="88" y="80" text-anchor="middle" font-size="32">🫁</text>
  <text x="192" y="80" text-anchor="middle" font-size="32">🫁</text>
  <!-- Diafragma kurva -->
  <path d="M25,112 Q140,148 255,112" fill="none" stroke="#0369a1" stroke-width="6" stroke-linecap="round" filter="url(#sh4)">
    <animate attributeName="d" values="M25,112 Q140,148 255,112;M25,105 Q140,128 255,105;M25,112 Q140,148 255,112" dur="3s" repeatCount="indefinite"/>
  </path>
  <!-- Label inspirasi/ekspirasi -->
  <g><animate attributeName="opacity" values="1;0;1" dur="3s" repeatCount="indefinite"/>
    <rect x="8" y="8" width="80" height="26" rx="10" fill="white" stroke="#38bdf8" stroke-width="1.5" filter="url(#sh4)"/>
    <text x="48" y="18" text-anchor="middle" font-size="8" fill="#0284c7" font-weight="700">💨 Inspirasi</text>
    <text x="48" y="29" text-anchor="middle" font-size="8" fill="#0ea5e9">udara masuk</text>
  </g>
  <g><animate attributeName="opacity" values="0;1;0" dur="3s" repeatCount="indefinite"/>
    <rect x="192" y="8" width="82" height="26" rx="10" fill="white" stroke="#38bdf8" stroke-width="1.5" filter="url(#sh4)"/>
    <text x="233" y="18" text-anchor="middle" font-size="8" fill="#0284c7" font-weight="700">💨 Ekspirasi</text>
    <text x="233" y="29" text-anchor="middle" font-size="8" fill="#0ea5e9">udara keluar</text>
  </g>
  <rect x="75" y="142" width="130" height="14" rx="7" fill="#0ea5e9" opacity="0.12"/>
  <text x="140" y="153" text-anchor="middle" font-size="9" fill="#0284c7" font-weight="800">🫁 Diafragma naik-turun</text>
</svg>` },

  // 5. PEREDARAN DARAH — Ventrikel Kiri
  { id: 'd1', category: 'Peredaran Darah', categoryColor: '#EF4444', categoryBg: 'rgba(239,68,68,0.1)',
    q: 'Bagian jantung yang memompa darah ke seluruh tubuh adalah...', options: ['Atrium kanan', 'Ventrikel kiri', 'Atrium kiri', 'Ventrikel kanan'], answer: 1,
    explanation: 'Ventrikel kiri berdinding paling tebal karena memompa darah ke seluruh tubuh melalui aorta.',
    svg: `<svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg5" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff1f2"/><stop offset="100%" stop-color="#ffe4e6"/></linearGradient>
    <linearGradient id="hrt5" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fca5a5"/><stop offset="100%" stop-color="#dc2626"/></linearGradient>
    <filter id="sh5"><feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="#EF4444" flood-opacity="0.25"/></filter>
  </defs>
  <rect width="280" height="160" rx="20" fill="url(#bg5)"/>
  <!-- Jantung shape -->
  <path d="M140,125 C90,95 45,75 50,45 C55,18 80,15 100,30 C115,42 140,55 140,55 C140,55 165,42 180,30 C200,15 225,18 230,45 C235,75 190,95 140,125Z" fill="url(#hrt5)" filter="url(#sh5)">
    <animateTransform attributeName="transform" type="scale" values="1;1.07;1" dur="0.85s" repeatCount="indefinite" additive="sum" transformOrigin="140 70"/>
  </path>
  <!-- Emoji jantung -->
  <text x="140" y="85" text-anchor="middle" font-size="36">🫀</text>
  <!-- Highlight ventrikel kiri -->
  <ellipse cx="118" cy="80" rx="22" ry="30" fill="white" opacity="0.25"/>
  <!-- Aorta panah keluar ke atas -->
  <rect x="130" y="5" width="20" height="35" rx="10" fill="#991b1b" opacity="0.85" filter="url(#sh5)"/>
  <polygon points="140,0 130,12 150,12" fill="#991b1b"/>
  <!-- Darah keluar animasi -->
  <circle r="6" fill="#ef4444" opacity="0">
    <animate attributeName="cx" values="140;140;200;240" dur="1.5s" repeatCount="indefinite" begin="0s"/>
    <animate attributeName="cy" values="22;22;40;80" dur="1.5s" repeatCount="indefinite" begin="0s"/>
    <animate attributeName="opacity" values="0;1;0.8;0" dur="1.5s" repeatCount="indefinite" begin="0s"/>
  </circle>
  <!-- Label bilik -->
  <rect x="8" y="62" width="88" height="28" rx="10" fill="white" stroke="#fca5a5" stroke-width="1.5" filter="url(#sh5)"/>
  <text x="52" y="73" text-anchor="middle" font-size="9" fill="#dc2626" font-weight="800">⬅️ Ventrikel Kiri</text>
  <text x="52" y="84" text-anchor="middle" font-size="8" fill="#ef4444">dinding paling tebal</text>
  <line x1="96" y1="76" x2="115" y2="76" stroke="#fca5a5" stroke-width="1.5" stroke-dasharray="3,2"/>
  <!-- Label aorta -->
  <rect x="155" y="8" width="78" height="22" rx="10" fill="white" stroke="#fca5a5" stroke-width="1.5"/>
  <text x="194" y="23" text-anchor="middle" font-size="9" fill="#dc2626" font-weight="700">🩸 Aorta → Tubuh</text>
  <rect x="65" y="142" width="150" height="14" rx="7" fill="#ef4444" opacity="0.12"/>
  <text x="140" y="153" text-anchor="middle" font-size="9" fill="#dc2626" font-weight="800">🫀 Ventrikel Kiri pompa ke seluruh tubuh</text>
</svg>` },

  // 6. PEREDARAN DARAH — Eritrosit
  { id: 'd2', category: 'Peredaran Darah', categoryColor: '#EF4444', categoryBg: 'rgba(239,68,68,0.1)',
    q: 'Fungsi sel darah merah (eritrosit) adalah...', options: ['Membunuh kuman', 'Membawa oksigen', 'Membentuk gumpalan darah', 'Mengangkut lemak'], answer: 1,
    explanation: 'Eritrosit mengandung hemoglobin yang mengikat O₂ di paru-paru dan mengantarkannya ke seluruh sel tubuh.',
    svg: `<svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg6" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fff1f2"/><stop offset="100%" stop-color="#ffe4e6"/></linearGradient>
    <linearGradient id="vessel" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fecaca"/><stop offset="100%" stop-color="#fca5a5"/></linearGradient>
    <filter id="sh6"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#EF4444" flood-opacity="0.18"/></filter>
    <clipPath id="vesselClip"><rect x="0" y="52" width="280" height="56"/></clipPath>
  </defs>
  <rect width="280" height="160" rx="20" fill="url(#bg6)"/>
  <!-- Pembuluh darah -->
  <rect x="0" y="52" width="280" height="56" rx="0" fill="url(#vessel)"/>
  <rect x="0" y="52" width="280" height="8" fill="#fecaca"/>
  <rect x="0" y="100" width="280" height="8" fill="#fecaca"/>
  <!-- Eritrosit 1 -->
  <g clip-path="url(#vesselClip)">
    <text font-size="26" text-anchor="middle" y="88">🩸
      <animate attributeName="x" values="-20;300" dur="3s" repeatCount="indefinite" begin="0s"/>
    </text>
    <text font-size="26" text-anchor="middle" y="88">🩸
      <animate attributeName="x" values="80;400" dur="3s" repeatCount="indefinite" begin="1s"/>
    </text>
    <text font-size="26" text-anchor="middle" y="88">🩸
      <animate attributeName="x" values="180;500" dur="3s" repeatCount="indefinite" begin="2s"/>
    </text>
  </g>
  <!-- O2 label mengambang -->
  <text font-size="12" font-weight="900" fill="#0ea5e9" opacity="0">O₂
    <animate attributeName="x" values="10;290" dur="3s" repeatCount="indefinite" begin="0s"/>
    <animate attributeName="y" values="45;45;45" dur="3s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0;1;1;0" dur="3s" repeatCount="indefinite" begin="0.2s"/>
  </text>
  <!-- Label atas -->
  <rect x="8" y="8" width="125" height="32" rx="10" fill="white" stroke="#fca5a5" stroke-width="1.5" filter="url(#sh6)"/>
  <text x="70" y="20" text-anchor="middle" font-size="9" fill="#dc2626" font-weight="800">🔴 Eritrosit (Sel Darah Merah)</text>
  <text x="70" y="33" text-anchor="middle" font-size="8" fill="#ef4444">mengandung hemoglobin</text>
  <!-- Label bawah -->
  <rect x="148" y="118" width="124" height="28" rx="10" fill="white" stroke="#fca5a5" stroke-width="1.5" filter="url(#sh6)"/>
  <text x="210" y="129" text-anchor="middle" font-size="9" fill="#dc2626" font-weight="700">💨 Membawa O₂</text>
  <text x="210" y="140" text-anchor="middle" font-size="8" fill="#ef4444">ke seluruh sel tubuh</text>
  <rect x="60" y="143" width="160" height="14" rx="7" fill="#ef4444" opacity="0.12"/>
  <text x="140" y="154" text-anchor="middle" font-size="9" fill="#dc2626" font-weight="800">🩸 Eritrosit mengalir dalam pembuluh darah</text>
</svg>` },

  // 7. EKSKRESI — Ginjal
  { id: 'e1', category: 'Ekskresi', categoryColor: '#F59E0B', categoryBg: 'rgba(245,158,11,0.1)',
    q: 'Organ ekskresi yang menyaring darah dan menghasilkan urine adalah...', options: ['Hati', 'Kulit', 'Ginjal', 'Paru-paru'], answer: 2,
    explanation: 'Ginjal menyaring sekitar 200 liter darah per hari dan menghasilkan ±1,5 liter urine.',
    svg: `<svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg7" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fffbeb"/><stop offset="100%" stop-color="#fef3c7"/></linearGradient>
    <linearGradient id="kid7" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fde68a"/><stop offset="100%" stop-color="#d97706"/></linearGradient>
    <filter id="sh7"><feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#F59E0B" flood-opacity="0.2"/></filter>
  </defs>
  <rect width="280" height="160" rx="20" fill="url(#bg7)"/>
  <!-- Ginjal kiri emoji -->
  <text x="80" y="90" text-anchor="middle" font-size="52">🫘</text>
  <animateTransform attributeName="transform" type="scale" values="1;1.04;1" dur="2s" repeatCount="indefinite" additive="sum" transformOrigin="80 75"/>
  <!-- Ginjal kanan emoji (flipped) -->
  <g transform="scale(-1,1) translate(-280,0)">
    <text x="80" y="90" text-anchor="middle" font-size="52">🫘</text>
  </g>
  <!-- Darah masuk kiri -->
  <g><animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin="0s"/>
    <line x1="10" y1="72" x2="48" y2="72" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
    <polygon points="50,72 42,67 42,77" fill="#ef4444"/>
    <rect x="2" y="60" width="44" height="18" rx="8" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.5"/>
    <text x="24" y="73" text-anchor="middle" font-size="9" fill="#dc2626" font-weight="700">🩸 Darah</text>
  </g>
  <!-- Darah masuk kanan -->
  <g><animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin="0.3s"/>
    <line x1="270" y1="72" x2="232" y2="72" stroke="#ef4444" stroke-width="4" stroke-linecap="round"/>
    <polygon points="230,72 238,67 238,77" fill="#ef4444"/>
  </g>
  <!-- Ureter & urine turun -->
  <line x1="80" y1="110" x2="140" y2="136" stroke="#fbbf24" stroke-width="4" stroke-linecap="round" stroke-dasharray="6,4">
    <animate attributeName="stroke-dashoffset" values="0;-20" dur="1s" repeatCount="indefinite"/>
  </line>
  <line x1="200" y1="110" x2="140" y2="136" stroke="#fbbf24" stroke-width="4" stroke-linecap="round" stroke-dasharray="6,4">
    <animate attributeName="stroke-dashoffset" values="0;-20" dur="1s" repeatCount="indefinite"/>
  </line>
  <!-- Kandung kemih kecil -->
  <ellipse cx="140" cy="142" rx="18" ry="12" fill="#fef3c7" stroke="#f59e0b" stroke-width="2" filter="url(#sh7)"/>
  <text x="140" y="147" text-anchor="middle" font-size="10">💧</text>
  <!-- Label -->
  <rect x="88" y="8" width="104" height="28" rx="10" fill="white" stroke="#fbbf24" stroke-width="1.5" filter="url(#sh7)"/>
  <text x="140" y="19" text-anchor="middle" font-size="9" fill="#b45309" font-weight="800">🫘 Ginjal</text>
  <text x="140" y="30" text-anchor="middle" font-size="8" fill="#d97706">saring 200 L darah/hari</text>
</svg>` },

  // 8. EKSKRESI — Keringat
  { id: 'e2', category: 'Ekskresi', categoryColor: '#F59E0B', categoryBg: 'rgba(245,158,11,0.1)',
    q: 'Keringat yang dihasilkan kulit mengandung...', options: ['Hanya air', 'Air, garam, dan urea', 'Hanya urea', 'Glukosa dan protein'], answer: 1,
    explanation: 'Keringat mengandung air, garam mineral (NaCl), dan sedikit urea sebagai zat sisa metabolisme.',
    svg: `<svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg8" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#fffbeb"/><stop offset="100%" stop-color="#fef3c7"/></linearGradient>
    <linearGradient id="skin8" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#fed7aa"/><stop offset="100%" stop-color="#fdba74"/></linearGradient>
    <filter id="sh8"><feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#F59E0B" flood-opacity="0.18"/></filter>
  </defs>
  <rect width="280" height="160" rx="20" fill="url(#bg8)"/>
  <!-- Lapisan kulit -->
  <rect x="15" y="85" width="250" height="60" rx="16" fill="url(#skin8)" stroke="#f97316" stroke-width="2" filter="url(#sh8)"/>
  <rect x="15" y="85" width="250" height="22" rx="12" fill="#fdba74"/>
  <text x="140" y="100" text-anchor="middle" font-size="9" fill="#7c2d12" font-weight="700">LAPISAN KULIT (DERMIS)</text>
  <!-- Kelenjar keringat -->
  <ellipse cx="70" cy="128" rx="14" ry="10" fill="#f59e0b" stroke="#d97706" stroke-width="1.5"/>
  <text x="70" y="132" text-anchor="middle" font-size="10">💛</text>
  <ellipse cx="140" cy="128" rx="14" ry="10" fill="#f59e0b" stroke="#d97706" stroke-width="1.5"/>
  <text x="140" y="132" text-anchor="middle" font-size="10">💛</text>
  <ellipse cx="210" cy="128" rx="14" ry="10" fill="#f59e0b" stroke="#d97706" stroke-width="1.5"/>
  <text x="210" y="132" text-anchor="middle" font-size="10">💛</text>
  <!-- Tetesan keringat -->
  <text font-size="16" text-anchor="middle" opacity="0">💧
    <animate attributeName="x" values="70;70" dur="2s" repeatCount="indefinite" begin="0s"/>
    <animate attributeName="y" values="82;50" dur="2s" repeatCount="indefinite" begin="0s"/>
    <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin="0s"/>
  </text>
  <text font-size="16" text-anchor="middle" opacity="0">💧
    <animate attributeName="x" values="140;140" dur="2s" repeatCount="indefinite" begin="0.7s"/>
    <animate attributeName="y" values="82;50" dur="2s" repeatCount="indefinite" begin="0.7s"/>
    <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin="0.7s"/>
  </text>
  <text font-size="16" text-anchor="middle" opacity="0">💧
    <animate attributeName="x" values="210;210" dur="2s" repeatCount="indefinite" begin="1.4s"/>
    <animate attributeName="y" values="82;50" dur="2s" repeatCount="indefinite" begin="1.4s"/>
    <animate attributeName="opacity" values="0;1;1;0" dur="2s" repeatCount="indefinite" begin="1.4s"/>
  </text>
  <!-- Label kandungan -->
  <rect x="8" y="8" width="260" height="38" rx="12" fill="white" stroke="#fbbf24" stroke-width="1.5" filter="url(#sh8)"/>
  <text x="140" y="22" text-anchor="middle" font-size="10" fill="#b45309" font-weight="800">💧 Kandungan Keringat</text>
  <text x="80" y="38" text-anchor="middle" font-size="9" fill="#92400e">💧 Air</text>
  <text x="140" y="38" text-anchor="middle" font-size="9" fill="#92400e">🧂 Garam (NaCl)</text>
  <text x="210" y="38" text-anchor="middle" font-size="9" fill="#92400e">🔬 Urea</text>
</svg>` },

  // 9. ORGAN TUBUH — Otak
  { id: 'o1', category: 'Organ Tubuh', categoryColor: '#6366F1', categoryBg: 'rgba(99,102,241,0.1)',
    q: 'Organ yang disebut sebagai "pusat kendali" tubuh manusia adalah...', options: ['Jantung', 'Hati', 'Otak', 'Paru-paru'], answer: 2,
    explanation: 'Otak adalah pusat sistem saraf yang mengatur semua fungsi tubuh termasuk pikiran, gerakan, dan indera.',
    svg: `<svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg9" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#eef2ff"/><stop offset="100%" stop-color="#e0e7ff"/></linearGradient>
    <filter id="sh9"><feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="#6366F1" flood-opacity="0.22"/></filter>
  </defs>
  <rect width="280" height="160" rx="20" fill="url(#bg9)"/>
  <!-- Otak emoji besar -->
  <text x="140" y="100" text-anchor="middle" font-size="68">🧠</text>
  <!-- Sinyal menyebar (garis radial) -->
  <g stroke="#818cf8" stroke-width="2" stroke-dasharray="5,4" opacity="0">
    <animate attributeName="opacity" values="0;0.8;0" dur="1.8s" repeatCount="indefinite" begin="0s"/>
    <line x1="140" y1="60" x2="140" y2="18"/>
    <line x1="140" y1="60" x2="190" y2="28"/>
    <line x1="140" y1="60" x2="220" y2="65"/>
    <line x1="140" y1="60" x2="90" y2="28"/>
    <line x1="140" y1="60" x2="60" y2="65"/>
  </g>
  <!-- Label fungsi muncul bergantian -->
  <g opacity="0"><animate attributeName="opacity" values="0;1;1;0" dur="4s" repeatCount="indefinite" begin="0s"/>
    <rect x="168" y="10" width="100" height="24" rx="10" fill="white" stroke="#a5b4fc" stroke-width="1.5" filter="url(#sh9)"/>
    <text x="218" y="26" text-anchor="middle" font-size="9" fill="#4f46e5" font-weight="700">💭 Pikiran &amp; Memori</text>
  </g>
  <g opacity="0"><animate attributeName="opacity" values="0;0;1;1;0;0" dur="4s" repeatCount="indefinite" begin="1s"/>
    <rect x="168" y="40" width="100" height="24" rx="10" fill="white" stroke="#a5b4fc" stroke-width="1.5" filter="url(#sh9)"/>
    <text x="218" y="56" text-anchor="middle" font-size="9" fill="#4f46e5" font-weight="700">🏃 Gerak &amp; Motorik</text>
  </g>
  <g opacity="0"><animate attributeName="opacity" values="0;0;0;1;1;0" dur="4s" repeatCount="indefinite" begin="2s"/>
    <rect x="12" y="10" width="100" height="24" rx="10" fill="white" stroke="#a5b4fc" stroke-width="1.5" filter="url(#sh9)"/>
    <text x="62" y="26" text-anchor="middle" font-size="9" fill="#4f46e5" font-weight="700">👁️ Penglihatan</text>
  </g>
  <g opacity="0"><animate attributeName="opacity" values="0;0;0;0;1;0" dur="4s" repeatCount="indefinite" begin="3s"/>
    <rect x="12" y="40" width="100" height="24" rx="10" fill="white" stroke="#a5b4fc" stroke-width="1.5" filter="url(#sh9)"/>
    <text x="62" y="56" text-anchor="middle" font-size="9" fill="#4f46e5" font-weight="700">❤️ Emosi &amp; Perasaan</text>
  </g>
  <rect x="60" y="142" width="160" height="14" rx="7" fill="#6366f1" opacity="0.12"/>
  <text x="140" y="153" text-anchor="middle" font-size="9" fill="#4f46e5" font-weight="800">🧠 Otak — Pusat Kendali Tubuh</text>
</svg>` },

  // 10. ORGAN TUBUH — Hati
  { id: 'o2', category: 'Organ Tubuh', categoryColor: '#6366F1', categoryBg: 'rgba(99,102,241,0.1)',
    q: 'Organ terbesar di dalam tubuh manusia adalah...', options: ['Otak', 'Paru-paru', 'Hati', 'Usus'], answer: 2,
    explanation: 'Hati adalah organ dalam terbesar dengan berat ±1,5 kg dan menjalankan lebih dari 500 fungsi metabolisme.',
    svg: `<svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg10" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#eef2ff"/><stop offset="100%" stop-color="#e0e7ff"/></linearGradient>
    <filter id="sh10"><feDropShadow dx="0" dy="5" stdDeviation="7" flood-color="#6366F1" flood-opacity="0.18"/></filter>
  </defs>
  <rect width="280" height="160" rx="20" fill="url(#bg10)"/>
  <!-- Hati emoji besar -->
  <text x="140" y="98" text-anchor="middle" font-size="62">🫀</text>
  <!-- Badge berat -->
  <rect x="88" y="8" width="104" height="30" rx="12" fill="#6366f1" filter="url(#sh10)"/>
  <text x="140" y="20" text-anchor="middle" font-size="10" fill="white" font-weight="800">🏆 Organ Terbesar</text>
  <text x="140" y="32" text-anchor="middle" font-size="9" fill="#c7d2fe">berat ± 1,5 kg</text>
  <!-- Fungsi muncul bergantian -->
  <g opacity="0"><animate attributeName="opacity" values="0;1;1;0" dur="3.6s" repeatCount="indefinite" begin="0s"/>
    <rect x="8" y="50" width="110" height="26" rx="10" fill="white" stroke="#a5b4fc" stroke-width="1.5" filter="url(#sh10)"/>
    <text x="63" y="61" text-anchor="middle" font-size="8" fill="#4f46e5" font-weight="700">🟡 Hasilkan Empedu</text>
    <text x="63" y="71" text-anchor="middle" font-size="8" fill="#818cf8">cerna lemak</text>
  </g>
  <g opacity="0"><animate attributeName="opacity" values="0;0;1;1;0;0" dur="3.6s" repeatCount="indefinite" begin="1.2s"/>
    <rect x="162" y="50" width="110" height="26" rx="10" fill="white" stroke="#a5b4fc" stroke-width="1.5" filter="url(#sh10)"/>
    <text x="217" y="61" text-anchor="middle" font-size="8" fill="#4f46e5" font-weight="700">🔴 Detoks Racun</text>
    <text x="217" y="71" text-anchor="middle" font-size="8" fill="#818cf8">bersihkan darah</text>
  </g>
  <g opacity="0"><animate attributeName="opacity" values="0;0;0;1;1;0" dur="3.6s" repeatCount="indefinite" begin="2.4s"/>
    <rect x="85" y="112" width="110" height="26" rx="10" fill="white" stroke="#a5b4fc" stroke-width="1.5" filter="url(#sh10)"/>
    <text x="140" y="123" text-anchor="middle" font-size="8" fill="#4f46e5" font-weight="700">🍬 Simpan Glikogen</text>
    <text x="140" y="134" text-anchor="middle" font-size="8" fill="#818cf8">cadangan energi</text>
  </g>
  <rect x="55" y="142" width="170" height="14" rx="7" fill="#6366f1" opacity="0.12"/>
  <text x="140" y="153" text-anchor="middle" font-size="9" fill="#4f46e5" font-weight="800">🫀 Hati — 500+ Fungsi Metabolisme</text>
</svg>` },
];

let quizState = null;

function showQuizPage(filter = 'Semua') {
  cancelAllGameTimers();
  if (!document.getElementById('quiz-container')) {
    const suffix = filter && filter !== 'Semua' ? ('?filter=' + encodeURIComponent(filter)) : '';
    navigateToUrl(PAGE_URLS['page-quiz'] + suffix);
    return;
  }
  const totalSoal = filter === 'Semua' ? QUIZ_QUESTIONS.length : QUIZ_QUESTIONS.filter(q => q.category === filter).length;
  const container = document.getElementById('quiz-container');
  const categories = ['Semua', 'Pencernaan', 'Pernapasan', 'Peredaran Darah', 'Ekskresi', 'Organ Tubuh'];

  container.innerHTML = `
    <div class="quiz-header">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
        <div>
          <div style="font-family:'Nunito',sans-serif;font-size:20px;font-weight:900;color:var(--gray-900);">📝 Kuis Pilihan Ganda</div>
          <div style="font-size:13px;color:var(--gray-500);font-weight:600;margin-top:2px;">${totalSoal} soal · Pilih kategori & mulai</div>
        </div>
      </div>
      <div class="quiz-filter-wrap">
        ${categories.map(c => `<button class="quiz-filter-chip${c===filter?' active':''}" onclick="showQuizPage('${c}')">${c==='Semua'?'🌐 Semua':c}</button>`).join('')}
      </div>
      <button onclick="startQuiz('${filter}')" style="width:100%;padding:15px;border-radius:14px;border:none;background:linear-gradient(135deg,#3B82F6,#6366F1);color:white;font-family:'Nunito',sans-serif;font-size:16px;font-weight:800;cursor:pointer;box-shadow:0 4px 16px rgba(59,130,246,0.3);transition:transform 0.18s,box-shadow 0.18s;margin-bottom:0;" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform=''">
        🚀 Mulai Kuis · 10 Soal Acak
      </button>
    </div>

    <div style="margin-top:20px;">
      <div style="font-size:12px;font-weight:800;color:var(--gray-500);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">Contoh soal</div>
      ${QUIZ_QUESTIONS.slice(0,3).map(q=>`
        <div class="quiz-review-item" style="opacity:0.6;pointer-events:none;">
          <div class="quiz-review-q">${q.category} · ${q.q}</div>
        </div>
      `).join('')}
      <div style="text-align:center;font-size:12px;color:var(--gray-500);font-weight:600;margin-top:8px;">... dan soal lainnya</div>
    </div>
  `;
  showPage('page-quiz');
}

function startQuiz(filter = 'Semua') {
  const pool = filter === 'Semua' ? [...QUIZ_QUESTIONS] : QUIZ_QUESTIONS.filter(q => q.category === filter);
  // Shuffle
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  quizState = {
    questions: pool,
    current: 0,
    score: 0,
    answers: [],
    filter,
    startTime: Date.now(),
    answered: false,
  };
  renderQuizQuestion();
}

function renderQuizQuestion() {
  if (!quizState) return;
  const { questions, current, score } = quizState;
  const total = questions.length;
  const q = questions[current];
  const pct = Math.round((current / total) * 100);
  const container = document.getElementById('quiz-container');

  container.innerHTML = `
    <div class="quiz-header">
      <div class="quiz-progress-wrap">
        <div class="quiz-progress-bar" style="width:${pct}%"></div>
      </div>
      <div class="quiz-meta-row">
        <span style="font-weight:800;color:var(--gray-700);">Soal ${current + 1} <span style="color:var(--gray-500);font-weight:600;">/ ${total}</span></span>
        <span>⭐ ${score} benar</span>
        <span class="quiz-timer-badge" id="quiz-timer-badge">⏱ 20s</span>
      </div>
    </div>

    <div class="quiz-question-card">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
        <span class="quiz-category-chip" style="background:${q.categoryBg};color:${q.categoryColor};margin-bottom:0;">${q.category}</span>
      </div>
      ${q.svg ? `<div style="background:${q.categoryBg};border-radius:16px;padding:8px;margin-bottom:14px;border:1.5px solid ${q.categoryColor}22;">${q.svg}</div>` : ''}
      <div class="quiz-question-text">${q.q}</div>
      <div class="quiz-options" id="quiz-options">
        ${q.options.map((opt, i) => `
          <button class="quiz-option" id="quiz-opt-${i}" onclick="selectQuizAnswer(${i})">
            <span class="quiz-option-key">${['A','B','C','D'][i]}</span>
            <span>${opt}</span>
          </button>
        `).join('')}
      </div>
      <div class="quiz-feedback-box" id="quiz-feedback"></div>
      <button class="quiz-next-btn" id="quiz-next-btn" onclick="nextQuizQuestion()">
        ${current + 1 < total ? 'Soal Berikutnya →' : '🏁 Lihat Hasil'}
      </button>
    </div>
  `;

  quizState.answered = false;
  startQuizTimer();
}

let quizTimerInterval = null;
function startQuizTimer() {
  if (quizTimerInterval) clearInterval(quizTimerInterval);
  let remaining = 20;
  const badge = document.getElementById('quiz-timer-badge');
  quizTimerInterval = setInterval(() => {
    remaining--;
    if (badge) {
      badge.textContent = '⏱ ' + remaining + 's';
      badge.className = 'quiz-timer-badge' + (remaining <= 5 ? ' danger' : remaining <= 10 ? ' warning' : '');
    }
    if (remaining <= 0) {
      clearInterval(quizTimerInterval);
      if (!quizState.answered) {
        // Waktu habis — otomatis tandai salah
        autoTimeOut();
      }
    }
  }, 1000);
}

function stopQuizTimer() {
  if (quizTimerInterval) { clearInterval(quizTimerInterval); quizTimerInterval = null; }
}

function autoTimeOut() {
  if (!quizState || quizState.answered) return;
  quizState.answered = true;
  const q = quizState.questions[quizState.current];
  quizState.answers.push({ questionId: q.id, chosen: -1, correct: q.answer, isCorrect: false, category: q.category });

  // Reveal correct
  const correctBtn = document.getElementById('quiz-opt-' + q.answer);
  if (correctBtn) correctBtn.classList.add('reveal-correct');
  document.querySelectorAll('.quiz-option').forEach(b => { b.disabled = true; });

  const fb = document.getElementById('quiz-feedback');
  if (fb) {
    fb.className = 'quiz-feedback-box wrong show';
    fb.innerHTML = `⏰ Waktu habis! Jawaban benar: <strong>${q.options[q.answer]}</strong><br><span style="font-size:12px;opacity:0.85;">${q.explanation}</span>`;
  }
  const nextBtn = document.getElementById('quiz-next-btn');
  if (nextBtn) nextBtn.classList.add('show');
  SFX.wrong();
}

function selectQuizAnswer(chosenIndex) {
  if (!quizState || quizState.answered) return;
  quizState.answered = true;
  stopQuizTimer();

  const q = quizState.questions[quizState.current];
  const isCorrect = chosenIndex === q.answer;

  if (isCorrect) quizState.score++;
  quizState.answers.push({ questionId: q.id, chosen: chosenIndex, correct: q.answer, isCorrect, category: q.category, q: q.q, chosenText: q.options[chosenIndex], correctText: q.options[q.answer] });

  // Styling pilihan
  document.querySelectorAll('.quiz-option').forEach((btn, i) => {
    btn.disabled = true;
    if (i === q.answer) btn.classList.add(isCorrect && i === chosenIndex ? 'correct' : 'reveal-correct');
    if (!isCorrect && i === chosenIndex) btn.classList.add('wrong');
  });

  // Feedback
  const fb = document.getElementById('quiz-feedback');
  if (fb) {
    fb.className = `quiz-feedback-box ${isCorrect ? 'correct' : 'wrong'} show`;
    fb.innerHTML = isCorrect
      ? `✅ <strong>Benar!</strong> ${q.explanation}`
      : `❌ <strong>Jawaban kamu: ${q.options[chosenIndex]}</strong><br>Jawaban benar: <strong>${q.options[q.answer]}</strong><br><span style="font-size:12px;opacity:0.85;">${q.explanation}</span>`;
  }

  const nextBtn = document.getElementById('quiz-next-btn');
  if (nextBtn) nextBtn.classList.add('show');

  if (isCorrect) SFX.correct(); else SFX.wrong();
}

function nextQuizQuestion() {
  if (!quizState) return;
  quizState.current++;
  if (quizState.current >= quizState.questions.length) {
    showQuizResult();
  } else {
    renderQuizQuestion();
  }
}

function showQuizResult() {
  stopQuizTimer();
  const { score, questions, answers, filter, startTime } = quizState;
  const total = questions.length;
  const pct = Math.round((score / total) * 100);
  const elapsed = Math.round((Date.now() - startTime) / 1000);
  const emoji = pct === 100 ? '🏆' : pct >= 80 ? '🌟' : pct >= 60 ? '👍' : '💪';
  const title = pct === 100 ? 'Sempurna!' : pct >= 80 ? 'Luar Biasa!' : pct >= 60 ? 'Bagus!' : 'Terus Semangat!';

  // Per-category breakdown
  const cats = {};
  answers.forEach(a => {
    if (!cats[a.category]) cats[a.category] = { correct: 0, total: 0 };
    cats[a.category].total++;
    if (a.isCorrect) cats[a.category].correct++;
  });

  const breakdownRows = Object.entries(cats).map(([cat, data]) => {
    const catPct = Math.round((data.correct / data.total) * 100);
    return `<div class="quiz-breakdown-row">
      <span>${cat}</span>
      <div class="quiz-breakdown-bar-wrap"><div class="quiz-breakdown-bar" style="width:${catPct}%"></div></div>
      <span class="quiz-breakdown-score">${data.correct}/${data.total}</span>
    </div>`;
  }).join('');

  // Review soal yang salah
  const wrongAnswers = answers.filter(a => !a.isCorrect);
  const reviewHtml = wrongAnswers.length > 0
    ? `<div style="margin-top:20px;">
        <div style="font-size:12px;font-weight:800;color:var(--gray-500);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:10px;">📋 Soal yang Salah (${wrongAnswers.length})</div>
        ${wrongAnswers.map(a => `
          <div class="quiz-review-item wrong">
            <div class="quiz-review-q">${a.q || ''}</div>
            <div class="quiz-review-answer quiz-review-wrong">✗ ${a.chosen === -1 ? 'Waktu habis' : 'Kamu: ' + (a.chosenText || '-')}</div>
            <div class="quiz-review-answer quiz-review-correct">✓ Benar: ${a.correctText || ''}</div>
          </div>
        `).join('')}
      </div>`
    : `<div style="text-align:center;padding:16px;color:#15803D;font-weight:700;font-size:14px;">🎉 Semua jawaban benar!</div>`;

  // Simpan skor kuis
  const quizScoreKey = 'quiz-' + filter.replace(/\s/g,'').toLowerCase();
  const prev = (() => { try { const d = localStorage.getItem('brainipa-scores'); return d ? JSON.parse(d) : {}; } catch(e){ return {}; } })();
  const prevScore = prev[quizScoreKey];
  const isNewBest = !prevScore || pct > prevScore.pct;
  if (isNewBest) {
    prev[quizScoreKey] = { score, total, pct, time: elapsed, date: new Date().toLocaleDateString('id-ID') };
    try { localStorage.setItem('brainipa-scores', JSON.stringify(prev)); } catch(e){}
  }

  const container = document.getElementById('quiz-container');
  container.innerHTML = `
    <div class="quiz-result-card">
      <div class="quiz-result-emoji">${emoji}</div>
      <div class="quiz-result-title">${title}</div>
      <div class="quiz-result-sub">${isNewBest && prevScore ? '🎉 Rekor baru!' : isNewBest ? '⭐ Skor pertamamu!' : `🏅 Best: ${prevScore ? prevScore.pct + '%' : '-'}`}</div>
      <div class="quiz-result-stats">
        <div class="quiz-result-stat">
          <div class="quiz-result-stat-val">${score}/${total}</div>
          <div class="quiz-result-stat-lbl">Benar</div>
        </div>
        <div class="quiz-result-stat">
          <div class="quiz-result-stat-val">${pct}%</div>
          <div class="quiz-result-stat-lbl">Akurasi</div>
        </div>
        <div class="quiz-result-stat">
          <div class="quiz-result-stat-val">${elapsed}s</div>
          <div class="quiz-result-stat-lbl">Waktu</div>
        </div>
      </div>
      <div class="quiz-breakdown">
        <div class="quiz-breakdown-title">Hasil Per Kategori</div>
        ${breakdownRows}
      </div>
      <button class="quiz-action-btn" onclick="startQuiz('${filter}')">🔄 Main Lagi</button>
      <button class="quiz-action-btn secondary" onclick="showQuizPage('${filter}')">← Pilih Kategori</button>
      <button class="quiz-action-btn secondary" onclick="showPage('page-game-menu')">🏠 Menu Utama</button>
    </div>
    ${reviewHtml}
  `;

  launchConfetti();
  SFX.complete();
  updateQuizMenuUI();
}

function updateQuizMenuUI() {
  const scores = getScores();
  const card = document.getElementById('gcard-quiz');
  const sub = document.getElementById('gsub-quiz');
  const badge = document.getElementById('gbadge-quiz');
  const quizKey = 'quiz-semua';
  const s = scores[quizKey];
  if (s && card) {
    card.classList.add('read');
    if (s.pct === 100) card.classList.add('perfect');
    if (sub) sub.textContent = s.pct === 100 ? '🏆 Sempurna!' : `⭐ ${s.pct}% · ${s.score}/${s.total}`;
    if (badge) { badge.style.opacity='1'; badge.style.transform='scale(1)'; badge.textContent = s.pct===100?'🏆 Sempurna':`⭐ ${s.pct}%`; badge.style.background = s.pct===100?'#22C55E':'#F59E0B'; }
  }
}

document.addEventListener('DOMContentLoaded', updateQuizMenuUI);

// Ripple effect pada semua tombol & kartu interaktif
function createRipple(e, el) {
  // Pastikan ada ripple-container
  let container = el.querySelector(':scope > .ripple-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'ripple-container';
    if (getComputedStyle(el).position === 'static') {
      el.style.position = 'relative';
    }
    el.style.overflow = 'hidden';
    el.insertBefore(container, el.firstChild);
  }

  const rect = el.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  const x = (e.clientX - rect.left) - size / 2;
  const y = (e.clientY - rect.top) - size / 2;

  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
  container.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}

// Flash brightness pada klik
function triggerClickFlash(el) {
  el.classList.remove('click-flash');
  void el.offsetWidth; // reflow
  el.classList.add('click-flash');
  el.addEventListener('animationend', () => el.classList.remove('click-flash'), { once: true });
}

// Bounce-in pada elemen yang baru muncul
function triggerBounceIn(el) {
  el.classList.remove('bounce-in');
  void el.offsetWidth;
  el.classList.add('bounce-in');
  el.addEventListener('animationend', () => el.classList.remove('bounce-in'), { once: true });
}

// Pasang ripple ke semua elemen interaktif
document.addEventListener('click', function(e) {
  const rippleTargets = [
    'button',
    '.btn-primary', '.btn-dev', '.btn-back', '.btn-play-proses',
    '.menu-card', '.organ-chip', '.game-label',
    '.organ-label-btn', '.tab-btn',
  ];

  const el = rippleTargets.reduce((found, sel) => {
    return found || e.target.closest(sel);
  }, null);

  if (el) {
    createRipple(e, el);
    triggerClickFlash(el);
  }
}, true);

// Bounce-in saat organ detail section muncul
const detailObserver = new MutationObserver(mutations => {
  mutations.forEach(m => {
    m.addedNodes.forEach(node => {
      if (node.nodeType === 1) {
        // Organ detail section
        const detail = node.id === 'organ-detail-section' ? node : node.querySelector && node.querySelector('#organ-detail-section');
        if (detail) triggerBounceIn(detail);
      }
    });
    // Attribute change: display berubah jadi block
    if (m.type === 'attributes' && m.attributeName === 'style') {
      const el = m.target;
      if ((el.id === 'organ-detail-section' || el.classList.contains('selected-info'))
          && el.style.display !== 'none') {
        triggerBounceIn(el);
      }
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  detailObserver.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['style'] });
});

// Menu card bounce-in ditangani di dalam showPage langsung

// Intercept selectOrgan untuk bounce-in detail panel
const origSelectOrgan = window.selectOrgan;
if (typeof origSelectOrgan === 'function') {
  window.selectOrgan = function(...args) {
    origSelectOrgan(...args);
    const detail = document.getElementById('organ-detail-section');
    if (detail) setTimeout(() => triggerBounceIn(detail), 50);
  };
}

// ============ STANDALONE PAGE INIT ============
function initStandalonePage() {
  _currentPage = document.body.dataset.pageId || _currentPage;

  document.querySelectorAll('.page').forEach(page => {
    page.classList.toggle('active', page.id === _currentPage);
  });

  const label = document.getElementById('page-debug-label');
  if (label && document.body.dataset.pageLabel) {
    label.textContent = document.body.dataset.pageLabel;
  }

  const materiKey = document.body.dataset.materiKey;
  if (materiKey) {
    showMateri(materiKey);
    return;
  }

  const quizFilter = new URLSearchParams(window.location.search).get('filter') || 'Semua';
  const initByPage = {
    'page-game-organ': showOrganGame,
    'page-game-pencernaan': showDigestiveGame,
    'page-game-pernapasan': showBreathingGame,
    'page-game-peredaran': showCirculationGame,
    'page-game-ekskresi': showExcretionGame,
    'page-quiz': () => showQuizPage(quizFilter),
  };

  if (initByPage[_currentPage]) {
    initByPage[_currentPage]();
  } else {
    updatePageDebugLabel(_currentPage);
  }

  if (_currentPage === 'page-menu' && sessionStorage.getItem('brainipa-play-menu-narration') === '1') {
    sessionStorage.removeItem('brainipa-play-menu-narration');
    setTimeout(() => playMenuNarration(true), 150);
  }

  if (_currentPage === 'page-game-menu') {
    setTimeout(armGameMenuNarrationAutoplay, 150);
  }
}

document.addEventListener('DOMContentLoaded', initStandalonePage);
