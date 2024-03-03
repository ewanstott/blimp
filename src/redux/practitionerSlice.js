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
    setMessage: (state, { payload }) => {
      state.message = payload;
    },
  },
});

//Action Creators
export const { setPractitionerData, setSearchTerm, setMessage } =
  practitionerSlice.actions;

//Selectors - extract specific pieces of state from the Redux store.
// gets data from store
export const selectMessage = (state) => state.practitioner.message;
export const selectPractitionerData = (state) =>
  state.practitioner.practitionerData;
export const selectSearchTerm = (state) => state.practitioner.searchTerm;
// export const selectSinglePractitioner = (state) => {
//   return state.practitioner.practitionerData.find((practitioner) => {
//     return practitioner.id === 1;
//   });
// };

export default practitionerSlice.reducer;
