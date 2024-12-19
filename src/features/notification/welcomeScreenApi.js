import { apiSlice } from "../api/apiSlice";

export const welcomeScreenApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createWelcomeScreenInfo: builder.mutation({
      query: (body) => ({
        url: `/welcomeScreenInfo`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["WelcomeScreen"],
    }),
    getWelcomeScreenInfo: builder.query({
      query: () => ({
        url: `/welcomeScreenInfo`,
        method: "Get",
      }),
      invalidatesTags: ["WelcomeScreen"],
    }),
    deleteWelcomeScreenInfo: builder.mutation({
      query: (id) => ({
        url: `/welcomeScreenInfo/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WelcomeScreen"],
    }),
  }),
});

export const {
  useCreateWelcomeScreenInfoMutation,
  useGetWelcomeScreenInfoQuery,
  useDeleteWelcomeScreenInfoMutation,
} = welcomeScreenApi;
