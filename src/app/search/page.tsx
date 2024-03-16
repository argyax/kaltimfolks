"use client"
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import styles from "./search.module.css";
import Card from "../components/Card/Card";
import Query from "../components/Post/post";
import Pagination from "../components/pagination/Pagination";
import { Spinner } from "react-bootstrap";

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

  if (isLoading) {
    return <Spinner />;
  }

  if (!data?.posts) {
    return null;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Results</h1>
      <div className={styles.posts}>
        <Query posts={data.posts} />
      </div>
      <Pagination page={1} hasPrev={false} hasNext={false} /> {/* Pagination needs to be updated */}
    </div>
  );
};

export default SearchPage;
