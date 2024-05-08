import styles from "./aboutUsPage.module.css";
import Image from "next/image";
import ContactForm from "../components/ContactForm/contactForm";

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles["hero-container"]}>
        <div className={styles["bg-cover"]}></div>
        <div className={styles["text-heading"]}>
          <h1>About Us</h1>
          <p>
            KALTIMFOLKS is a digital media company that focuses on disseminating
            information about news, arts, culture, social issues, economy, and
            brands or creative culture originating from East Kalimantan.
            KALTIMFOLKS also provides up-to-date information from both local and
            international sources.
          </p>
        </div>
      </div>
      <div className={styles.content}>
        <Image
          className={styles.img}
          src={"/borneo.png"}
          alt=""
          width={128}
          height={128}
        />
        <h2>Our Vision</h2>
        <p>
          We strive to be East Kalimantan&#39;s top online media, representing
          the future of our culture and connecting communities.
        </p>
      </div>
      <div className={styles.content}>
        <h2>Our Mission</h2>
        <p>
          KALTIMFOLKS can provide a variety of high-quality content and can
          collaborate and synergize with creative talents so that the digital
          ecosystem and community can develop widely and sustainably in East
          Kalimantan.
        </p>
      </div>
      <ContactForm/>
    </div>
  );
};

export default AboutPage;
