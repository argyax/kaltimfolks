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
        key={i}
        style={{
          width: "40px",
          height: "3px",
          backgroundColor: currentSlide === i ? "black" : "white",
          outline: currentSlide === i ? "1px rgb(255 255 255 / 0.3) solid" : "rgb(0 0 0 / 0.3)",
          position: "absolute",
          bottom: "50px",
          display: "flex",
          justifyContent: "center",
          left: "50%",
          transform: `translateX(-105%)`,
          marginLeft: `${i * 15}px`, // Adjust margin-left instead of left
          borderRadius: "5px", // Add borderRadius
        }}
      />
    ),
    beforeChange: (oldIndex, newIndex) => {
      setCurrentSlide(newIndex);
    },
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <div className={styles.container}>
      <Slider {...settings}>
        {props.headerContent?.map((item) => (
          <div key={item.slug} >
            <Link href={`/posts/${item.slug}`} className={styles.link} draggable="false">
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
                  <p className={styles.date}> {formatDate(item.createdAt)}</p>
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
