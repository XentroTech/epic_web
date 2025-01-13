import { apiSlice } from "../api/apiSlice";

export const contestPostApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: "/post/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),

    getPosts: builder.query({
      query: () => `/posts`,
      providesTags: ["Post"],
    }),

    getPost: builder.query({
      query: (id) => ({
        url: `/post/${id}`,
      }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/post/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostQuery,
  useGetPostsQuery,
  useDeletePostMutation,
} = contestPostApi;
