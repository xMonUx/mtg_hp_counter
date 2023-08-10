import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Input from "@mui/material/Input";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

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
const ariaLabel = { "aria-label": "description" };

export default function BasicModal({ open, onClose, roomId }) {
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleCopyClick = () => {
    try {
      // Copy the content from the input field to the clipboard
      navigator.clipboard.writeText(roomId);
      setShowSuccessAlert(true);
    } catch (error) {
      console.error("Error copying content:", error);
      setShowSuccessAlert(false);
    }
  };

  useEffect(() => {
    if (showSuccessAlert) {
      const timeoutId = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 5000); // 10 seconds

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [showSuccessAlert]);

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="mb-5">
            {showSuccessAlert && (
              <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                Room ID copied to clipboard!
              </Alert>
            )}
          </div>

          <Typography id="modal-modal-title" variant="h5" component={'span'}>
            Your room has been created!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3 }}>
            <div className="mb-5">
              <Input
                readOnly
                placeholder="Placeholder"
                inputProps={{
                  "aria-label": ariaLabel,
                  style: {
                    width: "300px", 
                    height: "40px", 
                  },
                }}
                value={roomId}
              />
              <ContentCopyIcon
                className="cursor-pointer"
                onClick={handleCopyClick}
              />
            </div>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
