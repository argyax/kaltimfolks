'use server';

import styles from "./homepage.module.css";
import CardList from "./components/CardList/CardList";
import Menu from "./components/Menu/Menu";
import MainHeader from "./components/MainHeader/MainHeader";
import prisma from "@/lib/prisma";

export default async function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  const headerContent = await prisma.post.findMany({
    take: 4,
    orderBy: {
      views: "desc",
    },
  });

  return (
    <>
      <div className={styles.container}>
        <MainHeader headerContent={headerContent} />
        <div className={styles.content}>
          <CardList page={page} />
          <Menu page={page} />
        </div>
      </div>
    </>
  );
}
