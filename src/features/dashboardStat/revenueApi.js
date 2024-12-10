import { apiSlice } from "../api/apiSlice";

export const revenueApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getImageRevenue: builder.query({
      query: ({ interval, country }) => ({
        url: `/dashboard/statistics/image?interval=${interval}&country=${country}`,
        method: "GET",
      }),
      providesTags: ["ImageRevenue"],
    }),
    getSpaceRevenue: builder.query({
      query: ({ interval, country }) => ({
        url: `/dashboard/statistics/space?interval=${interval}&country=${country}`,
        method: "GET",
      }),
      providesTags: ["SpaceRevenue"],
    }),
    getCoinRevenue: builder.query({
      query: ({ interval, country }) => ({
        url: `/dashboard/statistics/coin?interval=${interval}&country=${country}`,
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
