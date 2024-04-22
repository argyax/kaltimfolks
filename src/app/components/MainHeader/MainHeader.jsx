"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./mainHeader.module.css"
import Image from "next/image"

function MainHeader() {
  const [currentSlide, setCurrentSlide] = useState(0);
  var settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    dots: true,
    fade: true,
    waitForAnimate: false,
    customPaging: (i) => (
      <div
        style={{
          width: "40px",
          height: "3px",
          backgroundColor: currentSlide === i ? "black" : "white",
          border: currentSlide === i ? "1px black solid" : "white",
          position: "absolute",
          bottom: "50px",
          borderRadius: "5px", // Menambahkan borderRadius
          left: `${i * 15}px`, // Posisi kustom berdasarkan indeks
        }}
      >
        {/* Hapus angka */}
      </div>
    ),
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className={styles.container}>
          <Image
            className={styles.backgroundImage}
            width= {100}
            height= {100}
            src="/mahakam.png"
            alt="mahakam.png"
          />
          <div className={styles.content}>
            <p>Sabtu 02 Januari 2024</p>
            <h1 className={styles.header}>
              Kondisi Jalan Jembatan Mahakam Pasca Tahun Baru
            </h1>
          </div>
        </div>
        <div className={styles.container}>
          <Image
            className={styles.backgroundImage}
            width= {100}
            height= {100}
            src="/mahakam.png"
            alt="mahakam.png"
          />
          <div className={styles.content}>
            <p>Sabtu 03 Januari 2024</p>
            <h1 className={styles.header}>
              Kondisi Jalan Jembatan Mahakam Pasca Tahun Baru
            </h1>
          </div>
        </div>
        <div className={styles.container}>
          <Image
            className={styles.backgroundImage}
            width= {100}
            height= {100}
            src="/mahakam.png"
            alt="mahakam.png"
          />
          <div className={styles.content}>
            <p>Sabtu 04 Januari 2024</p>
            <h1 className={styles.header}>
              Kondisi Jalan Jembatan Mahakam Pasca Tahun Baru
            </h1>
          </div>
        </div>
        <div className={styles.container}>
          <Image
            className={styles.backgroundImage}
            width= {100}
            height= {100}
            src="/mahakam.png"
            alt="mahakam.png"
          />
          <div className={styles.content}>
            <p>Sabtu 05 Januari 2024</p>
            <h1 className={styles.header}>
              Kondisi Jalan Jembatan Mahakam Pasca Tahun Baru
            </h1>
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default MainHeader;
