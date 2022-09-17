import Head from "next/head";
import Banner from "../components/banner";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Card from "../components/card";
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
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            width={700}
            height={400}
            alt="hero image"
          />
        </div>
        <div className={styles.cardLayout}>
          <Card
            name="Dark Horse Coffee"
            imgUrl="/static/hero-image.png"
            href="/coffe-store/darkhorse-coffee"
            className={styles.card}
          />
          <Card
            name="Dark Horse Coffee"
            imgUrl="/static/hero-image.png"
            href="/coffe-store/darkhorse-coffee"
            className={styles.card}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
