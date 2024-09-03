/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'mobile': { 'max': '639px' },
      'sm': { 'min': '640px', 'max': '767px' },
      'md': { 'min': '768px', 'max': '1023px' },
      'lg': { 'min': '1024px', 'max': '1279px' },
      'xl': { 'min': '1280px', 'max': '1535px' },
      '2xl': { 'min': '1536px' },
    },
    extend: {
      colors: {
        'pec': '#020c3e', // Primary color for branding
        'highlight': '#3366FF', // Blue for highlights and interactive elements
        'background': '#ffffff', // Main background color
        'secondary-background': '#f4f4f4', // Secondary background for cards and panels
        'text-primary': '#333333', // Dark gray for main text
        'text-secondary': '#666666', // Medium gray for secondary text
        'border': '#e0e0e0', // Light gray for borders and dividers
        'success': '#28a745', // Green for success messages
        'warning': '#ffc107', // Yellow for warnings
        'error': '#dc3545', // Red for errors
        'button-primary': '#3366FF', // Blue for primary buttons
        'button-secondary': '#e3e3e3', // Light gray for secondary buttons
        'action-success': '#28a745', // Green for success actions
      },
      fontFamily: {
        'jersey': ['Jersey 10', 'sans-serif'],
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
      backdropBlur: {
        xs: '1px',
      }
    }
  },
  plugins: [
    '@tailwindcss/typography'
  ],
}