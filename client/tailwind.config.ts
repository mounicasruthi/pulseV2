// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // background: "var(--background)",
        // foreground: "var(--foreground)",
        vibrantOrange: "#FF5733", // Burnt Orange
        charcoalGray: "#333333", // Charcoal Gray
        oliveGreen: "#4B8E23", // Olive Green
        softMint: "#98FF98", // Soft Mint
      },
    },
  },
  plugins: [],
};
export default config;
