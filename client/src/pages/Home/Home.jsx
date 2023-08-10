import React, { useState, useEffect } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { Table, RoomModal } from "../../components";
import "./Home.css";

export default function Home() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    // Fetch the username from local storage
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername || ""); 
  }, []);

  return (
    <div>
      <span>Hello, {username}! </span>
      <RoomModal open={open} handleClose={handleClose} setOpen={setOpen} />

      <Tooltip title="Create Room">
      <Fab color="primary" aria-label="add" onClick={handleOpen}>
          <AddIcon />
        </Fab>
      </Tooltip>
      <Table />
    </div>
  );
};
