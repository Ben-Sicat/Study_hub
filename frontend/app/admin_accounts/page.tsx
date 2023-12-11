"use client";
import React, { useEffect, useState } from "react";
import { Logo, Painting } from "../components/svgs";
import Link from "next/link";
import DateComponent from "../components/date";
import TimeComponent from "../components/time";
import SearchBar from "../components/search_bar";
import InfoTable from "../components/info_table";

type UserInfo = {
  id: number;
  name: string;
  // Add more properties as needed
};

function Page() {
  useEffect(() => {
    // Set the title directly for the browser tab
    document.title = "Admin Modify Accounts";
  }, []);

  const userData = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 101, name: "Gian Limbaga" },
    { id: 102, name: "The Fourth" },
    { id: 103, name: "Melaissa Rioveros" },
    { id: 104, name: "Chen Leonor" },
    { id: 105, name: "Eric Ramos" },
    // Add more user data as needed
  ];

  const [data, setData] = useState<UserInfo[]>(userData);
  const [filteredData, setFilteredData] = useState<UserInfo[]>(data);

  const handleDataSearch = (searchQuery: string) => {
    // Implement your filtering logic here
    const filteredResults = data.filter(
      (item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        String(item.id).includes(searchQuery) // Convert id to string and check for inclusion
    );

    setFilteredData(filteredResults);
  };

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
          <p>Sales Ledger</p>
        </Link>
        <Link href="/admin_accounts">
          <p className="text-amber-500">Edit Accounts</p>
        </Link>
      </div>

      <div className="container flex items-center justify-center space-x-8 text-xs text-black font-bold mb-2">
        <p className="text-backcolor">_________</p>
        <p className="text-backcolor">________</p>
        <p className="text-backcolor">____________</p>
        <p className="text-amber-500">____________</p>
      </div>

      <div className="container bg-macandcheese rounded-lg mt-5">
        <SearchBar onDataSearch={handleDataSearch} />
      </div>

      <div className="container bg-gray-200 rounded-lg mt-5 text-xs">
        <InfoTable data={filteredData} />
      </div>
    </div>
  );
}

export default Page;
