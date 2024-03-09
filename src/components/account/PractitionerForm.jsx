import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedIn, setNewUser } from "../../redux/accountSlice";

const PractitionerForm = () => {
  const loggedIn = useSelector(selectLoggedIn); // Get the loggedIn state from Redux

  //@Ask - duplicate code below - combine with patientForm??
  // const [userInput, setUserInput] = useState({});
  // const dispatch = useDispatch();

  // const onInput = (e) => {
  //   setUserInput({ ...userInput, [e.target.id]: e.target.value });
  // };

  // const onSubmit = (e) => {
  //   e.preventDefault(); //stops page re-rendering
  //   dispatch(setNewUser(userInput)); //when submit pressed, dispatch -> setNewUser -> send store all user input (email, password)
  //   dispatch(setScreen(1));
  // };

  // console.log(userInput);

  return (
    <>
      {/* <form onInput={onInput} onSubmit={onSubmit}> */}
      <div>
        <label htmlFor="name">Name</label>
        <input type="name" name="name" id="name" required />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" required />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" required />
      </div>

      <p>Additional Questions</p>
      <div>
        <label htmlFor="specialization">Specialization:</label>
        <input
          type="specializationd"
          id="specialization"
          name="specialization"
          required
        />
      </div>
      <div>
        <label htmlFor="qualifications">Qualifications:</label>
        <input
          type="qualifications"
          id="qualifications"
          name="qualifications"
          required
        />
      </div>
      <label htmlFor="experience">Experience:</label>
      <select id="experience" name="experience">
        <option value="1">1 year</option>
        <option value="2">2 years</option>
        <option value="3">3 years</option>
        <option value="4">4 years</option>
        <option value="5">5 years</option>
        <option value="15">15 years</option>
        <option value="15+">15+ years</option>
      </select>
      <div>
        <label htmlFor="about">About:</label>
        <input type="about" id="about" name="about" required />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
      {/* </form> */}
    </>
  );
};

export default PractitionerForm;
