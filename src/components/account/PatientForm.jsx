import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedIn } from "../../redux/accountSlice"; // setCurrentUser
import { Link } from "react-router-dom";
import MainButton from "../MainButton";

const PatientForm = ({ onInput, onSubmit }) => {
  const loggedIn = useSelector(selectLoggedIn); // Get the loggedIn state from Redux

  //   return (
  //     <>
  //       {/* <form onInput={onInput} onSubmit={onSubmit}> */}
  //       <div>
  //         <label htmlFor="name">Name</label>
  //         <input type="name" name="name" id="name" required />
  //       </div>
  //       <div>
  //         <label htmlFor="email">Email</label>
  //         <input type="email" name="email" id="email" required />
  //       </div>
  //       <div>
  //         <label htmlFor="password">Password</label>
  //         <input type="password" name="password" id="password" required />
  //       </div>
  //       <div>
  //         {/* <button type="submit">Submit</button> */}
  //         <MainButton onClick={onSubmit} type="submit" text="Submit" />
  //       </div>
  //       {/* Conditionally render the Link based on loggedIn state */}
  //       {/* {loggedIn && <Link to="/dashboard">Go to Dashboard</Link>} */}
  //       {/* </form> */}
  //     </>
  //   );
  // };

  return (
    <div className="signupForm">
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" placeholder="Name" required />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
        />
      </div>
      <div>
        <MainButton onClick={onSubmit} type="submit" text="Submit" />
      </div>
    </div>
  );
};

export default PatientForm;
