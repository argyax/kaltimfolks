import React from 'react'
import styles from "./card.module.css"
import Image from 'next/image'
import Link from 'next/link'

const Card = () => {
  return (
    <div className={styles.container}>
        <div className={styles.imageContainer}>
         <Image
            src="/p1.jpeg"
            alt=""
            fill
            className={styles.image}
         />
         <div className={styles.detail}>
            <span className={styles.category}>Culture</span>
         </div>
        </div>
        <div className={styles.textContainer}>
         <div className={styles.detail}>
            <span className={styles.date}>31.01.2024</span>
         </div>
         <Link href="/">
            <h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</h1>
         </Link>
         <p className={styles.desc}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
            Ipsam similique repellat distinctio non magnam reiciendis 
            odio hic provident deleniti tempore eum quod ullam, et sint 
            fuga, enim dolorem, repudiandae mollitia?
         </p>
         <Link href="/" className={styles.link}> Read More</Link>
        </div>
    </div>
  )
}

export default Card