import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header>
        {/* Other header content */}
        <nav>
          <ul>
            {/* Other navigation items */}
            {/* <li> */}
            <Link to="/dashboard">Dashboard</Link>
            {/* </li> */}
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
