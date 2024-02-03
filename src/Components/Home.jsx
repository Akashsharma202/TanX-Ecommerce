import React from "react";
import home from "./Img/home.avif";
import car2 from "./Img/car2.png"
export default function Home() {
  const backgroundImageStyle = {
    backgroundImage: `url(${car2})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "87vh",
  };

  return (
    <div className="h-[89vh]" style={backgroundImageStyle}>
      {/* Your content goes here */}
    </div>
  );
}
