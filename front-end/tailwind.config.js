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
        dark: '#d9d9d9',
      } 
      
    }
  },
  plugins: [],
}

