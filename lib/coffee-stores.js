const getUrlForCoffeeStores = (latLong, query, limit) => {
  const queryParams = new URLSearchParams({
    query,
    ll: latLong,
    limit,
  });

  return `https://api.foursquare.com/v3/places/search?${queryParams.toString()}`;
};

export const fetchCoffeeStores = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores("43.717899,-79.6582408", "coffee stores", 6),
    options
  );
  const data = await response.json();
  return data.results;
};
