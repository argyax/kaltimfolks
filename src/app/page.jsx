import styles from "./homepage.module.css";
import Featured from "./components/Featured/Featured";
import CategoryList from "./components/CategoryList/CategoryList";
import CardList from "./components/CardList/CardList";
import Menu from "./components/Menu/Menu";

export default async function Home({ searchParams }) {
  const page = parseInt(searchParams.page) || 1;

  return (
  <>
    <div className={styles.container}>
      {/*<Featured page={page}/>*/}
      <CategoryList/>
      <div className={styles.content}>
        <CardList page={page}/>
        <Menu page={page}/>
      </div>
    </div>
  </>
  )
}
