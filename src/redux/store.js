import { configureStore } from "@reduxjs/toolkit";
import practitionerReducer from "./practitionerSlice";
import accountReducer from "./accountSlice";

export const store = configureStore(
  {
    reducer: {
      practitioner: practitionerReducer,
      account: accountReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
