import React from "react";
import Teste from "../components/account";
import Butt from "../components/button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function Page() {
  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <Teste
        backButtonIcon={<ArrowBackIosIcon style={{ fontSize: 20 }} />}
        title="Find your account"
        subTitle1="Enter your username, email, or mobile number"
      />

      <p className="text-redwood font-normal text-xs ml-8 py-1 px-1">
        Can't reset your password?
      </p>

      <Butt title="Find account" Bgcolor="#EBE0D0" />
    </div>
  );
}

export default Page;
