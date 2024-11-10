import { apiSlice } from "../api/apiSlice";

export const imageSpaceApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createImageSpaceInfo: builder.mutation({
      query: (data) => ({
        url: "/imageSpaces",
        method: "POST",
        body: data,
      }),
      // invalidatesTags: ["ImagesSpace"],
    }),
    getImageSpacesInfo: builder.query({
      query: () => ({
        url: "/imageSpaces",
        method: "GET",
      }),
      providesTags: ["ImageSpaces"],
    }),
    updateImageSpacesInfo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/imageSpaces/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["ImageSpaces"],
    }),
    deleteImageSpacesInfo: builder.mutation({
      query: (id) => ({
        url: `/imageSpaces/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ImageSpaces"],
    }),
  }),
});

export const {
  useCreateImageSpaceInfoMutation,
  useGetImageSpacesInfoQuery,
  useDeleteImageSpacesInfoMutation,
  useUpdateImageSpacesInfoMutation,
} = imageSpaceApi;
