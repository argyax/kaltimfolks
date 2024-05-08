"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./mainHeader.module.css";
import Image from "next/image";

function MainHeader(props) {
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
    autoplay: true,
    speed: 5000,
    autoplaySpeed: 5000,
    cssEase: "linear",
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
        {props.headerContent?.map((item) => (
          <div key={item.slug} className={styles.container}>
            <div className={styles.overlay}></div>
            <Image
              className={styles.backgroundImage}
              width={1500}
              height={1500}
              src={item.img}
              alt={item.slug}
            />
            <div className={styles.content}>
              <p> {item.createdAt?.toString().slice(4, 16)}</p>
              {/* <h2>{item.createdAt?.toDateString()}</h2> */}
              {/* <p>{item.createdAt?.toString().substring(0, 10)} </p> */}
              {/* <span className={styles.date}>{item.createdAt}</span> */}
              <h1 className={styles.header}>{item.title}</h1>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default MainHeader;
