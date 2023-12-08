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
  const [formData, setFormData] = useState<{
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    birthdate: {
      month: string;
      day: string;
      year: string;
    };
    gender: string;
    userType: string;
  }>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    birthdate: {
      month: "",
      day: "",
      year: "",
    },
    gender: "",
    userType: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
  const handleSignInWithGoogle = async () => {
    try {
      // Sign in with Google
      const response = await signIn('google');
      console.log('Google Sign-In Response:', response);
      console.log(process.env)

      // Check if the sign-in was successful
      if (response?.error) {
        console.error('Error during Google Sign-In:', response.error);
      } else {
        // Redirect to the login page
        router.push('/login');
      }
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    }
  };

  const handleBirthdateChange = (field: keyof typeof formData["birthdate"], value: string) => {
    setFormData({
      ...formData,
      birthdate: {
        ...formData.birthdate,
        [field]: value,
      },
    });
  };
  const handleCreateAccount = () => {
    // Log
    console.log("Form Data:", formData);
  };

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
        <TextInput
          placeholder="First Name"
          width="157px"
          height="35px"
          onInputChange={(value) => handleInputChange("firstName", value)}
        />
        <TextInput
          placeholder="Last Name"
          width="157px"
          height="35px"
          onInputChange={(value) => handleInputChange("lastName", value)}
        />
      </div>

      <TextInput
        placeholder="Username"
        width="335px"
        height="35px"
        onInputChange={(value) => handleInputChange("username", value)}
      />
      <TextInput
        placeholder="Email"
        width="335px"
        height="35px"
        onInputChange={(value) => handleInputChange("email", value)}
      />
      <TextInput
        placeholder="Phone Number"
        width="335px"
        height="35px"
        onInputChange={(value) => handleInputChange("phoneNumber", value)}
      />
      <TextInput
        placeholder="Password"
        width="335px"
        height="35px"
        onInputChange={(value) => handleInputChange("password", value)}
      />

      <p className="text-redwood font-normal text-sm text-justify ml-8 mt-4 py-2 px-2">
        Birthdate
      </p>

      <div className="flex justify-center space-x-3">
        <Drop options={options} onSelect={(value) => handleBirthdateChange("month", value)} />
        <Drop options={options1} onSelect={(value) => handleBirthdateChange("day", value)} />
        <Drop options={options2} onSelect={(value) => handleBirthdateChange("year", value)} />
      </div>

      <p className="text-redwood font-normal text-sm text-justify ml-8 mt-4 py-2 px-2">
        Gender
      </p>

      <div className="flex justify-center space-x-3">
        <Radio input="Female" onRadioChange={(value) => handleInputChange("gender", value)} />
        <Radio input="Male" onRadioChange={(value) => handleInputChange("gender", value)} />
        <Radio input="Others" onRadioChange={(value) => handleInputChange("gender", value)} />
      </div>

      <div className="flex justify-center space-x-5 text-xs">
        <Butt
          title="Student"
          Bgcolor="#FEE9D5"
          width="152px"
          height="25px"
          borderRadius="7px"
          onClick={() => handleInputChange("userType", "Student")}
        />
        <Butt
          title="Worker"
          Bgcolor="#FEE9D5"
          width="152px"
          height="25px"
          borderRadius="7px"
          onClick={() => handleInputChange("userType", "Worker")}
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
        onClick={handleSignInWithGoogle}
        title="Sign up with Google"
        Bgcolor="#4285F4" 
        width="325px"
        height="34px"
        disabled={!isChecked} // Disable the button if isChecked is false
      />

      

      <Butt onClick={handleCreateAccount} title="Create account" Bgcolor="#EBE0D0" width="325px" height="34px" />
    </div>
  );
}


export default Page;
