"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./searchInput.module.css";
import { BiSearch } from "react-icons/bi";
import { Input } from "@nextui-org/react";
import React from "react";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // Initialize with an empty string directly
  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (!searchQuery.trim()) {
      // Check if searchQuery is empty or contains only whitespace
      return;
    }

    const encodedSearchQuery = encodeURI(searchQuery.trim());
    router.push(`${baseUrl}/search?q=${encodedSearchQuery}`);

    console.log("current query", encodedSearchQuery);
  };

  return (
    <form className={styles.SearchForm} onSubmit={onSearch}>
      <Input
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Search..."
        name="name"
        startContent={
          <BiSearch
            style={{
              position: "absolute",
              width: "20px",
              border: "none",
              marginTop: "7px",
              transform: "translate(50%) !important",
              right: "16px",
              cursor: "pointer",
              color: "rgba(99, 99, 99, 0.8)",
              backgroundColor: "transparent",
            }}
          />
        }
        style={{
          border: "1px solid rgba(99, 99, 99, 0.2)",
          width: "100%",
          padding: "0.5rem 1rem",
          borderRadius: "6px",
          boxShadow: "rgba(99, 99, 99, 0.6) 0px 2px 8px 0px;",
          outline: "none",
        }}
      />
    </form>
  );
};

export default SearchInput;
