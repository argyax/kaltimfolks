<<<<<<< HEAD
"use client";
=======
"use client"
>>>>>>> a78c01c9b8f186fcdfae34ba7118f46df8c59529
import { useRouter, useSearchParams } from "next/navigation";
import useSWR from "swr";
import styles from "./search.module.css";
import Card from "../components/Card/Card";
<<<<<<< HEAD
import Posts from "../components/Post/post";
import Pagination from "../components/pagination/Pagination";
import { Spinner } from "react-bootstrap";
import Menu from "../components/Menu/Menu";
=======
import Query from "../components/Post/post";
import Pagination from "../components/pagination/Pagination";
import { Spinner } from "react-bootstrap";
>>>>>>> a78c01c9b8f186fcdfae34ba7118f46df8c59529

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

<<<<<<< HEAD
  if (!searchQuery) {
    // Handle case where there's no search query
    return <div>No search query provided</div>;
  }

=======
>>>>>>> a78c01c9b8f186fcdfae34ba7118f46df8c59529
  if (isLoading) {
    return <Spinner />;
  }

  if (!data?.posts) {
    return null;
  }

  return (
    <div className={styles.container}>
<<<<<<< HEAD
      <h2 className={styles.title}>
        Showing Results for: {""}{" "}
        <span className={styles.posts}>{searchQuery}</span>
      </h2>
      <div className={styles.content}>
        <Posts posts={data.posts} />
      </div>
      <Pagination page={1} hasPrev={false} hasNext={false} />{" "}
      {/* Pagination needs to be updated */}
=======
      <h1 className={styles.title}>Results</h1>
      <div className={styles.posts}>
        <Query posts={data.posts} />
      </div>
      <Pagination page={1} hasPrev={false} hasNext={false} /> {/* Pagination needs to be updated */}
>>>>>>> a78c01c9b8f186fcdfae34ba7118f46df8c59529
    </div>
  );
};

export default SearchPage;
