// import React, { useState } from "react";
// import axios from "axios";

// console.log(practitioner.practitionerId);
// const AppointmentBooking = ({ practitionerId, selectedSlot }) => {
//   //   const [selectedSlot, setSelectedSlot] = useState(null);

//   const handleSlotSelection = (slot) => {
//     setSelectedSlot(slot);
//   };

//   const handleBookingRequest = async () => {
//     if (!selectedSlot) {
//       alert("Please select a time slot.");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:6001/appointments/book",
//         {
//           practitionerId,
//           timeSlot: selectedSlot,
//         }
//       );
//       console.log(response.data);
//       // Handle success or show a confirmation message
//     } catch (error) {
//       console.error("Error booking appointment:", error);
//       // Handle error
//     }
//   };

//   const renderSlots = () => {
//     const slots = [];
//     for (let hour = 9; hour <= 17; hour++) {
//       slots.push(
//         <button key={hour} onClick={() => handleSlotSelection(hour)}>
//           {hour}:00 - {hour + 1}:00
//         </button>
//       );
//     }
//     return slots;
//   };

//   return (
//     <div className="appointmentBookingContainer">
//       <h2>Book an Appointment</h2>
//       <div className="slotsContainer">{renderSlots()}</div>
//       <button onClick={handleBookingRequest}>Book Appointment</button>
//     </div>
//   );
// };

// export default AppointmentBooking;
