import { Link, NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <>
      {/* //used to style a particular button when in an acrtive state (it knows what state its in) */}
      {/* <NavLink />  */}
      <Link to="/">Home</Link>
      {/* Dash should only show when user logged in  */}
      <Link to="/dashboard">Dashboard</Link>
      {/* <Link to="/signin">Sign In</Link> */}
      <Link to="/signup2">Sign Up2</Link>
      <Link to="/login">Login</Link>
    </>
  );
};

export default Nav;
