import PractitionerResult from "./PractitionerResult";
import Search from "./Search";

const SearchResults = ({ filtered }) => {
  return (
    <>
      <Search />
      <div className="searchResults">
        {filtered.map((practitioner) => {
          //ERROR - WHY?
          return (
            <PractitionerResult
              key={practitioner.id}
              practitioner={practitioner}
            /> //switched key fron name of ID (from app)
          );
        })}
      </div>
    </>
  );
};

export default SearchResults;

//Rename
