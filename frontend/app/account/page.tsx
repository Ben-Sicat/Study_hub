import React from "react";
import Upper from "../components/upperleft_icon";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "../components/account_image";
import CircleIcon from "@mui/icons-material/Circle";
import Dropdown from "../components/dropdown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Line from "../components/line";
import Butt from "../components/button";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
  description: "Brew * Brain",
};

function page() {
  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <Upper
        ButtonIcon={<MenuIcon style={{ fontSize: 30, color: "#D78215" }} />}
      ></Upper>

      <div className="flex items-center space-x-2 mt-2 ml-7">
        <Image
          ImageIcon={<CircleIcon style={{ fontSize: 98, color: "#C7C7C7" }} />}
        ></Image>

        <p className="text-xl font-extrabold">Username</p>
      </div>

      <div className="mt-3">
        <p className=" text-textcolor text-sm font-extrabold py-2 px-2 ml-7 mt-3">
          My Account
        </p>

        <div className="text-sm mt-4">
          <Dropdown
            title="Edit Profile"
            LeftArrow={<KeyboardArrowRightIcon style={{ fontSize: 23 }} />}
          />
          <Line></Line>
        </div>

        <div className="text-sm mt-4">
          <Dropdown
            title="Rewards"
            LeftArrow={<KeyboardArrowRightIcon style={{ fontSize: 23 }} />}
          />
          <Line></Line>
        </div>
      </div>

      <div className="mt-7">
        <p className=" text-textcolor text-sm font-extrabold py-2 px-2 ml-7 mt-3">
          General
        </p>

        <div className="text-sm mt-4">
          <Dropdown
            title="Help Center"
            LeftArrow={<KeyboardArrowDownIcon style={{ fontSize: 23 }} />}
          />
          <Line></Line>
        </div>

        <div className="text-sm mt-4">
          <Dropdown
            title="Terms and Agreements"
            LeftArrow={<KeyboardArrowDownIcon style={{ fontSize: 23 }} />}
          />
          <Line></Line>
        </div>

        <div className="text-sm mt-4">
          <Dropdown
            title="Notifications"
            LeftArrow={<KeyboardArrowDownIcon style={{ fontSize: 23 }} />}
          />
          <Line></Line>
        </div>
      </div>

      <div className="mt-20"></div>

      <Butt title="Log Out" Bgcolor="#FFF1E4" width="325px" height="34px" />
    </div>
  );
}

export default page;
