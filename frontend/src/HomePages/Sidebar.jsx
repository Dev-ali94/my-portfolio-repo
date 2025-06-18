import React from "react";
import { useState, useEffect } from 'react';
import { my_image, email, telephone, calender, address, facebook, insta, github, messanger } from '../assets/assest';

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <aside
      className={`${isMobile ? 'w-full' : 'md:w-[20%]'
        } bg-[#161B22] text-[#00FFFF]   rounded-xl shadow-lg px-5 py-6 transition-all duration-300 ease-in-out border border-[#27313D] ${isMobile ? (sidebarOpen ? 'h-auto' : 'h-70') : 'h-[95vh]'
        } md:rounded-2xl relative overflow-hidden flex-shrink-0`}
    >
      {/* Toggle button for mobile */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="absolute top-4 right-4 md:hidden text-orange-500 text-2xl"
      >
        {sidebarOpen ? '▲' : '▼'}
      </button>
      {/* Avatar, Name, Title */}
      <div className="flex flex-col items-center text-center mt-2 space-y-3">
        <div className="w-32 h-30 rounded-full overflow-hidden border-4 border-[#0F141A] shadow-lg">
          <img src={my_image} alt="Richard Hanrick" className="w-full h-full object-container" />
        </div>
        <h1 className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent text-2xl font-semibold">Ali Imran</h1>
        <p className=" text-gray-400 text-sm font-md flex item-center justify-center  px-3 py-1 rounded-lg shadow-md bg-[#0F141A]">
          Web Developer
        </p>
      </div>
      {/* Sidebar content */}
      {(sidebarOpen || !isMobile) && (
        <div className="mt-6 space-y-6 px-2">
          <div className="w-full h-px bg-gray-800"></div>
          {/* Contact List */}
          <ul className="space-y-4">
            <li className="flex items-start  gap-4">
              {/* Image container*/}
              <div className='flex items-start space-x-4'>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#0F141A] shadow-md flex-shrink-0">
                  <img src={email} alt="" className="w-7 h-7" />
                </div>
                <div className="flex flex-col ">
                  <p className="text-gray-400 text-sm font-bold mb-1">EMAIL</p>
                  <p className="text-white text-sm font-medium">Sheikhaliimran5452</p>
                  <span className='text-white text-sm font-medium '>@gmail.com</span>
                </div>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center  justify-center bg-[#0F141A] shadow-md">
                <img src={telephone} alt="" className="w-7" />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-bold mb-1">PHONE</p>
                <p
                  className="text-white text-sm font-medium "
                >
                  0329-4704692
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-lg flex items-center  justify-center bg-[#0F141A]  shadow-md">
                <img src={calender} alt="" className="w-7" />
              </div>
              <div>
                <p className="text-gray-400 text-sm font-bold mb-1">BIRTHDAY</p>
                <p
                  className="text-white text-sm font-medium "
                >
                  01-JUNE-2007
                </p>
              </div>
            </li>
            <li className="flex items-start  gap-4">
              <div className='flex items-start space-x-4'>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#0F141A] shadow-md flex-shrink-0">
                  <img src={address} alt="" className="w-7 h-7" />
                </div>
                <div className="flex flex-col">
                  <p className="text-gray-400 text-sm font-bold mb-1">ADDRESS</p>
                  <p className="text-white text-sm font-medium">GALI ARYA SAMAJ DOUBLE</p>
                  <span className='text-white text-sm font-medium '>PHATAK MULTAN</span>
                </div>
              </div>
            </li>
          </ul>
          {/* Social Links */}
          <div className="w-full h-px bg-gray-800"></div>
          <ul className="flex items-center space-x-2 w-full justify-center">
            <li>
              <div className="h-11 w-11 rounded-full bg-[#0F141A] flex items-center justify-center hover:bg-[#27313D] ">
                <a href="https://github.com/Dev-ali94" className="flex items-center justify-center">
                  <img src={github} alt="" className="w-7 h-7 " />
                </a>
              </div>
            </li>
            <li>
              <div className="h-11 w-11 rounded-full bg-[#0F141A] flex items-center justify-center hover:bg-[#27313D] ">
                <a href="http://www.facebook.com/ali.imran.313747" className="flex items-center justify-center">
                  <img src={facebook} alt="" className="w-7 h-7 " />
                </a>
              </div>
            </li>
            <li>
              <div className="h-11 w-11 rounded-full bg-[#0F141A] flex items-center justify-center hover:bg-[#27313D] ">
                <a href="http://www.instagram.com/aliimran3740?igsh=MWFkanNyZjVzbTjqbw==" className="flex items-center justify-center">
                  <img src={insta} alt="" className="w-7 h-7 " />
                </a>
              </div>
            </li>
          </ul>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;