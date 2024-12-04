/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#F87171',
          DEFAULT: '#EF4444',
          dark: '#DC2626',
        },
        secondary: {
          light: '#FEF2F2',
          DEFAULT: '#FEE2E2',
          dark: '#FECACA',
        },
        accent: {
          light: '#FECACA',
          DEFAULT: '#FCA5A5',
          dark: '#F87171',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}