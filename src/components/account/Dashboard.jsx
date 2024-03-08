import { useDispatch } from "react-redux";
import { setLoggedIn, setScreen } from "../../redux/accountSlice";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <>
      <h2>Dashboard</h2>
      <button
        onClick={() => {
          //could also do this with Router
          dispatch(setLoggedIn(false)); //updates logged in status
          // dispatch(setScreen(1)); //updates screen displayed
          navigate("/");
        }}
      >
        Logout
      </button>
      {/* <button
        onClick={() => {
          dispatch(setScreen(3));
        }}
      >
        Home
      </button> */}
      <Link to="/">Search Results</Link>
      {/* <Link to="/search-results">Search Results</Link> */}
    </>
  );
};

export default Dashboard;
