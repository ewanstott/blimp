import { Link } from "react-router-dom";
import MainButton from "../MainButton";

const EmailPasswordForm = ({ name, onSubmit }) => {
  return (
    <>
      <div className="loginContainer">
        <h2>Login</h2>
        <div className="emailContainer">
          <label htmlFor="email"></label>
          <input type="email" name="email" id="email" placeholder="Email" />
        </div>
        <div className="passwordContainer">
          <label htmlFor="password"></label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
          />
        </div>
        {/* <button>{name}</button> */}
        <div className="loginButtonContainer">
          <MainButton onClick={onSubmit} text="Login" />
        </div>
      </div>
      <div className="signUpContainer">
        <h3>Don't have an account?</h3>
        <Link to="/signup">
          <MainButton text="Sign Up" />
        </Link>
      </div>
    </>
  );
};

export default EmailPasswordForm;
