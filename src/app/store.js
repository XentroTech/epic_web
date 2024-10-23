import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userAuthSlice";
import { apiSlice } from "../features/api/apiSlice";

const store = configureStore({
  reducer: {
    userAuth: userSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
