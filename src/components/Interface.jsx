import Header from "./Header";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import { setMessage } from "../redux/practitionerSlice";
import { Routes, Route } from "react-router";
// import SearchResults from "./SearchResults";
import PractitionerDetails from "./PractitionerDetails";
import Index from "./account/Index";
import SearchResults from "./SearchResults";
import {
  selectPractitionerData,
  selectSearchTerm,
} from "../redux/practitionerSlice";
import Error from "./Error";

const Interface = () => {
  const dispatch = useDispatch();
  //   console.log(practitionerData);

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
      <header>
        <Header />
        {/* <button
          onClick={() => {
            dispatch(setMessage("Hello from the Interface")); //Change this message i.e. use if login detail wrong
          }}
        >
          Click Me
        </button> */}
      </header>
      <main>
        {/* //WHEN NOT LOGGED IN, CONDITIONALLY SHOW  */}
        <Index />
        <Routes>
          <Route path="/practitioner/:id" element={<PractitionerDetails />} />
          <Route path="/" element={<SearchResults filtered={filtered} />} />
          {/* ADD ERROR PAGE HERE USING **/}
          <Route path="*" element={<Error />} />
          {/* <Route path="/account" element={<Index />} /> */}
        </Routes>
        {/* OPTION TO RE-WRITE USING THE DEMO HERE */}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Interface;
