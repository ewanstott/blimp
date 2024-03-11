import { Link } from "react-router-dom";

const PractitionerResult = ({ practitioner }) => {
  return (
    <div className="searchResultCard">
      <h3>{practitioner.name}</h3>
      <img src={practitioner.image} alt={practitioner.name} />
      <h3>{practitioner.specialization}</h3>
      <p>{practitioner.location}</p>
      <p className="practitionerAbout">{practitioner.about}</p>
      <p>Years of Wisdom: {practitioner.experience}</p>
      <p>Stars: {practitioner.starReviews}</p>
      <Link to={"/practitioner/" + practitioner.id}>See More...</Link>
    </div>
  );
};

export default PractitionerResult;
