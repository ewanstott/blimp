import { useDispatch, useSelector } from "react-redux";
import { selectUser, setLoggedIn } from "../../redux/accountSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  selectFavourites,
  selectPractitionerData,
} from "../../redux/practitionerSlice";
import MainButton from "../MainButton";

const PatientDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access the currently logged-in user directly
  const user = useSelector(selectUser);
  const favourites = useSelector(selectFavourites);
  const practitionerData = useSelector(selectPractitionerData); //access to practinioner data here
  console.log(favourites);
  console.log(practitionerData);

  if (!practitionerData) {
    return <p>Loading data...</p>;
  }

  // const practitioner = practitionerData.find((item) => {
  //   return item.id === Number(id);
  // });
  // console.log(practitioner);

  return (
    <>
      <div className="patientDashboardContainer">
        <div className="patientDashboardText">
          <h1>Patient Dashboard</h1>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Favourite Health Heroes:</p>
          <div>
            {favourites.map((favId) => {
              const practitioner = practitionerData.find(
                (practitioner) => practitioner.id === favId
              );
              return practitioner ? (
                <div key={practitioner.id}>
                  <div className="favouriteCardContainer">
                    <h3>{practitioner.name}</h3>
                    <img src={practitioner.image} alt={practitioner.name} />
                    <p>{practitioner.specialization}</p>
                    <Link to={`/practitioner/${practitioner.id}`}>
                      View Details
                    </Link>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
        <MainButton
          onClick={() => {
            dispatch(setLoggedIn(false));
            navigate("/");
          }}
          text="Logout"
        />
        {/* <button
          className="button"
          onClick={() => {
            dispatch(setLoggedIn(false)); 
            navigate("/"); 
          }}
        >
          Logout
        </button> */}
      </div>
    </>
  );
};

export default PatientDashboard;
