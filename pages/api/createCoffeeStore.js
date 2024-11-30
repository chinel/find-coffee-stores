import { formatCoffeeStores } from "../../lib/coffee-stores";

const AIRTABLE_API_TOKEN = process.env.AIRTABLE_API_TOKEN;
const AIRTABLE_BASE_KEY = process.env.AIRTABLE_BASE_KEY;
const AIRTABLE_ENDPOINT_URL = process.env.AIRTABLE_ENDPOINT_URL;

const Airtable = require("airtable");
Airtable.configure({
  endpointUrl: AIRTABLE_ENDPOINT_URL,
  apiKey: AIRTABLE_API_TOKEN,
});
const base = Airtable.base(AIRTABLE_BASE_KEY);
const table = base("coffee-stores");

console.log({ table });

const createCoffeeStore = async (req, res) => {
  console.log({ req });
  if (req.method === "POST") {
    //find coffee store
    try {
      const { id, name, address, neighbourhood, voting, imgUrl } = req.body;
      const findCoffeeStoreRecord = await table
        .select({
          filterByFormula: `AND(name = "${name}", address = "${address}")`,
        })
        .firstPage(); // You don't need to pass the callback function, if you want.

      console.log({ findCoffeeStoreRecord });

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
      console.log("Error Finding Store...", error);
      return res.status(500).json({ message: "Error finding store", error });
    }
  } else {
    return res.json({
      message: "method not allowed",
    });
  }
};

export default createCoffeeStore;
