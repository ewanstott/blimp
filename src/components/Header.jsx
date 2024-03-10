import Nav from "./account/Nav";

const Header = () => {
  return (
    <>
      <header>
        {/* <h1>Blimp</h1> */}
        <div className="heroBanner">
          <div className="logoContainer">
            <img
              src="/logo/blimp-high-resolution-logo-black-transparent.png"
              alt="Blimp Logo"
              className="logo"
            />
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
