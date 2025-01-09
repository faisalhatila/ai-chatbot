'use client';
import React, { useState } from 'react';
import { FaRegPaperPlane } from 'react-icons/fa';

const MessageForm = () => {
  const [message, setMessage] = useState('');
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    alert('Hellow world');
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="px-5 py-2 flex justify-between items-center border rounded-[50px]">
        <input
          key="message-input" // Add a unique key
          className="bg-transparent flex-1 p-1"
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
