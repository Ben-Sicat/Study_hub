"use client";
import React, { useEffect } from "react";
import Reserv from "../components/reservation_summary";
import Teste from "../components/account";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.back();
  };

  useEffect(() => {
    // Set the title directly for the browser tab
    document.title = "Payment Details";
  }, []);

  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <Teste
        backButtonIcon={<ArrowBackIosIcon style={{ fontSize: 20 }} />}
        onBackButtonClick={handleBackButtonClick}
        title="Payment Details"
        subTitle1="Select your preferred payment method"
      />
      <Reserv />{" "}
      {/*insert values for RESERVED TIME and its PRICE inside "Reserv".. props are "time" and "price"*/}
    </div>
  );
}

export default Page;
