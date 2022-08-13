import Head from "next/head";
import Banner from "../components/banner";
import styles from "../styles/Home.module.css";

const Home = () => {
  const handleOnBannerBtnClick = () => {
    console.log("Hi Banner button");
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Coffee Connoisseur" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText="View stores nearby"
          handleOnClick={handleOnBannerBtnClick}
        />
      </main>
    </div>
  );
};

export default Home;
