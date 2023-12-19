import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Butt from "./button";
import DatePick from "./date_picker";
import TimePick from "./time_picker";
import { useRouter } from "next/navigation";
import moment from "moment";
import middleware from "@/middleware";

interface BasicModalProps {
  isOpen: boolean;
  onClose: () => void;
  chairId: string;
}

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

const BasicModal: React.FC<BasicModalProps> = ({
  isOpen,
  onClose,
  chairId,
}) => {
  const [formData, setFormData] = useState({
    Date: null as Date | null,
    StartTime: null as string | null,
    EndTime: null as string | null,
  });
  const router = useRouter();

  const handleInputChange = (
    field: keyof typeof formData,
    value: Date | string | null
  ) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value,
    }));
  };

  const redirectUrl = "http://localhost:3000/qr_success_reservation";
  const baseTableFee = 50; // Base price per hour

  const handleCreateReservation = async () => {
    try {
      const storedUserData = localStorage.getItem("user");
      const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
      const initialFormData = parsedUserData?.updated_user || null;
      let userID = initialFormData ? initialFormData.UserID : "";
      if (userID == undefined || userID == null || userID === "") {
        userID = parsedUserData ? parsedUserData.UserID : "";
      }

      const startMoment = moment(formData.StartTime, "HH:mm");
      const endMoment = moment(formData.EndTime, "HH:mm");
      const durationInHours = moment
        .duration(endMoment.diff(startMoment))
        .asHours();
      const tableFee = Math.ceil(durationInHours) * baseTableFee;

      const apiData = {
        seat: chairId,
        resdate: formData.Date
          ? moment(formData.Date).format("YYYY-MM-DD")
          : null,
        starttime: formData.StartTime,
        endtime: formData.EndTime,
        user_id: userID,
        tablefee: tableFee,
      };
      console.log(apiData);
      console.log(tableFee);
      router.push(
        `https://payment-gateway-weld.vercel.app/gcash/login?amountDue=${tableFee}&merchant=Brew and Brains&redirectUrl=${redirectUrl}`
      );

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
        console.log("Reserved successfully!");
      } else {
        console.error("Error Reservation", await response.json());
      }
    } catch (error) {
      console.error("Error Reservation", error);
    }
  };

  return (
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
              onDateChange={(value) => handleInputChange("Date", value)}
            />
          </div>

          <div className="flex justify-center items-center mt-3">
            <TimePick
              text="Start Time:"
              onInputChange={(value) => handleInputChange("StartTime", value)}
            />
          </div>

          <div className="flex justify-center items-center mt-3">
            <TimePick
              text="End Time:"
              onInputChange={(value) => handleInputChange("EndTime", value)}
            />
          </div>
        </div>

        <Butt
          onClick={handleCreateReservation}
          title="Reserve"
          Bgcolor="#EBE0D0"
          width="325px"
          height="34px"
        />
      </Box>
    </Modal>
  );
};

export default BasicModal;
