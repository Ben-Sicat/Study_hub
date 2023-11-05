import React from "react";
import TextField from "@mui/material/TextField";
import Pass from "../components/text_input_pass";

function Page() {
  return (
    <div>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <Pass></Pass>
    </div>
  );
}

export default Page;
