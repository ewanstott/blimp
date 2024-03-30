import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoggedIn,
  selectLoggedIn,
  setNewUser,
} from "../../redux/accountSlice";
import PatientForm from "./PatientForm";
import PractitionerForm from "./PractitionerForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [userType, setUserType] = useState(); //patient or practioner
  const [userInput, setUserInput] = useState({});
  // const [signupSuccess, setSignupSuccess] = useState(false); // State to track signup success
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector(selectLoggedIn);

  const onInput = (e) => {
    setUserInput({ ...userInput, [e.target.id]: e.target.value });
    // console.log("userType:", userType); // Check the value of userType - sending patient correctly
  };

  // const onSubmit = (e) => {
  //   e.preventDefault(); //stops page re-rendering
  //   setUserInput({ ...userInput, userType });
  //   dispatch(setNewUser(userInput)); //when submit pressed, dispatch -> setNewUser -> send store all user input (email, password)
  //   dispatch(setLoggedIn(true)); // Set loggedIn to True
  // };

  const onSubmit = async (e) => {
    e.preventDefault(); //stops page re-rendering
    const userData = { ...userInput, userType }; // Include userType in userData
    // dispatch(setNewUser(userData)); // Dispatch user data including userType

    //send to API

    // const { data } = await axios.post(
    //   "http://localhost:6001/user/add",
    //   userData
    // );
    // console.log(data);

    //send to API based on user type
    try {
      let response;
      if (userType === "patient") {
        response = await axios.post(
          "http://localhost:6001/patient/add",
          userData
        );
      } else if (userType === "practitioner") {
        response = await axios.post(
          "http://localhost:6001/practitioner/add",
          userData
        );
      }

      console.log(response.data);

      // Redirect based on user type
      if (userType === "patient") {
        navigate("/patient-dashboard");
      } else if (userType === "practitioner") {
        navigate("/practitioner-dashboard");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };

  const radioHandler = (input) => {
    setUserType(input);
  };

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
