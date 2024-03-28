/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': {'min': '640px', 'max': '767px'},
      // Tablet

      'md': {'min': '768px', 'max': '1023px'},
      // Laptop

      'lg': {'min': '1024px', 'max': '1279px'},
      // Desktop

      'xl': {'min': '1280px', 'max': '1535px'},
      // TV

      '2xl': {'min': '1536px'},
    },
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