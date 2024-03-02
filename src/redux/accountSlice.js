import { createSlice } from "@reduxjs/toolkit";
import sha256 from "sha256";
import { getStore, saveStore } from "./diskUtils";

//Initial State
const initialState = { screen: 0 }; //screen 0 = signup //screen 1: login //screen 2: dashboard

//Show as initial state in dash:
// , favouritePractitioners: [
//   practitioner.name: "Taylor Gibney", {practitioner.specialization}
// ]

const diskData = getStore();

//Slice creation
export const accountSlice = createSlice({
  name: "account",
  initialState: diskData ? diskData : initialState,
  //reducer mutates the store -> adding, deleting, editing
  reducers: {
    setNewUser: (state, { payload }) => {
      payload.password = sha256(payload.password + "jump-ch16");
      state.user = payload;
      saveStore(state);
    },
    setScreen: (state, { payload }) => {
      state.screen = payload;
      saveStore(state);
    },
    setLoggedIn: (state) => {
      state.loggedIn = !state.loggedIn;
      saveStore(state);
    },
  },
});

//Action Creators
export const { setNewUser, setScreen, setLoggedIn } = accountSlice.actions;

//Selectors - extract specific pieces of state from the Redux store.
// gets data from store
export const selectUser = (state) => state.account.user;
export const selectScreen = (state) => state.account.screen;
export const selectLoggedIn = (state) => state.account.loggedIn;

export default accountSlice.reducer;
