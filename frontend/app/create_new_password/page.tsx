"use client";
import React, { useEffect } from "react";
import Teste from "../components/account";
import Butt from "../components/button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TextInput from "../components/text_input";
import Pass from "../components/text_input_pass";

import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.back();
  };

  useEffect(() => {
    // Set the title directly for the browser tab
    document.title = "New Password";
  }, []);

  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <Teste
        backButtonIcon={<ArrowBackIosIcon style={{ fontSize: 20 }} />}
        onBackButtonClick={handleBackButtonClick}
        title="Create a new password"
        subTitle1="Create a password with at least 6 letters and numbers. You'll need this password to log into your account."
      />

      <Pass width="343px"></Pass>

      <Butt title="Continue" Bgcolor="#EBE0D0" width="343px" />
    </div>
  );
}

export default Page;
