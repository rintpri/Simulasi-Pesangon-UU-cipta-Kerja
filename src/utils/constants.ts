import { PhkReason } from '../types/pesangon';

export const PHK_REASONS: PhkReason[] = [
  // 1. Penggabungan / Peleburan / Pengambilalihan / Pemisahan
  {
    id: 'merger_akuisisi_pemisahan',
    label: 'Penggabungan, Peleburan, Pengambilalihan, atau Pemisahan Perusahaan',
    category: 'peleburan',
    pesangonMultiplier: 1.0,
    upmkMultiplier: 1.0,
    hasUph: true,
    hasUangPisah: false,
    article: 'Pasal 41 & Pasal 42 PP No. 35/2021',
    description: 'Perusahaan melakukan penggabungan, peleburan, pengambilalihan, atau pemisahan perusahaan dan pekerja/buruh tidak bersedia melanjutkan hubungan kerja atau pengusaha tidak bersedia menerima pekerja/buruh.',
    fullText: 'Perusahaan melakukan penggabungan, peleburan, pengambilalihan, atau pemisahan perusahaan dan pekerja/buruh tidak bersedia melanjutkan hubungan kerja atau pengusaha tidak bersedia menerima pekerja/buruh.',
  },

  // 2. Efisiensi karena kerugian
  {
    id: 'efisiensi_rugi',
    label: 'Efisiensi Disebabkan Perusahaan Mengalami Kerugian',
    category: 'efisiensi',
    pesangonMultiplier: 0.5,
    upmkMultiplier: 1.0,
    hasUph: true,
    hasUangPisah: false,
    article: 'Pasal 43 ayat (1) PP No. 35/2021',
    description: 'Perusahaan melakukan efisiensi diikuti dengan penutupan perusahaan atau tidak diikuti dengan penutupan perusahaan yang disebabkan perusahaan mengalami kerugian.',
    fullText: 'Perusahaan melakukan efisiensi diikuti dengan penutupan perusahaan atau tidak diikuti dengan penutupan perusahaan yang disebabkan perusahaan mengalami kerugian.',
  },

  // 2b. Efisiensi untuk mencegah kerugian
  {
    id: 'efisiensi_cegah_rugi',
    label: 'Efisiensi untuk Mencegah Terjadinya Kerugian',
    category: 'efisiensi',
    pesangonMultiplier: 1.0,
    upmkMultiplier: 1.0,
    hasUph: true,
    hasUangPisah: false,
    article: 'Pasal 43 ayat (2) PP No. 35/2021',
    description: 'Perusahaan melakukan efisiensi yang tidak diikuti dengan penutupan perusahaan untuk mencegah terjadinya kerugian.',
    fullText: 'Perusahaan melakukan efisiensi yang tidak diikuti dengan penutupan perusahaan yang disebabkan bukan karena perusahaan mengalami kerugian tetapi untuk mencegah terjadinya kerugian.',
  },

  // 3. Perusahaan tutup karena rugi 2 tahun berturut-turut
  {
    id: 'tutup_rugi_2_tahun',
    label: 'Perusahaan Tutup karena Mengalami Kerugian 2 Tahun Berturut-turut',
    category: 'tutup',
    pesangonMultiplier: 0.5,
    upmkMultiplier: 1.0,
    hasUph: true,
    hasUangPisah: false,
    article: 'Pasal 44 ayat (1) PP No. 35/2021',
    description: 'Perusahaan tutup yang disebabkan karena perusahaan mengalami kerugian secara terus menerus selama 2 (dua) tahun atau rugi tidak secara terus menerus selama 2 tahun.',
    fullText: 'Perusahaan tutup yang disebabkan karena perusahaan mengalami kerugian secara terus menerus selama 2 (dua) tahun.',
  },

  // 3b. Perusahaan tutup bukan karena rugi
  {
    id: 'tutup_bukan_rugi',
    label: 'Perusahaan Tutup Bukan karena Mengalami Kerugian',
    category: 'tutup',
    pesangonMultiplier: 1.0,
    upmkMultiplier: 1.0,
    hasUph: true,
    hasUangPisah: false,
    article: 'Pasal 44 ayat (2) PP No. 35/2021',
    description: 'Perusahaan tutup yang disebabkan bukan karena mengalami kerugian.',
    fullText: 'Perusahaan tutup yang disebabkan bukan karena perusahaan mengalami kerugian.',
  },

  // 4. Perusahaan tutup karena force majeure
  {
    id: 'tutup_force_majeure',
    label: 'Perusahaan Tutup Disebabkan Keadaan Memaksa (Force Majeure)',
    category: 'tutup',
    pesangonMultiplier: 0.5,
    upmkMultiplier: 1.0,
    hasUph: true,
    hasUangPisah: false,
    article: 'Pasal 45 ayat (1) PP No. 35/2021',
    description: 'Perusahaan tutup yang disebabkan keadaan memaksa (force majeure).',
    fullText: 'Perusahaan tutup yang disebabkan keadaan memaksa (force majeure).',
  },

  // 4b. Keadaan memaksa (force majeure) yang tidak mengakibatkan perusahaan tutup
  {
    id: 'force_majeure_tidak_tutup',
    label: 'Keadaan Memaksa (Force Majeure) Tidak Mengakibatkan Perusahaan Tutup',
    category: 'tutup',
    pesangonMultiplier: 0.75,
    upmkMultiplier: 1.0,
    hasUph: true,
    hasUangPisah: false,
    article: 'Pasal 45 ayat (2) PP No. 35/2021',
    description: 'Keadaan memaksa (force majeure) yang tidak mengakibatkan perusahaan tutup.',
    fullText: 'Keadaan memaksa (force majeure) yang tidak mengakibatkan perusahaan tutup.',
  },

  // 5. Perusahaan dalam keadaan PKPU
  {
    id: 'pkpu_rugi',
    label: 'Perusahaan dalam Keadaan Penundaan Kewajiban Pembayaran Utang (PKPU) karena Rugi',
    category: 'tutup',
    pesangonMultiplier: 0.5,
    upmkMultiplier: 1.0,
    hasUph: true,
    hasUangPisah: false,
    article: 'Pasal 46 ayat (1) PP No. 35/2021',
    description: 'Perusahaan dalam keadaan penundaan kewajiban pembayaran utang (PKPU) yang disebabkan perusahaan mengalami kerugian.',
    fullText: 'Perusahaan dalam keadaan penundaan kewajiban pembayaran utang yang disebabkan karena perusahaan mengalami kerugian.',
  },
  {
    id: 'pkpu_bukan_rugi',
    label: 'Perusahaan dalam Keadaan Penundaan Kewajiban Pembayaran Utang (PKPU) bukan karena Rugi',
    category: 'tutup',
    pesangonMultiplier: 1.0,
    upmkMultiplier: 1.0,
    hasUph: true,
    hasUangPisah: false,
    article: 'Pasal 46 ayat (2) PP No. 35/2021',
    description: 'Perusahaan dalam keadaan penundaan kewajiban pembayaran utang (PKPU) bukan karena perusahaan mengalami kerugian.',
    fullText: 'Perusahaan dalam keadaan penundaan kewajiban pembayaran utang bukan karena perusahaan mengalami kerugian.',
  },

  // 6. Perusahaan pailit
  {
    id: 'pailit',
    label: 'Perusahaan Pailit',
    category: 'tutup',
    pesangonMultiplier: 0.5,
    upmkMultiplier: 1.0,
    hasUph: true,
    hasUangPisah: false,
    article: 'Pasal 47 PP No. 35/2021',
    description: 'Perusahaan dinyatakan pailit berdasarkan putusan pengadilan niaga.',
    fullText: 'Perusahaan pailit.',
  },

  // 7. Permohonan PHK oleh pekerja karena perbuatan pengusaha (Pasal 36 huruf g)
  {
    id: 'permohonan_pekerja_pelanggaran_pengusaha',
    label: 'Permohonan PHK oleh Pekerja karena Pengusaha Melakukan Perbuatan Melanggar',
    category: 'permohonan',
    pesangonMultiplier: 1.0,
    upmkMultiplier: 1.0,
    hasUph: true,
    hasUangPisah: false,
    article: 'Pasal 48 jo. Pasal 36 huruf g PP No. 35/2021',
    description: 'Adanya permohonan PHK yang diajukan oleh pekerja/buruh dengan alasan pengusaha melakukan perbuatan pelanggaran ketentuan.',
    fullText: 'Adanya permohonan PHK yang diajukan oleh pekerja/buruh dengan alasan pengusaha melakukan perbuatan sebagai berikut:',
    subPoints: [
      'Menganiaya, menghina secara kasar atau mengancam pekerja/buruh;',
      'Membujuk dan/atau menyuruh pekerja/buruh untuk melakukan perbuatan yang bertentangan dengan peraturan perundang-undangan;',
      'Tidak membayar upah tepat pada waktu yang telah ditentukan selama 3 (tiga) bulan berturut-turut atau lebih, meskipun pengusaha membayar upah secara tepat waktu sesudah itu;',
      'Tidak melakukan kewajiban yang telah dijanjikan kepada pekerja/buruh;',
      'Memerintahkan pekerja/buruh untuk melaksanakan pekerjaan di luar yang diperjanjikan; atau',
      'Memberikan pekerjaan yang membahayakan jiwa, keselamatan, kesehatan, dan kesusilaan pekerja/buruh sedangkan pekerjaan tersebut tidak dicantumkan pada perjanjian kerja.',
    ],
  },

  // 8. Putusan PHI menyatakan pengusaha tidak bersalah
  {
    id: 'putusan_phi_pengusaha_tidak_salah',
    label: 'Putusan PHI Menyatakan Pengusaha Tidak Melakukan Pelanggaran (Permohonan Ditolak)',
    category: 'permohonan',
    pesangonMultiplier: 0.5,
    upmkMultiplier: 1.0,
    hasUph: true,
    hasUangPisah: false,
    article: 'Pasal 49 PP No. 35/2021',
    description: 'Putusan lembaga penyelesaian perselisihan hubungan industrial yang menyatakan pengusaha tidak melakukan perbuatan sebagaimana dimaksud Pasal 36 huruf g dan pengusaha memutuskan PHK.',
    fullText: 'Adanya putusan lembaga penyelesaian perselisihan hubungan industrial yang menyatakan pengusaha tidak melakukan perbuatan sebagaimana dimaksud pada huruf g terhadap permohonan yang diajukan oleh pekerja/buruh dan pengusaha memutuskan untuk melakukan PHK.',
  },

  // 9. Resign / Mengundurkan Diri Sukarela
  {
    id: 'resign',
    label: 'Pekerja/Buruh Mengundurkan Diri atas Kemauan Sendiri (Resign Memenuhi Syarat)',
    category: 'pribadi',
    pesangonMultiplier: 0,
    upmkMultiplier: 0,
    hasUph: true,
    hasUangPisah: true,
    article: 'Pasal 50 PP No. 35/2021',
    description: 'Pekerja/buruh mengundurkan diri atas kemauan sendiri dan memenuhi persyaratan yang ditentukan.',
    fullText: 'Pekerja/buruh mengundurkan diri atas kemauan sendiri dan harus memenuhi syarat:',
    subPoints: [
      'Mengajukan permohonan pengunduran diri secara tertulis selambat-lambatnya 30 (tiga puluh) hari sebelum tanggal mulai pengunduran diri;',
      'Tidak terikat dalam ikatan dinas; dan',
      'Tetap melaksanakan kewajibannya sampai tanggal mulai pengunduran diri.',
    ],
  },

  // 10. Pekerja mangkir
  {
    id: 'mangkir',
    label: 'Pekerja/Buruh Mangkir 5 Hari Kerja Berturut-turut atau Lebih',
    category: 'pelanggaran',
    pesangonMultiplier: 0,
    upmkMultiplier: 0,
    hasUph: true,
    hasUangPisah: true,
    article: 'Pasal 51 PP No. 35/2021',
    description: 'Pekerja/buruh mangkir selama 5 hari kerja atau lebih berturut-turut tanpa keterangan tertulis sah dan telah dipanggil patut 2 kali.',
    fullText: 'Pekerja/buruh mangkir selama 5 (lima) hari kerja atau lebih berturut-turut tanpa keterangan secara tertulis yang dilengkapi dengan bukti yang sah dan telah dipanggil oleh pengusaha 2 (dua) kali secara patut dan tertulis.',
  },

  // 11. Pelanggaran setelah SP1, SP2, SP3
  {
    id: 'pelanggaran_sp',
    label: 'Pekerja/Buruh Melanggar Ketentuan PK/PP/PKB Setelah SP1, SP2, SP3',
    category: 'pelanggaran',
    pesangonMultiplier: 0.5,
    upmkMultiplier: 1.0,
    hasUph: true,
    hasUangPisah: false,
    article: 'Pasal 52 ayat (1) PP No. 35/2021',
    description: 'Pekerja/buruh melakukan pelanggaran ketentuan perjanjian kerja, peraturan perusahaan, atau PKB setelah diberi SP bertahap.',
    fullText: 'Pekerja/buruh melakukan pelanggaran ketentuan yang diatur dalam perjanjian kerja, peraturan perusahaan, atau perjanjian kerja bersama dan sebelumnya telah diberikan surat peringatan pertama, kedua, dan ketiga secara berturut-turut masing-masing berlaku untuk paling lama 6 (enam) bulan kecuali ditetapkan lain dalam perjanjian kerja, peraturan perusahaan, atau perjanjian kerja bersama.',
  },

  // 11b. Pelanggaran bersifat mendesak (Pelanggaran berat)
  {
    id: 'pelanggaran_mendesak',
    label: 'Pekerja/Buruh Melakukan Pelanggaran Bersifat Mendesak (Pelanggaran Berat)',
    category: 'pelanggaran',
    pesangonMultiplier: 0,
    upmkMultiplier: 0,
    hasUph: true,
    hasUangPisah: true,
    article: 'Pasal 52 ayat (2) PP No. 35/2021',
    description: 'Pekerja/buruh melakukan pelanggaran bersifat mendesak yang diatur dalam perjanjian kerja, PP, atau PKB.',
    fullText: 'Pekerja/buruh melakukan pelanggaran bersifat mendesak yang diatur dalam Perjanjian Kerja, Peraturan Perusahaan, atau Perjanjian Kerja Bersama.',
  },

  // 12. Ditahan pihak berwajib 6 bulan
  {
    id: 'ditahan_berwajib_6_bulan',
    label: 'Pekerja/Buruh Tidak Dapat Bekerja Selama 6 Bulan Akibat Ditahan Pihak Berwajib',
    category: 'pelanggaran',
    pesangonMultiplier: 0,
    upmkMultiplier: 1.0,
    hasUph: true,
    hasUangPisah: false,
    article: 'Pasal 54 ayat (1) & (2) PP No. 35/2021',
    description: 'Pekerja/buruh tidak dapat bekerja 6 bulan karena ditahan pihak berwajib dugaan pidana. Berhak atas UPMK 1x dan UPH.',
    fullText: 'Pekerja/buruh tidak dapat melakukan pekerjaan selama 6 (enam) bulan akibat ditahan pihak yang berwajib karena diduga melakukan tindak pidana.',
  },

  // 13. Sakit berkepanjangan > 12 bulan / Cacat akibat kerja
  {
    id: 'sakit_berkepanjangan',
    label: 'Pekerja Mengalami Sakit Berkepanjangan / Cacat Akibat Kerja > 12 Bulan',
    category: 'pribadi',
    pesangonMultiplier: 2.0,
    upmkMultiplier: 1.0,
    hasUph: true,
    hasUangPisah: false,
    article: 'Pasal 55 PP No. 35/2021',
    description: 'Pekerja/buruh mengalami sakit berkepanjangan atau cacat akibat kecelakaan kerja dan tidak dapat bekerja setelah melampaui batas 12 bulan.',
    fullText: 'Pekerja/buruh mengalami sakit berkepanjangan atau cacat akibat kecelakaan kerja dan tidak dapat melakukan pekerjaannya setelah melampaui batas 12 (dua belas) bulan.',
  },

  // 14. Pensiun
  {
    id: 'pensiun',
    label: 'Pekerja/Buruh Memasuki Usia Pensiun',
    category: 'pribadi',
    pesangonMultiplier: 1.75,
    upmkMultiplier: 1.0,
    hasUph: true,
    hasUangPisah: false,
    article: 'Pasal 56 PP No. 35/2021',
    description: 'Pekerja/buruh memasuki batas usia pensiun sesuai ketentuan PK, PP, atau PKB.',
    fullText: 'Pekerja/buruh memasuki usia pensiun.',
  },

  // 15. Meninggal dunia
  {
    id: 'meninggal_dunia',
    label: 'Pekerja/Buruh Meninggal Dunia (Hak Diberikan ke Ahli Waris)',
    category: 'pribadi',
    pesangonMultiplier: 2.0,
    upmkMultiplier: 1.0,
    hasUph: true,
    hasUangPisah: false,
    article: 'Pasal 57 PP No. 35/2021',
    description: 'Pekerja/buruh meninggal dunia. Hak pesangon diberikan kepada ahli warisnya.',
    fullText: 'Pekerja/buruh meninggal dunia.',
  },
];
