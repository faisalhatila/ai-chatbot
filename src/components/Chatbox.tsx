import React from 'react';
import ChatBotHeader from './ChatBotHeader';
import MessageRoom from './MessageRoom';
import MessageForm from './MessageForm';

const Chatbox = () => {
  return (
    <div className="min-h-[100vh] bg-[#fff9f9] flex items-center justify-center">
      <div className="w-[350px] flex flex-col border rounded-[10px] h-[600px] overflow-hidden">
        <ChatBotHeader />
        <MessageRoom />
        <div className='p-2'>
        <MessageForm />
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
