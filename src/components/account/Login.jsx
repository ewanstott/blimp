import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  // selectCurrentUser,
  setLoggedIn,
  selectLoggedIn,
} from "../../redux/accountSlice";
import EmailPasswordForm from "./EmailPasswordForm";
import sha256 from "sha256";
import { setNotification } from "../../redux/practitionerSlice";
import { useNavigate } from "react-router-dom";
import MainButton from "../MainButton";
import axios from "axios";

//add logic so user directed to correct dash based on type (patient vs prac)

const Login = () => {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState({});
  const users = useSelector((state) => state.account.users);
  const navigate = useNavigate();
  const loggedIn = useSelector(selectLoggedIn);
  // const [userType, setUserType] = useState(""); //patient or practioner

  const onInput = (e) => {
    setUserInput({ ...userInput, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault(); //stops page re-rendering
    const userData = { ...userInput }; // Include userType?

    try {
      let response;
      // Send login request to the patient login endpoint
      response = await axios.post(
        "http://localhost:6001/patient/login",
        userData
      );

      if (response.data.status === 1) {
        // Set the logged-in user in the Redux store
        dispatch(setLoggedIn(true));

        // Store the user's token in local storage
        localStorage.setItem("token", response.data.token);

        // Redirect to the patient dashboard
        navigate("/patient-dashboard");
      } else {
        // If login as patient fails, try logging in as practitioner
        // Send login request to the practitioner login endpoint
        response = await axios.post(
          "http://localhost:6001/practitioner/login",
          userData
        );

        if (response.data.status === 1) {
          // Set the logged-in user in the Redux store
          dispatch(setLoggedIn(true));

          // Store the user's token in local storage
          localStorage.setItem("token", response.data.token);

          // Redirect to the practitioner dashboard
          navigate("/practitioner-dashboard");
        } else {
          // Handle login failure
          dispatch(setNotification("Please check your email or password!"));
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
      // Handle error
      // For example, dispatch an action to set an error message
    }
  };

  return (
    <>
      <form onInput={onInput} onSubmit={onSubmit}>
        <EmailPasswordForm name="Login" onSubmit={onSubmit} />
        {/* <MainButton onClick={onSubmit} text="Login" /> */}
      </form>
    </>
  );
};

export default Login;
