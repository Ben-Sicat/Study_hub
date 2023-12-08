import React, { ChangeEvent } from "react";
import Checkbox from "@mui/material/Checkbox";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

type CheckProps = {
  label: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function CheckBox({ onChange }: CheckProps) {
  return (
    <div>
      <Checkbox {...label} onChange={onChange} />
    </div>
  );
}

export default CheckBox;
