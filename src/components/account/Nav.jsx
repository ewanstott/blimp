import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedIn, selectUser } from "../../redux/accountSlice";

const Nav = () => {
  // extracting the loggedIn state from the Redux store.
  const loggedIn = useSelector(selectLoggedIn);
  const user = useSelector(selectUser);

  // console.log(user);
  // console.log(user.userType);

  return (
    <>
      {/* //used to style a particular button when in an active state (it knows what state its in) */}
      {/* <NavLink />  */}
      <div className="navContainer">
        <Link to="/">Home</Link>
        {/* Dash should only show when user logged in  */}
        {loggedIn &&
          (user.userType === "patient" ? (
            <Link to="/patient-dashboard">Dashboard</Link>
          ) : (
            <Link to="/practitioner-dashboard">Dashboard</Link>
          ))}
        {!loggedIn && (
          <>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </>
  );
};

export default Nav;
