import Head from "next/head";
import Header from "../components/Header";
import HeroPersonal from "../components/HeroPersonal";
import styles from "../styles/Home.module.css";

const personal = () => {
  return (
    <div className={styles.home}>
      <Head>
        <title>Personal Account | Arclif</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <HeroPersonal />
    </div>
  );
};

export default personal;
