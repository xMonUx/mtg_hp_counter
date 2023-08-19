import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { joinRoomWithValidation } from "../../utils/databaseFunctions";
import { useSocket } from "../../services/socket.io/socketConnection";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";


function JoinTab({ onClose }) {
  const { socket } = useSocket();
  const storedUsername = localStorage.getItem("username");
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const joinRoom = () => {
    joinRoomWithValidation(socket, storedUsername, roomId, navigate);
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
