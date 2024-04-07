import { createSlice } from "@reduxjs/toolkit";
import sha256 from "sha256";
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
    //changed from setNewUser?
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
      state.loggedIn = true;
      state.users.push(payload);
      console.log("Payload:", payload);
      // const tempData = { ...payload };
      // const tempPassword = sha256(tempData.password);
      // tempData.password = tempPassword;
      // state.user = tempData;

      //ADD ARRAY FOR USERS HERE (overwriting at present)

      // Check if state.users exists before pushing into it
      // if (state.users) {
      //   state.users.push(tempData);
      // } else {
      //   state.users = [tempData]; // Initialize state.users if it's undefined
      // }
      // saveStore(state); //remove?
    },
    setLoggedIn: (state, { payload }) => {
      state.loggedIn = payload;

      if (payload) {
        // Set the currently logged-in user when logging in
        state.user = payload;
      } else {
        state.user = null; // Clear currentUser when logging out
      }
      // saveStore(state);
    },
  },
});

//Action Creators
export const { setCurrentUser, setLoggedIn } = accountSlice.actions;
//setLoggedOut - not needed

//Selectors - extract specific pieces of state from the Redux store.
// gets data from store
// export const selectUser = (state) => state.account.user;
export const selectCurrentUser = (state) => state.account.currentUser;
// export const selectScreen = (state) => state.account.screen;
export const selectLoggedIn = (state) => state.account.loggedIn;

export default accountSlice.reducer;
