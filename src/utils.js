export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);
  // Format the date and time as per your requirements
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;
  return `${formattedDate} ${formattedTime}`;
}
