"use client";
import React, { useEffect, useState } from "react";
import Butt from "../components/button";
import TemporaryDrawer from "../components/side_bar";
import { ChairRight, ChairLeft, ChairDown, ChairUp } from "../components/svgs";
import BasicModal from "../components/modal";

function Page() {
  useEffect(() => {
    // Set the title directly for the browser tab
    document.title = "Reservation";
  }, []);

  const [isModalOpen, setModalOpen] = React.useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const refreshPage = () => {
    location.reload();
  };

  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <TemporaryDrawer ButtonIcon={undefined}></TemporaryDrawer>

      <div className="text-textcolor text-xl font-extrabold py-2 px-2 ml-7">
        <h2>Welcome to Brew & Brain.</h2>

        <h2 className="text-textcolor text-base font-bold py-2 px-2 mt-3">
          Area Map
        </h2>
      </div>

      <div
        className="container mx-auto p-4"
        style={{
          backgroundImage: 'url("/images/area_map.png")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "400px",
          height: "320px",
          borderRadius: "20px",
          border: "2px solid #DC9D94",
        }}
      >
        <BasicModal isOpen={isModalOpen} onClose={handleModalClose} />

        <ChairRight
          width="30px"
          height="30px"
          className="relative top-28 left-64"
          onClick={handleModalOpen}
        />

        <ChairRight
          width="30px"
          height="30px"
          className="relative left-64 top-32"
          onClick={handleModalOpen}
        />

        <ChairLeft
          width="30px"
          height="30px"
          className="relative bottom-5"
          onClick={handleModalOpen}
        />

        <ChairLeft
          width="30px"
          height="30px"
          className="relative left-16 bottom-12"
          onClick={handleModalOpen}
        />

        <ChairLeft
          width="30px"
          height="30px"
          className="relative left-10 bottom-2"
          onClick={handleModalOpen}
        />

        <ChairLeft
          width="30px"
          height="30px"
          className="relative top-1 left-10"
          onClick={handleModalOpen}
        />

        <ChairUp
          width="30px"
          height="30px"
          className="relative top-5 left-32"
          onClick={handleModalOpen}
        />

        <ChairUp
          width="30px"
          height="30px"
          className="relative left-44 bottom-2"
          onClick={handleModalOpen}
        />

        <ChairUp
          width="30px"
          height="30px"
          className="relative left-48 bottom-48"
          onClick={handleModalOpen}
        />

        <ChairUp
          width="30px"
          height="30px"
          className="relative left-64 bottom-56"
          onClick={handleModalOpen}
        />

        <ChairDown
          width="30px"
          height="30px"
          className="relative left-32 bottom-44"
          onClick={handleModalOpen}
        />

        <ChairDown
          width="30px"
          height="30px"
          className="relative left-44 bottom-52"
          onClick={handleModalOpen}
        />
      </div>

      <Butt
        title="Refresh"
        Bgcolor="#EBE0D0"
        width="325px"
        height="34px"
        onClick={refreshPage}
      />
    </div>
  );
}

export default Page;
