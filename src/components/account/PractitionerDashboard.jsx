import { useDispatch, useSelector } from "react-redux";
import { selectUser, setLoggedIn } from "../../redux/accountSlice";
import { useNavigate } from "react-router-dom";

const PractitionerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  return (
    <>
      <h1>Practitioner Dashboard</h1>
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

export default PractitionerDashboard;
