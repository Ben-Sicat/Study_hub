"use client";
import React, { useEffect, useState } from "react";
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
  Seat?: string | null;
  reservationData: any | null;
}


function ModalAdmin({ isOpen, onClose, reservationData}: BasicModalProps) {
  // const [reservation, setReservation] = useState<any>([null]); 
  const [showExtendModal, setShowExtendModal] = useState(false);

  const handleOpen = () => {
    setShowExtendModal(true);
  };
  const handleTerminate = async () =>{
    try{
      const response = await fetch(`http://localhost:5000/api/remove-reservation/${reservationData.Seat}`, {
        method: 'DELETE',
        });
        if(response.ok){
        const data = await response.json();
      }else{
        console.error("Error fetching reservation data:", await response.json());
      }
    }catch(error){
      console.error("Error fetching reservation data:", error);
    }
  }

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

          {reservationData && (
            <div className="flex flex-col items-center mt-3">
              <p className="text-textcolor text-base font-bold">
                Time Usage: {reservationData.StartTime} - {reservationData.EndTime}
              </p>
              <p className="text-textcolor text-base font-bold">
                Reservation Text: {reservationData.Username}
              </p>
            </div>
          )}

          <div className="flex justify-center space-x-5 text-xs">
            <Butt
              title="Terminate"
              Bgcolor="#A081AB"
              width="152px"
              height="30px"
              borderRadius="10px"
              onClick={handleTerminate}
            />
            <Butt
              title="Extend"
              Bgcolor="#F8D8D4"
              width="152px"
              height="30px"
              borderRadius="10px"
              onClick={handleOpen}
            />
          </div>

          <div className="flex justify-center items-center">
            <Butt
              title="Cancel"
              Bgcolor="#EBE0D0"
              width="320px"
              height="30px"
              borderRadius="10px"
              onClick={onClose}
            />
          </div>
        </Box>
      </Modal>

      {showExtendModal && (
        <ModalExtend isOpen={true} onClose={handleClose} Seat={reservationData.Seat} />
      )}
    </div>
  );
}

export default ModalAdmin;
