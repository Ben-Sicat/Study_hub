import React from "react";
import Teste from "../components/account";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import QrCodeIcon from "@mui/icons-material/QrCode";
import Butt from "../components/button";

function Page() {
  return (
    <div className="flex min-h-full flex-col bg-bg">
      <Teste
        backButtonIcon={<ArrowBackIosIcon style={{ fontSize: 20 }} />}
        title="Reserved Successfully"
        subTitle1="Simply scan the QR Code, and our friendly staff will be delighted to assist you with any inquiries or requests you may have during your time with us."
      />

      <div className="text-center text-qr mt-7 mb-5">
        {<QrCodeIcon style={{ fontSize: 300 }} />}
      </div>

      <Butt title="View Transaction" />
    </div>
  );
}

export default Page;
