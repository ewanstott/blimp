import { useDispatch } from "react-redux";
import { setLoggedIn, setScreen } from "../../redux/accountSlice";

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
    </>
  );
};

export default Dashboard;
