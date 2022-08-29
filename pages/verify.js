import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import HeroVerify from "../components/HeroVerify";

const verify = () => {
  return (
    <div className={styles.verify}>
      <Head>
        <title>Varify OTP | Arclif</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        path="/login"
        prp1="Home"
        prp2="Agriha"
        prp3="Wallet"
        prp4="MarketPlace"
        title="Login"
      />
      <HeroVerify />
    </div>
  );
};

export default verify;
