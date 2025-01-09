import { apiSlice } from "../api/apiSlice";

export const revenueApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getImageRevenue: builder.query({
      query: ({ interval, country, year }) => ({
        url: `/dashboard/statistics/image?interval=${interval}&country=${country}&year=${year}`,
        method: "GET",
      }),
      providesTags: ["ImageRevenue"],
    }),
    getSpaceRevenue: builder.query({
      query: ({ interval, country, year }) => ({
        url: `/dashboard/statistics/space?interval=${interval}&country=${country}&year={year}`,
        method: "GET",
      }),
      providesTags: ["SpaceRevenue"],
    }),
    getCoinRevenue: builder.query({
      query: ({ interval, country, year }) => ({
        url: `/dashboard/statistics/coin?interval=${interval}&country=${country}&year=${year}`,
        method: "GET",
      }),
      providesTags: ["CoinRevenue"],
    }),
    getYears: builder.query({
      query: () => ({
        url: `/dashboard/years`,
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
  useGetYearsQuery,
} = revenueApi;
