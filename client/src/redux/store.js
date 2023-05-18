import { configureStore } from "@reduxjs/toolkit";
import mainWidthReducer from "./mainWidthSlice";

export const store = configureStore({
  reducer: {
    mainWidth: mainWidthReducer,
  },
});
