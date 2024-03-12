import { useDispatch } from "react-redux";
import { setFavourite } from "../redux/practitionerSlice";

const PractitionerControls = ({ practitioner }) => {
  const dispatch = useDispatch();

  // const favouriteButtonClass = favourite
  //   ? "favourite-button active"
  //   : "favourite-button";

  const handleFavouriteClick = () => dispatch(setFavourite(practitioner.name));

  return (
    <>
      <div className="controls">
        <button
          className="favouriteButtonClass button"
          onClick={handleFavouriteClick}
        >
          Favourite
        </button>
      </div>
    </>
  );
};

export default PractitionerControls;
