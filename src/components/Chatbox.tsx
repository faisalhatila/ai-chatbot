"use client"
import React, { useState } from 'react';
import ChatBotHeader from './ChatBotHeader';
import MessageRoom from './MessageRoom';
import MessageForm from './MessageForm';

const Chatbox = () => {
  const [messages,setMessages] = useState([]);
  return (
    <div className="min-h-[100vh] bg-[#fff9f9] flex items-center justify-center">
      <div className="w-[350px] flex flex-col border rounded-[10px] h-[600px] overflow-hidden">
        <ChatBotHeader />
        <MessageRoom messages={messages} />
        <div className="p-2">
          <MessageForm setMessages={setMessages} />
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
