import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./css/App.css";
import {
  setNotification,
  setPractitionerData,
} from "./redux/practitionerSlice";
import Interface from "./components/Interface";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { selectNotification } from "./redux/practitionerSlice";

const App = () => {
  const dispatch = useDispatch();
  const notification = useSelector(selectNotification); //if message on store, this component can access it

  useEffect(() => {
    if (!notification) return;
    toast(notification);
    setTimeout(() => {
      dispatch(setNotification(""));
    }, 300);
  }, [notification]); //updates everytime message changes in store

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
