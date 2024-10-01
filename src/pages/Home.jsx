import React from "react";
import TypingAnim from "../components/typer.js/TypingAnim";

const Home = () => {
  return (
    <div className="w-full h-full flex flex-col items-center mx-auto mt-3 mb-3">
      <div className="flex justify-center">
        <TypingAnim />
      </div>

      <div className="flex flex-col md:flex-row xs:flex-col sm:flex-col gap-5 my-10 w-full items-center">
        <img
          src="robot.png"
          alt="robot"
          className="w-40 md:w-52 mx-auto"
        />
        <img
          className="image-inverted rotate w-40 md:w-52 mx-auto"
          src="openai.png"
          alt="openai"
        />
      </div>

      <div className="flex justify-center mx-auto">
  <img
    src="chat.png"
    alt="chatbot"
    className="w-5/6 sm:w-3/4 md:w-2/3 lg:w-400px xl:w-400px 2xl:w-400px rounded-2xl shadow-[0_10px_25px_rgba(8,_112,_184,_0.4),_0_0_50px_10px_rgba(8,_112,_184,_0.9)] mt-5 mb-5 p-2"
  />
</div>


    </div>
  );
};

export default Home;
