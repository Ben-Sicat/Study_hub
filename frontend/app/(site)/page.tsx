import type { Metadata } from "next";
import { Logo, Painting } from "../components/svgs";
import About from "./components/About";
import Discounts from "./components/Discounts";
import Footer from "./components/Footer";
import Butt from "../components/button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Brew & Brain",
  description: "Brew * Brain",
};
//WALA NA BA TAYO FILE FOR TAILWIND?
//sino to? AHAHAHAHAHAHA Eric?

export default function Home() {
  return (
    <div
      className="'
    bg-landing-bg
    md:container
    "
    >
      <section
        className="
  flex
  flex-col
  bg-local
  mobile:px-3
  mobile:bg-[url('https://i.ibb.co/MkGZPyF/try.jpg')]
  bg-blend-darken
  mobile:w-full
  w-full
  mobile:bg-cover
  
  "
      >
        <div className="text-logo-color mobile:text-xs mobile:font-bold mobile:pt-8 mobile:ml-5 flex text-center items-center">
          <div className="mobile:mr-1">
            <Logo className="text-5xl" />
          </div>{" "}
          Brews & Brains
        </div>

        <div className="text-3xl mobile:font-bold mobile:max-w-xl mobile:text-justify mobile:pl-5 mobile:pr-4 mobile:tracking-wide">
          <Painting className="text-400" />

          <p className="relative bottom-9">
            Enjoy <br /> Complimentary <br /> Coffee and Unleash <br />{" "}
            Limitless Creativity
          </p>
        </div>
        <div
          className="
    mobile:pl-6 
    mobile:pr-7 
    mobile:text-10 
    mobile:leading-18 
    relative
    mobile:bottom-7
    "
        >
          <div className="mobile:text-justfy mobile:tracking-wider ">
            Welcome to Brew & Brain! Dive into a world of knowledge <br /> and
            endless possibilities while enjoying our complimentary freshly
            brewed coffee.
          </div>
          <div className="mobile:mt-6">Come, sip, and succeed!</div>
        </div>

        <div className="mobile:pt-3 mobile:pb-9">
          <Link href="/sign_in">
            <Butt
              title="Sign In"
              Bgcolor="#EBE0D0"
              width="343px"
              height="40px"
            />
          </Link>
        </div>
      </section>
      <section>
        <About />
      </section>
      <section>
        <Discounts />
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
