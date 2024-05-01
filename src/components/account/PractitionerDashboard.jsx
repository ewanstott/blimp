import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setLoggedIn } from "../../redux/accountSlice";
import { useNavigate } from "react-router-dom";
import {
  selectPractitionerData,
  setNotification,
} from "../../redux/practitionerSlice";
import MainButton from "../MainButton";
import { selectMessages, sendMessage } from "../../redux/messageSlice";
import { useEffect, useState } from "react";
import MessageInput from "../message/MessageInput";
import axios from "axios";

const PractitionerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const practitionerData = useSelector(selectPractitionerData); //access to practinioner data here
  const messages = useSelector(selectMessages);

  // const [replyContent, setReplyContent] = useState("");

  //all message between practitioner and patients
  //seperate screen for each conversation
  //Pateitn profile shows conversation between practitioner and patient
  //same SQL, just other way round i.e. sender switches to receiver...

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:6001/message/history/${user.id}`,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        console.log(response);
        console.log("Message received:", response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [user.id]); //remove user.id ??

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
        `http://localhost:6001/practitioner/delete/`,
        {
          headers: { token: localStorage.getItem("token") },
        }
      );
      console.log(response.data);
      if (response.data.status === 1) {
        // If deletion is successful, logout the user and navigate to the home page
        dispatch(setLoggedIn(false));
        localStorage.removeItem("token");
        dispatch(setNotification("Account deleted!"));
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

  return (
    <div className="practitionerDashboardContainer">
      <div className="practitionerDashboardCard">
        <h2>Practitioner Details</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        {user.image && (
          <p>
            <img src={user.image} alt={user.name} />
          </p>
        )}

        <p>
          <strong>Qualifications:</strong> {user.qualifications}
        </p>
        <p>
          <strong>Specialization:</strong> {user.specialization}
        </p>
        <p>
          <strong>Experience (years):</strong> {user.experience}
        </p>
        <p>
          <strong>About:</strong> {user.about}
        </p>
      </div>
      <div className="practitionerDashboardCard practitionerDashMessages">
        <h2>Latest Messages</h2>
        <ul>
          {messages &&
            messages.map((message, index) => (
              <li
                key={index}
                className={message.receiver.id ? "receiver" : "sender"}
              >
                {message.sender}: {message.content}
              </li>
            ))}
        </ul>
        <MessageInput
          senderType="practitioner"
          sender={practitionerData.name}
        />
      </div>
      <MainButton onClick={handleLogout} text="Logout" />
      <MainButton onClick={handleDeleteAccount} text="Delete Account" />
    </div>
  );
};

export default PractitionerDashboard;
