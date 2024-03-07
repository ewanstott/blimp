import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setScreen } from "../../redux/accountSlice";
import EmailPasswordForm from "./EmailPasswordForm";
import sha256 from "sha256";
import { setMessage } from "../../redux/practitionerSlice";
import { setLoggedIn } from "../../redux/accountSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [userInput, setUserInput] = useState({});
  const user = useSelector(selectUser);

  const onInput = (e) => {
    setUserInput({ ...userInput, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault(); //stops page re-rendering
    const hashedPassword = sha256(userInput.password + "jump-ch16");

    if (user.password === hashedPassword) {
      dispatch(setMessage("Login correct"));
      dispatch(setScreen(2));
      dispatch(setLoggedIn());
    } else {
      dispatch(setMessage("Email and/or password incorrect, please try again"));
    }
  };

  return (
    <>
      <h2>Login</h2>
      <form onInput={onInput} onSubmit={onSubmit}>
        <EmailPasswordForm name="Login" />
      </form>
    </>
  );
};

export default Login;
