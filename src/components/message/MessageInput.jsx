import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../redux/messageSlice";
import MainButton from "../MainButton";
import { selectCurrentUser } from "../../redux/accountSlice";

const MessageInput = ({ senderType, sender }) => {
  const [message, setMessage] = useState("");

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    // Send message to backend
    const response = await sendMessage({ senderType, sender, message });
    // Handle response from backend if needed
    setMessage(""); // Clear message input
  };

  return (
    <form onSubmit={handleMessageSubmit}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"
      />
      <button type="submit">Send</button>
    </form>
  );
};

// const MessageInput = ({ sender, senderType }) => {
//   const dispatch = useDispatch();
//   const [message, setMessage] = useState(""); //store message in local state
//   const user = useSelector(selectCurrentUser);

//   // console.log(user);
//   // console.log(message);

//   const onSubmit = () => {
//     if (message.trim() !== "") {
//       // Check if message is not empty or just whitespace
//       dispatch(
//         sendMessage({
//           content: message,
//           senderType: senderType,
//           sender: sender,
//         })
//       ); //dispatch action to store
//       setMessage(""); //clear message input
//     }
//   };

//   return (
//     <div className="sendMessageContainer">
//       <textarea
//         value={message}
//         onChange={(e) => setMessage(e.target.value)}
//         placeholder="Type your message here"
//       />
//       {/* <button onClick={onSubmit}>Enquire Now</button> */}
//       <MainButton onClick={onSubmit} text="Send" />
//     </div>
//   );
// };

// export default MessageInput;
