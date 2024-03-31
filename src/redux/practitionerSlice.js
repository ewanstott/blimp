import { createSlice } from "@reduxjs/toolkit";

//Initial State
const initialState = { favourites: [] }; //  practitionerData: null, add

//Slice creation
export const practitionerSlice = createSlice({
  name: "practitioner",
  initialState,

  //reducer mutates the store -> adding, deleting, editing
  //   state: Represents the current state of the slice.
  // { payload }: Contains the data that will be used to update the state.
  reducers: {
    setPractitionerData: (state, { payload }) => {
      state.practitionerData = payload; //this data will now live in the store
    },
    setSearchTerm: (state, { payload }) => {
      state.searchTerm = payload;
    },
    setNotification: (state, { payload }) => {
      state.notification = payload;
    },
    //Redux Reducer: When the setFavourite action is dispatched, it triggers the execution of the corresponding reducer function in the practitionerSlice.
    //This reducer updates the Redux state to add or remove the practitioner from the favourites list based on whether they are already present in the list or not.
    setFavourite: (state, { payload }) => {
      console.log(state);
      console.log(payload);
      console.log(state.favourites);
      const index = state.favourites.findIndex(
        (practitionerId) => practitionerId === payload
      );
      if (index === -1) {
        state.favourites.push(payload);
      } else {
        state.favourites.splice(index, 1);
      }
    },
  },
});

//Action Creators
export const {
  setPractitionerData,
  setSearchTerm,
  setNotification,
  setFavourite,
} = practitionerSlice.actions;

//Selectors - extract specific pieces of state from the Redux store.
// gets data from store
export const selectPractitionerData = (state) =>
  state.practitioner.practitionerData;
export const selectSearchTerm = (state) => state.practitioner.searchTerm;
export const selectNotification = (state) => state.practitioner.notification;
export const selectFavourites = (state) => state.practitioner.favourites; // Select favourites from state
// export const selectSinglePractitioner = (state) => {
//   return state.practitioner.practitionerData.find((practitioner) => {
//     return practitioner.id === 1;
//   });
// };

export default practitionerSlice.reducer;
