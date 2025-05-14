import scrollbar from "tailwind-scrollbar";

const config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
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
