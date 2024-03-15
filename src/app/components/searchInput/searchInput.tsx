"use client"
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./searchInput.module.css";
import { BiSearch } from 'react-icons/bi';
import { Input } from "@nextui-org/react";

const SearchInput = () => {
  const [searchQuery, setSearchQuery] = useState<string>(""); // Initialize with an empty string directly
  const router = useRouter();

  const onSearch = (event: React.FormEvent) => {
    event.preventDefault();

    if (!searchQuery.trim()) { // Check if searchQuery is empty or contains only whitespace
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
        startContent=
        {<BiSearch
          style={{
            position: 'absolute',
            width: '20px',
            border: 'none',
            marginTop: '10px',
            transform: 'translate(-110%)',
            cursor: 'pointer',
            color: 'var(--textColor)',
            backgroundColor: 'transparent',
          }} />}
        style={{
          border: 'none',
          width: '100%',
          padding: '0.5rem',
          borderRadius: '7px',
          boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.5)',
          outline: 'none'
        }}
      />
    </form>
  );
};

export default SearchInput;
