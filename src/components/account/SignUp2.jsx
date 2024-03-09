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

const SignUp2 = () => {
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

  const onSubmit = (e) => {
    e.preventDefault(); //stops page re-rendering
    console.log("signup2 userType:", userType);
    const userData = { ...userInput, userType }; // Include userType in userData
    dispatch(setNewUser(userData)); // Dispatch user data including userType
    // dispatch(setLoggedIn(userData)); // Set loggedIn to True

    if (userType === "patient") {
      navigate("/patient-dashboard");
    }
    if (userType === "practitioner") {
      navigate("/practitioner-dashboard");
    }

    // console.log(userType, "Signup2"); - sending patient correctly
  };

  // console.log(userInput, "message from SignUp2 ");

  const radioHandler = (input) => {
    setUserType(input);
    // console.log(input); - sending patient correctly
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

export default SignUp2;
