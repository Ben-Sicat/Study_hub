import React from "react";
import Teste from "../components/account";

function Page() {
  return (
    <div>
      <Teste
        title="Create a new password"
        subTitle1="Create a password with at least 6 letters and numbers. You'll need this password to log into your account."
      />
    </div>
  );
}

export default Page;
