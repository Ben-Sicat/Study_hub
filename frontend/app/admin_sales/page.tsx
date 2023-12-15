"use client";
import React, { useEffect } from "react";
import { Logo, Painting } from "../components/svgs";
import Link from "next/link";
import DateComponent from "../components/date";
import TimeComponent from "../components/time";
import DatePick from "../components/date_picker";
import Butt from "../components/button";
import DataGridDemo from "../components/data_grid";

function Page() {
  useEffect(() => {
    // Set the title directly for the browser tab
    document.title = "Admin Sales Ledger";
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
          <p>Area Map</p>
        </Link>
        <Link href="/admin_sales">
          <p className="text-amber-500">Sales Ledger</p>
        </Link>
        <Link href="/admin_accounts">
          <p>Edit Accounts</p>
        </Link>
      </div>

      <div className="container flex items-center justify-center space-x-8 text-xs text-black font-bold mb-2">
        <p className="text-backcolor">_________</p>
        <p className="text-backcolor">________</p>
        <p className="text-amber-500">____________</p>
        <p className="text-backcolor">____________</p>
      </div>

      <div className="container justify-center items-center mt-5">
        <DataGridDemo></DataGridDemo>
      </div>

      <div className="container flex space-x-5 justify-center items-center">
        <Butt
          title="Generate Report"
          Bgcolor="#F8D8D4"
          width="150px"
          height="33px"
        ></Butt>
        <Butt
          title="Download Excel"
          Bgcolor="#F8D8D4"
          width="150px"
          height="33px"
        ></Butt>
      </div>
    </div>
  );
}

export default Page;
