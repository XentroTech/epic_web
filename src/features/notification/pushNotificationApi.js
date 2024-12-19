import { apiSlice } from "../api/apiSlice";

export const pushNotificationApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendPushNotification: builder.mutation({
      query: ({ title, msg }) => ({
        url: `/push/notification/send`,
        method: "POST",
        body: { title, msg },
      }),
      // invalidatesTags: [""],
    }),
  }),
});

export const { useSendPushNotificationMutation } = pushNotificationApi;
