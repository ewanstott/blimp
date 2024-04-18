import React from "react";
import { MessageBox } from "react-chat-elements";
import "../../css/Chat.css";

const Chat = () => {
  return (
    <div className="chat-container">
      {/* Receiver's message */}
      <MessageBox
        position={"left"}
        type={"text"}
        text={"Hello! How can I help you?"}
        className="receiver-message"
      />
      {/* Sender's message */}
      <MessageBox
        position={"right"}
        type={"text"}
        text={"Hi! I have a question about my appointment."}
        className="sender-message"
      />
      {/* Message input field */}
      <input
        type="text"
        className="message-input"
        placeholder="Type your message..."
      />
      <button className="send-button">Send</button>
    </div>
  );
};

export default Chat;
