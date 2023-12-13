"use client";
import React, { useEffect } from "react";
import TextInput from "../components/text_input";
import Pass from "../components/text_input_pass";
import Butt from "../components/button";
import { Logo, Painting } from "../components/svgs";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { signIn, useSession } from "next-auth/react";

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
    try {
      const response = await fetch("http://localhost:5000/api/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login: username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("login success", data);
        console.log("data", data.access_token);
        localStorage.setItem('access_token', data.user_data);
        window.location.href = "/reservation";
      }else {
        const errorData = await response.json();
        console.error("Login failed:", errorData.message);
      }
    } catch (error) { 
      console.error(error);
    }
  };
  

  
 

  // const session = useSession();
  // console.log("Current session token:", session.user);


  
  useEffect(() => {

    // Set the title directly for the browser tab
    document.title = "Sign In";

  }, []);

  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <div>
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.75,
          }}
          className="flex justify-center items-center mt-36 mb-36"
        >
          <Logo className="text-9xl" />
        </motion.div>
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1,
          }}
        >
          <TextInput
            placeholder="Username, email, or mobile number"
            width="343px"
            onInputChange={handleUsernameChange}
          />
        </motion.div>
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 1.25,
          }}
        >
          <Pass width="343px" onInputChange={handlePasswordChange} />
        </motion.div>
      </div>

      <p className="text-end text-parrot text-xs mr-10">
        <Link href="/forget_password">Forgot Password?</Link>
      </p>

      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1.5,
        }}
      >
        <Butt
          title="Log In"
          Bgcolor="#EBE0D0"
          width="343px"
          onClick={handleLogin}
        />
      </motion.div>

      <div className="mt-40"></div>
      <motion.div
        initial={{ y: 25, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 1.75,
        }}
      >
        <Link href="/create_account">
          <Butt title="Create Account" Bgcolor="#FFFAF6" width="343px" />
        </Link>
      </motion.div>
    </div>
  );
}

export default Page;
