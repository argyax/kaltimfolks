'use server';

import styles from "./homepage.module.css";
import CardList from "./components/CardList/CardList";
import Menu from "./components/Menu/Menu";
import MainHeader from "./components/MainHeader/MainHeader";
import prisma from "@/lib/prisma";
import HeaderAds from "./components/Ads/headers/headers"

export default async function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  const headerContent = await prisma.post.findMany({
    take: 4,
    orderBy: {
      views: "desc",
    },
    where: {
      catSlug: {
        not: "follower's insight",
      },
    },
  });

  const cardList = await prisma.post.findMany({
    take: 4,
    orderBy: {
      views: "desc",
    },
    where: {
      catSlug: {
        not: "follower's insight",
      },
    },
  });
  

  return (
    <>
      <div className={styles.container}>
        <MainHeader headerContent={headerContent} />
        <HeaderAds/>
        <div className={styles.content}>
          <CardList page={page} />
          <Menu page={cardList} />
        </div>
      </div>
    </>
  );
}
