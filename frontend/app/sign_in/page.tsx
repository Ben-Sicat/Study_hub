"use client";
import React, { useEffect } from "react";
import TextInput from "../components/text_input";
import Pass from "../components/text_input_pass";
import Butt from "../components/button";
import { Logo, Painting } from "../components/svgs";
import Link from "next/link";
import { useState } from "react";

function Page() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (value: string) => {
    setUsername(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };
  const handleLogin = async () => {
    try{
      const response = await fetch('http://localhost:5000/api/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if(response.ok){
        const data = await response.json();
        console.log("login success")
        console.log( "data", data)
        console.log("data", data.acces_token)
      }
    } catch (error) {
      console.error(error);

    }

  };
  useEffect(() => {

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
          onInputChange={handleUsernameChange}
        />

        <Pass 
        width="343px"
        onInputChange={handlePasswordChange}
        />
      </div>

      <p className="text-end text-parrot text-xs mr-10">
        <Link href="/forget_password">Forgot Password?</Link>
      </p>

      <Butt title="Log In" Bgcolor="#EBE0D0" width="343px"  onClick={handleLogin}/>

      <div className="mt-40"></div>

      <Link href="/create_account">
        <Butt title="Create Account" Bgcolor="#FFFAF6" width="343px" />
      </Link>
    </div>
  );
}

export default Page;
