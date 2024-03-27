import { useDispatch, useSelector } from "react-redux";
import { selectUser, setLoggedIn } from "../../redux/accountSlice";
import { useNavigate } from "react-router-dom";
import { selectPractitionerData } from "../../redux/practitionerSlice";
import MainButton from "../MainButton";
import { selectMessages } from "../../redux/messageSlice";

const PractitionerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const practitionerData = useSelector(selectPractitionerData); //access to practinioner data here
  const messages = useSelector(selectMessages);

  console.log("Messages received:", messages);

  if (!practitionerData) {
    return <p>Loading data...</p>;
  }

  return (
    <>
      <div className="practitionerDashboardContainer">
        <div className="practitionerDashboardText">
          <h1>Practitioner Dashboard</h1>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <h3>Your Details</h3>
          <p>About: {user.about}</p>
          <p>Qualifications: {user.qualifications}</p>
          <p>Specialization: {user.specialization}</p>

          <div className="practitionerDashMessages">
            <h3>Latest Messages</h3>
            <ul>
              {messages &&
                messages.map((message, index) => (
                  <li key={index}>
                    {message.patientName}: {message.content}
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <MainButton
          onClick={() => {
            dispatch(setLoggedIn(false));
            navigate("/");
          }}
          text="Logout"
        />
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
