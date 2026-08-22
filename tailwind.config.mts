import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "azeno-navy": "var(--azeno-navy)",
        "azeno-blue": "var(--azeno-blue)",
        "azeno-cyan": "var(--azeno-cyan)",
        "azeno-ink": "var(--azeno-ink)",
        "azeno-muted": "var(--azeno-muted)",
        "azeno-line": "var(--azeno-line)",
        "azeno-surface": "var(--azeno-surface)",
        "azeno-white": "var(--azeno-white)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
};

export default config;
