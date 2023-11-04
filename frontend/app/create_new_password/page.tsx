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
        title="Create a new password"
        subTitle1="Create a password with at least 6 letters and numbers. You'll need this password to log into your account."
      />

      <TextInput placeholder="New Password" />

      <Butt title="Continue" Bgcolor="#EBE0D0" />
    </div>
  );
}

export default Page;
