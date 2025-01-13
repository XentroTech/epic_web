import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../user/userAuthSlice";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1/",
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const token = getState()?.auth?.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    async onError(error, { dispatch, getState }) {
      if (error?.error.status === 401) {
        const state = getState();
        const refreshToken = state?.auth?.refreshToken;
        try {
          const response = await fetch(
            //while deploy must change the url localhost to dev.e-pic.co
            "https://dev.e-pic.co/api/v1/auth/refreshToken",
            {
              method: "POST",
              headers: {
                "Content-Type": application / json,
              },
              body: JSON.stringify({ refreshToken }),
            }
          );
          if (response.ok) {
            const data = await response.json();
            const { token, user } = data;
            dispatch(userLoggedIn({ token: token, user }));
          } else {
            dispatch(userLoggedOut());
          }
        } catch (error) {
          console.log(error);
          dispatch(userLoggedOut());
        }
      }
    },
  }),
  tagTypes: [
    "Images, PendingImages, LiveImages, ImagesSpace",
    "Coin",
    // "Prize",
    "Post",
  ],

  endpoints: (builder) => ({}),
});

// sudo cp -R /home/riduanal/frontend/dist /var/www/epic-web/
// sudo chown -R www-data:www-data /var/www/epic-web/dist
// sudo chmod -R 755 /var/www/epic-web
