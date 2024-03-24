import React, { useState } from "react";
import { useDispatch } from "react-redux"; //used to dispatch actions to the Redux store.
import { sendMessage } from "../../redux/messageSlice";

const MessageInput = () => {
  const dispatch = useDispatch();
  const [messsage, setMessage] = useState(""); //store message in local state

  const handleSubmit = () => {
    dispatch(sendMessage(messsage));
    setMessage("");
  };

  return (
    <div>
      <textarea value={message} placeholder="Type your message here" />
      <button onClick={handleSubmit}>Enquire Now</button>
    </div>
  );
};

export default MessageInput;
