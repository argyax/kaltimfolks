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
            <h1 className={styles.header}>Our Contents</h1>
            <p>Yes, We made contents! Scroll down to see them!</p>
          </div>
        </div>
        <div className={styles["video-container"]}>
        <h2 className={styles.subtitle}><span className={styles.cps}>Stream in a </span> HEARTBEAT. <br/>
        KALTIMFOLKS. <span className={styles.cps}>Now on YOUTUBE</span></h2>
        <div class={styles["responsive-iframe"]}>
          <iframe 
            src="https://www.youtube.com/embed/zpvDsn-xTNQ?si=KYPpqF_zI6xNGwMP" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerpolicy="strict-origin-when-cross-origin" 
            allowfullscreen>
          </iframe>
        </div>

        <p className={styles.p}>
          In this exclusive sit-down, <b>Zara Adhisty</b> and <b>Abun Sungkar</b> let us in on all 
          the juicy details behind their new heart-tugging romantic drama, <em>Cinta Dalam Ikhlas.</em> From awkward first takes to off-screen laughs that brought their on-screen chemistry to life, this convo dives deep into the behind-the-scenes moments that made the magic happen.
        </p>
        <p className={styles.pyt}>
        Catch the magic on <b>KaltimFolks’</b> YouTube! Hit play, smash that like button, and subscribe to dive into a story that’ll leave a mark on your heart.
        </p>
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
        <h2 className={styles.subtitle}>KALTIMFOLKS. <span className={styles.cps}>AT CPS 2023</span></h2>
        <div className={styles["image-container"]}>
          <Image
            className={styles.img}
            src={"/cullinary event 1.jpg"}
            alt=""
            width={300}
            height={318}
          />
          <Image
            className={styles.img}
            src={"/cullinary event 2.jpg"}
            alt=""
            width={300}
            height={318}
          />
          <Image
            className={styles.img}
            src={"/cullinary event 3.jpg"}
            alt=""
            width={300}
            height={318}
          />
          <Image
            className={styles.img}
            src={"/cullinary event 4.jpg"}
            alt=""
            width={300}
            height={318}
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
