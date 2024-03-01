import PractitionerResult from "./PractitionerResult";

const SearchResults = ({ filtered }) => {
  return (
    <div className="searchResults">
      {filtered.map((practitioner) => {
        return (
          <PractitionerResult
            key={practitioner.id}
            practitioner={practitioner}
          /> //switched key fron name of ID (from app)
        );
      })}
    </div>
  );
};

export default SearchResults;
