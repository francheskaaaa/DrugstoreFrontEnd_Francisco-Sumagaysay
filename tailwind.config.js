module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'], // These are your CSS class scan locations
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
           lato: ['Lato', 'sans-serif'],
      }
    },
  },
  plugins: [],
};