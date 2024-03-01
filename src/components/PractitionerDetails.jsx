import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectPractitionerData } from "../redux/practitionerSlice";

const PractitionerDetails = () => {
  const { id } = useParams();
  console.log(id);

  const practitionerData = useSelector(selectPractitionerData); //access to practinioner data here

  const practitioner = practitionerData.find((item) => {
    return item.id === Number(id);
  });
  console.log(practitioner);
  return (
    <div className="campaignDetails">
      <h3>practinioner details</h3>
      <h1>{practitioner.name}</h1>
      <img src={practitioner.image} alt={practitioner.name} />
      <h2>{practitioner.specialization}</h2>
      <p>{practitioner.location}</p>
      <p>{practitioner.about}</p>
      <p>{practitioner.style}</p>
      <p>Experience: {practitioner.experience}</p>
      <p>Qualifications: {practitioner.qualifications}</p>
      <p>Stars: {practitioner.starReviews}</p>
      {/* <p>Hello Routes</p> */}
    </div>

    //Add controls component for Favourite etc
  );
};

export default PractitionerDetails;
