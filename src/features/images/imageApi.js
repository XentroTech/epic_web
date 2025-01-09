import { apiSlice } from "../api/apiSlice";

export const imageApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getImages: builder.query({
      query: ({ searchQuery = "", currentPage = 1 }) =>
        `/image/all?query=${searchQuery}&page=${currentPage}&limit=10`,
      providesTags: ["Images"],
    }),
    getPendingImages: builder.query({
      query: ({ searchQuery = "", currentPage = 1, country }) => ({
        url: `/image/pending?query=${searchQuery}&page=${currentPage}&limit=10&country=${country}`,
      }),
      providesTags: ["PendingImages"],
    }),
    getLiveImages: builder.query({
      query: ({ searchQuery = "", currentPage = 1, country }) =>
        `/image/live?query=${searchQuery}&page=${currentPage}&limit=10&country=${country}`,
      providesTags: ["LiveImages"],
    }),
    getImage: builder.query({
      query: (id) => ({
        url: `/image/${id}`,
      }),
      providesTags: ["Images"],
    }),
    deleteImage: builder.mutation({
      query: (id) => ({
        url: `/image/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["LiveImages", "PendingImages", "Images"],
    }),
    approveImage: builder.mutation({
      query: (id) => ({
        url: `/image/approveImage/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["LiveImages", "PendingImages", "Images"],
    }),
    likeImage: builder.mutation({
      query: (id) => ({
        url: `/image/like/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["LiveImages", "Images"],
    }),
    purchaseImage: builder.mutation({
      query: (id) => ({
        url: `/image/purchase/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["LiveImages", "Images"],
    }),
    makeFeaturedImage: builder.mutation({
      query: (imageId) => ({
        url: `/featured/${imageId}`,
        method: "POST",
      }),
      invalidatesTags: ["LiveImages", "Images"],
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
  useMakeFeaturedImageMutation,
} = imageApi;
