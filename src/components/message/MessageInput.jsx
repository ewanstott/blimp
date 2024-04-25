import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MainButton from "../MainButton";
import { selectCurrentUser } from "../../redux/accountSlice";
import { setNotification } from "../../redux/practitionerSlice";
import axios from "axios";

const MessageInput = ({ practitionerId, sender, senderType }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleMessageSubmit = async () => {
    console.log("Send msg button clicked from practitionerDetails");
    try {
      const response = await axios.post(
        `http://localhost:6001/message/add`,
        { receiver_id: practitionerId, message: message },
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      if (response.data.status) {
        console.log("Message sent successfully:", response.data); // Log the response
        dispatch(setNotification("Message sent"));
        setMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"
      />
      <MainButton onClick={handleMessageSubmit} type="submit" text="Send" />
    </>
  );
};

export default MessageInput;
