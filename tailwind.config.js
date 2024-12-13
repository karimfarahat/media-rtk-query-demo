/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // move element all its width from left to right
      keyframes: { shimmer: { "100%": { transform: "translateX(100%)" } } },
      // apply the shimmer above over 1.5s infinitley
      animation: {
        shimmer: "shimmer 1.5s infinite",
      },
    },
  },
  plugins: [],
};
