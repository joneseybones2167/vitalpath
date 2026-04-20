import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Matches the pitch site typography system
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"DM Sans"', "system-ui", "sans-serif"],
      },
      colors: {
        // ── VitalPath brand palette (from index.html / portal.html) ──
        teal: {
          DEFAULT: "#1DA8A0",
          light: "#5EC4BD",
          dim: "rgba(29, 168, 160, 0.12)",
        },
        // Deep navy/teal backgrounds
        deep: {
          DEFAULT: "#0D3D3D",
          navy: "#13384A",
          darker: "#071E2B",
        },
        // Surface colors for light sections
        surface: {
          DEFAULT: "#F5FAFA",
          mid: "#E2F4F1",
          border: "#D8EDEA",
          borderDark: "#C8E6E2",
        },
        // Text palette
        ink: {
          DEFAULT: "#13384A",
          muted: "#637381",
          subtle: "#9CAAB5",
          body: "#2D5A6A",
        },
        // ── Portal dashboard palette (dark mode shell) ──
        // Taken from vitalpath-portal.html CSS vars
        portal: {
          bg: "#0F0F0E",
          card: "#1A1A18",
          cardHover: "#222220",
          elevated: "#252523",
          border: "#2A2A27",
          borderLight: "#333330",
          text: "#E8E6DF",
          textSecondary: "#9B9890",
          textMuted: "#6B6961",
          accent: "#C8B88A",
          accentDim: "rgba(200, 184, 138, 0.12)",
          accentMid: "rgba(200, 184, 138, 0.25)",
        },
        // Semantic status colors for biomarker states
        status: {
          green: "#6BCB77",
          greenDim: "rgba(107, 203, 119, 0.12)",
          red: "#E05555",
          redDim: "rgba(224, 85, 85, 0.12)",
          amber: "#E8A838",
          amberDim: "rgba(232, 168, 56, 0.12)",
          blue: "#5B9BD5",
          blueDim: "rgba(91, 155, 213, 0.12)",
          purple: "#9B8EC4",
          purpleDim: "rgba(155, 142, 196, 0.12)",
          teal: "#4ECDC4",
          tealDim: "rgba(78, 205, 196, 0.12)",
        },
      },
      borderRadius: {
        // Matches portal mockup radius scale
        sm: "6px",
        DEFAULT: "10px",
        lg: "14px",
        xl: "16px",
      },
      boxShadow: {
        // Dark-mode-friendly shadow for portal cards
        portal: "0 2px 12px rgba(0, 0, 0, 0.3)",
        "portal-hover": "0 8px 32px rgba(29, 168, 160, 0.15)",
        // Light surface shadows for public/marketing pages
        surface: "0 8px 32px rgba(13, 61, 61, 0.08)",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.3s ease",
        "pulse-soft": "pulse 2s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
