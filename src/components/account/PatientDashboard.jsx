import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setLoggedIn } from "../../redux/accountSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  selectFavourites,
  selectPractitionerData,
} from "../../redux/practitionerSlice";
import MainButton from "../MainButton";
import { selectMessages, sendMessage } from "../../redux/messageSlice";
import { useState } from "react";
import MessageInput from "../message/MessageInput";
import axios from "axios";

const PatientDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messages = useSelector(selectMessages);

  // Access the currently logged-in user directly
  const user = useSelector(selectCurrentUser);
  const favourites = useSelector(selectFavourites);
  const practitionerData = useSelector(selectPractitionerData); //access to practinioner data here
  const [replyContent, setReplyContent] = useState("");

  console.log("User:", user);
  console.log("User ID:", user.id);
  console.log(user.currentUser.name);

  const handleDeleteAccount = async () => {
    try {
      // Send delete request to backend
      const response = await axios.delete(
        `http://localhost:6001/patient/delete/${user.id}`
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

  // const onReply = (messageId) => {
  //   dispatch(
  //     sendMessage({
  //       id: messageId,
  //       content: replyContent,
  //       senderType: "patient",
  //       sender: user.name,
  //     })
  //   );
  //   // Clear reply content after sending
  //   setReplyContent("");
  // };

  if (!user) {
    return <p>Loading data...</p>;
  }

  return (
    <>
      <div className="patientDashboardContainer">
        <div className="patientDashboardText">
          <h1>Patient Dashboard</h1>
          <p>Name: {user.currentUser.name}</p>
          <p>Email: {user.currentUser.email}</p>

          <div className="patientDashMessages">
            <h3>Latest Messages</h3>
            <ul>
              {messages.map((message, index) => (
                <li key={index}>
                  {user.name}: {message.content}
                  {message.replies && (
                    <ul>
                      {message.replies.map((reply, index) => (
                        <li key={index}>
                          {reply.sender} {reply.content}
                        </li>
                      ))}
                    </ul>
                  )}
                  <div>
                    {/* <textarea
                      value={replyContent}
                      onChange={(e) => setReplyContent(e.target.value)}
                      placeholder="Type your reply here"
                    /> */}
                    <MessageInput senderType="patient" sender={user.name} />

                    {/* <button onClick={() => onReply(message.id)}>Reply</button> */}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <p>Favourite Health Heroes:</p>
          <div>
            {favourites.map((favId) => {
              const practitioner = practitionerData.find(
                (practitioner) => practitioner.id === favId
              );
              return practitioner ? (
                <div key={practitioner.id}>
                  <div className="favouriteCardContainer">
                    <h3>{practitioner.name}</h3>
                    <img src={practitioner.image} alt={practitioner.name} />
                    <p>{practitioner.specialization}</p>
                    <Link to={`/practitioner/${practitioner.id}`}>
                      View Details
                    </Link>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
        <MainButton
          onClick={() => {
            dispatch(setLoggedIn(false));
            navigate("/");
          }}
          text="Logout"
        />
        <MainButton onClick={handleDeleteAccount} text="Delete Account" />
        {/* <button
          className="button"
          onClick={() => {
            dispatch(setLoggedIn(false)); 
            navigate("/"); 
          }}
        >
          Logout
        </button> */}
      </div>
    </>
  );
};

export default PatientDashboard;
