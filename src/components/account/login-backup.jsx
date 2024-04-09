// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   // selectCurrentUser,
//   setLoggedIn,
//   selectLoggedIn,
// } from "../../redux/accountSlice";
// import EmailPasswordForm from "./EmailPasswordForm";
// import sha256 from "sha256";
// import { setNotification } from "../../redux/practitionerSlice";
// import { useNavigate } from "react-router-dom";
// import MainButton from "../MainButton";

// //add logic so user directed to correct dash based on type (patient vs prac)

// const Login = () => {
//   const dispatch = useDispatch();
//   const [userInput, setUserInput] = useState({});
//   const users = useSelector((state) => state.account.users);
//   const navigate = useNavigate();
//   const loggedIn = useSelector(selectLoggedIn);
//   // const [userType, setUserType] = useState(); //patient or practioner

//   const onInput = (e) => {
//     setUserInput({ ...userInput, [e.target.id]: e.target.value });
//   };

//   ///
//   const onSubmit = (e) => {
//     e.preventDefault(); //stops page re-rendering
//     console.log("user:", users); // Check the value of user
//     // const { password } = userInput;

//     const hashedPassword = sha256(userInput.password);
//     console.log(userInput);

//     //find user from users matching on email
//     const foundUser = users.find((user) => user.email === userInput.email);

//     // if found - does this user have correct password
//     if (foundUser && foundUser.password === hashedPassword) {
//       dispatch(setNotification("Login correct"));
//       dispatch(setLoggedIn(foundUser));

//       //add user type here

//       console.log("loggedIn:", loggedIn); // Check the value of loggedIn
//       console.log("user:", foundUser); // Check the value of user

//       if (foundUser.userType === "patient") {
//         navigate("/patient-dashboard");
//       } else if (foundUser.userType === "practitioner") {
//         navigate("/practitioner-dashboard");
//       }
//     } else {
//       dispatch(
//         setNotification("Email and/or password incorrect, please try again")
//       );
//     }
//   };

//   // const handleLoginButtonClick = () => {
//   //   navigate("/login");
//   // };

//   return (
//     <>
//       <form onInput={onInput} onSubmit={onSubmit}>
//         <EmailPasswordForm name="Login" onSubmit={onSubmit} />
//         {/* <MainButton onClick={onSubmit} text="Login" /> */}
//       </form>
//     </>
//   );
// };

// export default Login;
