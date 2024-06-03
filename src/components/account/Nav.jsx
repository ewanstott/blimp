import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectLoggedIn, selectCurrentUser } from "../../redux/accountSlice";

const Nav = () => {
  // extracting the loggedIn state from the Redux store.
  const loggedIn = useSelector(selectLoggedIn);
  const user = useSelector(selectCurrentUser);

  // Extracting userType from the user object
  const userType = user ? user.userType : null;
  console.log(userType);

  return (
    <>
      <div className="navContainer">
        <Link to="/">Home</Link>
        {/* Dash should only show when user logged in  */}
        {loggedIn &&
          (userType === "patient" ? (
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
