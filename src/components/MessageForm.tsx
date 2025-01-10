'use client';
import React, { useState, SetStateAction, SyntheticEvent, useRef } from 'react';
import { FaRegPaperPlane } from 'react-icons/fa';
import { MessageType } from './Chatbox';
import { useRouter} from 'next/navigation';

interface MessageRoomProps {
  setMessages: SetStateAction<Function>;
  generateBotResponse: (history: MessageType[]) => void;
  messagesHistory: MessageType[];
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const MessageForm = ({
  setMessages,
  generateBotResponse,
  messagesHistory,
  isLoading,
  setIsLoading
}: MessageRoomProps) => {
  const [text, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const userMessage = inputRef?.current?.value?.trim();
    if (!userMessage) return;

    // Immediately set isLoading to true
    setIsLoading(true);

    // Clear input field
    if (inputRef.current) {
      inputRef.current.value = '';
    }

    // Add user message to the chat
    setMessages((ps: MessageType[]) => [
      ...ps,
      {
        text: userMessage,
        role: 'user',
      },
    ]);

    // Simulate the bot's "thinking" and generate a response
    setTimeout(() => {
      setMessages((ps: MessageType[]) => [
        ...ps,
        {
          text: 'Thinking...',
          role: 'model',
        },
      ]);

      // Generate bot response after a short delay
      generateBotResponse([
        ...messagesHistory,
        { text: userMessage, role: 'user' },
      ]);
    }, 600);
    
    // Clear message state after submit
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="px-5 py-2 flex justify-between items-center border rounded-[50px]">
        <input
          key="text-input" // Add a unique key
          className="bg-transparent flex-1 p-1 focus:outline-none"
          placeholder="Type your text"
          ref={inputRef}
          disabled={isLoading} // Disable input field when loading
        />
        {!isLoading && (
          <button type="submit">
            <FaRegPaperPlane />
          </button>
        )}
      </div>
    </form>
  );
};

export default MessageForm;
