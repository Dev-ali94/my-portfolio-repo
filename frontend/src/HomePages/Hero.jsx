import React, { useState, useEffect } from "react";
import { my_image } from "../assets/assest";

const Hero = () => {
  const [typedHeading, setTypedHeading] = useState("");
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const headingText = "I'm Ali Imran";
    let headingIndex = 0;

    const typeHeadingEffect = () => {
      if (headingIndex < headingText.length) {
        setTypedHeading(headingText.slice(0, headingIndex + 1));
        headingIndex++;
        setTimeout(typeHeadingEffect, 150);
      } else {
        setTimeout(() => {
          setTypedHeading("");
          headingIndex = 0;
          typeHeadingEffect();
        }, 2000);
      }
    };
    typeHeadingEffect();

    const texts = ["Full-Stack-Web-Developer", "UI/UX Designer", "Frontend-Specialist", "Backend Expert"];
    let index = 0;
    let charIndex = 0;

    const typeEffect = () => {
      if (charIndex < texts[index].length) {
        setTypedText(texts[index].slice(0, charIndex + 1));
        charIndex++;
        setTimeout(typeEffect, 100);
      } else {
        setTimeout(() => {
          index = (index + 1) % texts.length;
          charIndex = 0;
          setTypedText("");
          typeEffect();
        }, 2000);
      }
    };
    typeEffect();
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/my_cv.png';
    link.download = 'my_cv.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="min-h-[85vh] flex items-center  text-gray-100 p-4">
      <div className="w-full px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Hi, {typedHeading}
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-4 h-8 text-gray-300">{typedText}</p>
            <p className="text-sm sm:text-base lg:text-lg mb-6 leading-relaxed text-gray-400">
              Full-Stack Developer with 1+ years of experience in scalable web applications...
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-2 rounded-full transition transform hover:scale-105">
                <a href="">View My Work</a>
              </button>
              <button
                onClick={handleDownload}
                className="border-2 border-orange-600 text-orange-600 hover:bg-orange-500 hover:text-white px-6 py-2 rounded-full transition"
              >
                Download CV
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center">
            <img
              src={my_image}
              alt="Ali Imran"
              className="w-70 h-70  lg:w-90 lg:h-90 rounded-full border-4 border-orange-500 shadow-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
