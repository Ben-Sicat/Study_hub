"use client";
import React, { useEffect, useState } from "react";
import Upper from "../components/upperleft_icon";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "../components/account_image";
import CircleIcon from "@mui/icons-material/Circle";
import Dropdown from "../components/dropdown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Line from "../components/line";
import Butt from "../components/button";
import Link from "next/link";
import TemporaryDrawer from "../components/side_bar";

function page() {
  const [username, setUsername] = useState("");
  useEffect(() => {
    const accessToken = localStorage.getItem("user");
    setUsername(accessToken ? JSON.parse(accessToken).Username : "");
    document.title = "Account";
  }, []);

  const handleLogout = () => {
    // Clear user key from local storage
    localStorage.removeItem("user");

    // Redirect to home page
    window.location.href = "/";
  };

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <TemporaryDrawer ButtonIcon={undefined}></TemporaryDrawer>

      <div className="flex items-center space-x-2 mt-2 ml-7">
        <Image
          ImageIcon={<CircleIcon style={{ fontSize: 98, color: "#C7C7C7" }} />}
        ></Image>

        <p className="text-xl font-extrabold">{username}</p>
      </div>

      <div className="mt-3">
        <p className=" text-textcolor text-sm font-extrabold py-2 px-2 ml-7 mt-3">
          My Account
        </p>

        <div className="text-sm mt-4">
          <Link href="/edit_profile">
            <Dropdown
              title="Edit Profile"
              LeftArrow={<KeyboardArrowRightIcon style={{ fontSize: 23 }} />}
            />
          </Link>
          <Line></Line>
        </div>
      </div>

      <div className="mt-7">
        <p className=" text-textcolor text-sm font-extrabold py-2 px-2 ml-7 mt-3">
          General
        </p>

        <div className="text-sm mt-4">
          <Link href="/help_center">
            <Dropdown
              title="Help Center"
              LeftArrow={<KeyboardArrowRightIcon style={{ fontSize: 23 }} />}
            />
          </Link>
          <Line></Line>
        </div>

        <div className="text-sm mt-4">
          <Link href="/terms_and_agreements">
            <Dropdown
              title="Terms and Agreements"
              LeftArrow={<KeyboardArrowRightIcon style={{ fontSize: 23 }} />}
            />
          </Link>
          <Line></Line>
        </div>
      </div>

      <div className="mt-20"></div>

      <Butt
        title="Log Out"
        Bgcolor="#FFF1E4"
        width="325px"
        height="34px"
        onClick={handleLogout}
      />
    </div>
  );
}

export default page;
