import { apiSlice } from "../api/apiSlice";

export const sponsorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSponsor: builder.mutation({
      query: (data) => ({
        url: "/sponsor/create",
        method: "POST",
        body: data,
      }),
    }),
    getSponsor: builder.query({
      query: () => ({
        url: "/sponsor/get",
        method: "GET",
      }),
      providesTags: ["Sponsor"],
    }),
    updateSponsor: builder.mutation({
      query: ({ id, data }) => ({
        url: `/sponsor/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Sponsor"],
    }),
    deleteSponsor: builder.mutation({
      query: (id) => ({
        url: `/sponsor/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Sponsor"],
    }),
  }),
});

export const {
  useCreateSponsorMutation,
  useGetSponsorQuery,
  useUpdateSponsorMutation,
  useDeleteSponsorMutation,
} = sponsorApi;
