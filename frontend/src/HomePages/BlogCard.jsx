import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => (
  <div className="rounded-xl shadow-lg bg-[#0F141A] flex flex-col">
    <div className="h-full rounded-xl overflow-hidden flex flex-col">
      <div className="absolute inset-[1px] rounded-xl z-[-1]" />
      <div className="w-full h-[200px] overflow-hidden rounded-lg">
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover rounded-2xl transition-transform duration-300 ease-in-out hover:scale-110"
            loading="lazy"
          />
        )}
      </div>
      <div className="p-2  text-white flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-2 ml-2">
          <span className="px-2 py-1 bg-orange-600 text-black text-xs rounded-full ">
            {blog.category}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-400" />
          <p>{blog.date}</p>
        </div>

        <div className='flex flex-col flex-grow'>
          <div className='flex-grow'>
            <h3 className="text-lg font-semibold mb-1 ml-2">
              {blog.title}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed font-light mb-2 ml-2">
              {blog.excerpt}
            </p>
          </div>

          <div className='flex justify-end '>
            <Link
              to={`/blog/${blog.slug}`}
              className="inline-block px-4 py-2 bg-orange-600 text-black rounded-full hover:bg-orange-500 transition-colors duration-300 text-sm font-medium"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BlogCard;