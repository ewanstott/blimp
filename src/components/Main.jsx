import { useSelector } from "react-redux";
import {
  selectPractitionerData,
  selectSearchTerm,
} from "../redux/practitionerSlice";
import Practitioner from "./Practitioner";
import Search from "./Search";

const Main = () => {
  //subscribe to data
  const practitionerData = useSelector(selectPractitionerData);
  const searchTerm = useSelector(selectSearchTerm);

  if (!practitionerData) {
    return <p>Loading...</p>;
  }

  let filtered = [...practitionerData]; //make copy of store as NOT allowed to mutate store data
  if (searchTerm) {
    filtered = filtered.filter((practitioner) => {
      return (
        practitioner.name.toLowerCase().includes(searchTerm) ||
        practitioner.specialization.toLowerCase().includes(searchTerm) ||
        practitioner.about.toLowerCase().includes(searchTerm) ||
        practitioner.location.toLowerCase().includes(searchTerm)
      );
    });
  }

  return (
    <>
      <Search />
      <div className="searchResults">
        {filtered.map((practitioner) => {
          return (
            <Practitioner key={practitioner.name} practitioner={practitioner} />
          );
        })}
      </div>
    </>
  );
};

export default Main;
