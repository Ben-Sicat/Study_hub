// time_picker.tsx
import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

interface TimePickProps {
  text?: string;
  labelFontSize?: string;
  onInputChange: (value: string) => void;
}

dayjs.extend(utc);

function TimePick({ text = "Time", labelFontSize = "14px", onInputChange }: TimePickProps) {
  const [inputValue, setInputValue] = useState<Date | null>(null);

  const handleInputChange = (value: any) => {
    const selectedTime = value ? dayjs.utc(value).format("HH:mm") : "";
    setInputValue(value);
    onInputChange(selectedTime);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker"]}>
        <div className="w-21">
          <TimePicker
            label={text}
            slotProps={{ textField: { size: "small" } }}
            value={inputValue}
            onChange={handleInputChange}
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default TimePick;
