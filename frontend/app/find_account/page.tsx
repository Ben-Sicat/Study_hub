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
    document.title = "Find Account";
  }, []);

  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <Teste
        backButtonIcon={<ArrowBackIosIcon style={{ fontSize: 20 }} />}
        onBackButtonClick={handleBackButtonClick}
        title="Confirm your account"
        subTitle1="We sent you a code to your email. Enter that code to confirm your account."
      />

      <TextInput placeholder="Enter Code" width="343px" />

      <Link href="/create_new_password">
        <Butt title="Continue" Bgcolor="#EBE0D0" width="343px" />
      </Link>

      <p className="text-center text-stone-700 font-normal text-xs py-1 px-1">
        <a href="#">Send code again</a>
      </p>
    </div>
  );
}

export default Page;
