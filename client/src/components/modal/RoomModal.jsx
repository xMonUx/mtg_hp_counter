import React, { useState } from "react";
import axios from "axios";

import "./RoomModal.css";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Select } from "../";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { createRoom } from "../../databaseFunctions"

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function RoomModal({ open, handleClose, setOpen, onCreateRoom }) {
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState("");
  const [players, setPlayers] = useState("");
  const [format, setFormat] = useState("");

  const handleCreateRoom = async () => {
    const data = {
      name: roomName,
      format,
      players: parseInt(players),
      password,
    };

    try {
      await createRoom(data); 
      handleClose();
    } catch (error) {
    }
  };
  

  return (
    <div className="modal__wrapper">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal__wrapper--content">
          <Box sx={style}>
            <span className="create_room--title">Create room</span>
            <ul>
              <li>
                <TextField
                  label="Room name"
                  size="small"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                />
              </li>
              <li>
                <TextField
                  label="Password"
                  type="password"
                  size="small"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </li>
              <li>
                <TextField
                  label="Players"
                  type="number"
                  size="small"
                  value={players}
                  onChange={(e) => setPlayers(e.target.value)}
                />
              </li>
              <li>
                <Select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                />
              </li>
            </ul>

            <Button onClick={handleCreateRoom}>Create</Button>
          </Box>
        </div>
      </Modal>
    </div>
  );
}
