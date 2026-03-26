// src/components/common/Modal.jsx

import { Modal as MuiModal, Box } from "@mui/material";

const Modal = ({ open, onClose, children }) => {
  return (
    <MuiModal open={open} onClose={onClose}>
      <Box
        sx={{
          background: "white",
          p: 4,
          borderRadius: 2,
          width: "50%",
          margin: "100px auto",
        }}
      >
        {children}
      </Box>
    </MuiModal>
  );
};

export default Modal;