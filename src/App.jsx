import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./css/App.css";
import { setPractitionerData } from "./redux/practitionerSlice";
import Interface from "./components/Interface";
// import Signup from "./components/account/Signup";

const App = () => {
  const dispatch = useDispatch();
  // const message = useSelector(selectMessage);

  const getInitialPractitioners = async () => {
    const { data } = await axios.get(`src/localStorage.json`);

    data.practitioner.forEach((element, index) => {
      element.id = index;
    });

    dispatch(setPractitionerData(data.practitioner));
  };

  useEffect(() => {
    getInitialPractitioners();
  }, []);

  return (
    <>
      {/* <Signup /> */}
      {/* <ToastContainer /> */}
      <Interface />
    </>
  );
};

export default App;
