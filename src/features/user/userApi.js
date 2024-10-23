import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./userAuthSlice";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),

    loginUser: builder.mutation({
      query: (body) => ({
        url: `/login`,
        method: "POST",
        body: body,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          localStorage.setItem(
            "accessToken",
            JSON.stringify({
              token: result?.data?.token,
              user: result?.data?.user,
            })
          );
          sessionStorage.setItem(
            "accessToken",
            JSON.stringify({
              token: result?.data?.token,
              user: result?.data?.user,
            })
          );

          dispatch(
            userLoggedIn({
              token: result?.data?.token,
              user: result?.data?.user,
            })
          );
        } catch (err) {
          console.log(err);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    updateUser: builder.mutation({
      query: ({ id, user }) => ({
        url: `/updateUser/${id}`,
        method: "PATCH",
        body: user,
      }),
    }),
    allUsers: builder.query({
      query: () => `/getAllUser`,
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/deleteUser/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useAllUsersQuery,
  useDeleteUserMutation,
  useLogoutMutation,
} = userApi;
