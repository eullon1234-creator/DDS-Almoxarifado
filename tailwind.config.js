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
          dark: '#0d0221',
          black: '#05010d',
          cyan: '#00f3ff',
          pink: '#ff00ff',
          yellow: '#f3e600',
          blue: '#2de2e6',
          purple: '#9d00ff',
        }
      },
      backgroundImage: {
        'cyber-grid': 'linear-gradient(to right, rgba(0, 243, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 243, 255, 0.1) 1px, transparent 1px)',
      },
      animation: {
        'flicker': 'flicker 1.5s infinite alternate',
        'glitch': 'glitch 1s infinite linear alternate-reverse',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { opacity: '1' },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { opacity: '0.4' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        }
      },
      boxShadow: {
        'neon-cyan': '0 0 5px #00f3ff, 0 0 20px #00f3ff',
        'neon-pink': '0 0 5px #ff00ff, 0 0 20px #ff00ff',
        'neon-yellow': '0 0 5px #f3e600, 0 0 20px #f3e600',
      }
    },
  },
  plugins: [],
}
