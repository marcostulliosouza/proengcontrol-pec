/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'pec': '#020c3e',
      'cinza': {
        light: '#f1f1f1',
        DEFAULT: '#e3e3e3',
        medium_dark: '#444444',
        dark: '#d9d9d9',
        extra_dark: '#b8b8b8',
      } 
      
    }
  },
  plugins: [],
}

