"use client";
import React, { useEffect } from "react";
import Teste from "../components/account";
import Butt from "../components/button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TextInput from "../components/text_input";
import Link from "next/link";

import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.back();
  };

  useEffect(() => {
    // Set the title directly for the browser tab
    document.title = "Forget Password";
  }, []);

  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <Teste
        backButtonIcon={<ArrowBackIosIcon style={{ fontSize: 20 }} />}
        onBackButtonClick={handleBackButtonClick}
        title="Find your account"
        subTitle1="Enter your username, email, or mobile number"
      />

      <p className="text-redwood font-normal text-xs ml-8 py-1 px-1">
        <a href="#">Can't reset your password?</a>
      </p>

      <TextInput
        placeholder="Username, email, or mobile number"
        width="343px"
      />

      <Link href="/find_account">
        <Butt title="Find account" Bgcolor="#EBE0D0" width="343px" />
      </Link>
    </div>
  );
}

export default Page;
