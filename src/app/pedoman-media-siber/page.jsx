import styles from "./pedoman.module.css";

const OurContentPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>

        {/* HERO */}
        <div className={styles["hero-container"]}>
          <div className={styles["bg-cover"]}></div>
          <div className={styles["text-heading"]}>
            <h1 className={styles.header}>Pedoman Media Siber</h1>
            <p>Standar dan prinsip pengelolaan media siber di Indonesia</p>
          </div>
        </div>

        {/* CONTENT */}
        <div className={styles.policyContainer}>

          <h2>Landasan Dasar</h2>
          <p>
            Kemerdekaan dalam berpendapat, berekspresi, serta kebebasan pers merupakan hak fundamental setiap manusia.
            Hak ini dijamin oleh Pancasila, UUD 1945, dan Deklarasi Universal HAM PBB.
            Media siber di Indonesia hadir sebagai perwujudan dari kemerdekaan tersebut.
          </p>

          <p>
            Mengingat karakteristiknya yang unik, media siber memerlukan acuan khusus agar pengelolaannya tetap profesional
            dan memenuhi fungsi serta kewajibannya sesuai UU No. 40 Tahun 1999 tentang Pers dan Kode Etik Jurnalistik.
          </p>

          <h3>1. Batasan dan Ruang Lingkup</h3>
          <p><b>Media Siber:</b> Segala bentuk media berbasis internet yang menjalankan aktivitas jurnalistik serta patuh pada UU Pers dan standar Dewan Pers.</p>
          <p><b>UGC:</b> Konten yang dibuat pengguna seperti komentar, forum, atau blog.</p>

          <h3>2. Protokol Verifikasi dan Keseimbangan Berita</h3>
          <p>Setiap berita wajib diverifikasi untuk menjaga akurasi dan keberimbangan.</p>
          <ul>
            <li>Bersifat mendesak untuk publik</li>
            <li>Sumber jelas dan kredibel</li>
            <li>Subjek belum dapat dikonfirmasi</li>
            <li>Disertai catatan bahwa berita masih diverifikasi</li>
          </ul>

          <h3>3. Pengaturan Konten Pengguna (UGC)</h3>
          <ul>
            <li>Wajib registrasi</li>
            <li>Dilarang hoaks, fitnah, SARA, kekerasan</li>
            <li>Redaksi berhak edit/hapus</li>
            <li>Ada fitur laporan (maks 2x24 jam)</li>
          </ul>

          <h3>4. Ralat, Koreksi, dan Hak Jawab</h3>
          <ul>
            <li>Harus sesuai UU Pers</li>
            <li>Ditautkan ke berita asli</li>
            <li>Media pengutip wajib ikut koreksi</li>
            <li>Denda maksimal Rp500 juta jika melanggar</li>
          </ul>

          <h3>5. Pencabutan Berita</h3>
          <p>
            Tidak boleh dihapus karena tekanan. Hanya boleh jika terkait SARA, asusila, perlindungan anak,
            trauma korban, atau instruksi Dewan Pers.
          </p>

          <h3>6. Transparansi Iklan</h3>
          <p>
            Konten komersial harus jelas dibedakan dengan label seperti “Iklan” atau “Advertorial”.
          </p>

          <h3>7. Hak Kekayaan Intelektual</h3>
          <p>Media wajib menghormati hak cipta sesuai hukum Indonesia.</p>

          <h3>8. Publikasi Pedoman</h3>
          <p>Pedoman ini wajib ditampilkan di situs agar mudah diakses publik.</p>

          <h3>9. Penyelesaian Sengketa</h3>
          <p>Keputusan akhir berada di Dewan Pers.</p>

        </div>
      </div>
    </div>
  );
};

export default OurContentPage;