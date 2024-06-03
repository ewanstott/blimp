import PractitionerResult from "./PractitionerResult";
import Search from "./Search";

const SearchResults = ({ filtered }) => {
  return (
    <>
      <Search />
      <div className="searchResults">
        {filtered.map((practitioner, index) => {
          return (
            <PractitionerResult key={index} practitioner={practitioner} />
          );
        })}
      </div>
    </>
  );
};

export default SearchResults;

//Rename
