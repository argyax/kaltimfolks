import styles from "./redaksiPage.module.css";

const RedaksiPage = () => {
  return (
    <div className={styles.container}>

      {/* HERO */}
      <div className={styles.hero}>
        <h1>Susunan Redaksi</h1>
        <p>KALTIMFOLKS</p>
      </div>

      {/* CARD */}
      <div className={styles.card}>

        {/* <div className={styles.section}>
          <h3>Direktur</h3>
          <p className={styles.text}>G. Dasilvo</p>
        </div>

        <div className={styles.section}>
          <h3>Pimpinan Redaksi</h3>
          <p className={styles.text}>
            Andi Wibowo <br />
            <span className={styles.meta}>
              7157 PWI/WU/DP/XI/2023/06/11/83
            </span>
          </p>
        </div> */}

        <div className={styles.section}>
          <h3>Wartawan</h3>
          <p className={styles.text}>Okta (Samarinda)</p>
        </div>

        <div className={styles.section}>
          <h3>Editor</h3>
          <p className={styles.text}>Iki (Samarinda)</p>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.section}>
          <h3>Kontak</h3>
          <p className={styles.contact}>Telepon: 085183013746</p>
          <p className={styles.contact}>Email: info@kaltimfolks.id</p>
        </div>

      </div>
    </div>
  );
};

export default RedaksiPage;