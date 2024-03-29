/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'clouds1' : "url('../Images/clouds1.png')",
        'clouds2' : "url('../Images/clouds2.png')",
        'clouds3' : "url('../Images/clouds3.png')",
        'clouds4' : "url('../Images/clouds4.png')"
      },
      colors: {
        'donkergrijs': '#47525E',
      },
      spacing: {
        '100px': '100px',
        '128': '32rem',
        'popup': '29rem',
        'canvasheight': '35.2rem',
        'canvaswidth': '25.6rem',
      }
    },
  },
  plugins: [],
}

