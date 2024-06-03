import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoggedIn,
  selectLoggedIn,
  setCurrentUser,
  selectCurrentUser,
} from "../../redux/accountSlice";
import PatientForm from "./PatientForm";
import PractitionerForm from "./PractitionerForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  setNotification,
  setPractitionerData,
} from "../../redux/practitionerSlice";


const Signup = () => {
  const [userType, setUserType] = useState(); //patient or practioner
  const [userInput, setUserInput] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector(selectLoggedIn);
  const user = useSelector(selectCurrentUser);

  const onInput = (e) => {

    console.log(e);
    if (e.type === "file") {
      setUserInput({ ...userInput, file: e.file });
    } else {
      setUserInput({ ...userInput, [e.target.id]: e.target.value });
    }
  };
  console.log(userInput);

  // after making API call to the backend for signing up a practitioner,
  // receive the practitionerDataBackEnd in the response.
  // Extract this data and dispatch it to the Redux store.
  const onSubmit = async (e) => {
    e.preventDefault(); //stops page re-rendering
    const userData = { ...userInput, userType }; // Include userType in userData

    console.log("Submitting user data:", userData); // Log the user data before sending it to the backend

    //send to API based on user type
    try {
      let response;
      if (userType === "patient") {
        response = await axios.post("http://localhost:6001/patient/add", {
          ...userData,
        });
        console.log("responce data:", response.data);
        if (response.data.status === 0) {
          //send message
          dispatch(setNotification("Duplicate account. Please try again!"));
          //Redirect to signup page
          navigate("/signup");
          return;
        }
        dispatch(
          setCurrentUser({ ...response.data }) // Dispatch action to update current user state
        );
        // Add token to local storage
        localStorage.setItem("token", response.data.token);
      } else if (userType === "practitioner") {
        response = await axios.post("http://localhost:6001/practitioner/add", {
          ...userData,
        });
        console.log("responce data:", response.data);
        if (response.data.status === 0) {
          //send message
          dispatch(setNotification("Duplicate account. Please try again!"));
          //Redirect to signup page
          navigate("/signup");
          return;
        }
        dispatch(
          setCurrentUser({ ...response.data }) // Dispatch action to update current user state
        );
        // Add token to local storage
        localStorage.setItem("token", response.data.token);
      }
      // Redirect based on user type
      if (userType === "patient") {
        navigate("/patient-dashboard");
      } else if (userType === "practitioner") {
        navigate("/practitioner-dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const radioHandler = (input) => {
    setUserType(input);
  };
  // console.log(userInput);
  return (
    <div className="signupContainer">
      <div className="signupForm">
        <div className="signUpFormHeader">
          <h2>Sign Up</h2>
          <p>Please enter your signup details below</p>
        </div>
        <form onInput={onInput} onSubmit={onSubmit}>
          <div className="userTypeSelection">
            <label htmlFor="signup-patient">
              <input
                type="radio"
                id="signup-patient"
                name="user-type"
                value="patient"
                onChange={() => radioHandler("patient")}
              />
              Patient
            </label>
            <label htmlFor="signup-practitioner">
              <input
                type="radio"
                id="signup-practitioner"
                name="user-type"
                value="practitioner"
                onChange={() => radioHandler("practitioner")}
              />
              Practitioner
            </label>
          </div>
          {userType === "patient" && (
            <div className="formSection">
              <PatientForm onInput={onInput} onSubmit={onSubmit} />
            </div>
          )}
          {userType === "practitioner" && (
            <div className="formSection">
              <PractitionerForm onInput={onInput} onSubmit={onSubmit} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
