import Nav from "./account/Nav";

const Header = () => {
  return (
    <>
      <header>
        <div className="heroBanner">
          <div className="logoContainer">
            <img
              src="/logo/blimp-high-resolution-logo-black-transparent.png"
              alt="Blimp Logo"
              className="logo"
            />
          </div>
          <div className="subHeader">
            <h4>Find Your Perfect Health Care Hero Today</h4>
          </div>
        </div>
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
