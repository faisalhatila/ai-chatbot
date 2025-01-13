import Dropdown from '@/app/components/dropdown/Dropdown';
import { useAuth } from '@/app/context/AuthContext';
// import React, { useEffect } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import { FaRobot, FaAngleDown } from 'react-icons/fa6';

const ChatBotHeader = () => {
  const { attemptsLeft } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
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
    <div className="bg-[#420088] flex justify-between items-center px-5 py-3">
      <div className="flex items-center gap-3">
        <div className="w-[30px] h-[30px] rounded-[50%] flex justify-center items-center bg-[#fff]">
          <FaRobot color="#420088" size={20} />
        </div>
        <p className="text-[20px] text-white flex gap-[5px]">
          <strong>Chatbot </strong> -{' '}
          <label className="">({attemptsLeft})</label>
        </p>
      </div>
      <div  ref={dropdownRef} className="relative">
        <FaAngleDown onClick={toggleDropdown} color="#fff" size={20} />
        {isOpen && <Dropdown />}
      </div>
    </div>
  );
};

export default ChatBotHeader;
