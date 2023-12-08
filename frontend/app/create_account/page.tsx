"use client";
import React, { useEffect, useState } from "react";
import Teste from "../components/account";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TextInput from "../components/text_input";
import Butt from "../components/button";
import Drop from "../components/dropdown_button";
import Radio from "../components/radio_button";
import CheckBox from "../components/checkbox";
import Link from "next/link";

import { useRouter } from "next/navigation";

function Page() {
  const [isChecked, setChecked] = useState(false); // State for checkbox

  const handleCheckboxChange = () => {
    setChecked(!isChecked);
  };

  const router = useRouter();

  const handleBackButtonClick = () => {
    router.back();
  };

  useEffect(() => {
    // Set the title directly for the browser tab
    document.title = "Create Account";
  }, []);

  const options = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const options1 = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];

  const options2 = [
    "1990",
    "1991",
    "1992",
    "1993",
    "1994",
    "1995",
    "1996",
    "1997",
    "1998",
    "1999",
    "2000",
    "2001",
    "2002",
    "2003",
    "2004",
    "2005",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
  ];

  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <Teste
        backButtonIcon={<ArrowBackIosIcon style={{ fontSize: 20 }} />}
        onBackButtonClick={handleBackButtonClick}
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

      <div className="flex justify-center space-x-3">
        <Drop options={options}></Drop>
        <Drop options={options1}></Drop>
        <Drop options={options2}></Drop>
      </div>

      <p className=" text-redwood font-normal text-sm text-justify ml-8 mt-4 py-2 px-2">
        Gender
      </p>

      <div className="flex justify-center space-x-3">
        <Radio input="Female"></Radio>
        <Radio input="Male"></Radio>
        <Radio input="Others"></Radio>
      </div>

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

      <div className="mt-9"></div>

      <div className="text-xs text-textcolor flex ml-5">
        <CheckBox label="" onChange={handleCheckboxChange} />
        <p className="mt-3">
          I understand and accept the{" "}
          <Link href="/terms_and_agreements">Terms and Agreements</Link>
        </p>
      </div>

      <Butt
        title="Create account"
        Bgcolor="#EBE0D0"
        width="325px"
        height="34px"
        disabled={!isChecked} // Disable the button if isChecked is false
      />
    </div>
  );
}

export default Page;
