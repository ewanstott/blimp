import { useDispatch, useSelector } from "react-redux";
import { selectUser, setLoggedIn } from "../../redux/accountSlice";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the currently logged-in user directly
  const user = useSelector(selectUser);
  console.log(user);

  return (
    <>
      <h1>PatientDashboard</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>

      <button
        onClick={() => {
          dispatch(setLoggedIn(false)); //updates logged in status
          navigate("/"); //naviages back to home page
        }}
      >
        Logout
      </button>
    </>
  );
};

export default PatientDashboard;
