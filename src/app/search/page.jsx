"use client"
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import styles from "./search.module.css";
import Card from "../components/Card/Card";
import Pagination from "../components/pagination/Pagination";
import SinglePage from "@/app/posts/[slug]/page"

const fetchPosts = async (url) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

const SearchPage = () => {
  const router = useRouter();
  const search = useSearchParams();
  const searchQuery = search ? search.get("q") : null;
  const encodedSearchQuery = encodeURI(searchQuery || "");

  const { data, error } = useSWR(
    `http://localhost:3000/api/search?q=${encodedSearchQuery}`,
    fetchPosts,
    { revalidateOnFocus: false }
  );

  if (!encodedSearchQuery) {
    router.push("/");
  }

  if (error) {
    return <div className={styles.container}>Error: {error.message}</div>;
  }

  if (!data) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (!data.posts || data.posts.length === 0) {
    return <div className={styles.container}>No Results</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Results</h1>
      <div className={styles.posts}>
        {posts.map((item) => (
          <SinglePage item={item} key={item._id} />
        ))}
      </div>
      <Pagination page={1} hasPrev={false} hasNext={false} /> {/* Pagination needs to be updated */}
    </div>
  );
};

export default SearchPage;
