"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Butt from "./button";
import DatePick from "./date_picker";
import TimePick from "./time_picker";

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
  Seat: string | null;
}

function ModalExtend({ isOpen, onClose, Seat }: BasicModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const[endtime, setEndTime] = useState<string>("");

  const handleInputChange = (value: string) => {
    setEndTime(value.toString());
    console.log(endtime)
  };

  const handleExtend = async () =>{

    try{
      const response = await fetch(`http://localhost:5000/api/update-reservation-endtime/${Seat}/${endtime}`, {
        method: 'PUT',
      });
        if(response.ok){
        const data = await response.json();
        console.log("Reservation Data:", data);
      }else{
        console.error("Error fetching reservation data:", await response.json());
      }
    }catch(error){
      console.error("Error fetching reservation data:", error);
    }
  }

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
            <h2>Extend Reservation</h2>
          </div>

          <div className="container">
            <div className="flex justify-center items-center mt-3">
              <TimePick
                text="End Time:"
                onInputChange={(value) => handleInputChange(value.toString())}
              ></TimePick>
            </div>
          </div>

          <div className="flex justify-center space-x-5 text-xs">
            <Butt
              title="Cancel"
              Bgcolor="#EBE0D0"
              width="152px"
              height="30px"
              borderRadius="10px"
              onClick={onClose}
            />
            <Butt
              title="Continue"
              Bgcolor="#F8D8D4"
              width="152px"
              height="30px"
              borderRadius="10px"
              onClick={handleExtend}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default ModalExtend;
