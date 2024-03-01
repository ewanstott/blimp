const Practitioner = ({ practitioner }) => {
  return (
    <div className="searchResult">
      <h1>{practitioner.name}</h1>
      <img src={practitioner.image} alt={practitioner.name} />
      <h2>{practitioner.specialization}</h2>
      <p>{practitioner.location}</p>
      <p>{practitioner.about}</p>
      <p>{practitioner.style}</p>
      <p>Experience: {practitioner.experience}</p>
      <p>Qualifications: {practitioner.qualifications}</p>
      <p>Stars: {practitioner.starReviews}</p>
    </div>
  );
};

export default Practitioner;
