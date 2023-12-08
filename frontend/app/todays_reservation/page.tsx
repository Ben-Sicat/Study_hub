"use client";
import React, { useEffect } from "react";
import Teste from "../components/account";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import QR from "../components/QR";
import Butt from "../components/button";
import Info from "../components/qr_info";

import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.back();
  };

  useEffect(() => {
    // Set the title directly for the browser tab
    document.title = "Today's Reservation";
  }, []);

  const reservationData = {
    reservationId: "12345",
    name: "John Doe",
    checkInDate: "2023-11-05",
    tableNumber: "1",
    reservedTime: "12:00",
    duration: "2 hours",
    paymentDetails: "GCash",
  };
  const qrCodeData = JSON.stringify(reservationData);

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

      <Info title={`Table Number: `} value={reservationData.tableNumber} />
      <Info title={`Reserved Time: `} value={reservationData.reservedTime} />
      <Info title={`Duration: `} value={reservationData.duration} />
      <Info
        title={`Payment Details: `}
        value={reservationData.paymentDetails}
      />

      <div className="mt-5"></div>

      <Butt title="Cancel Reservation" Bgcolor="#FFF1E4" />
    </div>
  );
}

export default Page;
