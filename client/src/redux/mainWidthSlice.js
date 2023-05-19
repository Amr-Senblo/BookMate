import { createSlice } from "@reduxjs/toolkit";

export const mainWidthSlice = createSlice({
  name: "mainWidth",
  initialState: {
    value: 0,
  },
  reducers: {
    setMainWidth: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setMainWidth } = mainWidthSlice.actions;
export default mainWidthSlice.reducer;
