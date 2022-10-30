import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import coffeeStoresData from "../data/coffee-stores.json";

const CoffeeStore = (props) => {
  const router = useRouter();
  console.log(router);

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { name, address, neighbourhood } = props.coffeeStore;

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      <Link href="/">
        <a>Back to home</a>
      </Link>

      <p>{name}</p>
      <p>{address}</p>
      <p>{neighbourhood}</p>
    </div>
  );
};

export function getStaticProps(staticProps) {
  const params = staticProps.params;
  return {
    props: {
      coffeeStore: coffeeStoresData.find(
        (coffeeStore) => coffeeStore.id.toString() === params.id
      ),
    },
  };
}

export function getStaticPaths() {
  const paths = coffeeStoresData.map((coffeeStores) => ({
    params: {
      id: coffeeStores.id.toString(),
    },
  }));
  return {
    paths,
    fallback: true,
  };
}

export default CoffeeStore;
