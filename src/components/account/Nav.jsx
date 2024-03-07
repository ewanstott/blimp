import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <>
      <Link to="/">Home</Link>
      {/* Dash should only show when user logged in  */}
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/signin">Sign In</Link>
    </>
  );
};

export default Nav;
