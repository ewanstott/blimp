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
import { useEffect, useState } from "react";
import MessageInput from "../message/MessageInput";
import axios from "axios";
import { url } from "../../config";
// import { MessageBox } from "react-chat-elements";
// import Chat from "../message/chat";

const PatientDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messages = useSelector(selectMessages);
  const [messagedPractitioners, setMessagedPractitioners] = useState([]);

  // Access the currently logged-in user directly
  const user = useSelector(selectCurrentUser);
  const favourites = useSelector(selectFavourites);
  const practitionerData = useSelector(selectPractitionerData); //access to practinioner data here
  // const [replyContent, setReplyContent] = useState("");

  //////////////////////////////////////////////////
  useEffect(() => {
    const fetchMessagedPractitioners = async () => {
      try {
        const response = await axios.get(
          `${url}/message/list-practitioners`,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        console.log(response);
        if (response.data.status === 1) {
          setMessagedPractitioners(response.data.practitioners);
          console.log(response.data.practitioners);
          console.log(setMessagedPractitioners);
        } else {
          console.error("Failed to fetch messaged practitioners");
        }
      } catch (error) {
        console.error("Error fetching messaged practitioners:", error);
      }
    };

    fetchMessagedPractitioners();
  }, []);

  console.log(messagedPractitioners);

  //////////////////////////////////////////////////

  const handleLogout = async () => {
    console.log("Logout button clicked");
    const { data } = await axios.delete(
      `${url}/patient/logout`, //add ${user.id} ??
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
        `${url}/patient/delete`,
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
    <div className="patientDashboardContainer">
      <div className="patientDashboardCard">
        <h2>Patient Details</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
      <div className="patientDashboardCard">
        <h2>Practitioners You've Messaged</h2>
        <ul>
          {messagedPractitioners.length > 0 ? (
            messagedPractitioners.map((practitioner) => (
              <li key={practitioner.id}>
                <Link to={`/practitioner/${practitioner.id}`}>
                  {practitioner.name}
                </Link>
              </li>
            ))
          ) : (
            <p>No practitioners messaged.</p>
          )}
        </ul>
      </div>
      <div className="patientDashboardCard">
        <h2>Favourite Health Heroes</h2>
        {favourites.map((favId) => {
          const practitioner = practitionerData.find(
            (practitioner) => practitioner.id === favId
          );
          return practitioner ? (
            <div key={practitioner.id}>
              <h3>{practitioner.name}</h3>
              <img src={practitioner.image} alt={practitioner.name} />
              <p>{practitioner.specialization}</p>
              <Link to={`/practitioner/${practitioner.id}`}>View Details</Link>
            </div>
          ) : null;
        })}
      </div>
      <div className="patientDashboardActions">
        <MainButton onClick={handleLogout} text="Logout" />

        <MainButton onClick={handleDeleteAccount} text="Delete Account" />
      </div>
    </div>
  );
};

export default PatientDashboard;
