import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import { useSocket } from "../../socketConnection/socketConnection";

import "./RoomModal.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal({ onClose, roomId }) {
  const { socket } = useSocket();
  const [username, setUsername] = useState("");

  //mozna wyrzucić nad compontents jako helpers function
  const joinRoom = () => {
    if (username !== "" && username !== null) {
      socket.emit("join_room", { username, roomId });
    }
  };

  return (
    <div className="modal__wrapper">
      <Modal
        open={true}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modal__wrapper--content">
          <Box sx={style}>
            <span className="create_room--title">Join room</span>
            <ul>
              <li>
                <TextField
                  label="Enter your name"
                  size="small"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </li>
            </ul>

            <Button onClick={joinRoom/*(socket, username, roomId)*/}>Join</Button>
          </Box>
        </div>
      </Modal>
    </div>
  );
}

export default ChildModal;
