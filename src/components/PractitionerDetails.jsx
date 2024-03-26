import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectPractitionerData } from "../redux/practitionerSlice";
import PractitionerControls from "./PractitionerControls";
import { FaStar, FaStarHalf } from "react-icons/fa";
import MessageInput from "../components/message/MessageInput";

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

  const renderStars = (starReviews) => {
    const fullStars = Math.floor(starReviews);
    const halfStar = starReviews - fullStars >= 0.5;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} style={{ fill: "gold" }} />);
    }
    if (halfStar) {
      stars.push(<FaStarHalf key={"half"} style={{ fill: "gold" }} />);
    }
    return stars;
  };

  const stars = renderStars(practitioner.starReviews);

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
          <p>
            Stars: <span className="stars">{stars}</span>
          </p>
          <p>Reviews: ...</p>
        </div>
        <div className="practitionerControls">
          <PractitionerControls practitioner={practitioner} />
        </div>
        <div className="sendMessageContainer">
          <MessageInput practitionerId={practitioner.id} />
        </div>
      </div>
    </div>
  );
};

export default PractitionerDetails;
