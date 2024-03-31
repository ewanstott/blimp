import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedIn } from "../../redux/accountSlice"; // setCurrentUser
import { Link } from "react-router-dom";

const PatientForm = ({ onInput, onSubmit }) => {
  const loggedIn = useSelector(selectLoggedIn); // Get the loggedIn state from Redux

  // const isPatient: true

  // const [userInput, setUserInput] = useState({});
  // const dispatch = useDispatch();

  // const onInput = (e) => {
  //   setUserInput({ ...userInput, [e.target.id]: e.target.value });
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault(); //stops page re-rendering
  //   dispatch(setNewUser(userInput)); //when submit pressed, dispatch -> setNewUser -> send store all user input (email, password)
  //   dispatch(setScreen(1));
  // };

  // console.log(userInput);

  return (
    <>
      {/* <form onInput={onInput} onSubmit={onSubmit}> */}
      <div>
        <label htmlFor="name">Name</label>
        <input type="name" name="name" id="name" required />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
      {/* Conditionally render the Link based on loggedIn state */}
      {/* {loggedIn && <Link to="/dashboard">Go to Dashboard</Link>} */}
      {/* </form> */}
    </>
  );
};

export default PatientForm;
