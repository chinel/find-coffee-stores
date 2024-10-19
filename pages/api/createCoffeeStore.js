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
