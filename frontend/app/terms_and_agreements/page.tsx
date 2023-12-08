"use client";
import React, { useEffect } from "react";
import Teste from "../components/account";
import CloseIcon from "@mui/icons-material/Close";

import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  const handleBackButtonClick = () => {
    router.back();
  };

  useEffect(() => {
    // Set the title directly for the browser tab
    document.title = "Terms and Agreements";
  }, []);

  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <div className="flex items-center space-x-1">
        <Teste
          backButtonIcon={<CloseIcon style={{ fontSize: 24 }} />}
          onBackButtonClick={handleBackButtonClick}
          title=""
          subTitle1=""
        />
        <p className="text-lg text-textcolor font-extrabold">
          Terms and Agreements
        </p>
      </div>

      <div className="container text-stone-700 font-normal text-xs text-justify ml-6 mr-8 py-2 px-2">
        <p>
          This User Agreement outlines the terms and conditions for your use of
          our services provided by Brew & Brain. By creating an account, you
          agree to comply with this Agreement.
        </p>
        <p className="font-bold mt-3">Acceptance of Terms</p>
        <p>
          By using our services, you acknowledge and agree to these terms and
          conditions. If you do not agree, please do not use our services.
        </p>
        <p className="font-bold mt-3">User Responsibilities</p>
        <p>
          You are responsible for maintaining the confidentiality of your
          account information and must follow all applicable laws while using
          our services.
        </p>
        <p className="font-bold mt-3">Intellectual Property</p>
        <p>
          All content and intellectual property rights related to our services
          are owned or licensed by us and may not be used without permission.
        </p>
        <p className="font-bold mt-3">Limitation of Liability</p>
        <p>
          We are not liable for any indirect, incidental, or consequential
          damages arising from your use of our services.
        </p>
        <p className="font-bold mt-3">Termination</p>
        <p>
          We reserve the right to terminate or suspend your account at our
          discretion if you breach this Agreement.
        </p>
        <p className="font-bold mt-3">Changes to Terms</p>
        <p>
          We may modify these terms at any time. By continuing to use our
          services after revisions, you agree to the updated terms.
        </p>
        <p className="mt-3">
          For questions about this Agreement, contact us at
          support@brewandbrain.com or 0961-234-5678.
        </p>

        <div className="flex space-x-2 mt-3">
          <p className="font-bold">Effective Date:</p>
          <p>December 2023</p>
        </div>
      </div>
    </div>
  );
}

export default Page;
