import { apiSlice } from "../api/apiSlice";

export const notificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendNotification: builder.mutation({
      query: ({ title, message, image }) => ({
        url: `/notification/send`,
        method: "POST",
        body: { title, message, image },
      }),
      // invalidatesTags: [""],
    }),
  }),
});

export const { useSendNotificationMutation } = notificationApi;
