"use client";
import React, { useEffect, useState } from "react";
import Teste from "../../components/account";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";
import QR from "../../components/QR";
import Butt from "../../components/button";
import { useRouter } from "next/router";

function Page() {
  const router = useRouter();
  const { resId } = router.query;
  
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
    document.title = "Success Reservation";
    if (resId) {
      fetch(`/api/get-reservation-by-id/${resId}`)
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
  }, [resId]);

  const qrCodeData = JSON.stringify(reservationData);

  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <Teste
        backButtonIcon={<ArrowBackIosIcon style={{ fontSize: 20 }} />}
        onBackButtonClick={handleBackButtonClick}
        title="Reserved Successfully"
        subTitle1="Simply scan the QR Code, and our friendly staff will be delighted to assist you with any inquiries or requests you may have during your time with us."
      />

      <div className="text-center text-qr mt-7 mb-5">
        <div className="flex justify-center items-center">
          <QR data={qrCodeData} size={200} />
        </div>
      </div>

      <Link href="/todays_reservation">
        <Butt title="View Transaction" Bgcolor="#FFF1E4" />
      </Link>
    </div>
  );
}

export default Page;
