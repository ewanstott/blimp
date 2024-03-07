import { useState } from "react";
import { useDispatch } from "react-redux";
import PatientForm from "./PatientForm";
import PractitionerForm from "./PractitionerForm";

const SignUp2 = () => {
  const dispatch = useDispatch();
  const [userType, setUserType] = useState();

  const radioHandler = (input) => {
    setUserType(input);
    console.log(input);
  };

  return (
    <>
      <>
        <p>Please enter your signup details below</p>
      </>
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
          <PatientForm />
        </div>
      )}
      {userType === "practitioner" && (
        <div>
          <PractitionerForm />
        </div>
      )}
    </>
  );
};

// Add a Generic form here which conditionally renders extra fields for the practitioner

export default SignUp2;
