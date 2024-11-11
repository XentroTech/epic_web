import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.e-pic.co/api/v1/",
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Images, PendingImages, LiveImages, ImagesSpace", "Coin"],

  endpoints: (builder) => ({}),
});
