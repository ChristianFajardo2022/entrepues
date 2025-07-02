/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        screens: {
          md: "600px",
          xs: "300px",
        },
          fontFamily: {
            "danson-bold": ["DansonBold" , "serif"],
            "danson-regular": ["DansonRegular" , "serif"],
            "danson-semi": ["DansonSemiBold" , "serif"],
          },
          
  
      },
    },
    plugins: [],
  };
  