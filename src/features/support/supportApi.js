import { apiSlice } from "../api/apiSlice";

export const supportApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSupportMessages: builder.query({
      query: () => ({
        url: "/contact/messages/get",
        method: "GET",
      }),
      providesTags: ["SupportMessage"],
    }),

    deleteSupportMessage: builder.mutation({
      query: (id) => ({
        url: `/contact/messages/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SupportMessage"],
    }),
    isReadMessage: builder.mutation({
      query: (id) => ({
        url: `/contact/messages/isRead/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["SupportMessage"],
    }),
  }),
});

export const {
  useGetSupportMessagesQuery,
  useDeleteSupportMessageMutation,
  useIsReadMessageMutation,
} = supportApi;
