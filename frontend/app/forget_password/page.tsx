import React from "react";
import Teste from "../components/account";

function Page() {
  return (
    <div>
      <Teste
        title="Find your account"
        subTitle1="Enter your username, email, or mobile number"
      />

      <p className="text-redwood font-normal text-xs ml-8 py-1 px-1">
        Can't reset your password?
      </p>
    </div>
  );
}

export default Page;
