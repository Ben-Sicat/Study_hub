import React from "react";
import Teste from "../components/account";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import TextInput from "../components/text_input";
import Butt from "../components/button";
import Drop from "../components/dropdown_button";
import Radio from "../components/radio_button";

function Page() {
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

      <div className="mt-16"></div>

      <Butt title="Create account" Bgcolor="#EBE0D0" width="325px" />
    </div>
  );
}

export default Page;
