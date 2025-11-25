import localFont from "next/font/local";

export const myFont = localFont({
  src: [
    {
      path: "../fonts/Poppins-Bold.ttf",
      weight: "600",
      style: "bold",
    },
    {
      path: "../fonts/Poppins-Light.ttf",
      weight: "400",
      style: "light",
    },
  ],
});
