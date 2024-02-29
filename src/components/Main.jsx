import { useSelector } from "react-redux";
import { selectPractitionerData } from "../redux/practitionerSlice";
import Practitioner from "./Practitioner";

const Main = () => {
  const practitionerData = useSelector(selectPractitionerData);

  if (!practitionerData) {
    return <p>Loading...</p>;
  }

  return practitionerData.map((practitioner) => {
    return <Practitioner key={practitioner.name} practitioner={practitioner} />;
  });
};

export default Main;
