import scrollbar from "tailwind-scrollbar";

const config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#502B3A33",
          200: "#502B3A66",
          300: "#502B3A99",
          400: "#502B3ACC",
          500: "#502B3A",
        },
        secondary: {
          100: "#D1A55933",
          200: "#D1A55966",
          300: "#D1A55999",
          400: "#D1A559CC",
          500: "#D1A559",
        },
        neutral: {
          100: "#787878",
          200: "#505050",
          300: "#282828",
          400: "#141414",
          500: "#000000",
        },
      },
      fontFamily: {
        primary: ["var(--font-lora)"],
        secondary: ["var(--font-gantari)"],
        "dancing-script": ["var(--font-dancing-script)"],
      },
    },
  },
  plugins: [scrollbar],
};

export default config;
