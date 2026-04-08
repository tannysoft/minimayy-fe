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
        // Minimayy CI — warm cream / beige / taupe
        cream: {
          50: "#FDFBF5",
          100: "#FAF6EE",
          200: "#F5EFE4",
          300: "#EDE4D2",
          400: "#E2D4B8",
        },
        sand: {
          300: "#D4C3A8",
          400: "#C9B79C",
          500: "#B79F80",
          600: "#9B8464",
        },
        taupe: {
          500: "#8B7355",
          600: "#6E5A44",
          700: "#5C4A3A",
          800: "#3F332A",
        },
        ink: "#1A1612",
        gold: "#C9A770",
      },
      fontFamily: {
        // Headings & body — Aktiv Grotesk Thai (defined in :root via Typekit)
        display: [
          "var(--font-sans)",
          "var(--font-sans-latin)",
          "system-ui",
          "sans-serif",
        ],
        serif: [
          "var(--font-serif)",
          "var(--font-sans)",
          "Georgia",
          "serif",
        ],
        sans: [
          "var(--font-sans-latin)",
          "var(--font-sans)",
          "system-ui",
          "sans-serif",
        ],
        "thai-display": [
          "var(--font-thai-display)",
          "var(--font-sans)",
          "sans-serif",
        ],
        article: [
          '"thongterm"',
          "var(--font-sans-latin)",
          "var(--font-sans)",
          "system-ui",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "noise-grain":
          "radial-gradient(circle at 1px 1px, rgba(139,115,85,0.08) 1px, transparent 0)",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(139,115,85,0.06), 0 8px 24px rgba(139,115,85,0.08)",
        lift: "0 2px 4px rgba(139,115,85,0.08), 0 24px 48px rgba(139,115,85,0.12)",
      },
      letterSpacing: {
        luxe: "0.22em",
      },
      typography: () => ({}),
    },
  },
  plugins: [],
};

export default config;
