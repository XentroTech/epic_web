import { apiSlice } from "../api/apiSlice";

export const userDeleteAccountRequestApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDeleteRequests: builder.query({
      query: () => ({
        url: `/delete/account/all-request`,
      }),
      providesTags: ["DeleteRequest"],
    }),

    approveRequest: builder.mutation({
      query: (id) => ({
        url: `/delete/account/approve/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["DeleteRequest"],
    }),
    declineRequest: builder.mutation({
      query: (id) => ({
        url: `/delete/account/decline/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["DeleteRequest"],
    }),
  }),
});

export const {
  useGetDeleteRequestsQuery,
  useApproveRequestMutation,
  useDeclineRequestMutation,
} = userDeleteAccountRequestApi;
