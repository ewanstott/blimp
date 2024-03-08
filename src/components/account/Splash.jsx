const Splash = ({ logoRef }) => {
  //update CSS
  return (
    <div className="splash container">
      <div className="imageContainer">
        {/* ./ = public folder */}
        <img
          src="./logo/blimp-high-resolution-logo-white-transparent.png"
          alt=""
          ref={logoRef}
        />
      </div>
    </div>
  );
};

export default Splash;
