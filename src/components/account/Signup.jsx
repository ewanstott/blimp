import { useState } from "react";

const Signup = () => {
  const [userInput, setUserInput] = useState({});

  const onInput = (e) => {
    setUserInput({ ...userInput, [e.target.id]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault(); //stops page re-rendering
  };

  console.log(userInput);

  return (
    <form onInput={onInput} onSubmit={onSubmit}>
      <label htmlFor="email">Email</label>
      <input type="email" name="email" id="email" />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" />
      <button>Sign Up</button>
    </form>
  );
};

export default Signup;
