import React from "react";
import Teste from "../components/account";

function Page() {
  return (
    <div>
      <Teste
        title="Confirm your account"
        subTitle1="We sent you a code to your email. Enter that code to confirm your account."
      />

      <p className="text-center text-stone-700 font-normal text-xs py-1 px-1">
        Send code again
      </p>
    </div>
  );
}

export default Page;
