import { useDispatch } from "react-redux";
import { setLoggedIn } from "../../redux/accountSlice";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <h2>Dashboard</h2>
      <button
        onClick={() => {
          dispatch(setLoggedIn(false)); //updates logged in status
          navigate("/");
        }}
      >
        Logout
      </button>
      <Link to="/">Search Results</Link>
    </>
  );
};

export default Dashboard;
