/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#070612",
          surface: "#0F1026",
          border: "rgba(0, 255, 255, 0.22)",
          text: "#EAF6FF",
          muted: "rgba(234, 246, 255, 0.7)",
          cyan: "#00F6FF",
          pink: "#FF2AD4",
          purple: "#8A2BE2",
          lime: "#B6FF00",
        },
      },
      boxShadow: {
        neonCyan: "0 0 0 1px rgba(0, 247, 255, 0.36), 0 0 22px rgba(0, 246, 255, 0.25)",
        neonPink: "0 0 0 1px rgba(255, 42, 212, 0.35), 0 0 22px rgba(255, 42, 212, 0.25)",
        neonMix: "0 0 0 1px rgba(0, 246, 255, 0.28), 0 0 26px rgba(255, 42, 212, 0.18)",
      },
      backgroundImage: {
        cyberGrid:
          "linear-gradient(rgba(0, 246, 255, 0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 246, 255, 0.08) 1px, transparent 1px)",
        cyberGlow:
          "radial-gradient(600px circle at 20% 0%, rgba(255, 42, 212, 0.22), transparent 45%), radial-gradient(700px circle at 80% 10%, rgba(0, 246, 255, 0.18), transparent 50%), radial-gradient(900px circle at 50% 120%, rgba(138, 43, 226, 0.18), transparent 55%)",
      },
      backgroundSize: {
        cyberGrid: "56px 56px",
      },
    },
  },
  plugins: [],
}
