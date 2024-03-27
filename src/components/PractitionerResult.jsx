import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaStar, FaStarHalf } from "react-icons/fa";
import { selectLoggedIn } from "../redux/accountSlice";

const PractitionerResult = ({ practitioner }) => {
  // const history = useHistory();
  const loggedIn = useSelector(selectLoggedIn);
  // const navigate = useNavigate();

  // const onSeeMore = () => {
  //   if (loggedIn) {
  //     navigate(`/practitioner/${practitioner.id}`); // Navigate to practitioner details page
  //   } else {
  //     navigate("/login"); // Navigate to login page if not logged in
  //   }
  // };

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
      {/* <Link to={"/practitioner/" + practitioner.id}>See More...</Link> */}
      {/* <button onClick={handleSeeMore}>See More...</button> */}
      {loggedIn ? (
        <Link to={"/practitioner/" + practitioner.id}>See More...</Link>
      ) : (
        <Link to="/login">Log in to see more</Link>
        // <button onClick={onSeeMore}>Log in to see more</button>
      )}
    </div>
  );
};

export default PractitionerResult;
