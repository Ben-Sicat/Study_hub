import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Mont: "Montserrat",
      },
      screens: {
        mobile: "360px",
      },
      colors: {
        'backcolor': "#FFFAF6",
        'regal-blue': "#243c5a",
        'bg': "#EBE0D0",
        'redwood': "#9F5757",
        'qr': "#1C1B1F",
        'textcolor': "#4F483F",
        'line': "#C7C7C7",
        'buttonborder': "#EDC2B5",
      },
    },
  },
  plugins: [],
};
export default config;
