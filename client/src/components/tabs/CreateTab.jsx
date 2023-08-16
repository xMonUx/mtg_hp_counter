import React, { useState } from "react";
import { createRoom } from "../../utils/databaseFunctions";

import { Select } from "..";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import BasicModal from "../modal/roomidModal";
 


export default function CreateTab({
  open,
  setOpen,
  onCreateRoom,
}) {
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState("");
  const [players, setPlayers] = useState("");
  const [format, setFormat] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [CreatedRoomId, setCreatedRoomId] = useState("");
  const storedUsername = localStorage.getItem("username");

  const handleCreateRoom = async () => {
    const data = {
      name: roomName,
      format,

      players: parseInt(players),
      password,
    };

    try {
      const newRoom = await createRoom(data);
      setRoomName("");     
      setFormat("");       
      setPlayers("");      
      setPassword("");
      setOpenModal(true);
      setCreatedRoomId(newRoom._id);     
    } catch (error) {}
  };

  return (
    <div className="grid justify-center ">
      <ul>
      <span className="mb-3">Hello, {storedUsername}!</span>
        <li className="mb-3">

          <TextField
            label="Room name"
            size="small"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
        </li>
        <li className="mb-3">
          <TextField
            label="Password"
            type="password"
            size="small"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </li>
        <li className="mb-3">
          <Select
            id={1}
            value={format}
            onChange={(e) => setFormat(e.target.value)}
          />
        </li>
        <li className="mb-3">
          <Select
            id={2}
            value={players}
            onChange={(e) => setPlayers(e.target.value)}
          />
        </li>
        <li className="text-center">
          <Button onClick={handleCreateRoom}>Create</Button>
        </li>
      </ul>
      <BasicModal open={openModal} onClose={() => setOpenModal(false)} roomId={CreatedRoomId}/>
    </div>
  );
}
