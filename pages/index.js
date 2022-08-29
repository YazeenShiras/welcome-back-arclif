import Head from "next/head";
import Header from "../components/Header";
import Hero from "../components/Hero";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.home}>
      <Head>
        <title>
          Arclif - The fastest growing architecture and housing platform |
          Arclif
        </title>
        <meta
          name="description"
          content="Arclif - The fastest growing architecture and housing platform | Arclif"
        />
        <meta
          name="keywords"
          content="arclif, architecture, architect, construction, housing platform, arclif.com, arclif.in, architecture platform, online architecture"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Hero />
    </div>
  );
}
