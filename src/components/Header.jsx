import { Link } from "react-router-dom";
import Nav from "./account/Nav";

const Header = () => {
  return (
    <>
      <header>
        <h1>Blimp</h1>
        <nav>
          <ul>
            <Nav />
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;
