import { useDispatch } from "react-redux";
import { setSearchTerm } from "../redux/practitionerSlice";
//Search box speaks to store directly
const Search = () => {
  const dispatch = useDispatch();

  return (
    <>
      <label htmlFor="search"></label>
      <input
        type="text"
        name="search"
        id="search"
        placeholder="Name, specialization, location..."
        onInput={(e) => {
          dispatch(setSearchTerm(e.target.value));
        }}
      />
    </>
  );
};

export default Search;
