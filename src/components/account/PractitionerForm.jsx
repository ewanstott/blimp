// import { useState } from "react";
import { useSelector } from "react-redux";
import { selectLoggedIn, setCurrentUser } from "../../redux/accountSlice";
import MainButton from "../MainButton";

const PractitionerForm = ({ onInput, onSubmit }) => {
  const loggedIn = useSelector(selectLoggedIn); // Get the loggedIn state from Redux

  const onChangeImage = (e) => {
    console.log(e);
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.addEventListener("load", (e) => {
      console.log(e.target.result);
      onInput({ type: "file", file: e.target.result });
    });
  };

  return (
    <div className="signupForm">
      <div>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" placeholder="Name" required />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
        />
      </div>
      <div>
        <label htmlFor="location">Location</label>
        <input
          type="text"
          name="location"
          id="location"
          placeholder="Location"
          required
        />
      </div>
      <div>
        <label htmlFor="specialization">Specialization</label>
        <input
          type="text"
          name="specialization"
          id="specialization"
          placeholder="Specialization"
          required
        />
      </div>
      <div>
        <label htmlFor="qualifications">Qualifications</label>
        <input
          type="text"
          name="qualifications"
          id="qualifications"
          placeholder="Qualifications"
          required
        />
      </div>
      <div>
        <label htmlFor="experience">Experience</label>
        <select id="experience" name="experience" required>
          <option value="#">Select Experience</option>
          <option value="1">1 year</option>
          <option value="2">2 years</option>
          <option value="3">3 years</option>
          <option value="4">4 years</option>
          <option value="5">5 years</option>
          <option value="6">6 years</option>
          <option value="7">7 years</option>
          <option value="8">8 years</option>
          <option value="9">9 years</option>
          <option value="10">10+ years</option>
        </select>
      </div>
      <div>
        <label htmlFor="about">About</label>
        <input
          type="text"
          name="about"
          id="about"
          placeholder="About"
          required
        />
      </div>
      <div>
        <label htmlFor="image">Upload Your Photo</label>
        <input
          onChange={onChangeImage}
          type="file"
          id="file"
          name="file"
          accept="image/*"
        />
      </div>
      <div>
        <MainButton onClick={onSubmit} type="submit" text="Submit" />
      </div>
    </div>
  );
};

export default PractitionerForm;
