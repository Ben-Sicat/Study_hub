import React from "react";
import Teste from "../components/account";
import Butt from "../components/button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TextInput from "../components/text_input";

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

      <TextInput
        placeholder="Username, email, or mobile number"
        width="343px"
      />

      <Butt title="Find account" Bgcolor="#EBE0D0" width="343px" />
    </div>
  );
}

export default Page;
