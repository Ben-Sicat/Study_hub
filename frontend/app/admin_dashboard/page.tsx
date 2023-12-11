"use client";
import React, { useEffect } from "react";
import { Logo, Painting } from "../components/svgs";
import DotLine from "../components/dot_line";
import CircleIcon from "@mui/icons-material/Circle";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Left from "../components/admin_arrow";
import Butt from "../components/button";
import Link from "next/link";
import DateComponent from "../components/date";
import TimeComponent from "../components/time";
import { Box, Grid, Button } from "@mui/material";
import BarStat from "../components/bar_chart";
import PayChart from "../components/pie_chart";

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
  useEffect(() => {
    // Set the title directly for the browser tab
    document.title = "Admin Dashboard";
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
          <p className="text-amber-500">Dashboard</p>
        </Link>
        <Link href="/admin_areamap">
          <p>Area Map</p>
        </Link>
        <Link href="/admin_sales">
          <p>Sales Ledger</p>
        </Link>
        <Link href="/admin_accounts">
          <p>Edit Accounts</p>
        </Link>
      </div>

      <div className="container flex items-center justify-center space-x-8 text-xs text-black font-bold mb-2">
        <p className="text-amber-500">_________</p>
        <p className="text-backcolor">________</p>
        <p className="text-backcolor">____________</p>
        <p className="text-backcolor">____________</p>
      </div>

      <div className="container bg-gray-200 rounded-lg p-3 mt-5">
        <p className="text-base text-black font-bold">Recent Activities</p>
        <div className="flex space-x-2 text-sm leading-8 mt-3 ml-5">
          <div className="text-right">
            <p>12:00</p>
            <p>13:30</p>
            <p>15:45</p>
            <p>12:09</p>
            <p>18:45</p>
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
            <p>Some text here</p>
            <p>Another text</p>
            <p>More text</p>
            <p>Other text can be placed here</p>
            <p>Text again</p>
          </div>
        </div>
      </div>

      <div className="container bg-parrot-pink rounded-lg p-3 mt-5">
        <div>
          <p className="text-base text-black font-bold">Monthly Earnings</p>
          <p className="text-2xl text-black font-bold ml-5">&#8369;57,000.00</p>
        </div>
        <div>
          <Link href="#">
            <Left
              ButtonIcon={
                <KeyboardArrowRightIcon
                  style={{ fontSize: 70, color: "#9F5757" }}
                />
              }
            ></Left>
          </Link>
        </div>
      </div>

      <div className="container bg-amethyst rounded-lg p-3 mt-3">
        <div>
          <p className="text-base text-black font-bold">Annual Earnings</p>
          <p className="text-2xl text-black font-bold ml-5">
            &#8369;124,000.00
          </p>
        </div>
        <div>
          <Link href="#">
            <Left
              ButtonIcon={
                <KeyboardArrowRightIcon
                  style={{ fontSize: 70, color: "#624665" }}
                />
              }
            ></Left>
          </Link>
        </div>
      </div>

      <div className="container bg-macandcheese rounded-lg p-3 mt-3">
        <div>
          <p className="text-base text-black font-bold">Customer Reports</p>
          <p className="text-2xl text-black font-bold ml-5">25</p>
        </div>
        <div>
          <Link href="#">
            <Left
              ButtonIcon={
                <KeyboardArrowRightIcon
                  style={{ fontSize: 70, color: "#D78215" }}
                />
              }
            ></Left>
          </Link>
        </div>
      </div>

      <div className="container justify-center items-center mt-5">
        <Grid container spacing={2}>
          <Grid item xs={barStatConfig[0].size}>
            <div className="text-xs">
              <BarStat
                statusField={barStatConfig[0].statusField}
                title={barStatConfig[0].title}
              />
            </div>
          </Grid>
        </Grid>{" "}
      </div>

      <div className="flex justify-center items-center mt-3">
        <PayChart></PayChart>
      </div>

      <div className="container bg-gray-200 rounded-lg p-3 mt-5 mb-5">
        <div>
          <p className="text-sm text-black font-bold">
            Download your earnings report
          </p>
          <p className="text-xs text-black ml-5">
            There are many variations of passages.
          </p>
        </div>
        <div>
          <Butt title="View Report" Bgcolor="#F8D8D4" width="343px" />
        </div>
      </div>
    </div>
  );
}

export default Page;
