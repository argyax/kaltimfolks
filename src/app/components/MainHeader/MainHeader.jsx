"use client";
import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./mainHeader.module.css";
import Image from "next/image";
import Link from "next/link";

function MainHeader(props) {
  const [currentSlide, setCurrentSlide] = useState(0);
  var settings = {
    dots: true,
    infinite: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 4000,
    cssEase: "ease-in-out",
    customPaging: (i) => (
      <div
        style={{
          width: "40px",
          height: "3px",
          backgroundColor: currentSlide === i ? "black" : "white",
          outline: currentSlide === i ? "1px rgb(255 255 255 / 0.3) solid" : "rgb(0 0 0 / 0.3)",
          position: "absolute",
          bottom: "50px",
          borderRadius: "5px", // Menambahkan borderRadius
          left: `${i * 15}px`,
          right: "0",
          margin: "auto",
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
          <div key={item.slug} >
            <Link href={`/posts/${item.slug}`}>
              <div className={styles.container}>
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
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default MainHeader;
