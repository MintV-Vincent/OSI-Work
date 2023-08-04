/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      colors: {
        background: "#DFDFDF",
        primary: "#22223B",
        secondary: "#4A4E69",
        light: "#c7dbe6",
        tab: "#364652",
        hover: "#226C2A",
      },

      screens: {
        print: { raw: "print" },
      },
    },
  },
  plugins: [],
};
