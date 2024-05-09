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
import { formatTimestamp } from "../../utils";

const PractitionerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const practitionerData = useSelector(selectPractitionerData); //access to practinioner data here
  const messages = useSelector(selectMessages);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [messageHistory, setMessageHistory] = useState([]);

  // const [replyContent, setReplyContent] = useState("");

  //all message between practitioner and patients
  //seperate screen for each conversation
  //Pateitn profile shows conversation between practitioner and patient
  //same SQL, just other way round i.e. sender switches to receiver...

  useEffect(() => {
    const fetchMessageHistory = async () => {
      setMessageHistory([]);
      try {
        if (selectedPatient) {
          const response = await axios.get(
            `http://localhost:6001/message/history/${selectedPatient.id}`,
            {
              headers: { token: localStorage.getItem("token") },
            }
          );
          console.log(response.data);
          if (response.data.status === 1) {
            setMessageHistory(response.data.messages);
            console.log(setMessageHistory);
          } else {
            console.error("Failed to fetch message history");
          }
        }
      } catch (error) {
        console.error("Error fetching message history:", error);
      }
    };

    fetchMessageHistory();
  }, [selectedPatient]);

  useEffect(() => {
    const fetchMessagedPatients = async () => {
      try {
        const response = await axios.get(
          `http://localhost:6001/message/list-patients`,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        console.log(response.data);
        setPatients(response.data.patients);
      } catch (error) {
        console.error("Error fetching messaged patients:", error);
      }
    };

    fetchMessagedPatients();
  }, []);

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
  };

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

      <div className="practitionerDashboardCard">
        <h2>List of Patients</h2>
        <ul>
          {patients.map((patient) => (
            <li key={patient.id} className="patientCard">
              <div className="patientInfo">
                <p className="patientName">{patient.name}</p>
              </div>
              <div className="correspondenceButtonContainer">
                <button
                  className="correspondenceButton"
                  onClick={() => handlePatientSelect(patient)}
                >
                  View Correspondence
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {selectedPatient && (
        <div className="practitionerDashboardCard">
          <h2>Correspondence with {selectedPatient.name}</h2>
          <div className="messageHistoryContainer">
            {messageHistory.length > 0 ? (
              <ul>
                {messageHistory.map((message) => (
                  <li
                    key={message.messageId}
                    className={
                      message.senderType === "patient"
                        ? "patient-message"
                        : "practitioner-message"
                    }
                  >
                    <p>
                      <strong>
                        {message.senderType === "patient"
                          ? selectedPatient.name
                          : practitionerData.name}
                        :{" "}
                      </strong>
                      {message.message}
                    </p>
                    <p>Sent at: {formatTimestamp(message.sent_at)}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No message history available.</p>
            )}

            <div>
              <MessageInput
                practitionerId={selectedPatient.id}
                sender={user.name}
                senderType="practitioner"
              />
            </div>
          </div>
        </div>
      )}

      <MainButton onClick={handleLogout} text="Logout" />
      <MainButton onClick={handleDeleteAccount} text="Delete Account" />
    </div>
  );

  // return (
  //   <div className="practitionerDashboardContainer">
  //     <div className="practitionerDashboardCard">
  //       <h2>Practitioner Details</h2>
  //       <p>
  //         <strong>Name:</strong> {user.name}
  //       </p>
  //       <p>
  //         <strong>Email:</strong> {user.email}
  //       </p>
  //       {user.image && (
  //         <p>
  //           <img src={user.image} alt={user.name} />
  //         </p>
  //       )}

  //       <p>
  //         <strong>Qualifications:</strong> {user.qualifications}
  //       </p>
  //       <p>
  //         <strong>Specialization:</strong> {user.specialization}
  //       </p>
  //       <p>
  //         <strong>Experience (years):</strong> {user.experience}
  //       </p>
  //       <p>
  //         <strong>About:</strong> {user.about}
  //       </p>
  //     </div>

  //     <div className="practitionerDashboardCard">
  //       <h2>List of Patients</h2>
  //       <ul>
  //         {patients.map((patient) => (
  //           <li key={patient.id}>
  //             {patient.name}
  //             <button
  //               className="correspondanceButton"
  //               onClick={() => handlePatientSelect(patient)}
  //             >
  //               View Correspondence
  //             </button>
  //           </li>
  //         ))}
  //       </ul>
  //     </div>
  //     {selectedPatient && (
  //       <div className="practitionerDashboardCard">
  //         <h2>Correspondence with {selectedPatient.name}</h2>
  //         <div className="messageHistoryContainer">
  //           {messageHistory.length > 0 ? (
  //             <ul>
  //               {messageHistory.map((message) => (
  //                 <li
  //                   key={message.messageId}
  //                   className={
  //                     message.senderType === "patient"
  //                       ? "patient-message"
  //                       : "practitioner-message"
  //                   }
  //                 >
  //                   <p>
  //                     <strong>
  //                       {message.senderType === "patient"
  //                         ? selectedPatient.name
  //                         : practitionerData.name}
  //                       :{" "}
  //                     </strong>
  //                     {message.message}
  //                   </p>
  //                   <p>Sent at: {formatTimestamp(message.sent_at)}</p>
  //                 </li>
  //               ))}
  //             </ul>
  //           ) : (
  //             <p>No message history available.</p>
  //           )}

  //           <div>
  //             <MessageInput
  //               practitionerId={selectedPatient.id}
  //               sender={user.name}
  //               senderType="practitioner"
  //             />
  //           </div>
  //         </div>
  //       </div>
  //     )}

  //     <MainButton onClick={handleLogout} text="Logout" />
  //     <MainButton onClick={handleDeleteAccount} text="Delete Account" />
  //   </div>
  // );
};

export default PractitionerDashboard;
