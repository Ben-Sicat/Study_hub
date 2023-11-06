import React, { useState } from "react";
import Button from "@mui/material/Button";

type ButtProps = {
  title: string;
  Bgcolor: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  onClick?: () => void;
};

function Butt({ title, Bgcolor = "", width, height, borderRadius, onClick }: ButtProps) {
  const ButtStyle = {
    width: width || "302px",
    height: height || "28px",
    borderRadius: borderRadius || "10px",
  };

  const handleClick = () => {
    if (onClick) {
      onClick(); // Call the provided onClick function when the button is clicked
    }
  };

  return (
    <div className="text-center mt-6 mb-3">
      <Button
        className="text-textcolor text-sm font-medium tracking-wider"
        variant="contained"
        color="primary"
        style={{
          backgroundColor: Bgcolor,
          borderRadius: ButtStyle.borderRadius,
          height: ButtStyle.height,
          width: ButtStyle.width,
          textTransform: "none",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
        }}
        onClick={handleClick}
      >
        {title}
      </Button>
    </div>
  );
}

export default Butt;
