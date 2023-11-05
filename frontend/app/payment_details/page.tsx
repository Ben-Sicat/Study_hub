import React from "react";
import Reserv from "../components/reservation_summary";
import Teste from "../components/account";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function Page() {
  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <Teste
        backButtonIcon={<ArrowBackIosIcon style={{ fontSize: 20 }} />}
        title="Payment Details"
        subTitle1="Select your preferred payment method"
      />

      <Reserv></Reserv>
    </div>
  );
}

export default Page;
