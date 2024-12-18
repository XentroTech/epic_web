import { apiSlice } from "../api/apiSlice";

export const pushNotificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendPushNotification: builder.mutation({
      query: ({ title, msg, image }) => ({
        url: `/push/notification/send`,
        method: "POST",
        body: { title, msg, image },
      }),
      // invalidatesTags: [""],
    }),
  }),
});

export const { useSendPushNotificationMutation } = pushNotificationApi;
