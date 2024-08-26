import React from "react";
import HomeImage from "../items/Bank_img.png";
import Typewriter from "typewriter-effect";
const HomePage = () => {
  return (
    <>
    <div className="text-center">
        <h3 className="text-white">
        <Typewriter
        options={{
            loop:true,
        }}
          onInit={(typewriter) => {
            typewriter
              .typeString("Hoard Plato Bank Welcomes You......")
              .pauseFor(1000)
              .start()
          }}
        />
        </h3>
      <img src={HomeImage} alt="React Logo" />
    </div>
    </>
  );
};

export default HomePage;
