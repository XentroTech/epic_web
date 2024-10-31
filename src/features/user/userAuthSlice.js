import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: JSON.parse(localStorage.getItem("accessToken"))?.token || undefined,
  user: JSON.parse(localStorage.getItem("accessToken"))?.user || undefined,
  resetEmail: undefined,
};

const userAuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.token = undefined;
      state.user = undefined;
      localStorage.removeItem("accessToken");
      sessionStorage.removeItem("accessToken");
    },
    setResetEmail: (state, action) => {
      state.resetEmail = action.payload;
    },
  },
});

export const { userLoggedIn, userLoggedOut, setResetEmail } =
  userAuthSlice.actions;
export default userAuthSlice.reducer;
