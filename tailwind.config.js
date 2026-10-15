/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080d0a",
        surface: {
          DEFAULT: "#0f1612",
          raised: "#141e19",
          card: "#121b15",
          highlight: "#1a2720",
          border: "#1f3026",
          borderLight: "#2c4436",
        },
        primary: {
          DEFAULT: "#c2f835", // Acid lime
          hover: "#d2fa5c",
          muted: "rgba(194, 248, 53, 0.15)",
          border: "rgba(194, 248, 53, 0.3)",
        },
        foreground: {
          DEFAULT: "#f2f5f3",
          muted: "#8a9e93",
          subtle: "#54685e",
        },
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        ticker: 'ticker 25s linear infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
