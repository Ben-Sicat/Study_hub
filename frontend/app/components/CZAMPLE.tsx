import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

type ZampleProps = {
  label: string;
};

function Czample({ label }: ZampleProps) {
  const CheckStyle = {
    label: label || "checkbox",
  };

  return (
    <div>
      <FormControlLabel required control={<Checkbox />} label={label} />
    </div>
  );
}

export default Czample;
