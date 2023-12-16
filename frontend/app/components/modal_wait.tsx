"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Butt from "./button";
import Link from "next/link";
import ModalExtend from "./modal_extend"; // Import your ModalExtend component
import InfoTable from "./waitlist_table";

type UserInfo = {
  id: number;
  name: string;
  // Add more properties as needed
};

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

function BasicModal({ isOpen, onClose }: BasicModalProps) {
  const [showExtendModal, setShowExtendModal] = useState(false);

  const handleOpen = () => {
    setShowExtendModal(true);
  };

  const handleClose = () => {
    setShowExtendModal(false);
    onClose();
  };

  const userData = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 101, name: "Gian Limbaga" },
    { id: 102, name: "The Fourth" },
    { id: 103, name: "Melaissa Rioveros" },
    { id: 104, name: "Chen Leonor" },
    { id: 105, name: "Eric Ramos" },
    // Add more user data as needed
  ];

  const [data, setData] = useState<UserInfo[]>(userData);
  const [filteredData, setFilteredData] = useState<UserInfo[]>(data);

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
            <h2>Waitlist View</h2>
          </div>

          <div className="container">
            <div className="container bg-gray-200 rounded-lg mt-7 mb-3 text-xs">
              <InfoTable data={filteredData} />
            </div>

            <div className="flex justify-center space-x-5 text-xs">
              <Butt
                title="Exit"
                Bgcolor="#EBE0D0"
                width="160px"
                height="30px"
                borderRadius="10px"
              />
              <Butt
                title="Enter"
                Bgcolor="#EBE0D0"
                width="160px"
                height="30px"
                borderRadius="10px"
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

export default BasicModal;
