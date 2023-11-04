import React from "react";
import Teste from "../components/account";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TextInput from "../components/text_input";
import Butt from "../components/button";

function Page() {
  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <Teste
        backButtonIcon={<ArrowBackIosIcon style={{ fontSize: 20 }} />}
        title="Create Account"
        subTitle1=""
      />

      <div className="mt-5"></div>

      <div className="flex justify-center space-x-5">
        <TextInput placeholder="First Name" width="157px" height="35px" />
        <TextInput placeholder="Last Name" width="157px" height="35px" />
      </div>

      <TextInput placeholder="Username" width="335px" height="35px" />
      <TextInput placeholder="Email" width="335px" height="35px" />
      <TextInput placeholder="Phone Number" width="335px" height="35px" />
      <TextInput placeholder="Password" width="335px" height="35px" />

      <p className=" text-redwood font-normal text-sm text-justify ml-8 mt-4 py-2 px-2">
        Birthdate
      </p>

      <p className=" text-redwood font-normal text-sm text-justify ml-8 mt-4 py-2 px-2">
        Gender
      </p>

      <div className="flex justify-center space-x-5 text-xs">
        <Butt
          title="Student"
          Bgcolor="#FEE9D5"
          width="152px"
          height="25px"
          borderRadius="7px"
        />
        <Butt
          title="Worker"
          Bgcolor="#FEE9D5"
          width="152px"
          height="25px"
          borderRadius="7px"
        />
      </div>

      <div className="mt-16"></div>

      <Butt title="Create account" Bgcolor="#EBE0D0" width="325px" />
    </div>
  );
}

export default Page;
