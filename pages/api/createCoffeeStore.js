import { formatCoffeeStores, table } from "../../lib/airtable";

const createCoffeeStore = async (req, res) => {
  if (req.method === "POST") {
    //find coffee store
    try {
      const { name, address, neighbourhood, voting, imgUrl } = req.body;
      if (!name) {
        return res.status(400).json({ message: "Name is required." });
      }

      const findCoffeeStoreRecord = await table
        .select({
          filterByFormula: `AND(name = "${name}", address = "${address}")`,
        })
        .firstPage(); // You don't need to pass the callback function, if you want.

      if (findCoffeeStoreRecord.length !== 0) {
        const records = formatCoffeeStores(findCoffeeStoreRecord);
        return res.json({
          message: "Coffee store already exists.",
          records,
        });
      } else {
        //create coffee store
        const newRecord = await table.create([
          {
            fields: {
              name,
              address,
              neighbourhood,
              voting,
              imgUrl,
            },
          },
        ]);
        const result = formatCoffeeStores(newRecord);
        return res.json({
          message: "Coffee store successfully created",
          record: result,
        });
      }
    } catch (error) {
      console.log("Error creating or finding Store...", error);
      return res
        .status(500)
        .json({ message: "Error creating or finding Store", error });
    }
  } else {
    return res.json({
      message: "method not allowed",
    });
  }
};

export default createCoffeeStore;
