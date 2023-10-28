import Image from "next/image";
import AuthForm from "./components/AuthForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Study Hub",
  description: "Study Hub",
};

export default function Home() {
  return (
    <div
      className="
    flex
    min-h-full
    flex-col
    py-12
    mobile:px6
    text-center
    mobile:space-y-52
    
    bg-bg
    "
    >
      <div className="sm:max-auto sm:w-full sm:max-w-md mobile:pt-12">
        <Image
          alt="Logo"
          height="150"
          width="150"
          className="mx-auto w-auto"
          src="/images/logo.png"
        />
      </div>
      <div className="">
        <AuthForm />
      </div>
    </div>
  );
}
