import styles from "./homepage.module.css";
import CardList from "./components/CardList/CardList";
import Menu from "./components/Menu/Menu";
import MainHeader from "./components/MainHeader/MainHeader";

export default async function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  return (
    <>
      <div className={styles.container}>
        <MainHeader />
        <div className={styles.content}>
          <CardList page={page} />
          <Menu page={page} />
        </div>
      </div>
    </>
  );
}