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
  });

  const menuContent = await prisma.post.findMany({
    take: 3,
    orderBy: {
      createdAt: "desc",
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
