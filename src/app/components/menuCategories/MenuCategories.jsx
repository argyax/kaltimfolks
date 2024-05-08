"use client"
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import styles from "./menuCategories.module.css";

const MenuCategories = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/categories", {
          cache: "reload",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        const jsonData = await res.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [])
  return (
    <div className={styles.categoryList}>
          {data.map((item) => (
            <Link
              href={`/blog?cat=${item.slug}`}
              className={`${styles.categoryItem} ${styles[item.slug]}`}
              key={item._id}
            >
              {item.title}
            </Link>
          ))}
    </div>
  );
};

export default MenuCategories;