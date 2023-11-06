import React, { useEffect } from "react";
import Image from "next/image";
import ProgressBar from "@ramonak/react-progress-bar";

type FinishLoading = () => void;

function SplashScreen({ finishLoading }: { finishLoading: FinishLoading }) {
  useEffect(() => {
    setTimeout(() => {
      finishLoading();
    }, 1500);
  }, [finishLoading]);

  return (
    <div
      className="
  flex
  min-h-full 
  flex-col
  mobile:pt-60
  py-12
  mobile:px-10
  opacity-100
  transition-opacity ease-in-out
  bg-bg
  "
    >
      <div className=" mobile:w-full mobile:max-w-md">
        <Image
          alt="Logo"
          height="250"
          width="250"
          className="mx-auto w-auto"
          src="/images/logo.png"
        />
      </div>
      <div className="mt-4 justify-center">
        <ProgressBar
          completed={100}
          animateOnRender={true}
          baseBgColor="#F9EEE1"
          bgColor="#DAAB95"
        />
      </div>
    </div>
  );
}

export default SplashScreen;
