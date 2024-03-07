import { useState } from "react";

const SignUp2 = () => {
  const [userType, setUserType] = useState();

  const radioHandler = (input) => {
    setUserType(input);
    console.log(input);
  };

  return (
    <>
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
      {userType === "patient" && <div>Patient Form</div>}
      {userType === "practitioner" && <div>Practitioner Form</div>}
    </>
  );
};

// Add a Generic form here which conditionally renders extra fields for the practitioner

export default SignUp2;
