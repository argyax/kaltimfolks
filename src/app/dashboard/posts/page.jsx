"use server";
import React from "react";
import { fetchPosts, fetchDatas } from "../../../lib/dashboardData";
import ClientUi from "./postClient";
// import { fetchDatas } from "next-auth/client/_utils";
// import { useState } from "react";

const PostDashboard = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, posts } = await fetchPosts(q, page);

  const myPosts = await fetchDatas();

  // const [id, setId] = useState("Wtf ID:");
  return <ClientUi count={count} posts={posts} />;
};

export default PostDashboard;
