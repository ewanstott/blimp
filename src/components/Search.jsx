import { useDispatch } from "react-redux";
import { setSearchTerm } from "../redux/practitionerSlice";
// import { FaSearch } from "react-icons/fa";

//Search box speaks to store directly
const Search = () => {
  const dispatch = useDispatch();

  return (
    <>
      <div className="searchBar">
        <label htmlFor="search"></label>
        {/* <FaSearch className="searchIcon" /> */}
        <input
          type="text"
          name="search"
          id="search"
          placeholder=" Name, specialization, location..."
          onInput={(e) => {
            dispatch(setSearchTerm(e.target.value));
          }}
        />
      </div>
    </>
  );
};

export default Search;
