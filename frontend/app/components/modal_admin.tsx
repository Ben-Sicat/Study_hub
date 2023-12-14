"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Butt from "./button";
import ModalExtend from "./modal_extend"; // Import your ModalExtend component

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "20px",
  border: "2px solid #DC9D94",
  boxShadow: 24,
  p: 4,
};

interface BasicModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function ModalAdmin({ isOpen, onClose }: BasicModalProps) {
  const [showExtendModal, setShowExtendModal] = useState(false);

  const handleOpen = () => {
    setShowExtendModal(true);
  };

  const handleClose = () => {
    setShowExtendModal(false);
    onClose();
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="text-textcolor text-xl font-bold">
            <h2>Control Reservation</h2>
          </div>

          <div className="container">
            <div className="flex justify-center items-center mt-5">
              <div className="text-textcolor text-base font-bold">
                <h2>Time Usage/Reservation</h2>
              </div>
            </div>

            <div className="flex justify-center space-x-5 text-xs">
              <Butt
                title="Cancel"
                Bgcolor="#A081AB"
                width="152px"
                height="30px"
                borderRadius="10px"
                onClick={onClose} // Close the main modal on Cancel button click
              />
              <Butt
                title="Extend"
                Bgcolor="#F8D8D4"
                width="152px"
                height="30px"
                borderRadius="10px"
                onClick={handleOpen} // Show the extend modal on Extend button click
              />
            </div>
          </div>
        </Box>
      </Modal>

      {showExtendModal && (
        <ModalExtend
          isOpen={true /* or use a state variable for this */}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

export default ModalAdmin;
