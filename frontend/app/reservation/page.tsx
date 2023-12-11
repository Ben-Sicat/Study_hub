'use client'
import React, { useEffect, useState } from "react";
import Upper from '../components/upperleft_icon';
import MenuIcon from "@mui/icons-material/Menu";
import TextInput from "../components/text_input";
import Butt from "../components/button";
import TemporaryDrawer from "../components/side_bar";
import { getSession } from "next-auth/react";

function Page() {
 

    useEffect(() => {
        // Set the title directly for the browser tab
        document.title = "Reservation";
    }, []);

    const [formData, setFormData] = useState<{
        STime: string;
        ETime: string;
        Seat: string;
    }>({
        STime: "",
        ETime: "",
        Seat: "",
    });

    const [reservations, setReservations] = useState<any[]>([]);

    const handleInputChange = (field: string, value: string) => {
        setFormData({
            ...formData,
            [field]: value,
        });
    };
    

    const handleReservation = async () => {
        try {
          // Retrieve user_id from localStorage or cookies
          const user_id = localStorage.getItem('user_id') || getCookie('user_id');
          
          if (!user_id) {
            console.error('User not authenticated');
            // Handle the case when the user is not authenticated
            return;
          }
      
          const response = await fetch(`http://localhost:5000/api/reservations/${user_id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('access_token') || getCookie('access_token')}`,
            },
            body: JSON.stringify({
              STime: formData.STime,
              ETime: formData.ETime,
              Seat: formData.Seat,
            }),
          });
      
          if (response.ok) {
            const data = await response.json();
      
            if (data && data.message) {
              console.log("Reservation created successfully:", data.message);
              // Do something with the response data
            } else {
              console.error("Invalid response format:", data);
            }
          } else {
            const errorData = await response.json();
            if (errorData && errorData.message) {
              console.error("Error creating reservation:", errorData.message);
            } else {
              console.error("Invalid error response format:", errorData);
            }
          }
        } catch (error) {
          console.error("Error creating reservation:", error);
        }
      };
      
      function getCookie(name: string | any[]) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Check if this cookie contains the name we're looking for
          if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
          }
        }
        return null;
      }
      

    return (
        <div className="flex min-h-full flex-col bg-backcolor">

            <TemporaryDrawer ButtonIcon={undefined}></TemporaryDrawer>

            <div className="text-textcolor text-xl font-extrabold py-2 px-2 ml-7">
                <h2>
                    Today's Reservation
                </h2>

                <h2 className="text-textcolor text-base font-bold py-2 px-2 mt-3">
                    Pick Time
                </h2>
            </div>

            <div className="flex justify-center space-x-5">
                <TextInput
                    placeholder="Start Time"
                    width="157px"
                    height="35px"
                    onInputChange={(value) => handleInputChange("STime", value)}
                />
                <TextInput
                    placeholder="End Time"
                    width="157px"
                    height="35px"
                    onInputChange={(value) => handleInputChange("ETime", value)}
                />
            </div>

            <div className="flex justify-center items-center mt-5">
                <img src="/images/map.png" alt={"Area Map"} style={{ width: '350px', height: 'auto' }} />
            </div>

            <TextInput
                placeholder="Choose Seat"
                width="335px"
                height="35px"
                onInputChange={(value) => handleInputChange("Seat", value)}
            />

            <Butt title="Create Reservation" Bgcolor="#EBE0D0" width="343px" onClick={handleReservation} />
        </div>
    );
}

export default Page;
