/** @format */

import { configureStore } from "@reduxjs/toolkit";
import { sliceReducer } from "./slice";

const store = configureStore({
  reducer: {
    movieReducer: sliceReducer,
  },
});

export default store;
