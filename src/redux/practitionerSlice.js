import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
export const practitionerSlice = createSlice({
  name: "practitioner",
  initialState,
  //reducer mutates the store -> adding, deleting, editing
  reducers: {
    setPractitionerData: (state, { payload }) => {
      state.practitionerData = payload; //this data will now live in the store
    },
  },
});

export const { setPractitionerData } = practitionerSlice.actions;

//selector gets data from store
export const selectPractitionerData = (state) =>
  state.practitioner.practitionerData;

export default practitionerSlice.reducer;
