"use client";
import React, { useEffect } from "react";
import {
  ChairDown,
  ChairLeft,
  ChairRight,
  ChairUp,
  Logo,
  Painting,
} from "../components/svgs";
import Link from "next/link";
import DateComponent from "../components/date";
import TimeComponent from "../components/time";
import Butt from "../components/button";
import ModalAdmin from "../components/modal_admin";

function Page() {
  const checkReservationsEnd = () => {
    const currentTime = new Date().toLocaleTimeString('en-US', { timeZone: 'Asia/Manila', hour12: false });
    console.log("Current time:", currentTime);
    fetch("http://localhost:5000/api/check-reservations-end", {
      method: "POST",  
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ current_time: currentTime }),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }
  useEffect(() => {
    // Set the title directly for the browser tab
    document.title = "Admin Area Map";

    const intervalId = setInterval(checkReservationsEnd, 30000); // Check every 30 seconds

    return () => clearInterval(intervalId);

  }, []);


  const [isModalOpen, setModalOpen] = React.useState(false);
  const [chairId, setChairId] = React.useState<string | null>(null);
  const [ reservationData, setReservationData] = React.useState<any>(null);


  const fetchReservation = async (chairId: string) => {
    try{
      const response = await fetch(`http://localhost:5000/api/get-reservation-by-seat/${chairId}`);
      if(response.ok){
        const data = await response.json();
        console.log("Reservation Data:", data);
        setReservationData(data.reservation);
      }
    }catch(error){
      console.error("Error fetching reservation data:", error);
    }
  }

  //now we need a function to handle the opening of the modal per chair... the funciton must contain a paramete that will be the chair id and the state of the chair if open or close

  const handleChairClick = async (chairId: string, isChairOpen: boolean) => {
    setChairId(chairId);
    console.log("chairId", chairId);
    setModalOpen(!isModalOpen);
    console.log("isChairOpen", isChairOpen);

    await fetchReservation(chairId);
    console.log("reservationData", reservationData)
     // Toggle the modal state
     if (isChairOpen) {
      setModalOpen(true);
    } else {
      setModalOpen(false);
    }
  }
  
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setReservationData(null);
  };
  const refreshPage = () => {
    location.reload();
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

      <div className="container mt-5">
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

          {/* now we need to refractor this modaladmin t only open if the parameter in the onlcick of the button is set to true */}
          
          <ModalAdmin isOpen={isModalOpen} onClose={handleModalClose} reservationData={reservationData}/>
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
