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
    forgotPassword: builder.mutation({
      query: (email) => ({
        url: "/forgotPassword",
        method: "POST",
        body: email,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (otp) => ({
        url: "/verify/resetPasswordOtp",
        method: "POST",
        body: otp,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ email, password }) => ({
        url: `/password/reset/${email}`,
        method: "PATCH",
        body: { password },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    allUsers: builder.query({
      query: ({ searchQuery = "", currentPage = 1 }) =>
        `/getUsers?query=${searchQuery}&page=${currentPage}&limit=10`,
      providesTags: ["Users"],
    }),

    getUser: builder.query({
      query: (id) => ({
        url: `getUser/${id}`,
      }),
      providesTags: ["User"],
    }),
    updateUserProfile: builder.mutation({
      query: (formData) => ({
        url: `/updateProfile`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: ({ id, user }) => ({
        url: `/updateUser/${id}`,
        method: "PATCH",
        body: user,
      }),
    }),

    updateUserRole: builder.mutation({
      query: ({ id, role }) => ({
        url: `/admin/update/role/${id}`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/deleteUser/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    activateOrDeactivateUser: builder.mutation({
      query: (id) => ({
        url: `/activeOrDeactivateUser/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Users"],
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
  useUpdateUserRoleMutation,
  useActivateOrDeactivateUserMutation,
  useGetUserQuery,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
  useUpdateUserProfileMutation,
} = userApi;
