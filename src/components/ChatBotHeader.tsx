import { useAuth } from '@/app/context/AuthContext';
import React, { useEffect } from 'react';
import { FaRobot, FaAngleDown } from 'react-icons/fa6';

const ChatBotHeader = () => {
  const {
    attemptsLeft,
  } = useAuth();

  useEffect(() => {
    if(attemptsLeft === null ){
      window.location.reload();
    }
  },[])
  return (
    <div className="bg-[#420088] flex justify-between items-center px-5 py-3">
      <div className="flex items-center gap-3">
        <div className='w-[30px] h-[30px] rounded-[50%] flex justify-center items-center bg-[#fff]'>
        <FaRobot color='#420088' size={20} />
        </div>
        <p className="text-[20px] text-white flex gap-[5px]">
          <strong>Chatbot </strong> - <label className=''>({attemptsLeft})</label>
        </p>
      </div>
      <div>
        <FaAngleDown color='#fff' size={20} />
      </div>
    </div>
  );
};

export default ChatBotHeader;
