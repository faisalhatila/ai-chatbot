"use client"
import React, { useState } from 'react';
import ChatBotHeader from './ChatBotHeader';
import MessageRoom from './MessageRoom';
import MessageForm from './MessageForm';

export type MessageType = {
    message: string;
    sendBy:string
}

const Chatbox = () => {
  const [messagesHistory,setMessageHistory] = useState<MessageType[]>([
    {
        message:"How may I help you?",
        sendBy:'bot'
    },
  ]);
  return (
    <div className="min-h-[100vh] bg-[#fff9f9] flex items-center justify-center">
      {/* <div className="w-[350px] flex flex-col border rounded-[10px] h-[550px] overflow-hidden"> */}
      <div className="w-[350px] flex flex-col border rounded-[10px] overflow-hidden">
        <ChatBotHeader />
        <MessageRoom messages={messagesHistory} />
        <div className="p-2">
          <MessageForm setMessages={setMessageHistory} />
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
