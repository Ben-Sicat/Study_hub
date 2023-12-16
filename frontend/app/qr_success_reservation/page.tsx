"use client";
import React, { useEffect } from "react";
import Teste from "../components/account";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";

// ... other imports ...

import QR from "../components/QR";
import Butt from "../components/button";

import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.back();
  };

  useEffect(() => {
    // Set the title directly for the browser tab
    document.title = "Success Reservation";
  }, []);

  const reservationData = {
    reservationId: "7",
    name: "John Doe",
    Stime: "1:15",
    ETime: "3:15",
    tableNumber: "h2",
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
