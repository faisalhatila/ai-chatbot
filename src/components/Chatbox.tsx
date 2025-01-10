'use client';
import React, { useState } from 'react';
import ChatBotHeader from './ChatBotHeader';
import MessageRoom from './MessageRoom';
import MessageForm from './MessageForm';
import { useAuth } from '@/app/context/AuthContext';
import { updateAttempts } from '@/utils/makeAttempt';

export type MessageType = {
  text: string;
  role: string;
};

const Chatbox = () => {
  const {
    fullName,
    attemptsLeft,
    setAttemptsLeft
  } = useAuth();
  const [messagesHistory, setMessagesHistory] = useState<MessageType[]>([
    {
      text: `Hi ${fullName}, How may I help you?`,
      role: 'model',
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateBotResponse = async (history: MessageType[]) => {
    const updateHistory = (text: string) => {
      setMessagesHistory((ps) => [
        ...ps.filter((msg) => msg.text !== 'Thinking...'),
        { role: 'model', text },
      ]);
    };
    const formattedHistory = history.map(({ role, text }) => ({
      role,
      parts: [{ text }],
    }));
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: formattedHistory }),
    };
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error('API URL is not defined in environment variables.');
      }
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message || 'Something went wrong!');
      }

      const apiResponseText = data.candidates[0].content.parts[0].text
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .trim();
      updateHistory(apiResponseText);
      updateAttempts().then(() => {
        setAttemptsLeft(attemptsLeft && attemptsLeft -1)
      })
    } catch (error) {
      console.log({ error });
      setIsLoading(false); // Turn off loading if there was an error
    }
  };

  return (
    <div className="min-h-[100vh] bg-[#fff9f9] flex items-center justify-center">
      <div className="w-[350px] flex flex-col border rounded-[10px] overflow-hidden">
        <ChatBotHeader />
        <MessageRoom setIsLoading={setIsLoading} messages={messagesHistory} />
        <div className="p-2">
          <MessageForm
            messagesHistory={messagesHistory}
            generateBotResponse={generateBotResponse}
            setMessages={setMessagesHistory}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
