import Head from "next/head";
import Banner from "../components/banner";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Card from "../components/card";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import useTrackLocation from "../hooks/use-track-location";
import { useContext, useEffect, useState } from "react";
import { ACTION_TYPES, StoreContext } from "../context/storeContext";

const Home = (props) => {
  const { dispatch, state } = useContext(StoreContext);
  const {
    handleTrackLocation,
    // latLong,
    locationErrorMessage,
    isFindingLocation,
  } = useTrackLocation();
  const { coffeeStores } = state;

  // const [coffeeStores, setCoffeeStores] = useState([]);
  const [coffeeStoresError, setCoffeeStoresError] = useState(null);

  console.log({ latLong: state.latLong, locationErrorMessage });

  useEffect(() => {
    const getCoffeeStores = async () => {
      const formatLatLong = state.latLong.split(" ").join(",");
      try {
        const params = {
          latLong: formatLatLong,
          limit: 30,
        };

        // Convert the object into query parameters
        const queryString = new URLSearchParams(params).toString();

        // Encode the query string
        const encodedQueryString = encodeURIComponent(queryString);

        const fetchedCoffeeStores = await fetch(
          `/api/getCoffeeStoresByLocation?${encodedQueryString}`
        );
        // setCoffeeStores(fetchedCoffeeStores);
        const result = await fetchedCoffeeStores.json();

        dispatch({
          type: ACTION_TYPES.SET_COFFEE_STORES,
          payload: {
            coffeeStores: result.data,
          },
        });
        setCoffeeStoresError("");
      } catch (error) {
        console.log({ error });
        setCoffeeStoresError(error.message);
      }
    };
    if (state.latLong) {
      getCoffeeStores();
    }
  }, [dispatch, state.latLong]);

  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
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
          buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          handleOnClick={handleOnBannerBtnClick}
        />
        {locationErrorMessage && (
          <p>Something went wrong: {locationErrorMessage}</p>
        )}
        {coffeeStoresError && <p>Something went wrong: {coffeeStoresError}</p>}
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            width={700}
            height={400}
            alt="hero image"
          />
        </div>

        {coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
            <h2 className={styles.heading2}>Stores near me</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((coffeeStore) => (
                <Card
                  key={coffeeStore.fsq_id}
                  name={coffeeStore.name}
                  imgUrl={
                    coffeeStore.imgUrl ||
                    "https://images.unsplash.com/photo-1498804103079-a6351b050096?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2468&q=80"
                  }
                  href={`/coffee-store/${coffeeStore.fsq_id}`}
                  className={styles.card}
                />
              ))}
            </div>
          </div>
        )}
        {props.coffeeStores.length > 0 && (
          <div className={styles.sectionWrapper}>
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
                  href={`/coffee-store/${coffeeStore.fsq_id}`}
                  className={styles.card}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export async function getStaticProps(context) {
  const coffeeStores = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores,
    },
  };
}

export default Home;
