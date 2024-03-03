import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./css/App.css";
import { setMessage, setPractitionerData } from "./redux/practitionerSlice";
import Interface from "./components/Interface";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectMessage } from "./redux/practitionerSlice";
import Signup from "./components/account/Signup";
import Index from "./components/account/Index";

const App = () => {
  const dispatch = useDispatch();
  const message = useSelector(selectMessage); //if message on store, this component can access it

  useEffect(() => {
    if (!message) return;
    toast(message);
    setTimeout(() => {
      dispatch(setMessage(""));
    }, 300);
  }, [message]); //updates everytime message changes in store

  const getInitialPractitioners = async () => {
    try {
      const { data } = await axios.get(`/localStorage.json`);

      data.practitioner.forEach((element, index) => {
        element.id = index + 1000;
      });

      dispatch(setPractitionerData(data.practitioner));
    } catch (error) {
      console.log("Error fetching initial practitioners:", error);
    }
  };

  useEffect(() => {
    getInitialPractitioners();
  }, []);

  return (
    <>
      {/* <button onClick={() => toast("Wow so easy!")}>Test</button> */}
      <ToastContainer />
      <Interface />
    </>
  );
};

export default App;
