import { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';
import CategoryFilter from './CategoryFilter';

const BlogSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [blogs, setBlogs] = useState([]);

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'web-dev', name: 'Web Development' },
    { id: 'design', name: 'Design' },
    { id: 'ai', name: 'AI & Machine Learning' },
  ];

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/blogs`)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  }, []);

  const filteredBlogs = activeCategory === 'all'
    ? blogs
    : blogs.filter((blog) => blog.category === activeCategory);

  return (
    <section id="blog" className="px-4 sm:px-6 lg:px-12 py-12  rounded-2xl overflow-y-auto max-h-160">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 px-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-500">
            Latest Articles
          </h2>
          <p className="text-gray-400 mt-4 text-sm sm:text-base">
            Explore insightful articles covering ideas, experiences, and tutorials on development, design, and the latest tech trends.
          </p>
        </div>
        {/* Category Filter */}
        <div className="flex justify-center mb-10 px-2">
          <CategoryFilter
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            categories={categories}
          />
        </div>
        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
