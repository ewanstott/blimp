import { useState } from "react";
import { useDispatch } from "react-redux";
import { setNewUser, setScreen } from "../../redux/accountSlice";
import EmailPasswordForm from "./EmailPasswordForm";

const Signup = () => {
  const [userInput, setUserInput] = useState({});
  const dispatch = useDispatch();

  const onInput = (e) => {
    setUserInput({ ...userInput, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault(); //stops page re-rendering
    dispatch(setNewUser(userInput)); //when submit pressed, dispatch -> setNewUser -> send store all user input (email, password)
    dispatch(setScreen(1));
  };

  console.log(userInput);

  return (
    <>
      <h2>Sign Up</h2>
      <form onInput={onInput} onSubmit={onSubmit}>
        <EmailPasswordForm name="Signup" />
      </form>
    </>
  );
};

export default Signup;
