import { createSlice } from "@reduxjs/toolkit";
import { getStore, saveStore } from "./diskUtils";

//Initial State

const initialState = {
  loggedIn: localStorage.getItem("token"), //engineer out this line (we don't need this as token store in current user)
  users: [],
  currentUser: JSON.parse(localStorage.getItem("currentUser")),
};


const diskData = getStore();

//Slice creation
export const accountSlice = createSlice({
  name: "account",
  initialState: diskData ? diskData : initialState, //use diskData if exists, otherwise use ititialState
  //reducer mutates the store -> adding, deleting, editing
  reducers: {
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
      // state.loggedIn = localStorage.getItem("token");
      localStorage.setItem("currentUser", JSON.stringify(payload));
      state.users.push(payload);
      // console.log(state);
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
