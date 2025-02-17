'use client';
import React, { SyntheticEvent, useRef } from 'react';
import { FaRegPaperPlane } from 'react-icons/fa';
import { MessageType } from './Chatbox';
import { useAuth } from '@/app/context/AuthContext';
import { ChatService } from '@/utils/ChatService';

interface MessageRoomProps {
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>; // Explicitly typed
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
  setIsLoading,
}: MessageRoomProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { attemptsLeft } = useAuth();
  const chatService = new ChatService();

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
  };

  const isInputDisabled =
    isLoading || attemptsLeft === 0 || attemptsLeft === null;

  return (
    <form onSubmit={handleSubmit}>
      <div className="px-5 py-2 flex justify-between items-center border rounded-[50px]">
        <input
          key="text-input"
          className="bg-transparent flex-1 p-1 focus:outline-none"
          placeholder="Type your text"
          ref={inputRef}
          disabled={isInputDisabled} // Disable input based on conditions
        />
        {!isInputDisabled && ( // Hide button if input is disabled
          <button type="submit">
            <FaRegPaperPlane />
          </button>
        )}
      </div>
      {attemptsLeft === 0 && (
        <p className="text-red-500 text-sm mt-2 text-center">
          You have no attempts left. Please try again later.
        </p>
      )}
      {attemptsLeft === null && (
        <p className="text-yellow-500 text-sm mt-2">
          Attempt information is currently unavailable. Please try again later.
        </p>
      )}
    </form>
  );
};

export default MessageForm;
