import { Link } from "react-router-dom";
import { FaStar, FaStarHalf } from "react-icons/fa";

const PractitionerResult = ({ practitioner }) => {
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
    <div className="searchResultCard">
      <h3>{practitioner.name}</h3>
      <img src={practitioner.image} alt={practitioner.name} />
      <h3>{practitioner.specialization}</h3>
      <p>{practitioner.location}</p>
      <p className="practitionerAbout">{practitioner.about}</p>
      <p>Years of Wisdom: {practitioner.experience}</p>
      <p>
        Stars: <span className="stars">{stars}</span>
      </p>
      <Link to={"/practitioner/" + practitioner.id}>See More...</Link>
    </div>
  );
};

export default PractitionerResult;
