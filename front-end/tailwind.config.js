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
          100: '#f1f1f1',
          200: '#e3e3e3',
          300: '#d9d9d9',
          400: '#b8b8b8',
          500: '#444444',
        }
      }
    }
  },
  plugins: [],
}