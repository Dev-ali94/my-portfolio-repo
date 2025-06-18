import React from 'react';
import { useState } from 'react';
import BlogSection from './BlogSection';
import ProjectSection from './ProjectSection';
import SkillSection from './SkillSection';
import Hero from './Hero';
import ContactSection from './ContactSection';
import Sidebar from './Sidebar';

const Home = () => {
  const [currentPage, setCurrentPage] = useState('hero');

  const menuItems = [
    { key: 'hero', label: 'Hero' },
    { key: 'blogsection', label: 'Blog' },
    { key: 'projectsection', label: 'Projects' },
    { key: 'skillsection', label: 'Skills' },
    { key: 'contact', label: 'Contact' },
  ];

  return (
    <div className="bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white  min-h-screen">
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-col md:flex-row min-h-screen p-4 gap-4">
          <Sidebar />
          {/* Home Content */}
          <div className="flex flex-col justify-between w-full bg-[#161B22] rounded-2xl overflow-hidden shadow-2xl border border-[#27313D]">
            {/* Top Desktop Nav */}
            <div className="flex flex-row justify-end">
              <div className="hidden md:flex justify-end w-165 shadow-lg bg-[#0F141A] px-6 py-4 rounded-bl-2xl border-b  border-[#27313D]">
                {menuItems.map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setCurrentPage(key)}
                    className={`mx-3 text-lg font-bold pr-8 ${currentPage === key
                      ? ' text-orange-500'
                      : 'text-orange-400 hover:text-orange-500'
                      } transition-all ease-in-out`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            {/* Main View Area */}
            <div className="flex-1 overflow-y-auto">
              {currentPage === 'hero' && <Hero />}
              {currentPage === 'blogsection' && <BlogSection />}
              {currentPage === 'projectsection' && <ProjectSection />}
              {currentPage === 'skillsection' && <SkillSection />}

              {currentPage === 'contact' && <ContactSection />}
            </div>
          </div>
          {/* Bottom Mobile Nav */}
        </div>
        <nav className="md:hidden bg-[#0F141A]  flex flex-row justify-between items-center p-4">
          {menuItems.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setCurrentPage(key)}
              className={`text-sm ${currentPage === key
                ? 'text-orange-500 font-semibold'
                : 'text-orange-600'
                }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Home;
