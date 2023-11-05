import React from "react";

type DropDownProps = {
  title: string;
  LeftArrow: JSX.Element;
};

function Dropdown({ title, LeftArrow }: DropDownProps) {
  return (
    <div
      className="flex text-stone-700 ml-9 mt-2 mb-4"
      style={{ position: "relative" }}
    >
      <h1>{title}</h1>
      <div
        style={{
          position: "absolute",
          right: "9%",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <button>{LeftArrow}</button>
      </div>
    </div>
  );
}

export default Dropdown;
