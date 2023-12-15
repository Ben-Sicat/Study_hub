"use client";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Butt from "./button";
import DatePick from "./date_picker";
import TimePick from "./time_picker";
import { useRouter } from "next/navigation";

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

  const [formData, setFormData] = useState<{
    Date: string | any ;
    StartTime: string | any;
    EndTime: string | any;
  }>({
    Date: "",
    StartTime: "",
    EndTime: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  const redirectUrl = "http://localhost:3000/qr_success_reservation"; //change this to a page after ng payment so magamit yung handleCreateAccount function. Dun pa dapat ma-ce-create yung reservation
  const getName = "Gian"; //change get the name of user from session or local storage kung san man naka store
  const tableFee = 140; //change den sa calculation
  const proceedPayment = () => {
    router.push(
      `https://payment-gateway-weld.vercel.app/gcash/login?amountDue=${tableFee}&merchant=Brew and Brains&redirectUrl=${redirectUrl}`
    );
  };

  const handleCreateAccount = async () => {
    try {
      const apiData = {
        chair_id: "", // Set a default value if not applicable
        date: formData.Date,
        starttime: formData.StartTime,
        endtime: formData.EndTime,
      };
      console.log(apiData)

      const response = await fetch(
        "http://localhost:5000/api/create-reservation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiData),
        }
      );

      if (response.ok) {
        // Successfully created account
        console.log("Reserved successfully!");
        // Optionally, you can redirect the user to a login page or another page
      } else {
        // Handle error cases
        console.error("Error Reservation", await response.json());
      }
    } catch (error) {
      console.error("Error Reservation", error);
    }
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
            <h2>Arrange Reservation</h2>
          </div>

          <div className="container">
            <div className="flex justify-center items-center mt-3">
              <DatePick
                text="Date:"
                onInputChange={(value) => handleInputChange("date", value)}
              ></DatePick>
            </div>

            <div className="flex justify-center items-center mt-3">
              <TimePick
                text="Start Time:"
                onInputChange={(value) => handleInputChange("starttime", value)}
              ></TimePick>
            </div>

            <div className="flex justify-center items-center mt-3">
              <TimePick
                text="End Time:"
                onInputChange={(value) => handleInputChange("endtime", value)}
              ></TimePick>
            </div>
          </div>

          <Butt
            onClick={proceedPayment}
            title="Reserve"
            Bgcolor="#EBE0D0"
            width="325px"
            height="34px"
          />
        </Box>
      </Modal>
    </div>
  );
}

export default BasicModal;
