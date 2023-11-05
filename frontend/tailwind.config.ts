import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        300: "300px",
      },
      fontSize: {
        8: "8px",
        10: "10px",
        400: "350px",
        500: "500px",
        700: "700px",
        1000: "1000px",
      },
      lineHeight: {
        18: "18px",
      },
      container: {
        center: true,
      },
      fontFamily: {
        Mont: "Montserrat",
      },
      screens: {
        mobile: "360px",
      },
      colors: {
        "regal-blue": "#243c5a",
        bg: "#EBE0D0",
        redwood: "#9F5757",
        "landing-section-bg": "#FFF1E4",
        "landing-bg": "#FFFAF6",
        "macaroni-and-cheese": "#F3C386",
        "logo-color": "#4F483F",
        "gradient-2": "#FFD4BC",
        "gradient-1": "#F8FFE2",
        "parrot-pink": "#DC9D94",
      },
    },
  },
  plugins: [],
};
export default config;
