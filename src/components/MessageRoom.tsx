import React, { useEffect, useRef, useState } from 'react';
import ChatMessage from './ChatMessage';
import { MessageType } from './Chatbox';
import { useAuth } from '@/app/context/AuthContext';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { motion } from 'framer-motion';

interface MessageRoomProps {
  messages: MessageType[];
  setIsLoading: (val: boolean) => void;
}
const MessageRoom = ({ messages, setIsLoading }: MessageRoomProps) => {
  const messageRoomRef: any = useRef(null);
  const [isDisplayPopup, setIsDisplayPopup] = useState(false);
  useEffect(() => {
    if (messageRoomRef.current) {
      messageRoomRef.current?.scrollTo({
        top: messageRoomRef.current?.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  const { attemptsLeft } = useAuth();
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDisplayPopup(true);
    }, 800);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const handleClosePopup = () => {
    setIsDisplayPopup(false);
  };


  return (
    <div className="flex-1 px-2 pt-3">
      {isDisplayPopup && (
        <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-center">
          <div className="fixed z-10 bg-[#ffff90] text-black text-[14px] px-2 py-1 flex items-center gap-[5px] bg-opacity-95">
            ({attemptsLeft}) in header shows attempts left for today
            <IoMdCloseCircleOutline
              onClick={handleClosePopup}
              className="cursor-pointer"
            />
          </div>
        </div>
      </motion.div>
      )}

      <div
        ref={messageRoomRef}
        className="h-[460px] overflow-auto flex flex-col gap-[10px]"
      >
        {messages.map((msg, index) => (
          <ChatMessage
            setIsLoading={setIsLoading}
            message={msg}
            key={index}
            messageRoomRef={messageRoomRef}
          />
        ))}
      </div>
    </div>
  );
};

export default MessageRoom;
