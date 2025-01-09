'use client';
import React, { useState, SetStateAction, SyntheticEvent } from 'react';
import { FaRegPaperPlane } from 'react-icons/fa';

interface MessageRoomProps {
  setMessages: SetStateAction<Function>;
}

const MessageForm = ({ setMessages }: MessageRoomProps) => {
  const [message, setMessage] = useState('');
  const handleSubmit = (e: SyntheticEvent) => {
    console.log({ e });
    e.preventDefault();
    // alert('Hellow world');
    setMessages((ps: string[]) => [...ps,{
        message,
        sendBy:'user'
    }])
    setMessage('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="px-5 py-2 flex justify-between items-center border rounded-[50px]">
        <input
          key="message-input" // Add a unique key
          className="bg-transparent flex-1 p-1 focus:outline-none"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">
          <FaRegPaperPlane />
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
