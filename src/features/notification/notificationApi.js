import { apiSlice } from "../api/apiSlice";

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendNotification: builder.mutation({
      query: ({ title, message }) => ({
        url: `/notification/send`,
        method: "POST",
        body: { title, message },
      }),
      // invalidatesTags: [""],
    }),
  }),
});

export const { useSendNotificationMutation } = notificationApi;
