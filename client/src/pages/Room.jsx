import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

function Room() {
  
  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container fixed>
          <ul>
            <li>Current users: </li>
            <li>Username: </li>
            <li>Room ID: </li>
          </ul>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default Room;
