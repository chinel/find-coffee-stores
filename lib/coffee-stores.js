//Initialize Coffee Stores API

import { createApi } from "unsplash-js";
//import nodeFetch from "node-fetch";

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  // fetch: nodeFetch,
});

const getUrlForCoffeeStores = (latLong, query, limit = 6) => {
  const queryParams = new URLSearchParams({
    query,
    ll: latLong,
    limit,
  });

  return `https://api.foursquare.com/v3/places/search?${queryParams.toString()}`;
};

const getListOfCoffeeStoresPhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    page: 1,
    perPage: 40,
  });

  const unsplashResults = photos.response.results;
  return unsplashResults.map((result) => result.urls["small"]);
};

export const fetchCoffeeStores = async (
  latLong = "43.717899,-79.6582408",
  limit
) => {
  const photos = await getListOfCoffeeStoresPhotos();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores(latLong, "coffee stores", limit),
    options
  );
  const data = await response.json();
  return data.results.map((venue, index) => {
    return {
      ...venue,
      imgUrl: photos[index],
    };
  });
};
