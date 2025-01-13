import React from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaHistory } from "react-icons/fa";
import { AiOutlineWechat } from "react-icons/ai";




const Dropdown = () => {

    const {logout} = useAuth()
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden">
      <button
        className="flex items-center gap-[5px] w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
        onClick={logout}
      >
        <RiLogoutCircleLine /> Logout
      </button>
      <button
        className="flex items-center gap-[5px] w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
        onClick={() => alert('Chat History')}
      >
        <FaHistory /> Chat History
      </button>
      <button
        className="flex items-center gap-[5px] w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
        onClick={() => alert('New Chat')}
      >
        <AiOutlineWechat /> New Chat
      </button>
    </div>
  );
};

export default Dropdown;
