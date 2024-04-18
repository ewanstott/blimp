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
import { setPractitionerData } from "../../redux/practitionerSlice";

const Signup = () => {
  const [userType, setUserType] = useState(); //patient or practioner
  const [userInput, setUserInput] = useState({});
  // const [signupSuccess, setSignupSuccess] = useState(false); // State to track signup success
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector(selectLoggedIn);
  const user = useSelector(selectCurrentUser);

  // const onInput = (e) => {
  //   setUserInput({ ...userInput, [e.target.id]: e.target.value });

  const onInput = (e) => {
    console.log(e);
    if (e.type === "file") {
      setUserInput({ ...userInput, file: e.file });
    } else {
      setUserInput({ ...userInput, [e.target.id]: e.target.value });
    }
  };

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
    <>
      <p>Please enter your signup details below</p>

      <form onInput={onInput} onSubmit={onSubmit}>
        <label htmlFor="signup-patient">
          Patient
          <input
            type="radio"
            id="signup-patient"
            name="user-type"
            value="patient"
            // onChange={(e) => radioHandler(e.target.value)}
            onChange={() => radioHandler("patient")}
          ></input>
        </label>
        <label htmlFor="signup-practitioner">
          Practitioner
          <input
            type="radio"
            id="signup-practitioner"
            name="user-type"
            value="practitioner"
            // onChange={(e) => radioHandler(e.target.value)}
            onChange={() => radioHandler("practitioner")}
          ></input>
        </label>
        {userType === "patient" && (
          <div>
            {/* <PatientForm /> */}
            <PatientForm onInput={onInput} onSubmit={onSubmit} />
          </div>
        )}
        {userType === "practitioner" && (
          <div>
            {/* <PractitionerForm /> */}
            <PractitionerForm onInput={onInput} onSubmit={onSubmit} />
          </div>
        )}
      </form>
    </>
  );
};

// Add a Generic form here which conditionally renders extra fields for the practitioner

export default Signup;
