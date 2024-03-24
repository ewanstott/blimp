import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectPractitionerData } from "../redux/practitionerSlice";
import PractitionerControls from "./PractitionerControls";
import { FaRegStar } from "react-icons/fa";
import { FaRegStarHalf } from "react-icons/fa6";

const PractitionerDetails = () => {
  const { id } = useParams();

  //selector
  const practitionerData = useSelector(selectPractitionerData); //access to practinioner data here

  if (!practitionerData) {
    return <p>Loading data...</p>;
  }

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
        </div>
        <div className="practitionerControls">
          <PractitionerControls practitioner={practitioner} />
        </div>
      </div>
    </div>
  );
};

export default PractitionerDetails;
