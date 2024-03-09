import { createSlice } from "@reduxjs/toolkit";
import sha256 from "sha256";
import { getStore, saveStore } from "./diskUtils";

//Initial State
// const initialState = { screen: 0 }; //screen 0 = signup //screen 1: login //screen 2: dashboard
const initialState = {
  user: null,
  loggedIn: false,
  users: [],
}; //screen 0 = signup //screen 1: login //screen 2: dashboard

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
    //change to setCurrentUser?
    setNewUser: (state, { payload }) => {
      console.log(payload);
      const tempData = { ...payload };
      const tempPassword = sha256(tempData.password);
      tempData.password = tempPassword;
      state.user = tempData;

      //ADD ARRAY FOR USERS HERE (overwriting at present)
      state.users.push(tempData);

      saveStore(state);
    },
    // setScreen: (state, { payload }) => {
    //   state.screen = payload;
    //   saveStore(state);
    // },
    // setLoggedIn: (state) => {
    //   state.loggedIn = !state.loggedIn;
    //   saveStore(state);
    setLoggedIn: (state, { payload }) => {
      state.loggedIn = payload;
      saveStore(state);
    },
    // setLoggedOut: (state) => {
    //   state.user = null;
    //   state.loggedIn = false;
    //   saveStore(state);
    // },

    //Add userType to store ?
  },
});

//Action Creators
export const { setNewUser, setLoggedIn } = accountSlice.actions;
//setLoggedOut - not needed

//Selectors - extract specific pieces of state from the Redux store.
// gets data from store
export const selectUser = (state) => state.account.user;
// export const selectScreen = (state) => state.account.screen;
export const selectLoggedIn = (state) => state.account.loggedIn;

export default accountSlice.reducer;
