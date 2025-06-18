import { useState, useEffect } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard';
import CategoryFilter from './CategoryFilter';

const ProjectSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'web-dev', name: 'Web Development' },
    { id: 'design', name: 'Design' },
    { id: 'ai', name: 'AI & Machine Learning' },
  ];

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/projects`)
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((project) =>
        project.category.toLowerCase().replace(/\s/g, '-') === activeCategory
      );

  return (
    <section id="projects" className="px-4 sm:px-6 lg:px-12 py-12 rounded-2xl overflow-y-auto max-h-160">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 ">
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-500">
            Latest Projects
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            A complete project showcasing its purpose, goals, features, and development process using modern technologies and best practices.
          </p>
        </div>
        <div className="flex justify-center mb-10">
          <CategoryFilter
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={categories}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {loading ? (
            <p className="text-center text-gray-400 col-span-full">Loading projects...</p>
          ) : filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-full">
              No projects found in this category.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
