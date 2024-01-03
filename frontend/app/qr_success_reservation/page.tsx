"use client";
import React, { useEffect, useState } from "react";
import Teste from "../components/account";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import QR from "../components/QR";
import Butt from "../components/button";
import Info from "../components/qr_info";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const [reservationData, setReservationData] = useState({
    reservationId: "",
    startTime: "",
    endTime: "",
    seat: "",
    resDate: "",
    tableFee: "",
    userId: "",
  });

  const handleBackButtonClick = () => {
    router.back();
  };

  useEffect(() => {
    document.title = "Today's Reservation";

    // Get reservation_id from localStorage
    const resId = localStorage.getItem('reservation_id');

    if (resId) {
      // Fetch reservation details using the endpoint
      fetch(`http://localhost:5000/api/get-reservation-by-id/${resId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data && data.reservation) {
            const fetchedReservation = data.reservation;
            setReservationData({
              reservationId: fetchedReservation.ReservationID.toString(),
              startTime: fetchedReservation.StartTime,
              endTime: fetchedReservation.EndTime,
              seat: fetchedReservation.Seat,
              resDate: fetchedReservation.ResDate,
              tableFee: fetchedReservation.TableFee,
              userId: fetchedReservation.UserID.toString(),
            });
          } else {
            console.log("Reservation not found");
          }
        })
        .catch((error) => {
          console.error("Error fetching reservation:", error);
        });
    }
  }, []);

  const qrCodeData = JSON.stringify(reservationData);
  console.log(qrCodeData);

  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <Teste
        backButtonIcon={<ArrowBackIosIcon style={{ fontSize: 20 }} />}
        onBackButtonClick={handleBackButtonClick}
        title="Today's Reservation"
        subTitle1="Simply scan the QR Code, and our friendly staff will be delighted to assist you with any inquiries or requests you may have during your time with us."
      />

      <div className="text-center text-qr mt-7 mb-10">
        <div className="flex justify-center items-center">
          <QR data={qrCodeData} size={200} />
        </div>
      </div>

      <Info title={`Seat: `} value={reservationData.seat} />
      <Info title={`Start Time: `} value={reservationData.startTime} />
      <Info title={`End Time: `} value={reservationData.endTime} />
      <Info title={`Date: `} value={reservationData.resDate} />
      <Info title={`Table Fee: `} value={reservationData.tableFee} />

      <div className="mt-5"></div>

      <Butt title="Cancel Reservation" Bgcolor="#FFF1E4" />
    </div>
  );
}

export default Page;
