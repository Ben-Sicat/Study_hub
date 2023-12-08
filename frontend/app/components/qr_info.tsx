import React from "react";

type InfoProps = {
  title: string;
  value: string;
};

function Info({ title, value }: InfoProps) {
  return (
    <div
      className="flex text-stone-700 ml-20 mt-2 mb-1"
      style={{ position: "relative" }}
    >
      <h1 className="text-xs mt-1">{title}</h1>
      <div
        style={{
          position: "absolute",
          right: "23%",
          top: "80%",
          transform: "translateY(-50%)",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="text-xs">{value}</div>
      </div>
    </div>
  );
}

export default Info;
