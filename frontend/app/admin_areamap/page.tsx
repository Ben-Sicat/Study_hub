"use client";
import React, { useEffect } from "react";
import { Logo, Painting } from "../components/svgs";
import DotLine from "../components/dot_line";
import CircleIcon from "@mui/icons-material/Circle";
import Link from "next/link";
import DateComponent from "../components/date";
import TimeComponent from "../components/time";

function Page() {
  useEffect(() => {
    // Set the title directly for the browser tab
    document.title = "Admin Area Map";
  }, []);

  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <div className="container flex space-x-3 mb-5">
        <div className="container flex ml-1 mt-6 space-x-2">
          <Logo className="text-5xl" />
          <p className="text-sm text-textcolor font-bold mt-4">Brew & Brain</p>
        </div>

        <div className="container text-right">
          <p className="text-sm text-textcolor font-bold mt-6">
            Welcome, Admin!
          </p>
          <p className="text-xs text-textcolor font-medium">#AdminEmail</p>
          <div className="container flex items-center justify-end space-x-3 text-sm text-textcolor font-bold">
            <p>
              <DateComponent></DateComponent>
            </p>
            <p>
              <TimeComponent></TimeComponent>
            </p>
          </div>
        </div>
      </div>

      <div className="container flex items-center justify-center space-x-5 text-xs text-black font-bold mt-2">
        <Link href="/admin_dashboard">
          <p>Dashboard</p>
        </Link>
        <Link href="/admin_areamap">
          <p className="text-amber-500">Area Map</p>
        </Link>
        <Link href="/admin_sales">
          <p>Sales Ledger</p>
        </Link>
        <Link href="/admin_accounts">
          <p>Edit Accounts</p>
        </Link>
      </div>

      <div className="container flex items-center justify-center space-x-8 text-xs text-black font-bold mb-2">
        <p className="text-backcolor">_________</p>
        <p className="text-amber-500">________</p>
        <p className="text-backcolor">____________</p>
        <p className="text-backcolor">____________</p>
      </div>

      <div className="container bg-red-200 rounded-lg p-3 mt-5">
        <p className="text-base text-black font-bold">#Area Map</p>
      </div>

      <div className="container bg-gray-200 rounded-lg p-3 mt-5">
        <p className="text-base text-black font-bold">Time Calculation</p>
        <div className="flex space-x-2 text-sm leading-8 mt-3 ml-5">
          <div className="text-right">
            <p>Seat 3</p>
            <p>Seat 19</p>
            <p>Seat 5</p>
            <p>Con Room 1</p>
            <p>Seat 26</p>
          </div>
          <div>
            <DotLine
              ButtonIcon={<CircleIcon style={{ fontSize: 7 }} />}
            ></DotLine>
            <DotLine
              ButtonIcon={<CircleIcon style={{ fontSize: 7 }} />}
            ></DotLine>
            <DotLine
              ButtonIcon={<CircleIcon style={{ fontSize: 7 }} />}
            ></DotLine>
            <DotLine
              ButtonIcon={<CircleIcon style={{ fontSize: 7 }} />}
            ></DotLine>
            <DotLine
              ButtonIcon={<CircleIcon style={{ fontSize: 7 }} />}
            ></DotLine>
          </div>
          <div>
            <p>Remaining Time: 1 hour</p>
            <p>Remaining Time: 56 mins</p>
            <p>Remaining Time: 12 mins</p>
            <p>Remaining Time: 5 mins</p>
            <p>Remaining Time: 12 mins</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
