import React from "react";

type InfoProps = {
  title: string;
};

function Info({ title }: InfoProps) {
  return (
    <div
      className="flex text-stone-700 ml-20 mt-1 mb-1"
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
        <div
          style={{
            width: "135px",
            height: "1.5px",
            background: "#C7C7C7",
          }}
        ></div>
      </div>
    </div>
  );
}

export default Info;
