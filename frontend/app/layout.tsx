"use client";
import { Montserrat } from "next/font/google";
import "./globals.css";
import curly from "./components/svgs/curly.svg";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
const montserrat = Montserrat({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.html
        key={pathname}
        lang="en"
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{
          duration: 0.5,
        }}
        variants={{
          initialState: {
            opacity: 0,
          },
          animateState: {
            opacity: 1,
          },
          exiteState: {},
        }}
      >
        <body className={montserrat.className}>{children}</body>
      </motion.html>
    </AnimatePresence>
  );
}
