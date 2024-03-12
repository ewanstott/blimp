import { useDispatch } from "react-redux"; //used to dispatch actions to the Redux store.
import { setFavourite } from "../redux/practitionerSlice";

const PractitionerControls = ({ practitioner }) => {
  console.log(practitioner.id);
  const dispatch = useDispatch();

  const favouriteButtonClass = favourite
    ? "favourite-button active"
    : "favourite-button";

  // Function dispatches the setFavourite action creator from the practitionerSlice, passing the practitioner object as the payload.
  const handleFavouriteClick = () => dispatch(setFavourite(practitioner.id)); //Action Creator: The setFavourite action creator is responsible for creating an action with the type setFavourite and the pr
  // console.log(handleFavouriteClick);
  // console.log(practitioner);
  console.log(setFavourite);

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
