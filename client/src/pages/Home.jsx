import React, { useState } from "react";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { Table, RoomModal } from "../components";
import "./Home.css";

export default function Home() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <a href="/room">Room</a>
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
