import { createSlice } from "@reduxjs/toolkit";

//Initial State
const initialState = { messages: [] };

//Slice creation
export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    sendMessage: (state, { payload }) => {
      state.messages.push = payload; //this data will now live in the store
    },
    // Add additional reducers for receiving messages, if needed
  },
});

//Action Creators
export const { sendMessage } = messageSlice.actions;

//Selectors - extract specific pieces of state from the Redux store.
// gets data from store
// export const selectMessage = (state) => state.practitioner.message;

export default messageSlice.reducer;
