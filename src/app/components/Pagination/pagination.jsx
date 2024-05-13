"use client";
import React from "react";
import styles from "./pagination.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ count }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const page = parseInt(searchParams.get("page")) || 1;

  const POST_PER_PAGE = 5;

  const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  const hasNext = POST_PER_PAGE * page < count;

  const handleChangePage = (pageNumber) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", pageNumber);
    replace(`${pathname}?${newParams}`);
  };

  const renderPageNumbers = () => {
    const totalPages = Math.ceil(count / POST_PER_PAGE);
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`${styles.button} ${page === i ? styles.active : ""}`}
          onClick={() => handleChangePage(i)}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => handleChangePage(page - 1)}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        className={styles.button}
        disabled={!hasNext}
        onClick={() => handleChangePage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
