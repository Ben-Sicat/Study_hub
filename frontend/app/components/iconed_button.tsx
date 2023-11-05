import React from "react";
import Button from "@mui/material/Button";

type IcoButtProps = {
  Icon: JSX.Element;
  title: string;
  marginRight?: string;
};

function IcoButt({ title, Icon, marginRight }: IcoButtProps) {
  const containerStyle = {
    marginRight: marginRight || "60px",
  };

  return (
    <div className="text-center mt-3">
      <Button
        className="text-left text-textcolor text-sm font-medium tracking-wider"
        color="primary"
        style={{
          backgroundColor: "#FFFAF6",
          borderRadius: "10px",
          height: "40px",
          width: "340px",
          textTransform: "none",
          border: `1px solid #EDC2B5`,
          boxShadow: "none",
        }}
      >
        <div className="flex items-center" style={containerStyle}>
          {Icon}
          {title}
        </div>
      </Button>
    </div>
  );
}

export default IcoButt;
