import { configureStore } from "@reduxjs/toolkit";
import practitionerReducer from "./practitionerSlice";

export const store = configureStore(
  {
    reducer: {
      practitioner: practitionerReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
