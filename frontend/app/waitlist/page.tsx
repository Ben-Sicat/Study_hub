"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Teste from "../components/account";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import InfoTable from "../components/waitlist_table";
import Butt from "../components/button";

type UserInfo = {
  id: number;
  name: string;
  // Add more properties as needed
};

function page() {
  useEffect(() => {
    // Set the title directly for the browser tab
    document.title = "Waitlist View";
  }, []);

  const router = useRouter();

  const handleBackButtonClick = () => {
    router.back();
  };

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
      <Teste
        backButtonIcon={<ArrowBackIosIcon style={{ fontSize: 20 }} />}
        onBackButtonClick={handleBackButtonClick}
        title="Waitlist View"
        subTitle1=""
      />

      <div className="container bg-gray-200 rounded-lg mt-5 mb-3 text-xs">
        <InfoTable data={filteredData} />
      </div>

      <Butt title="Cancel" Bgcolor="#EBE0D0" width="325px" height="34px" />
    </div>
  );
}

export default page;
