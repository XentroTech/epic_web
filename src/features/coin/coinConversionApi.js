import { apiSlice } from "../api/apiSlice";

export const coinConversionApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCoinConversion: builder.mutation({
      query: (data) => ({
        url: "/coinConversion",
        method: "POST",
        body: data,
      }),
    }),
    getCoinConversion: builder.query({
      query: () => ({
        url: "/coinConversion",
        method: "GET",
      }),
      providesTags: ["CoinConversion"],
    }),
    updateCoinConversion: builder.mutation({
      query: ({ id, data }) => ({
        url: `/coinConversion/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["CoinConversion"],
    }),
    deleteCoinConversion: builder.mutation({
      query: (id) => ({
        url: `/coinConversion/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CoinConversion"],
    }),
  }),
});

export const {
  useCreateCoinConversionMutation,
  useGetCoinConversionQuery,
  useUpdateCoinConversionMutation,
  useDeleteCoinConversionMutation,
} = coinConversionApi;
