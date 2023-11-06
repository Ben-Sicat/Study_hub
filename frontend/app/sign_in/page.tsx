import React from "react";
import TextInput from "../components/text_input";
import Pass from "../components/text_input_pass";
import Butt from "../components/button";

function Page() {
  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <div>
        <div className="mt-60"></div>
        <p className="text-center">LOGO</p>
        <div className="mt-40"></div>

        <TextInput
          placeholder="Username, email, or mobile number"
          width="343px"
        />

        <Pass width="343px"></Pass>
      </div>

      <p className="text-end text-parrot text-xs mr-10">Forgot Password?</p>

      <Butt title="Log In" Bgcolor="#EBE0D0" width="343px" />

      <div className="mt-40"></div>

      <Butt title="Create Account" Bgcolor="#FFFAF6" width="343px" />
    </div>
  );
}

export default Page;
