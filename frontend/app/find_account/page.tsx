import React from "react";
import Teste from "../components/account";
import Butt from "../components/button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function Page() {
  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <Teste
        backButtonIcon={<ArrowBackIosIcon style={{ fontSize: 20 }} />}
        title="Confirm your account"
        subTitle1="We sent you a code to your email. Enter that code to confirm your account."
      />

      <Butt title="Continue" Bgcolor="#EBE0D0" />

      <p className="text-center text-stone-700 font-normal text-xs py-1 px-1">
        Send code again
      </p>
    </div>
  );
}

export default Page;
