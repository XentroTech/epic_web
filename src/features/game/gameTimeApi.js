import { apiSlice } from "../api/apiSlice";

export const gameTimeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createGameTime: builder.mutation({
      query: (data) => ({
        url: "/game/createTime",
        method: "POST",
        body: data,
      }),
    }),
    getGameTime: builder.query({
      query: () => ({
        url: "/game/getTime",
        method: "GET",
      }),
      providesTags: ["Game"],
    }),
    updateGameTime: builder.mutation({
      query: ({ id, data }) => ({
        url: `/game/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Game"],
    }),
    deleteGameTime: builder.mutation({
      query: (id) => ({
        url: `/game/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Game"],
    }),
    getGameLeaderBoard: builder.query({
      query: ({ date }) => ({
        url: `/game/leaderBoard`,
        method: "POST",
        body: { date },
      }),
    }),
  }),
});

export const {
  useCreateGameTimeMutation,
  useGetGameTimeQuery,
  useUpdateGameTimeMutation,
  useDeleteGameTimeMutation,
  useGetGameLeaderBoardQuery,
} = gameTimeApi;
