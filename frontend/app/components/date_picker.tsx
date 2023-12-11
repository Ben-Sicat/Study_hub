import * as React from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

type PickProps = {
  text?: string;
};

function DatePick({ text }: PickProps) {
  const PickStyle = {
    text: text || "Date",
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
