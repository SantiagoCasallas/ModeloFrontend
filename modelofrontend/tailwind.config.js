/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      width: {
        '1/7': '14.2857%',
        '2/7': '28.5714%',
        '3/7': '42.8571%',
        '4/7': '57.1428%',
        '5/7': '71.4285%',
        '6/7': '85.7142%',
        '7/7': '100%',
       
      }
    },
  },
  plugins: [],
};
