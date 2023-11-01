import React from "react";
import Teste from "../components/account";
import Dropdown from "../components/dropdown";
import CloseIcon from "@mui/icons-material/Close";

function Page() {
  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <Teste
        backButtonIcon={<CloseIcon style={{ fontSize: 25 }} />}
        title="Help Center"
        subTitle1=""
      />

      <h1 className=" text-stone-700 text-base font-extrabold ml-9">
        Can't Log In
      </h1>

      <p className=" text-stone-700 font-normal text-sm text-justify ml-8 mr-8 py-2 px-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>

      <h1 className=" text-stone-700 text-base font-extrabold py-2 px-2 ml-7 mt-3 mr-7 mb-1">
        Username and Password Troubleshooting
      </h1>

      <Dropdown title="Recover your Brand password" />
      <Dropdown title="Forgot your Brand username?" />
      <Dropdown title="Links in pass reset email not working?" />
    </div>
  );
}

export default Page;
