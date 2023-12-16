"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Butt from "./button";
import Link from "next/link";
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

function ModalCreate({ isOpen, onClose }: BasicModalProps) {
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
            <h2>Create Account</h2>
          </div>

          <div className="container">
            <div className="flex justify-center items-center mt-5">
              <div className="text-textcolor text-base font-bold">
                <h2>Account Created Successfully!</h2>
              </div>
            </div>

            <div className="flex justify-center space-x-5 text-xs">
              <Link href="/sign_in">
                <Butt
                  title="Back to Sign In"
                  Bgcolor="#EBE0D0"
                  width="160px"
                  height="30px"
                  borderRadius="10px"
                />
              </Link>
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

export default ModalCreate;
