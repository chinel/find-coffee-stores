export const fetchCoffeeStores = async () => {
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
  return data.result;
};
