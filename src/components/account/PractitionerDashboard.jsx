import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../redux/accountSlice";
import { useNavigate } from "react-router-dom";

const PractitionerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <h1>Practitioner Dashboard</h1>
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
