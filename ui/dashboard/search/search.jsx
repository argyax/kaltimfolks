"use client";
import { MdSearch } from "react-icons/md";
import styles from "./search.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@nextui-org/react";

const Search = ({ placeholder }) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", 1);

    if (e.target.value) {
      e.target.value.length > 2 && params.set("q", e.target.value);
    } else {
      params.delete("q");
    }
    replace(`${pathname}?${params}`);
  }, 300);

  return (
    // <div className={styles.container}>
    <Input
      placeholder={placeholder}
      onChange={handleSearch}
      startContent={
        <MdSearch
          style={{
            position: "absolute",
            width: "20px",
            border: "none",
            marginTop: "13px",
            transform: "translate(50%) !important",
            cursor: "pointer",
            color: "grey !important",
            backgroundColor: "transparent",
            zIndex: "200"
          }}
        />
      }
      style={{
        width: "100%",
        padding: "1rem 2.5rem",
        border: "none",
        borderRadius: "6px",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
        outline: "none",
      }}
    />
    // </div>
  );
};

export default Search;
