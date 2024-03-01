import { useSelector } from "react-redux";
import {
  selectPractitionerData,
  selectSearchTerm,
} from "../redux/practitionerSlice";
import PractitionerResult from "./PractitionerResult";
import Search from "./Search";
import PractitionerDetails from "./PractitionerDetails";
import { Routes, Route } from "react-router";
import SearchResults from "./SearchResults";
// import { v4 as uuidv4 } from "uuid";

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
      <Routes>
        <Route path="/" element={<SearchResults filtered={filtered} />} />
        <Route path="/practitioner/:id" element={<PractitionerDetails />} />
      </Routes>
    </>
  );
};

export default Main;
