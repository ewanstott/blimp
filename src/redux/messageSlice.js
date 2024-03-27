import { createSlice } from "@reduxjs/toolkit";

//Initial State
const initialState = { messages: [] };

//Slice creation
export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    // sendMessage: (state, { payload }) => {
    //   state.messages.push(payload); //this data will now live in the store
    // },
    sendMessage: (state, { payload }) => {
      // Find message by ID
      const message = state.messages.find((msg) => msg.id === payload.id);
      // check if message with id found
      if (message) {
        // Add reply to message
        if (!message.replies) {
          //if message found, reply to message
          message.replies = []; // If replies array doesn't exist, initialize it
        }
        //push reply onto replies array
        message.replies.push({
          content: payload.content,
          sender: payload.sender,
          // timestamp: new Date(),
        });
      } else {
        //If msg doesnt exist, push entire message
        state.messages.push(payload);
      }
    },
  },
});

//Action Creators
export const { sendMessage } = messageSlice.actions;

//Selectors - extract specific pieces of state from the Redux store.
// gets data from store
export const selectMessages = (state) => state.message.messages;

export default messageSlice.reducer;
