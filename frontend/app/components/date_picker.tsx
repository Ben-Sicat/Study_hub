import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type PickProps = {
  text?: string;
  labelFontSize?: string;
  onInputChange: (value: string) => string | any;
};

function DatePick({ text, labelFontSize = "14px", onInputChange }: PickProps) {
  const PickStyle = {
    text: text || "Date",
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
      <DemoContainer components={["DatePicker"]}>
        <div className="w-21">
          <DatePicker
            label={PickStyle.text}
            slotProps={{ textField: { size: "small" } }}
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DatePick;
