import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: undefined,
  user: undefined,
};

const userAuthSlice = createSlice({
  name: "userAuthSlice",
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.token = undefined;
      state.user = undefined;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = userAuthSlice.actions;
export default userAuthSlice.reducer;
