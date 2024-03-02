import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectPractitionerData } from "../redux/practitionerSlice";
import PractitionerControls from "./PractitionerControls";

const PractitionerDetails = () => {
  const { id } = useParams();
  console.log(id);

  //selector
  const practitionerData = useSelector(selectPractitionerData); //access to practinioner data here

  const practitioner = practitionerData.find((item) => {
    return item.id === Number(id);
  });
  console.log(practitioner);
  return (
    <div className="singlePractitioner">
      <div className="practitionerDetails">
        <h3>Practitioner Details</h3>
        <h1>{practitioner.name}</h1>
        <img src={practitioner.image} alt={practitioner.name} />
        {/* Add Practitioner Intro Video  */}
        <h2>{practitioner.specialization}</h2>
        <p>{practitioner.location}</p>
        <p>{practitioner.about}</p>
        <p>{practitioner.style}</p>
        <p>Experience: {practitioner.experience}</p>
        <p>Qualifications: {practitioner.qualifications}</p>
        <p>Stars: {practitioner.starReviews}</p>
        <p>Reviews: ...</p>
        {/* <p>Hello Routes</p> */}
      </div>
      <div className="practitionerControls">
        <PractitionerControls practitioner={practitioner} />
        {/* //Favourite
    //Enquire Now
    //Add controls component for Favourite etc */}
      </div>
    </div>
  );
};

export default PractitionerDetails;
