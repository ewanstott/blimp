import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import "./css/App.css";
import { setPractitionerData } from "./redux/practitionerSlice";

const App = () => {
  const dispatch = useDispatch();

  const getInitialPractitioners = async () => {
    const { data } = await axios.get(`src/localStorage.json`);
    dispatch(setPractitionerData(data.practitioners));
  };

  useEffect(() => {
    getInitialPractitioners();
  }, []);

  return <> </>;
};

export default App;
