import Head from "next/head";
import Header from "../components/Header";
import HeroProffessional from "../components/HeroProffessional";

const proffessional = () => {
  return (
    <div>
      <Head>
        <title>Professional Account | Arclif</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <HeroProffessional />
    </div>
  );
};

export default proffessional;
