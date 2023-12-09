"use client";
import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

type PassProps = {
  width?: string;
  height?: string;
  labelFontSize?: string;
  onInputChange: (value: string) => void;
  onClick?: () => void; // Add the onClick prop
};

function Pass({
  width = "18.875rem",
  height = "2.5rem",
  labelFontSize = "14px",
  onInputChange,
  onClick, // Include the onClick prop
}: PassProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
    if (onClick) {
      onClick(); // Invoke the onClick handler if provided
    }
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const [focused, setFocused] = React.useState(false);

  return (
    <div className="flex justify-center items-center mt-5">
      <FormControl
        sx={{ m: 1, width: width }}
        variant="outlined"
        focused={focused}
      >
        <InputLabel
          htmlFor="outlined-adornment-password"
          style={{
            fontSize: focused || inputValue ? "12px" : labelFontSize,
            top: focused || inputValue ? "-8px" : "50%",
            transform:
              focused || inputValue ? "translateY(0)" : "translateY(-50%)",
            paddingLeft: "13px",
          }}
        >
          Password
        </InputLabel>

        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          label="Password"
          size="small"
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          sx={{ height: height, borderRadius: "10px" }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            setInputValue(e.target.value);
            onInputChange(e.target.value);
          }}
        />
      </FormControl>
    </div>
  );
}

export default Pass;
