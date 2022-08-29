import Head from "next/head";
import Header from "../components/Header";
import HeroBusiness from "../components/HeroBusiness";

const Business = () => {
  return (
    <div>
      <Head>
        <title>Business Account | Arclif</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <HeroBusiness />
    </div>
  );
};

export default Business;
