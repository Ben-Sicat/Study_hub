// date_picker.tsx
import React, { useState } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type PickProps = {
  text?: string;
  labelFontSize?: string;
  onDateChange: (value: Date | null) => void;
};

dayjs.extend(utc);

function DatePick({ text, labelFontSize = "14px", onDateChange }: PickProps) {
  const pickStyle = {
    text: text || "Date",
  };

  const handleDateChange = (date: Date | null) => {
    onDateChange(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DatePicker"]}>
        <div className="w-21">
          <DatePicker
            label={pickStyle.text}
            slotProps={{ textField: { size: "small" } }}
            onChange={handleDateChange}
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
}

export default DatePick;
