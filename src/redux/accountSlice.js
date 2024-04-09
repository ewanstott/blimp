import { createSlice } from "@reduxjs/toolkit";
import { getStore, saveStore } from "./diskUtils";

//Initial State
// const initialState = { screen: 0 }; //screen 0 = signup //screen 1: login //screen 2: dashboard
const initialState = {
  // user: null,
  loggedIn: false,
  users: [],
  currentUser: null,
};

//Show as initial state in dash:
// , favouritePractitioners: [
//   practitioner.name: "Taylor Gibney", {practitioner.specialization}
// ]

const diskData = getStore();

//Slice creation
export const accountSlice = createSlice({
  name: "account",
  initialState: diskData ? diskData : initialState, //use diskData if exists, otherwise use ititialState
  //reducer mutates the store -> adding, deleting, editing
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
      state.loggedIn = true;
      state.users.push(payload);
      console.log("Payload:", payload);
    },
    setLoggedIn: (state, { payload }) => {
      state.loggedIn = payload;
      if (!payload) {
        state.currentUser = null; // Clear currentUser when logging out
      }
    },
  },
});

//Action Creators
export const { setCurrentUser, setLoggedIn, logoutUsers } =
  accountSlice.actions;
//setLoggedOut - not needed

//Selectors - extract specific pieces of state from the Redux store.
// gets data from store
// export const selectUser = (state) => state.account.user;
export const selectCurrentUser = (state) => state.account.currentUser;
// export const selectScreen = (state) => state.account.screen;
export const selectLoggedIn = (state) => state.account.loggedIn;

export default accountSlice.reducer;
