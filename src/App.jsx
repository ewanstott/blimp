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
import { url } from "./config";

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

  useEffect(() => {
    const getInitialPractitioners = async () => {
      try {
        const response = await axios.get(
          `${url}/practitioner/get`
        );
        console.log(response);

        dispatch(setPractitionerData(response.data.practitioners));
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    getInitialPractitioners();
    setInterval(() => {
      getInitialPractitioners();
    }, 30000);
  }, [dispatch]);

  return (
    <>
      {/* <button onClick={() => toast("Wow so easy!")}>Test</button> */}
      <ToastContainer />
      <Interface />
    </>
  );
};

export default App;
