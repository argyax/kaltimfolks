"use client";
import React, { useState, useEffect } from "react";
import styles from "./user-table.module.css";

const PostsByUser = () => {
  const [usersWithPosts, setUsersWithPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/postsByUser");
        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await res.json();
        setUsersWithPosts(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Posts by Users</h1>
      <div className={styles.categories}>
        {usersWithPosts.map((user) => (
          <div key={user.id}>
            <h2>{user.name}</h2>
            <ul>
              {user.Post.map((post) => (
                <li key={post.id}>
                  <h3>{post.title}</h3>
                  <p>{post.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsByUser;
