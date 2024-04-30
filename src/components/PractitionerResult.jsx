import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { selectLoggedIn } from "../redux/accountSlice";

const PractitionerResult = ({ practitioner }) => {
  // const history = useHistory();
  const loggedIn = useSelector(selectLoggedIn);
  // const navigate = useNavigate();

  const renderStars = (star_reviews) => {
    const fullStars = Math.floor(star_reviews);
    const halfStar = star_reviews - fullStars >= 0.5;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={i} style={{ fill: "gold" }} />);
    }
    if (halfStar) {
      stars.push(<FaStarHalf key={"half"} style={{ fill: "gold" }} />);
    }
    return stars;
  };

  const stars = renderStars(practitioner.star_reviews);
  console.log(practitioner.image);

  return (
    <div className="searchResultCard">
      <h3>{practitioner.name}</h3>
      {/* {practitioner.image !== undefined && (
        <img src={practitioner.image} alt={practitioner.name} />
      )} */}
      {practitioner.image && ( // Check if image data is available
        <img src={practitioner.image} alt={practitioner.name} />
      )}
      {/* 
      {practitioner.image && (
        <img
          src={
            practitioner.image.startsWith("data:")
              ? practitioner.image
              : `/public/images/${practitioner.image}`
          }
          alt={practitioner.name}
        />
      )} */}

      <h3>{practitioner.specialization}</h3>
      <h6>{practitioner.experience} years of wisdom</h6>
      <p>{practitioner.location}</p>
      <p className="practitionerAbout">{practitioner.about}</p>
      <p>
        <span className="stars">{stars}</span>
        {/* //ternary use folder if not, use image... */}
      </p>
      {loggedIn ? (
        <Link to={"/practitioner/" + practitioner.id}>See More...</Link>
      ) : (
        <Link to="/login">Log in to see more</Link>
      )}
    </div>
  );
};

export default PractitionerResult;
