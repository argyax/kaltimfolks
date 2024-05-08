"use client";
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import styles from "./search.module.css";
import Card from "../components/Card/Card";
import Posts from "../components/Post/post";
import Pagination from "../components/pagination/Pagination";
import { Spinner } from "react-bootstrap";
import Menu from "../components/Menu/Menu";

const fetchPosts = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

const SearchPage = () => {
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const router = useRouter();

  const encodedSearchQuery = encodeURI(searchQuery || "");

  const { data, isLoading } = useSWR(
    `/api/search?q=${encodedSearchQuery}`,
    fetchPosts,
    { revalidateOnFocus: false }
  );

  if (!encodedSearchQuery) {
    router.push("/");
  }

  if (!searchQuery) {
    // Handle case where there's no search query
    return <div>No search query provided</div>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (!data?.posts) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Showing Results for: {""}{" "}
        <span className={styles.posts}>{searchQuery}</span>
      </h2>
      <div className={styles.content}>
        <Posts posts={data.posts} />
      </div>
      <Pagination page={1} hasPrev={false} hasNext={false} />{" "}
      {/* Pagination needs to be updated */}
    </div>
  );
};

export default SearchPage;
