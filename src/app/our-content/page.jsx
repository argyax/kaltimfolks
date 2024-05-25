import styles from "./ourContentPage.module.css";
import Image from "next/image";
import ContentItem from "../components/ContentItem/ContentItem";
import ContactForm from "../components/ContactForm/contactForm";

const OurContentPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles["hero-container"]}>
          <div className={styles["bg-cover"]}></div>
          <div className={styles["text-heading"]}>
            <h1>Our Contents</h1>
            <p>Yes, We made contents! Scroll down to see them!</p>
          </div>
        </div>
        <ContentItem
          srcImg="/kaltim-img.jpg"
          title="KALTIMFOLKS"
          description="A place for you to explore the creative culture of East Kalimantan and Indonesians, uploaded on the KALTIMFOLKS instagram account."
          direction="row"
        />
        <ContentItem
          srcImg="/ktt-img.jpg"
          title="KTT"
          description="KTT (KALTIMFOLKS Tanya-Tanya) is a program from kaltimfolks in the form of video content interviewing several questions to people uploaded on the KALTIMFOLKS tiktok account."
          direction="row-reverse"
        />
        <ContentItem
          srcImg="/gwk-img.jpg"
          title="GWK"
          description="GWK (Games With KALTIMFOLKS) is a KALTIMFOLKS program that contains game Q&A content and some other interesting game content."
          direction="row"
        />
      </div>
      <div className={styles["cps-container"]}>
        <h2 className={styles.h2}>KALTIMFOLKS. AT CPS 2023</h2>
        <div className={styles["image-container"]}>
          <Image
            className={styles.img}
            src={"/cullinary event 1.jpg"}
            alt=""
            width={270}
            height={298}
          />
          <Image
            className={styles.img}
            src={"/cullinary event 2.jpg"}
            alt=""
            width={270}
            height={298}
          />
          <Image
            className={styles.img}
            src={"/cullinary event 3.jpg"}
            alt=""
            width={270}
            height={298}
          />
          <Image
            className={styles.img}
            src={"/cullinary event 4.jpg"}
            alt=""
            width={270}
            height={298}
          />
        </div>
        <p className={styles.p}>
          In 2023 KALTIMFOLKS collaborated with the biggest cullinary event in
          the city of Samarinda, namely Cullinary Play Land Samarinda 2023.
          KALTIMFOLKS opened a booth and has done several activations for
          visitors at the event. 27 November - 03 December 2023.
        </p>
      </div>
      <ContactForm />
    </div>
  );
};

export default OurContentPage;
