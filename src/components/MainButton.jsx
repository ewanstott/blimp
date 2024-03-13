import React from "react";
import { Button } from "@mui/material";

const MainButton = ({ text, onClick }) => {
  return (
    <div>
      {/* <Button variant="text">Text</Button> */}
      <Button variant="contained" onClick={onClick}>
        {text}
      </Button>
      {/* <Button variant="outlined">Outlined</Button> */}
    </div>
  );
};

export default MainButton;
