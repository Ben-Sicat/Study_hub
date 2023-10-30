import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type DropDownProps = {
  title: string;
};

function Dropdown({ title }: DropDownProps) {
  return (
    <div
      className="flex text-stone-700 ml-9 mt-2 mb-4"
      style={{ position: "relative" }}
    >
      <h1 className="text-sm font-bold mt-1">{title}</h1>
      <div
        style={{
          position: "absolute",
          right: "9%",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <button className="stroke-stone-700">
          <KeyboardArrowDownIcon style={{ fontSize: 23 }} />
        </button>
      </div>
    </div>
  );
}

export default Dropdown;
