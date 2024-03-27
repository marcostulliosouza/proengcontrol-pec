/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pec': '#020c3e',
        'table_header': '#c5d1f5',
        'cinza': {
          light: '#f1f1f1',
          DEFAULT: '#e3e3e3',
          medium_dark: '#444444',
          dark: '#d9d9d9',
          extra_dark: '#b8b8b8',
        }
      }
    }
  },
  plugins: [],
}

