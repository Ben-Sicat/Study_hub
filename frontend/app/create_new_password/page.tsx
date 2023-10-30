import React from "react";
import Teste from "../components/account";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function Page() {
  return (
    <div>
      <Teste
        backButtonIcon={<ArrowBackIosIcon style={{ fontSize: 20 }} />}
        title="Create a new password"
        subTitle1="Create a password with at least 6 letters and numbers. You'll need this password to log into your account."
      />
    </div>
  );
}

export default Page;
