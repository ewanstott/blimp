import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedIn, setNewUser } from "../../redux/accountSlice";
import PatientForm from "./PatientForm";
import PractitionerForm from "./PractitionerForm";
import { useNavigate } from "react-router-dom";
import { selectLoggedIn } from "../../redux/accountSlice";

const SignUp2 = () => {
  const [userType, setUserType] = useState(); //patient or practioner
  const [userInput, setUserInput] = useState({});
  // const [signupSuccess, setSignupSuccess] = useState(false); // State to track signup success
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedIn = useSelector(selectLoggedIn);

  if (loggedIn) {
    if (userType === "patient") {
      navigate("/patientDashboard");
    }
    if (userType === "practitioner") {
      navigate("/practitionerDashboard");
    }
  }

  const onInput = (e) => {
    setUserInput({ ...userInput, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault(); //stops page re-rendering
    setUserInput({ ...userInput, userType });
    dispatch(setNewUser(userInput)); //when submit pressed, dispatch -> setNewUser -> send store all user input (email, password)
    dispatch(setLoggedIn(true)); // Set signup success to true upon successful signup
  };

  console.log(userInput, "message from SignUp2 ");

  const radioHandler = (input) => {
    setUserType(input);
    console.log(input);
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
            onChange={(e) => radioHandler(e.target.value)}
          ></input>
        </label>
        <label htmlFor="signup-practitioner">
          Practitioner
          <input
            type="radio"
            id="signup-practionioner"
            name="user-type"
            value="practitioner"
            onChange={(e) => radioHandler(e.target.value)}
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
