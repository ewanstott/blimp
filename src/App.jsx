import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./css/App.css";
import { setPractitionerData } from "./redux/practitionerSlice";
import Interface from "./components/Interface";

const App = () => {
  const dispatch = useDispatch();

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
      <Interface />
    </>
  );
};

export default App;
