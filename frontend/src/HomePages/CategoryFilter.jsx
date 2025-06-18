import { useState } from 'react';

const CategoryFilter = ({ activeCategory, setActiveCategory, categories }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="w-full">
      {/* Mobile dropdown */}
      <div className="sm:hidden relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg flex justify-between items-center"
        >
          {categories.find(cat => cat.id === activeCategory)?.name || 'Select Category'}
          <svg
            className="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {showDropdown && (
          <div className="absolute left-0 right-0 bg-gray-800 mt-1 rounded-lg shadow-lg z-10">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setShowDropdown(false);
                }}
                className={`w-full text-left px-4 py-2 ${activeCategory === cat.id
                    ? 'bg-orange-600 text-white'
                    : 'text-gray-300 hover:bg-gray-600'
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Desktop buttons */}
      <div className="hidden sm:flex flex-wrap gap-2 bg-gray-800 p-3 rounded-lg mt-2 sm:mt-0 mx-auto w-fit">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors duration-200 whitespace-nowrap ${activeCategory === cat.id
                ? 'bg-orange-600 text-white'
                : 'bg-gray-900 text-gray-300 hover:bg-gray-600'
              }`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
