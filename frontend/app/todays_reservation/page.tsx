import React from "react";
import Teste from "../components/account";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import QR from "../components/QR";
import Butt from "../components/button";
import Info from "../components/qr_info";

function Page() {
  const reservationData = {
    reservationId: '12345',
    name: 'John Doe',
    checkInDate: '2023-11-05',
    tableNumber: '1',
    reservedTime: '12:00',
    duration: '2 hours',
    paymentDetails: 'GCash',
  };
  const qrCodeData = JSON.stringify(reservationData);

  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <Teste
        backButtonIcon={<ArrowBackIosIcon style={{ fontSize: 20 }} />}
        title="Today's Reservation"
        subTitle1="Simply scan the QR Code, and our friendly staff will be delighted to assist you with any inquiries or requests you may have during your time with us."
      />

      <div className="text-center text-qr mt-7 mb-5">
        <QR data={qrCodeData} />
      </div>

      <Info title={`Table Number: ${reservationData.tableNumber}`} />
      <Info title={`Reserved Time: ${reservationData.reservedTime}`} />
      <Info title={`Duration: ${reservationData.duration}`} />
      <Info title={`Payment Details: ${reservationData.paymentDetails}`} />

      <div className="mt-5"></div>

      <Butt title="Cancel Reservation" Bgcolor="#FFF1E4" />
    </div>
  );
}

export default Page;
