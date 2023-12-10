"use client";
import React, { useEffect, useState } from "react";
import Teste from "../components/account";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Butt from "../components/button";
import CheckBox from "../components/checkbox";
import Link from "next/link";
import { Box, Grid, Button } from "@mui/material";

import { useRouter } from "next/navigation";
import BarStat from "../components/CZAMPLE";
import PayChart from "../components/CZAMPLE";

interface BarStatConfig {
  statusField: string;
  size: number;
  title: string;
}

const barStatConfig: BarStatConfig[] = [
  { statusField: "status", size: 11.7, title: "Reservation" },
  // Remove other configurations if you want to display only one chart
];

function Page() {
  const router = useRouter();
  const [isChecked, setChecked] = useState(false); // State for checkbox

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
    // ... (your existing options1)
  ];

  const options2 = [
    // ... (your existing options2)
  ];

  // Function to handle checkbox change
  const handleCheckboxChange = () => {
    setChecked(!isChecked);
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
      <div className="text-xs text-textcolor flex ml-5">
        <CheckBox label="" onChange={handleCheckboxChange} />
        <p className="mt-3">
          I understand and accept the{" "}
          <Link href="/terms_and_agreements">Terms and Agreements</Link>
        </p>
      </div>
      {/* Disable the button if the checkbox is not checked */}
      <Butt
        title="Create account"
        Bgcolor="#EBE0D0"
        width="325px"
        height="34px"
        disabled={!isChecked} // Disable the button if isChecked is false
      />

      <div className="flex justify-center items-center">
        <PayChart></PayChart>
      </div>
    </div>
  );
}

export default Page;
