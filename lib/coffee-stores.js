const getUrlForCoffeeStores = (latLong, query, limit) => {
  const queryParams = new URLSearchParams({
    query,
    ll: latLong,
    limit,
  });
  console.log(
    `https://api.foursquare.com/v3/places/search?${queryParams.toString()}`
  );
  return `https://api.foursquare.com/v3/places/search?${queryParams.toString()}`;
};

export const fetchCoffeeStores = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: "fsq3ylT0NJea+xrSnW1ymZkOjff7lTY3go5tO0lt8dX3TwQ=",
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores("43.717899,-79.6582408", "coffee stores", 6),
    options
  );
  const data = await response.json();
  return data.results;
};
