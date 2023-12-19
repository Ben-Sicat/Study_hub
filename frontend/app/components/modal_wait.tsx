import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Butt from "./button";
import ModalExtend from "./modal_extend";
import InfoTable from "./waitlist_table";

type UserInfo = {
  id: number;
  name: string;
  // Add more properties as needed
};

type WaitlistEntry = {
  WaitlistID: number;
  UserID: number;
  Username: string;
  Seat: string;
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
  chairID: string;
}

function BasicModal({ isOpen, onClose, chairID }: BasicModalProps) {
  const [showExtendModal, setShowExtendModal] = useState(false);
  const [waitlistEntries, setWaitlistEntries] = useState<UserInfo[]>([]);

  const fetchWaitlistEntries = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/get-all-waitlist-entries`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch waitlist entries: ${response.statusText}`
        );
      }

      const data = await response.json();
      // Map WaitlistEntry to UserInfo
      const mappedEntries = data.waitlist_entries.map(
        (entry: WaitlistEntry) => ({
          id: entry.UserID,
          name: entry.Username,
        })
      );
      setWaitlistEntries(mappedEntries);
    } catch (error) {
      console.error(error);
      setWaitlistEntries([]); // Set an empty array in case of an error
    }
  };

  useEffect(() => {
    if (isOpen) {
      // Fetch waitlist entries when the component mounts
      fetchWaitlistEntries();
    }
  }, [isOpen]);

  const handleOpen = () => {
    setShowExtendModal(true);
  };

  const handleClose = () => {
    setShowExtendModal(false);
    onClose();
  };

  const handleEnterButtonClick = async () => {
    try {
      const storedUserData = localStorage.getItem("user");
      const parsedUserData = storedUserData ? JSON.parse(storedUserData) : null;
      const initialFormData = parsedUserData?.updated_user || null;
      let userID = initialFormData ? initialFormData.UserID : "";
      if (userID == undefined || userID == null || userID === "") {
        userID = parsedUserData ? parsedUserData.UserID : "";
      }

      let username = initialFormData ? initialFormData.Username : "";
      if (username == undefined || username == null || username === "") {
        username = parsedUserData ? parsedUserData.Username : "";
      }

      // Make a POST request to add the user to the waitlist
      const response = await fetch(
        `http://localhost:5000/api/create-waitlist-entry`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userID,
            username: username,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to add user to waitlist: ${response.statusText}`
        );
      }

      // Optionally, update the waitlist entries in the local state
      // You may need to fetch the updated waitlist entries again
      fetchWaitlistEntries();
    } catch (error) {
      console.error(error);
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
            <h2>Waitlist View</h2>
          </div>

          <div className="container">
            <div className="container bg-gray-200 rounded-lg mt-8 mb-3 text-xs">
              {/* Pass the modified waitlistEntries to InfoTable */}
              <InfoTable data={waitlistEntries} />
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
                onClick={handleEnterButtonClick}
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
