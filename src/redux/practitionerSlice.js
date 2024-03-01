import { createSlice } from "@reduxjs/toolkit";

//Initial State
const initialState = {};

//Slice creation
export const practitionerSlice = createSlice({
  name: "practitioner",
  initialState,
  //reducer mutates the store -> adding, deleting, editing
  reducers: {
    setPractitionerData: (state, { payload }) => {
      state.practitionerData = payload; //this data will now live in the store
    },
    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
    },
  },
});

//Action Creators
export const { setPractitionerData, setSearchTerm } = practitionerSlice.actions;

//Selectors - extract specific pieces of state from the Redux store.
//selector gets data from store
export const selectPractitionerData = (state) =>
  state.practitioner.practitionerData;
export const selectSearchTerm = (state) => state.practitioner.searchTerm;

export default practitionerSlice.reducer;
