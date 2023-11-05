import React from "react";
import { Logo } from "@/app/components/svgs";

function Footer() {
  return (
    <div
      className="
    bg-macaroni-and-cheese
    flex
    h-28
    "
    >
      <div className="flex flex-col">
        <div className="text-logo-color mobile:text-xs mobile:font-bold  mobile:ml-5 flex text-center items-center">
          <div className="mobile:mr-1">
            <Logo className="text-5xl" />
          </div>{" "}
          Brews & Brains
        </div>

        <p>
          Where Coffee <br /> Meets Knowledge!
        </p>
      </div>

      <div>Follow us On:</div>
    </div>
  );
}

export default Footer;
