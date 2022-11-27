import Head from "next/head";
import Banner from "../components/banner";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Card from "../components/card";
import coffeeStoresData from "../data/coffee-stores.json";

const Home = (props) => {
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
        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => (
                <Card
                  key={coffeeStore.fsq_id}
                  name={coffeeStore.name}
                  imgUrl={
                    coffeeStore.imgUrl ||
                    "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
                  }
                  href={`/coffe-store/${coffeeStore.fsq_id}`}
                  className={styles.card}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export async function getStaticProps(context) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "fsq3ylT0NJea+xrSnW1ymZkOjff7lTY3go5tO0lt8dX3TwQ=",
    },
  };

  const response = await fetch(
    "https://api.foursquare.com/v3/places/search?query=coffee%20stores&ll=43.717899%2C-79.6582408",
    options
  );

  const data = await response.json();

  return {
    props: {
      coffeeStores: data.result,
    },
  };
}

export default Home;
