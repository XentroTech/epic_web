import { apiSlice } from "../api/apiSlice";

export const prizeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPrizeInfo: builder.mutation({
      query: (data) => ({
        url: "/prize",
        method: "POST",
        body: data,
      }),
    }),
    getPrizeInfo: builder.query({
      query: () => ({
        url: "/prize",
        method: "GET",
      }),
      providesTags: ["Prize"],
    }),
    updatePrizeInfo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/prize/${id}`,
        method: "PATCH",
        body: { data },
      }),
      invalidatesTags: ["Prize"],
    }),
    deletePrizeInfo: builder.mutation({
      query: (id) => ({
        url: `/prize/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Prize"],
    }),
    getWinnersInfo: builder.query({
      query: ({ date, type }) => ({
        url: `/prize/winners?date=${date}&type=${type}`,
        method: "GET",
        // body: { date },
      }),
      providesTags: ["Prize"],
    }),
    prizeDistribute: builder.mutation({
      query: ({ date, type }) => ({
        url: `/prize/distribute`,
        method: "POST",
        body: { date, type },
      }),
      invalidatesTags: ["Prize"],
    }),
  }),
});

export const {
  useCreatePrizeInfoMutation,
  useDeletePrizeInfoMutation,
  useGetPrizeInfoQuery,
  useUpdatePrizeInfoMutation,
  useGetWinnersInfoQuery,
  usePrizeDistributeMutation,
} = prizeApi;
