import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectPractitionerData } from "../redux/practitionerSlice";
import PractitionerControls from "./PractitionerControls";
import { FaStar, FaStarHalf } from "react-icons/fa";
import MessageInput from "../components/message/MessageInput";
import { selectCurrentUser } from "../redux/accountSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { formatTimestamp } from "../utils";

// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";

const PractitionerDetails = () => {
  const { id } = useParams();
  const [messageHistory, setMessageHistory] = useState([]);
  const practitionerData = useSelector(selectPractitionerData); //access to practinioner data here
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    const fetchMessageHistory = async () => {
      setMessageHistory([]);
      try {
        const response = await axios.get(
          `http://localhost:6001/message/history/${id}`,
          {
            headers: { token: localStorage.getItem("token") },
          }
        );
        console.log(response.data);
        if (response.data.status === 1) {
          setMessageHistory(response.data.messages);
          console.log(setMessageHistory);
        } else {
          console.error("Failed to fetch message history");
        }
      } catch (error) {
        console.error("Error fetching message history:", error);
      }
    };

    fetchMessageHistory();
  }, [id]);

  console.log(messageHistory);
  console.log(setMessageHistory);

  if (!practitionerData) {
    return <p>Loading data...</p>;
  }

  const practitioner = practitionerData.find((item) => {
    return item.id === Number(id);
  });

  //star rendering//
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
  console.log(messageHistory);
  return (
    <div className="singlePractitioner">
      <div className="practitionerDetails">
        <h3>Meet Your Healing Hero</h3>
        <h1>{practitioner.name}</h1>
        <img src={practitioner.image} alt={practitioner.name} />
        {/* Add Practitioner Intro Video  */}
        <div className="textContainer">
          <h5>Super Powers: {practitioner.specialization}</h5>
          <p>
            <b>Location:</b> {practitioner.location}
          </p>
          <p>
            <b>Words of Wisdom:</b> {practitioner.about}
          </p>
          <p>
            <b>Years of Wisdom:</b> {practitioner.experience}
          </p>
          <p>
            <b>Qualifications:</b> {practitioner.qualifications}
          </p>

          <p>
            <b>Stars:</b> <span className="stars">{stars}</span>
          </p>
          <p>
            <b>Reviews:</b> ...
          </p>

          <div className="practitionerControls">
            <PractitionerControls practitioner={practitioner} />
          </div>
          {/* <div className="bookingCalendar"> */}
          {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar />
            </LocalizationProvider> */}
          {/* <DemoItem label="Controlled calendar">
              <DateCalendar
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </DemoItem> */}
          {/* </div> */}
        </div>
        <div className="messageHistoryContainer">
          <h2>Message History</h2>
          {messageHistory.length > 0 ? (
            <ul>
              {messageHistory.map((message) => (
                <li
                  key={message.messageId}
                  className={
                    message.senderType === "patient"
                      ? "patient-message"
                      : "practitioner-message"
                  }
                >
                  <p>{message.message}</p>
                  <p>Sent at: {formatTimestamp(message.sent_at)}</p>{" "}
                </li>
              ))}
            </ul>
          ) : (
            <p>No message history available.</p>
          )}
        </div>
        <div>
          <MessageInput
            practitionerId={practitioner.id}
            sender={user.name}
            senderType="patient"
          />
        </div>
      </div>
    </div>
  );
};

export default PractitionerDetails;
