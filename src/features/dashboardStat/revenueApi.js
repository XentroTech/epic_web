import { apiSlice } from "../api/apiSlice";

export const revenueApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getImageRevenue: builder.query({
      query: (interval) => ({
        url: `/dashboard/statistics/image?interval=${interval}`,
        method: "GET",
      }),
      providesTags: ["ImageRevenue"],
    }),
    getSpaceRevenue: builder.query({
      query: (interval) => ({
        url: `/dashboard/statistics/space?interval=${interval}`,
        method: "GET",
      }),
      providesTags: ["SpaceRevenue"],
    }),
    getCoinRevenue: builder.query({
      query: (interval) => ({
        url: `/dashboard/statistics/coin?interval=${interval}`,
        method: "GET",
      }),
      providesTags: ["CoinRevenue"],
    }),
  }),
});

export const {
  useGetCoinRevenueQuery,
  useGetImageRevenueQuery,
  useGetSpaceRevenueQuery,
} = revenueApi;
