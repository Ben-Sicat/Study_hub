import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

type PickProps = {
  text?: string;
  labelFontSize?: string;
  onInputChange: (value: string) => string | any;
};

function TimePick({ text, labelFontSize = "14px", onInputChange }: PickProps) {
  const PickStyle = {
    text: text || "Time",
  };

  const inputLabelProps = {
    style: {
      fontSize: labelFontSize,
    },
  };

  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    onInputChange(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker"]}>
        <div className="w-21">
          <TimePicker
            label={PickStyle.text}
            slotProps={{ textField: { size: "small" } }}
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default TimePick;
