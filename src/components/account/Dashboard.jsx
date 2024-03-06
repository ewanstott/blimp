import { useDispatch } from "react-redux";
import { setLoggedIn, setScreen } from "../../redux/accountSlice";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();

  return (
    <>
      <h2>Dashboard</h2>
      <button
        onClick={() => {
          dispatch(setLoggedIn());
          dispatch(setScreen(1));
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
