import { useDispatch, useSelector } from "react-redux"; //used to dispatch actions to the Redux store.
import { selectFavourites, setFavourite } from "../redux/practitionerSlice";

import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const PractitionerControls = ({ practitioner }) => {
  const dispatch = useDispatch();
  const favourites = useSelector(selectFavourites); //useSelector to get favourites from the store
  console.log(practitioner);

  // Check if the current practitioner is in the favourites list
  //some() - returns true if at least one element in the array satisfies the condition specified by the callback function, and false otherwise. I
  const isFavourite = favourites.some((fav) => {
    return fav === practitioner.id;
  });

  // Determine the button class based on whether the practitioner is a favourite or not
  const favouriteButtonClass = isFavourite
    ? "favourite-button active"
    : "favourite-button";

  // Function dispatches the setFavourite action creator from the practitionerSlice, passing the practitioner object as the payload.
  const toggleFavourite = () => dispatch(setFavourite(practitioner.id)); //Action Creator: The setFavourite action creator is responsible for creating an action with the type setFavourite and the pr

  return (
    <>
      <div className="controls">
        {/* <button className={favouriteButtonClass} onClick={toggleFavourite}>
          Favourite
        </button> */}

        <IconButton className={favouriteButtonClass} onClick={toggleFavourite}>
          {isFavourite ? (
            <FavoriteIcon style={{ color: "red" }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
      </div>
    </>
  );
};

export default PractitionerControls;
