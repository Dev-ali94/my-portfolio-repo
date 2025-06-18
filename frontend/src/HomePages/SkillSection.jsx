import { useState, useEffect } from "react";
import axios from "axios";
import SkillCard from "./SkillCard";
import CategoryFilter from "./CategoryFilter";

const SkillSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [skills, setSkills] = useState([]);

  const categories = [
    { id: "all", name: "All" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "tools", name: "Tools" },
  ];

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/skills`)
      .then((res) => {
        console.log(res.data);
        setSkills(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section
      id="skills"
      className="px-4 sm:px-6 lg:px-12 py-12 rounded-2xl overflow-y-auto max-h-160 p-2"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-500">
            My Skills
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            Explore my expertise in various categories, including frontend, backend, and tools.
          </p>
        </div>
        <div className="flex justify-center mb-8">
          <CategoryFilter
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={categories}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4  gap-6">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill) => (
              <SkillCard key={skill._id} skill={skill} />
            ))
          ) : (
            <p className="text-gray-500">No skills available in this category.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default SkillSection;
