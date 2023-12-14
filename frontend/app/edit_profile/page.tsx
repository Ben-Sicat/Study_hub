

"use client";

import React, { useState, useEffect } from "react";
import Teste from "../components/account";
import CloseIcon from "@mui/icons-material/Close";
import Image from "../components/account_image";
import CircleIcon from "@mui/icons-material/Circle";
import TextInput from "../components/text_input";
import Drop from "../components/dropdown_button";
import Butt from "../components/button";

import { useRouter } from "next/navigation";
function Page() {
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.back();
  };

  useEffect(() => {
    document.title = "Edit Profile";
  }, []);

  const options = ["Male", "Female", "Others"];
  const options1 = ["Student", "Worker"];

  // Fetch user data from local storage
  const storedUserData = localStorage.getItem('user');
  const initialFormData = storedUserData ? JSON.parse(storedUserData) : undefined;

  const [formData, setFormData] = useState<{
    userName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    occupation: string;
  }>({

    userName: initialFormData ? initialFormData.Username : "",
    email: initialFormData ? initialFormData.Email : "",
    phoneNumber: initialFormData ? initialFormData.PhoneNumber : "",
    gender: initialFormData ? initialFormData.Gender : options[0],
    occupation: initialFormData ? initialFormData.Occupation : options1[0]

  });

  const handleInputChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleUpdateProfile = () => {
    console.log(formData);
    // Perform the update logic with formData
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

        {/* removed school option since wala naman sa create account */}
        {/* <TextInput
          placeholder="School/Company"
          width="335px"
          height="35px"
          onInputChange={(value) => handleInputChange("school", value)}
        /> */}
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
