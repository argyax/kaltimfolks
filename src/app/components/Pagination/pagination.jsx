"use client";
import React from "react";
import styles from "./pagination.module.css";
import { useRouter } from "next/navigation";

const Pagination = ({ page, hasPrev, hasNext, pageNum }) => {
  const router = useRouter();

  const goToPage = (pageNum) => {
    router.push(`?page=${pageNum}`);
  };

  const renderPageNumbers = () => {
    const page = searchParams.get("page") || 1;

    const pageNumbers = [];
    const totalPages = 5; // Total number of pages to display
    const visiblePages = 5; // Number of pages visible at a time

    if (totalPages <= visiblePages) {
      // If total pages are less than or equal to visible pages, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <span
            key={i}
            className={`${styles.pageNumber} ${page === i ? styles.activePage : ""
              }`}
            disabled={!pageNum}
            onClick={() => goToPage(i)}
          >
            {i}
          </span>
        );
      }
    } else {
      // If total pages are more than visible pages, add ellipsis in between
      const leftEllipsis = page > 2;
      const rightEllipsis = page < totalPages - 1;

      let startPage, endPage;
      if (page <= Math.ceil(visiblePages / 2)) {
        startPage = 1;
        endPage = visiblePages;
      } else if (page >= totalPages - Math.floor(visiblePages / 2)) {
        startPage = totalPages - visiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = page - Math.floor(visiblePages / 2);
        endPage = page + Math.floor(visiblePages / 2);
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <span
            key={i}
            className={`${styles.pageNumber} ${page === i ? styles.activePage : ""
              }`}
            onClick={() => goToPage(i)}
          >
            {i}
          </span>
        );
      }

      if (leftEllipsis) {
        pageNumbers.unshift(
          <span key="left-ellipsis" className={styles.ellipsis}>
            ...
          </span>
        );
      }
      if (rightEllipsis) {
        pageNumbers.push(
          <span key="right-ellipsis" className={styles.ellipsis}>
            ...
          </span>
        );
      }
    }

    return pageNumbers;
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!hasPrev}
        onClick={() => goToPage(page - 1)}
      >
        Previous
      </button>
      {renderPageNumbers()}
      <button
        disabled={!hasNext}
        className={styles.button}
        onClick={() => goToPage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
