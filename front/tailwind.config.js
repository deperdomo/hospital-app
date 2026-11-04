/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#2A7891',
          dark: '#1F5F73',
          light: '#3B9AB8',
        },
      },
    },
  },
  plugins: [],
}

