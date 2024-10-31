import { apiSlice } from "../api/apiSlice";

export const imageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getImages: builder.query({
      query: ({ searchQuery = "", currentPage = 1 }) =>
        `/getImages?query=${searchQuery}&page=${currentPage}&limit=10`,
      providesTags: ["Images"],
    }),
    getPendingImages: builder.query({
      query: ({ searchQuery = "", currentPage = 1 }) => ({
        url: `/getPendingImages?query=${searchQuery}&page=${currentPage}&limit=10`,
      }),
      providesTags: ["PendingImages"],
    }),
    getLiveImages: builder.query({
      query: ({ searchQuery = "", currentPage = 1 }) =>
        `/getLiveImages?query=${searchQuery}&page=${currentPage}&limit=10`,
      providesTags: ["LiveImages"],
    }),
    getImage: builder.query({
      query: (id) => ({
        url: `/getAnImage/${id}`,
      }),
    }),
    deleteImage: builder.mutation({
      query: (id) => ({
        url: `/image/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LiveImages", "PendingImages"],
    }),
    approveImage: builder.mutation({
      query: (id) => ({
        url: `/image/approveImage/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["LiveImages", "PendingImages"],
    }),
  }),
});

export const {
  useGetImagesQuery,
  useGetImageQuery,
  useDeleteImageMutation,
  useApproveImageMutation,
  useGetLiveImagesQuery,
  useGetPendingImagesQuery,
} = imageApi;
