import Link from "next/link";
import { useRouter } from "next/router";
import coffeeStoresData from "../data/coffee-stores.json";

const CoffeeStore = () => {
  const router = useRouter();
  console.log(router);
  return (
    <div>
      Coffee Store page {router.query.id}
      <Link href="/">
        <a>Back to home</a>
      </Link>
      <Link href="/coffee-store/dynamic">
        <a>Go to page dynamic</a>
      </Link>
    </div>
  );
};

export function getStaticProps(staticProps) {
  const params = staticProps.params;
  return {
    props: {
      coffeeStore: coffeeStoresData.find(
        (coffeeStore) => coffeeStore.id === params.id
      ),
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
  };
}

export default CoffeeStore;
