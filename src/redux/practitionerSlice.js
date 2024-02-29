import { createSlice } from "@reduxjs/toolkit";

const initialState = {};
export const practitionerSlice = createSlice({
  name: "practitioner",
  initialState,
  reducers: {
    setPractitionerData: (state, { payload }) => {
      state.practitionerData = payload; //this data will now live in the store
    },
  },
});

export const { setPractitionerData } = practitionerSlice.actions;

export const selectCount = (state) => state.practitioner.value;

export default practitionerSlice.reducer;
