"use client";
import React, { useEffect, useState } from "react";
import Butt from "../components/button";
import TemporaryDrawer from "../components/side_bar";
import { ChairRight, ChairLeft, ChairDown, ChairUp } from "../components/svgs";
import BasicModal from "../components/modal";
import { useRouter } from "next/navigation";

interface Accounts {
  UserID: number;
  Username: string;
}

function Page() {
  useEffect(() => {
    // Set the title directly for the browser tab
    document.title = "Reservation";
  }, []);

  const [accounts, setAccounts] = useState<Accounts[]>([]);

  /*
  useEffect(() => {
    fetch("http://localhost:5000/api/get-reservations")
      .then((response) => response.json())
      .then((data: { accounts: Accounts[] }) => {
        const simplifiedData = data.accounts.map(({ UserID, Username }) => ({
          UserID,
          Username,
        }));
        setAccounts(simplifiedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  */

  const router = useRouter();

  const [isModalOpen, setModalOpen] = React.useState(false);
  const [chairId, setChairId] = React.useState("");

  //now we need a function to handle the opening of the modal per chair... the funciton must contain a paramete that will be the chair id and the state of the chair if open or close

  const handleChairClick = (chairId: string, isChairOpen: boolean) => {
    console.log("chairId", chairId);
    setChairId(chairId);
    console.log("isChairOpen", isChairOpen);
    setModalOpen(!isModalOpen);
    if (isChairOpen == true) {
      setModalOpen(true);
    } else [setModalOpen(false)];
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const refreshPage = () => {
    location.reload();
  };

  const paymentDetails = () => {
    router.push("/payment_details")
  }

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
        <BasicModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          chairId={chairId}
        />

        <ChairRight
          width="30px"
          height="30px"
          className="relative top-28 left-64"
          onClick={() => handleChairClick("chair1", true)}
        />

        <ChairRight
          width="30px"
          height="30px"
          className="relative left-64 top-32"
          onClick={() => handleChairClick("chair2", true)}
        />

        {/* DITO KA MAG HARD CODE MAMAYA*/}

        <ChairLeft
          width="30px"
          height="30px"
          className="relative bottom-5"
          onClick={() => handleChairClick("chair3", true)}
        />

        <ChairLeft
          width="30px"
          height="30px"
          className="relative left-16 bottom-12"
          onClick={() => handleChairClick("chair4", true)}
        />

        <ChairLeft
          width="30px"
          height="30px"
          className="relative left-10 bottom-2"
          onClick={() => handleChairClick("chair5", true)}
        />

        <ChairLeft
          width="30px"
          height="30px"
          className="relative top-1 left-10"
          onClick={() => handleChairClick("chair6", true)}
        />

        <ChairUp
          width="30px"
          height="30px"
          className="relative top-5 left-32"
          onClick={() => handleChairClick("chair7", true)}
        />

        <ChairUp
          width="30px"
          height="30px"
          className="relative left-44 bottom-2"
          onClick={() => handleChairClick("chair8", true)}
        />

        <ChairUp
          width="30px"
          height="30px"
          className="relative left-48 bottom-48"
          onClick={() => handleChairClick("chair9", true)}
        />

        <ChairUp
          width="30px"
          height="30px"
          className="relative left-64 bottom-56"
          onClick={() => handleChairClick("chair10", true)}
        />

        <ChairDown
          width="30px"
          height="30px"
          className="relative left-32 bottom-44"
          onClick={() => handleChairClick("chair11", true)}
        />

        <ChairDown
          width="30px"
          height="30px"
          className="relative left-44 bottom-52"
          onClick={() => handleChairClick("chair12", true)}
        />
      </div>

      <Butt
        title="Refresh"
        Bgcolor="#EBE0D0"
        width="325px"
        height="34px"
        onClick={paymentDetails}
      />
    </div>
  );
}

export default Page;
