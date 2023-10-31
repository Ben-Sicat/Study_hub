import React from "react";
import Button from "@mui/material/Button";

type ButtProps = {
  title: string;
};

function Butt({ title }: ButtProps) {
  return (
    <div className="text-center mt-5 mb-3">
      <Button
        className="text-stone-700 text-sm font-medium tracking-wider"
        variant="contained"
        color="primary"
        style={{
          backgroundColor: "#FFF1E4",
          borderRadius: "20px",
          height: "28px",
          width: "302px",
          textTransform: "none",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
        }}
      >
        {title}
      </Button>
    </div>
  );
}

export default Butt;
