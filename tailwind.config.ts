import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dex: {
          bg: "#12141C",
          panel: "#1B1F2C",
          panel2: "#242A3B",
          line: "#313850",
          red: "#E3350D",
          "red-dark": "#B82A0B",
          yellow: "#FFCB05",
          text: "#F2F1EC",
          muted: "#8B92A8",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        dex: "0 12px 30px -12px rgba(0,0,0,0.55)",
      },
      backgroundImage: {
        "dex-grid":
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
      },
      backgroundSize: {
        "dex-grid": "22px 22px",
      },
      keyframes: {
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
      },
      animation: {
        "pulse-soft": "pulse-soft 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
