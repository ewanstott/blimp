import { configureStore } from "@reduxjs/toolkit";
import practitionerReducer from "./practitionerSlice";

export const store = configureStore({
  reducer: {
    practitioner: practitionerReducer,
  },
});
