import { apiSlice } from "../api/apiSlice";

export const coinApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCoinInfo: builder.mutation({
      query: (data) => ({
        url: "/coin",
        method: "POST",
        body: data,
      }),
    }),
    getCoinInfo: builder.query({
      query: () => ({
        url: "/coin",
        method: "GET",
      }),
      providesTags: ["Coin"],
    }),
    updateCoinInfo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/coin/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Coin"],
    }),
    deleteCoinInfo: builder.mutation({
      query: (id) => ({
        url: `/coin/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coin"],
    }),
    purchaseCoin: builder.mutation({
      query: (id) => ({
        url: `/coin/purchase`,
        method: "POST",
      }),
      invalidatesTags: ["Coin"],
    }),
  }),
});

export const {
  useCreateCoinInfoMutation,
  useDeleteCoinInfoMutation,
  useGetCoinInfoQuery,
  useUpdateCoinInfoMutation,
  usePurchaseCoinMutation,
} = coinApi;
