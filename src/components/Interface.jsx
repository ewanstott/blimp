import Header from "./Header";
import Footer from "./Footer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import { setMessage } from "../redux/practitionerSlice";
import { Routes, Route } from "react-router";

// import SearchResults from "./SearchResults";
import PractitionerDetails from "./PractitionerDetails";
// import Index from "./account/Index";
import SearchResults from "./SearchResults";
import {
  selectPractitionerData,
  selectSearchTerm,
} from "../redux/practitionerSlice";
import Error from "./Error";
// import Dashboard from "./account/Dashboard";
import { selectLoggedIn } from "../redux/accountSlice";
// import Registration from "./account/Signin";
import Signup from "./account/Signup";
import Login from "./account/Login";
// import Nav from "./account/Nav";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Splash from "./account/Splash";
import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
import PatientDashboard from "./account/PatientDashboard";
import PractitionerDashboard from "./account/PractitionerDashboard";
// import MessageInput from "../components/message/MessageInput";

const Interface = () => {
  //subscribe to data
  const practitionerData = useSelector(selectPractitionerData);
  const searchTerm = useSelector(selectSearchTerm);
  const loggedIn = useSelector(selectLoggedIn);
  const dispatch = useDispatch();
  const logoRef = useRef();

  const [loading, setLoading] = useState(true);

  // useGSAP
  useLayoutEffect(() => {
    gsap.to(logoRef.current, {
      rotation: 720,
      y: "150%",
      duration: 1,
      onComplete: () => {
        setLoading(false);
      },
    });
  }, []);

  if (loading) return <Splash logoRef={logoRef} />;

  // console.log(practitionerData);

  // if (!Array.isArray(practitionerData)) {
  //   // Handle the case where practitionerData is not an array
  //   return <p>Error: Data format not recognized</p>;
  // }

  if (!practitionerData) {
    return <p>Loading...</p>;
  }
  // console.log(practitionerData);
  // console.log(practitionerData[0].name);
  // practitionerData.forEach((practitioner) => {
  //   console.log(practitioner.name);
  // });

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

  // let filtered = [...practitionerData]; // Make a copy of the array

  // if (searchTerm) {
  //   filtered = filtered.filter((practitioner) => {
  //     // Convert both the practitioner property and the search term to lowercase for case-insensitive matching
  //     const lowercaseSearchTerm = searchTerm.toLowerCase();

  //     // Ensure that each property exists before trying to access it
  //     return (
  //       (practitioner.name &&
  //         practitioner.name.toLowerCase().includes(lowercaseSearchTerm)) ||
  //       (practitioner.specialization &&
  //         practitioner.specialization
  //           .toLowerCase()
  //           .includes(lowercaseSearchTerm)) ||
  //       (practitioner.about &&
  //         practitioner.about.toLowerCase().includes(lowercaseSearchTerm)) ||
  //       (practitioner.location &&
  //         practitioner.location.toLowerCase().includes(lowercaseSearchTerm))
  //     );
  //   });
  // }

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
        {/* <MessageInput /> */}
        <Routes>
          <Route path="/practitioner/:id" element={<PractitionerDetails />} />
          <Route path="/" element={<SearchResults filtered={filtered} />} />
          <Route
            path="/search-results"
            element={<SearchResults filtered={filtered} />}
          />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route
            path="/practitioner-dashboard"
            element={<PractitionerDashboard />}
          />
          <Route path="*" element={<Error />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />
        </Routes>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Interface;
