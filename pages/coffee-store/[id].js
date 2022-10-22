import Link from "next/link";
import { useRouter } from "next/router";
import coffeeStoresData from "../data/coffee-stores.json";

const CoffeeStore = (props) => {
  const router = useRouter();
  console.log(router);

  if(router.isFallback){
    return(
      <div>
        Loading...
        </div>
    )
  }
  return (
    <div>
      Coffee Store page {router.query.id}
      <Link href="/">
        <a>Back to home</a>
      </Link>
      <Link href="/coffee-store/dynamic">
        <a>Go to page dynamic</a>
      </Link>
      <p>{props.coffeeStore.name}</p>
      <p>{props.coffeeStore.address}</p>
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
  return {
    paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
    fallback: true,
  };
}

export default CoffeeStore;
