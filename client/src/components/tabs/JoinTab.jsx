import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from 'react-router-dom';

import { useSocket } from "../../socketConnection/socketConnection";

function JoinTab({ onClose }) {
  const { socket } = useSocket();
  const [username] = useState("");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const joinRoom = async () => {
    // Validate the room ID by making a request to your server or database
    const isValidRoom = await validateRoomId(roomId);

    if (isValidRoom) {
      socket.emit("join_room", { username, roomId });
      navigate(`/room/${roomId}`);
    } else {
      alert("Invalid Room ID");
    }
  };

  // Simulate validation by checking if the room ID matches a predefined value
  const validateRoomId = async (roomId) => {
    // Replace this with your actual validation logic (e.g., API request)
    const validRoomId = "64d4e3fdd5b67a798acfc285";
    return roomId === validRoomId;
  };

  return (
    <div className="grid justify-center">
      <ul>
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
