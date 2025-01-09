import React from 'react';
import { FaRobot, FaAngleDown } from 'react-icons/fa6';

const ChatBotHeader = () => {
  return (
    <div className="text-[#fff] bg-[#420088] flex justify-between items-center px-5 py-2">
      <div className="flex items-center gap-3">
        <FaRobot size={35} />
        <p className="text-[20px]">
          <strong>Chatbot</strong>
        </p>
      </div>
      <div>
        <FaAngleDown size={20} />
      </div>
    </div>
  );
};

export default ChatBotHeader;
