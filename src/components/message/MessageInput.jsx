import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../redux/messageSlice";

const MessageInput = () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(""); //store message in local state

  console.log(message);

  const onSubmit = () => {
    dispatch(sendMessage(message)); //used to dispatch actions to the Redux store.
    setMessage("");
  };

  return (
    <div>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"
      />
      <button onClick={onSubmit}>Enquire Now</button>
    </div>
  );
};

export default MessageInput;
