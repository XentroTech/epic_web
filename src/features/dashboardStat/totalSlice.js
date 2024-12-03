import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  coin: { count: 0, earnings: 0 },
  image: { count: 0, earnings: 0 },
  space: { count: 0, earnings: 0 },
};

const totalSlice = createSlice({
  name: "totals",
  initialState,
  reducers: {
    setCoinTotals: (state, action) => {
      state.coin = action.payload;
    },
    setImageTotals: (state, action) => {
      state.image = action.payload;
    },
    setSpaceTotals: (state, action) => {
      state.space = action.payload;
    },
  },
});

export const { setCoinTotals, setImageTotals, setSpaceTotals } =
  totalSlice.actions;
export default totalSlice.reducer;
