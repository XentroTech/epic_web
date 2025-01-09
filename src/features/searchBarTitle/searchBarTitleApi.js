import { apiSlice } from "../api/apiSlice";

export const searchBarTitleApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTitle: builder.mutation({
      query: (title) => ({
        url: "/searchBarTitle/create",
        method: "POST",
        body: { title },
      }),
    }),
    getTitle: builder.query({
      query: () => ({
        url: "/searchBarTitle/list",
        method: "GET",
      }),
      providesTags: ["searchBarTitle"],
    }),

    updateTitle: builder.mutation({
      query: ({ id, data }) => ({
        url: `/searchBarTitle/update/${id}`,
        method: "PATCH",
        body: { data },
      }),
      invalidatesTags: ["searchBarTitle"],
    }),
    deleteTitle: builder.mutation({
      query: (id) => ({
        url: `/searchBarTitle/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["searchBarTitle"],
    }),
  }),
});

export const {
  useCreateTitleMutation,
  useGetTitleQuery,
  useUpdateTitleMutation,
  useDeleteTitleMutation,
} = searchBarTitleApi;
