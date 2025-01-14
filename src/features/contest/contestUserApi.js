import { apiSlice } from "../api/apiSlice";

export const contestUserApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createContestUser: builder.mutation({
      query: (data) => ({
        url: "/contestUser/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ContestUser"],
    }),

    getContestUsers: builder.query({
      query: () => `/contestUsers`,
      providesTags: ["ContestUser"],
    }),

    getContestUser: builder.query({
      query: (id) => ({
        url: `/contestUser/${id}`,
      }),
      invalidatesTags: ["ContestUser"],
    }),
    deleteContestUser: builder.mutation({
      query: (id) => ({
        url: `/contestUser/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ContestUser"],
    }),
  }),
});

export const {
  useCreateContestUserMutation,
  useDeleteContestUserMutation,
  useGetContestUserQuery,
  useGetContestUsersQuery,
} = contestUserApi;
