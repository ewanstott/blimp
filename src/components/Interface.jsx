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
  });

  if (loading) return <Splash logoRef={logoRef} />;

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
        {/* <signup /> */}
        {/* //WHEN NOT LOGGED IN, CONDITIONALLY SHOW  */}
        {/* <Index /> */}
        {/* <Signup />
        <Login /> */}
        <Routes>
          <Route path="/practitioner/:id" element={<PractitionerDetails />} />
          <Route path="/" element={<SearchResults filtered={filtered} />} />
          <Route
            path="/search-results"
            element={<SearchResults filtered={filtered} />}
          />
          {/* {loggedIn && <Route path="/dashboard" element={<Dashboard />} />} */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route
            path="/practitioner-dashboard"
            element={<PractitionerDashboard />}
          />
          <Route path="*" element={<Error />} />
          {/* Master Routes ^^ */}
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<Signup />} /> */}

          <Route path="/signUp" element={<Signup />} />

          {/* <Route path="/account" element={<Index />} /> */}
          {/* Naviagte used to create URL  for account, without rendering a 2nd Index component */}

          {/* <Route path="/account" element={<Navigate to="/account" />} /> */}
          {/* <Route path="/interface/*" element={<Interface />} /> */}
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
