import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import mainWidthReducer from "./mainWidthSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    mainWidth: mainWidthReducer,
  },
});
