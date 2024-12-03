import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/user/userAuthSlice";
import { apiSlice } from "../features/api/apiSlice";
import totalSlice from "../features/dashboardStat/totalSlice";

const store = configureStore({
  reducer: {
    auth: userSlice,
    totals: totalSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
