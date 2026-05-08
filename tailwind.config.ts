import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Site palette: figma-colors.json
        ink: {
          DEFAULT: "#000000",
          soft: "#767676",
          mute: "#999999",
        },
        paper: {
          DEFAULT: "#FFFFFF",
          warm: "#F6F6F6",
          tint: "#F3F3F3",
          line: "#EFEFEF",
        },
        accent: {
          DEFAULT: "#8D4086",
          dark: "#6E2F68",
          soft: "#8C3F86",
        },
        line: "#DDDDDD",
      },
      fontFamily: {
        serif: ["'Crimson Pro'", "'Noto Serif JP'", "serif"],
        sans: ["'Source Sans 3'", "'Noto Sans JP'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        editorial: "0 1px 0 rgba(0,0,0,0.04), 0 8px 24px -12px rgba(0,0,0,0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
