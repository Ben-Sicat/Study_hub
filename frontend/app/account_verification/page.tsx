import React from "react";

import type { Metadata } from "next";
import { Logo } from "../components/svgs";
import TextInput from "../components/text_input";
import Butt from "../components/button";

export const metadata: Metadata = {
  title: "Account Verification",
  description: "Brew * Brain",
};

function Page() {
  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <div className="container">
        <div className="flex justify-center items-center mt-28 mb-16">
          <Logo className="text-9xl" />
        </div>
      </div>

      <div className="container text-stone-700 font-normal text-xs text-center">
        <p className="ml-2 mr-2">
          A One-Time-Password was sent to your mobile number. Enter the code to
          verify your account.
        </p>
      </div>

      <div className="container mt-8">
        <TextInput placeholder="One-time Pin" width="343px" />
      </div>

      <div className="container mt-8">
        <Butt title="Verify OTP" Bgcolor="#EBE0D0" width="343px" />
      </div>

      <div className="container">
        <p className="text-center text-stone-700 font-normal text-xs py-1 px-1">
          <a href="#">Send code again</a>
        </p>
      </div>
    </div>
  );
}

export default Page;
