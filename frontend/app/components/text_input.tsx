import React from "react";
import TextField from "@mui/material/TextField";

type TextFieldProps = {
  placeholder: string;
  width?: string;
  height?: string;
  labelFontSize?: string;
};

function TextInput({
  placeholder,
  width = "18.875rem",
  height = "2.5rem",
  labelFontSize = "14px",
}: TextFieldProps) {
  const inputLabelProps = {
    style: {
      fontSize: labelFontSize,
    },
  };

  return (
    <div className="flex justify-center items-center mt-5">
      <TextField
        id="outlined-basic"
        label={placeholder}
        variant="outlined"
        style={{ width, height }}
        size="small"
        InputProps={{
          style: {
            borderRadius: "10px",
          },
        }}
        InputLabelProps={inputLabelProps}
      />
    </div>
  );
}

export default TextInput;
