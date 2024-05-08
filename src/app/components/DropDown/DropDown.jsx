"use client"
import React from "react";
import { useState, useEffect } from "react";
import styles from "./dropDown.module.css";
import { Dropdown, DropdownToggle, DropdownItem, DropdownMenu } from "react-bootstrap";
import Link from "next/link";

const CustomDropdown = () => {
  const [open, setOpen] = useState(false);

  const [data, setData] = useState([]);

  const handleMouseEnter = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

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
    <Dropdown className={styles.dropdown} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <DropdownToggle variant="success" id="dropdown-basic" className={styles.button}>
        Categories
      </DropdownToggle>
      <DropdownMenu aria-label="News Categories" className={styles.menu}>
        <DropdownItem>
          {data?.map((item) => (
            <Link
              href={`/blog?cat=${item.slug}`}
              className={`${styles.categoryItem} ${styles[item.slug]}`}
              key={item._id}
            >
              {item.title}
            </Link>
          ))}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default CustomDropdown;
