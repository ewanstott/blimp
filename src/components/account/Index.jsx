import { useSelector, useDispatch } from "react-redux";
import {
  selectLoggedIn,
  selectScreen,
  setScreen,
} from "../../redux/accountSlice";
import Signup from "./Signup";
import Login from "./Login";
import Dashboard from "./Dashboard";
import Interface from "../Interface";

const Index = () => {
  const screen = useSelector(selectScreen);
  const loggedIn = useSelector(selectLoggedIn);
  const dispatch = useDispatch();

  return (
    //if not logged in, show signup and login buttons
    <>
      {!loggedIn && (
        <>
          <button onClick={() => dispatch(setScreen(0))}>Sign Up</button>
          <button onClick={() => dispatch(setScreen(1))}>Login</button>
        </>
      )}
      {screen === 0 && <Signup />}
      {screen === 1 && <Login />}
      {screen === 2 && <Dashboard />}
      {/* {screen === 3 && <Interface />} */}
    </>
  );
};

export default Index;
