import Main from "./Main"; //check not pulling in wrong main file
import Header from "./Header";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { setMessage } from "../redux/practitionerSlice";
import { Routes, Route } from "react-router";
import SearchResults from "./SearchResults";
import PractitionerDetails from "./PractitionerDetails";

const Interface = () => {
  const dispatch = useDispatch();
  //   console.log(practitionerData);

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
        {/* <Routes>
          <Route path="/practitioner/:id" element={<PractitionerDetails />} />
          <Route path="/" element={<Main />} />
        </Routes> */}

        <Main />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Interface;
