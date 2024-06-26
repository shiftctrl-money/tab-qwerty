import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-img": "url(/bg/hero.png)",
      },
      colors: {
        darkOne: "#2B393B",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
