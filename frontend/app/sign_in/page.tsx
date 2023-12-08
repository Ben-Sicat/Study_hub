"use client";
import React, { useEffect } from "react";
import TextInput from "../components/text_input";
import Pass from "../components/text_input_pass";
import Butt from "../components/button";
import { Logo, Painting } from "../components/svgs";
import Link from "next/link";

function Page() {
  useEffect(() => {
    // Set the title directly for the browser tab
    document.title = "Find Account";
  }, []);

  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <div>
        <div className="flex justify-center items-center mt-36 mb-36">
          <Logo className="text-9xl" />
        </div>

        <TextInput
          placeholder="Username, email, or mobile number"
          width="343px"
        />

        <Pass width="343px"></Pass>
      </div>

      <p className="text-end text-parrot text-xs mr-10">
        <Link href="/forget_password">Forgot Password?</Link>
      </p>

      <Butt title="Log In" Bgcolor="#EBE0D0" width="343px" />

      <div className="mt-40"></div>

      <Link href="/create_account">
        <Butt title="Create Account" Bgcolor="#FFFAF6" width="343px" />
      </Link>
    </div>
  );
}

export default Page;
