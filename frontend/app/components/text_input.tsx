import React, { useState } from "react";
import TextField from "@mui/material/TextField";

type TextInputProps = {
  placeholder: string;
  width?: string;
  height?: string;
  labelFontSize?: string;
  onInputChange: (value: string) => string | any;
  value?: string; // Added value prop
};

function TextInput({
  placeholder,
  width = "18.875rem",
  height = "2.5rem",
  labelFontSize = "14px",
  onInputChange,
  value, // Default value is an empty string
}: TextInputProps) {
  const inputLabelProps = {
    style: {
      fontSize: labelFontSize,
    },
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onInputChange(newValue);
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
        value={value} // Use the value prop
        onChange={handleInputChange}
      />
    </div>
  );
}

export default TextInput;
