import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectPractitionerData } from "../redux/practitionerSlice";
import PractitionerControls from "./PractitionerControls";

const PractitionerDetails = () => {
  const { id } = useParams();
  console.log(id);

  //selector
  const practitionerData = useSelector(selectPractitionerData); //access to practinioner data here

  if (!practitionerData) {
    return <p>Loading data...</p>;
  }
  console.log(practitionerData);
  const practitioner = practitionerData.find((item) => {
    return item.id === Number(id);
  });

  return (
    <div className="singlePractitioner">
      <div className="practitionerDetails">
        <h3>Meet Your Healing Hero</h3>
        <h1>{practitioner.name}</h1>
        <img src={practitioner.image} alt={practitioner.name} />
        {/* Add Practitioner Intro Video  */}
        <div className="textContainer">
          <h5>Super Powers: {practitioner.specialization}</h5>
          <p>Location: {practitioner.location}</p>
          <p>Words of Wisdom: {practitioner.about}</p>
          <p>Treatment Style: {practitioner.style}</p>
          <p>Years of Wisdom: {practitioner.experience}</p>
          {/* <p className="practitionerQualifications"></p> */}
          <p>Qualifications:</p>
          <ul className="practitionerQualifications">
            {practitioner.qualifications.map((qualification, index) => (
              <li key={index}>{qualification}</li>
            ))}
          </ul>
          <p>Stars: {practitioner.starReviews}</p>
          <p>Reviews: ...</p>
          {/* <p>Hello Routes</p> */}
        </div>
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
