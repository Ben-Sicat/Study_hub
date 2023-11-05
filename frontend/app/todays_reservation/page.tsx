import React from "react";
import Teste from "../components/account";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import QrCodeIcon from "@mui/icons-material/QrCode";
import Butt from "../components/button";
import Info from "../components/qr_info";

function Page() {
  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <Teste
        backButtonIcon={<ArrowBackIosIcon style={{ fontSize: 20 }} />}
        title="Today's Reservation"
        subTitle1="Simply scan the QR Code, and our friendly staff will be delighted to assist you with any inquiries or requests you may have during your time with us."
      />

      <div className="text-center text-qr mt-7 mb-5">
        {<QrCodeIcon style={{ fontSize: 300 }} />}
      </div>

      <Info title="Table Number:" />
      <Info title="Reserved Time:" />
      <Info title="Duration:" />
      <Info title="Payment Details:" />

      <div className="mt-5"></div>

      <Butt title="Cancel Reservation" Bgcolor="#FFF1E4" />
    </div>
  );
}

export default Page;
