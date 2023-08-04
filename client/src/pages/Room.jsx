import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";

import { useSocket } from "../socketConnection";

function Room({username, roomId}) {
  const { socket } = useSocket();
  const [usersInRoom, setUsersInRoom] = useState([]);
  console.log("Received username prop:", username);
  

  useEffect(() => {
    socket.on("users_in_room", (users) => {
      setUsersInRoom(users);
    });

    return () => {
      socket.off("users_in_room");
    };
  }, [socket]);

  return (
    <div>
      <React.Fragment>
        <CssBaseline />
        <Container fixed>
        <ul>
            <li>
              Current users:
              {usersInRoom.map((user) => (
              <span key={user.id}>{user.username}, </span>
              ))}
            </li>

            <li>Username: {username}</li>
            <li>Room ID: {roomId}</li>
          </ul>
        </Container>
      </React.Fragment>
    </div>
  );
}

export default Room;
