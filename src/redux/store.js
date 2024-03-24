import { configureStore } from "@reduxjs/toolkit";
import practitionerReducer from "./practitionerSlice";
import accountReducer from "./accountSlice";
import messageReducer from "./messageSlice";

export const store = configureStore(
  {
    reducer: {
      practitioner: practitionerReducer,
      account: accountReducer,
      message: messageReducer,
    },
  },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
