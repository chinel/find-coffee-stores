//Initialize Coffee Stores API

import { createApi } from "unsplash-js";
//import nodeFetch from "node-fetch";

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
  // fetch: nodeFetch,
});

const getUrlForCoffeeStores = (latLong, query, limit) => {
  const queryParams = new URLSearchParams({
    query,
    ll: latLong,
    limit,
  });

  return `https://api.foursquare.com/v3/places/search?${queryParams.toString()}`;
};

export const fetchCoffeeStores = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: "cat",
    page: 1,
    perPage: 10,
    color: "green",
    orientation: "portrait",
  });

  const unsplashResults = photos.response.results;
  const photoResponse = unsplashResults.map((result) => result.urls["small"]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getUrlForCoffeeStores("43.717899,-79.6582408", "coffee stores", 6),
    options
  );
  const data = await response.json();
  return data.results;
};
