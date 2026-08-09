/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#fdfbf7',
          100: '#f9f6ef',
          200: '#f3edd9',
          300: '#e7dbae',
          800: '#2b261b',
          900: '#1a1811',
        },
        ink: {
          50: '#f6f6f7',
          100: '#e4e4e7',
          500: '#71717a',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
        crimson: {
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        hindi: ['"Noto Serif Devanagari"', '"Playfair Display"', 'serif'],
        telugu: ['"Noto Serif Telugu"', '"Playfair Display"', 'serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ken-burns': 'kenburns 20s ease-in-out infinite alternate',
      },
      keyframes: {
        kenburns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '100%': { transform: 'scale(1.08) translate(-1%, -1%)' },
        }
      }
    },
  },
  plugins: [],
}
