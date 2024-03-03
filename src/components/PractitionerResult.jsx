import { Link } from "react-router-dom";

const PractitionerResult = ({ practitioner }) => {
  return (
    <div className="searchResult">
      <h1>{practitioner.name}</h1>
      <img src={practitioner.image} alt={practitioner.name} />
      <h2>{practitioner.specialization}</h2>
      <p>{practitioner.location}</p>
      <p>{practitioner.about}</p>
      <p>Experience: {practitioner.experience}</p>
      <p>Stars: {practitioner.starReviews}</p>
      <Link to={"/practitioner/" + practitioner.id}>See More...</Link>
    </div>
  );
};

export default PractitionerResult;
