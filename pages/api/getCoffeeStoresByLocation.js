import { fetchCoffeeStores } from "../../lib/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {
  try {
    const { latLong, limit } = req.query;
    const fetchedCoffeeStores = await fetchCoffeeStores(latLong, limit);
    res.status(200).json({ data: fetchedCoffeeStores });
  } catch (error) {
    console.log("An error occurred:", error);
    res.status(500).json({message: "An error occurred."})
  }
};

export default getCoffeeStoresByLocation;
