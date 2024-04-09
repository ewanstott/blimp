import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setLoggedIn } from "../../redux/accountSlice";
import { useNavigate } from "react-router-dom";
import { selectPractitionerData } from "../../redux/practitionerSlice";
import MainButton from "../MainButton";
import { selectMessages, sendMessage } from "../../redux/messageSlice";
import { useState } from "react";
import MessageInput from "../message/MessageInput";
import axios from "axios";

const PractitionerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const practitionerData = useSelector(selectPractitionerData); //access to practinioner data here
  const messages = useSelector(selectMessages);

  // const [replyContent, setReplyContent] = useState("");

  console.log("User data:", user);

  const handleLogout = async () => {
    console.log("Logout button clicked");
    const { data } = await axios.delete(
      `http://localhost:6001/practitioner/logout`, //add ${user.id} ??
      {
        headers: { token: localStorage.getItem("token") },
      }
    );
    console.log("Logout response:", data); // Log the response
    if (data.status) {
      localStorage.removeItem("token");
      dispatch(setLoggedIn(false));
      navigate("/");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Send delete request to backend
      const response = await axios.delete(
        `http://localhost:6001/practitioner/delete/${user.id}`
      );
      console.log(response.data);
      if (response.data.status === 1) {
        // If deletion is successful, logout the user and navigate to the home page
        dispatch(setLoggedIn(false));
        navigate("/");
      } else {
        // Handle deletion failure
        console.error("Failed to delete account:", response.data.reason);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  //check if there is a practitionerData
  if (!user) {
    return <p>Loading data...</p>;
  }

  console.log(user);
  return (
    <>
      <div className="practitionerDashboardContainer">
        <div className="practitionerDashboardText">
          <h1>Practitioner Dashboard</h1>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>
            <img src={user.image} />
          </p>
          <h3>Your Details</h3>
          <p>About: {user.about}</p>
          <p>Qualifications: {user.qualifications}</p>
          <p>Specialization: {user.specialization}</p>

          <div className="practitionerDashMessages">
            <h3>Latest Messages</h3>
            {/* <ul>
              {messages &&
                messages.map((message, index) => (
                  <li key={index}>
                    {message.sender}: {message.content}
                    {message.replies && (
                      <ul>
                        {message.replies.map((reply, index) => (
                          <li key={index}>
                            {reply.sender} {reply.content}
                          </li>
                        ))}
                      </ul>
                    )} */}
            {/* <div>
                      <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Type your reply here"
                      />
                    </div> */}
            <MessageInput
              senderType="practitioner"
              sender={practitionerData.name}
            />
            {/* <button onClick={() => onReply(message.id)}>Reply</button> */}
            {/* </li>
                ))}
            </ul> */}
          </div>
        </div>
        <MainButton
          onClick={handleLogout}
          // onClick={() => {
          //   dispatch(setLoggedIn(false));
          //   navigate("/");
          // }}
          text="Logout"
        />
        <MainButton onClick={handleDeleteAccount} text="Delete Account" />
        {/* <button
          className="button"
          onClick={() => {
            dispatch(setLoggedIn(false)); //updates logged in status
            navigate("/"); //naviages back to home page
          }}
        >
          Logout
        </button> */}
      </div>
    </>
  );
};

export default PractitionerDashboard;
