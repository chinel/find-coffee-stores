import { useRouter } from "next/router";

const CoffeeStore = () => {
  const router = useRouter();
  console.log(router);
  return (
    <div>
      <p>Coffee Store page</p>
    </div>
  );
};

export default CoffeeStore;
