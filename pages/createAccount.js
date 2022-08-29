import Head from "next/head";
import Header from "../components/Header";
import HeroCreate from "../components/HeroCreate";
import styles from "../styles/Home.module.css";

const createAccount = () => {
  return (
    <div className={styles.home}>
      <Head>
        <title>Choose Account Type | Arclif</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <HeroCreate />
    </div>
  );
};

export default createAccount;
