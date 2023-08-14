import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from 'react-router-dom';

import { useSocket } from "../../socketConnection/socketConnection";

function JoinTab({ onClose }) {
  const { socket } = useSocket();
  const storedUsername = localStorage.getItem("username");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const joinRoom = async () => {
    // Validate the room ID by making a request to the server
    try {
      const response = await fetch(`http://localhost:5000/validate-room/${roomId}`);
      const data = await response.json();
      
      if (data.isValid) {
        socket.emit("join_room", { storedUsername, roomId });
        socket.emit("new_user", {storedUsername, SocketID: socket.id});
        navigate(`/room/${roomId}`);
      } else {
        alert("Invalid Room ID");
      }
    } catch (error) {
      console.error(error);
      alert("Error validating Room ID");
    }
  };

    return (
    <div className="grid justify-center">
      <ul>
      <span className="mb-3">Hello, {storedUsername}!</span>
        <li className="mb-3">
          <TextField
            label="Room ID"
            type="string"
            size="small"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
        </li>
        <li className="mb-3">
          <TextField label="Password" type="password" size="small" />
        </li>
        <li className="text-center">
          <Button onClick={joinRoom}>Join</Button>
        </li>
      </ul>
    </div>
  );
}

export default JoinTab;
