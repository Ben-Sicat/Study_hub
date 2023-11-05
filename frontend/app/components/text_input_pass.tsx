"use client";
import React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

type TextFieldProps = {
  width?: string;
  height?: string;
  labelFontSize?: string;
};

function Pass({
  width = "18.875rem",
  height = "2.5rem",
  labelFontSize = "14px",
}: TextFieldProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(""); // Track input value

  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
            fontSize: focused || inputValue ? "12px" : labelFontSize, // Smaller font when focused or input value is not empty
            top: focused || inputValue ? "-8px" : "50%", // Move higher when focused or input value is not empty
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
          onChange={(e) => setInputValue(e.target.value)} // Update input value
        />
      </FormControl>
    </div>
  );
}

export default Pass;
