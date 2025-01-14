import Dropdown from '@/app/components/dropdown/Dropdown';
import { useAuth } from '@/app/context/AuthContext';
// import React, { useEffect } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { FaRobot, FaAngleDown } from 'react-icons/fa6';

const ChatBotHeader = () => {
  const { attemptsLeft } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside

  // Open the drawer
  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  // Close the drawer
  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="relative bg-[#420088] flex justify-between items-center px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="w-[30px] h-[30px] rounded-[50%] flex justify-center items-center bg-[#fff]">
            <FaRobot color="#420088" size={20} />
          </div>
          <p className="text-[20px] text-white flex gap-[5px]">
            <strong>Chatbot </strong> -{' '}
            <label className="">({attemptsLeft})</label>
          </p>
        </div>
        <div ref={dropdownRef} className="relative">
          <FaAngleDown onClick={toggleDropdown} color="#fff" size={20} />
          {isOpen && <Dropdown openDrawer={openDrawer} />}
        </div>
        <div
          className={`absolute left-0 top-0 w-full h-[600px] z-[100] inset-0 bg-black bg-opacity-80 
  transition-transform duration-300 transform ${
    isDrawerOpen ? 'translate-x-0' : '-translate-x-full'
  }`}
        >
          <div className='bg-white w-[80%] h-full'>

          <div className="p-4">
                <h2 className="text-lg font-bold">Chat History</h2>
                <p>Your chat history will be displayed here.</p>
              </div>
            <button onClick={closeDrawer}>Close</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBotHeader;
