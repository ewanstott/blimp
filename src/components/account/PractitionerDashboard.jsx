import { useDispatch, useSelector } from "react-redux";
import { selectUser, setLoggedIn } from "../../redux/accountSlice";
import { useNavigate } from "react-router-dom";

const PractitionerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  console.log(user);

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
        </div>
        <button
          className="button"
          onClick={() => {
            dispatch(setLoggedIn(false)); //updates logged in status
            navigate("/"); //naviages back to home page
          }}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default PractitionerDashboard;
