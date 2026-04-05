/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: "#00f5ff",
          purple: "#9d4edd",
          blue: "#0066ff",
          pink: "#ff00aa",
        },
        cyber: {
          bg: "#0a0a12",
          surface: "#121220",
          border: "#1a1a2e",
        }
      },
      fontFamily: {
        mono: ['"Fira Code"', 'monospace'],
        display: ['"Orbitron"', 'sans-serif']
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glitch': 'glitch 1s linear infinite'
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 20px #00f5ff' },
          '50%': { opacity: 0.8, boxShadow: '0 0 40px #00f5ff, 0 0 60px #9d4edd' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' }
        }
      },
      boxShadow: {
        'neon-cyan': '0 0 10px #00f5ff, 0 0 20px #00f5ff, 0 0 40px #00f5ff',
        'neon-purple': '0 0 10px #9d4edd, 0 0 20px #9d4edd, 0 0 40px #9d4edd',
        'neon-double': '0 0 10px #00f5ff, 0 0 20px #9d4edd'
      }
    },
  },
  plugins: [],
}