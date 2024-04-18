import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setLoggedIn } from "../../redux/accountSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  selectFavourites,
  selectPractitionerData,
  setNotification,
} from "../../redux/practitionerSlice";
import MainButton from "../MainButton";
import { selectMessages, sendMessage } from "../../redux/messageSlice";
import { useState } from "react";
import MessageInput from "../message/MessageInput";
import axios from "axios";
import { MessageBox } from "react-chat-elements";
import Chat from "../message/chat";

const PatientDashboard = () => {
  //{userType}
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messages = useSelector(selectMessages);

  // Access the currently logged-in user directly
  const user = useSelector(selectCurrentUser);
  const favourites = useSelector(selectFavourites);
  const practitionerData = useSelector(selectPractitionerData); //access to practinioner data here
  // const [replyContent, setReplyContent] = useState("");

  const handleLogout = async () => {
    console.log("Logout button clicked");
    const { data } = await axios.delete(
      `http://localhost:6001/patient/logout`, //add ${user.id} ??
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
        `http://localhost:6001/patient/delete`,
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
  console.log("User:", user);

  if (!user) {
    return <p>Loading data...</p>;
  }

  return (
    <>
      <div className="patientDashboardContainer">
        <div className="patientDashboardText">
          <h1>Patient Dashboard</h1>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>

          <div className="patientDashMessages">
            <h3>Latest Messages</h3>
            {/* <div className="App">
              <h1>My Chat App</h1>
              <Chat />
            </div> */}
            <MessageInput senderType="patient" sender={user.name} />
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
          onClick={handleLogout}
          // onClick={() => {
          //   dispatch(setLoggedIn(false));
          //   navigate("/");
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
