import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CommentSection from './CommentSection';
import Sidebar from '../HomePages/Sidebar'

const BlogDeatilPage = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BASE_URL}/api/blogs/${slug}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error(err));
  }, [slug]);

  if (!blog) return <div className="text-white p-10">Loading...</div>;

  return (
   <div className="bg-gray-900 px-4 py-4 flex flex-col lg:flex-row gap-4 w-full">
  <Sidebar />
  <div className="bg-[#161B22] text-white rounded-3xl p-3 flex-1 min-w-0">
    <div className="overflow-y-auto h-screen p-4">
      {blog.image && (
        <div className="m-6 bg-gray-100 rounded-lg">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full max-h-[500px] object-cover rounded-2xl"
          />
        </div>
      )}
      <div className="flex items-center gap-4 mb-8">
        {blog.authorImage && (
          <img
            src={blog.authorImage}
            alt={blog.author}
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-orange-600"
          />
        )}
        <div>
          <p className="text-lg font-semibold">{blog.author}</p>
          <p className="text-sm text-gray-400">
            {new Date(blog.date).toDateString()}
          </p>
        </div>
      </div>
    {blog.sections.map((section, sectionIndex) => (
  <div
    key={section.id || sectionIndex}
    className="mb-10 p-10 bg-gray-900 rounded-2xl w-full max-w-full"
  >
    <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white break-words">
      {section.title}
    </h2>
    {section.subsections.map((subsection, subsectionIndex) => (
      <div
        key={subsection.id || subsectionIndex}
        className="ml-2 sm:ml-6 mb-4 w-full max-w-full"
      >
        <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white break-words">
          {subsection.subtitle}
        </h3>
       <p className="text-sm sm:text-base text-gray-300 leading-relaxed break-words w-full">
      
  {subsection.content}
</p>

      </div>
    ))}
  </div>
))}


      {/* Comment Section */}
      <div className="mt-12">
        <CommentSection blogId={blog._id} />
      </div>
    </div>
  </div>
</div>


  );
};
export default BlogDeatilPage;


