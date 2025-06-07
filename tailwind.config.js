/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'midnight-navy': '#202934',
        'bold-coral': '#FF5A3D',
        'peach-blush': '#F1B593',
        'vanilla-cream': '#FEF3EA',
        'soft-teal': '#50B2C0',
        'warm-gray': '#A8A8A8',
      },
      fontFamily: {
        'heading': ['Poppins', 'sans-serif'],
        'body': ['Nunito', 'sans-serif'],
      },
      boxShadow: {
        'cozy': '0 4px 14px 0 rgba(0, 0, 0, 0.05)',
        'cozy-lg': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.02)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      dropShadow: {
        'glow': '0 0 8px rgba(255, 90, 61, 0.3)',
        'glow-soft': '0 0 6px rgba(255, 90, 61, 0.2)',
      }
    },
  },
  plugins: [],
};