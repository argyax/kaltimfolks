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

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (!searchQuery.trim()) {
      // Check if searchQuery is empty or contains only whitespace
      return;
    }

    const encodedSearchQuery = encodeURI(searchQuery.trim());
    router.push(`http://localhost:3000/search?q=${encodedSearchQuery}`);

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
              marginTop: "10px",
              transform: "translate(50%) !important",
              cursor: "pointer",
              color: "grey !important",
              backgroundColor: "transparent",
              zIndex: "200"
            }}
          />
        }
        style={{
          border: "none",
          width: "100%",
          padding: "0.5rem 1rem",
          borderRadius: "7px",
          boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
          outline: "none",
        }}
      />
    </form>
  );
};

export default SearchInput;
