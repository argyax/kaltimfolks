'use server';

import styles from "./homepage.module.css";
import CardList from "./components/CardList/CardList";
import Menu from "./components/Menu/Menu";
import MainHeader from "./components/MainHeader/MainHeader";
import prisma from "@/lib/prisma";
import { sendMail } from "@/lib/mail";

export default async function Home({ searchParams }) {
  await sendMail({ to: "information.kaltimfolks@gmail.com", subject: "test", body: "hello world" })
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
  

  const menuContent = await prisma.post.findMany({
    take: 3,
    orderBy: {
      createdAt: "desc",
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
        <div className={styles.content}>
          <CardList page={page} />
          <Menu page={menuContent} />
        </div>
      </div>
    </>
  );
}
