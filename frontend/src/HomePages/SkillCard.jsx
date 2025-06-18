import { useEffect, useRef, useState } from "react";

const SkillCard = ({ skill }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (progressBarRef.current) {
      observer.observe(progressBarRef.current);
    }

    return () => {
      if (progressBarRef.current) {
        observer.unobserve(progressBarRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const target = skill.progressBar;
      const increment = Math.ceil(target / 50);
      const interval = setInterval(() => {
        start += increment;
        if (start >= target) {
          start = target;
          clearInterval(interval);
        }
        setCurrentPercentage(start);
      }, 30);
    }
  }, [isVisible, skill.progressBar]);

  return (
    <div
      ref={progressBarRef}
      className="bg-[#0F141A] p-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-center space-x-4 mb-4">
        <div className="bg-gray-800 h-16 w-16 rounded-full flex items-center justify-center">
          {skill.image && (
            <img
              src={skill.image}
              alt={skill.title}
              className="w-12 object-contain"
            />
          )}
        </div>
        <h3 className="text-lg font-bold text-white">{skill.title}</h3>
      </div>
      <div className="mt-2">
        <div className="flex justify-between items-center mb-1">
          <span className="text-sm font-medium text-white">Proficiency</span>
          <span className="text-sm font-medium text-gray-400">{currentPercentage}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className={`bg-orange-600 h-2 rounded-full transition-all duration-[1500ms] ease-out`}
            style={{
              width: isVisible ? `${skill.progressBar}%` : "0%",
            }}
          ></div>
        </div>
      </div>
      <p className="text-gray-400 text-sm mt-3">{skill.description}</p>
    </div>
  );
};

export default SkillCard;