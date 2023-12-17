'use client';
import React, { useState, useEffect } from "react";
import Teste from "@/app/components/account";
import CloseIcon from "@mui/icons-material/Close";
import Image from "@/app/components/account_image";
import CircleIcon from "@mui/icons-material/Circle";
import TextInput from "@/app/components/text_input";
import Drop from "@/app/components/dropdown_button";
import Butt from "@/app/components/button";



function Page() {
  
  const handleBackButtonClick = () => {
    console.log("back button clicked")
  }

  
  const userId = localStorage.getItem('user_id')
  console.log(userId)

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    occupation: "",
  });

  useEffect(() => {
    document.title = "Edit Profile";

    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/get-user/${userId}`);
        if (response.ok) {
          const userData = await response.json();
          const datas = userData.user
          console.log("User Data:", userData); // Log the received user data
          console.log("User Data1:", datas); // Log the received user data
          setFormData({
            userName: datas.Username,
            email: datas.Email,
            phoneNumber: datas.PhoneNumber,
            gender: datas.Gender,
            occupation: datas.Occupation,
          });
        } else {
          console.error("Error fetching user data:", await response.json());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const options = ["Male", "Female", "Others"];
  const options1 = ["Student", "Worker"];

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/update-account/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const updatedUserData = await response.json();
        console.log("Profile updated successfully:", updatedUserData);
      } else {
        console.error("Error updating profile:", await response.json());
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <div className="flex items-center space-x-1">
        <Teste
          backButtonIcon={<CloseIcon style={{ fontSize: 24 }} />}
          onBackButtonClick={handleBackButtonClick}
          title=""
          subTitle1=""
        />
        <p className="text-xl text-textcolor font-extrabold">Edit Profile</p>
      </div>

      <div className="flex justify-center mt-5">
        <Image
          ImageIcon={<CircleIcon style={{ fontSize: 141, color: "#C7C7C7" }} />}
        ></Image>
      </div>

      <div>
        <Butt
          title="Edit"
          Bgcolor="#E5E4E2"
          width="100px"
          height="28px"
          borderRadius="50px"
        />
      </div>

      <div className="mt-6">
        <TextInput
          placeholder="Username"
          width="335px"
          height="35px"
          value={formData.userName}
          onInputChange={(value) => handleInputChange("userName", value)}
        />
        <TextInput
          placeholder="Email"
          width="335px"
          height="35px"
          value={formData.email}
          onInputChange={(value) => handleInputChange("email", value)}
        />
        <TextInput
          placeholder="Phone Number"
          width="335px"
          height="35px"
          value={formData.phoneNumber}
          onInputChange={(value) => handleInputChange("phoneNumber", value)}
        />

        <div className="flex text-redwood text-xs ml-12 space-x-32 mt-2">
          <p>Gender</p>
          <p>Occupation</p>
        </div>

        <div className="flex justify-center space-x-3">
          <Drop
            options={options}
            width="161px"
            onSelect={(value) => handleInputChange("gender", value)}
          />
          <Drop
            options={options1}
            width="161px"
            onSelect={(value) => handleInputChange("occupation", value)}
          />
        </div>
      </div>

      <div className="mt-16"></div>

      <Butt
        title="Update Profile"
        Bgcolor="#FFF1E4"
        width="325px"
        height="34px"
        onClick={handleUpdateProfile}
      />
    </div>
  );
}

export default Page;
