import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import { MessageType } from './Chatbox';
interface MessageRoomProps {
  messages: MessageType[];
  setIsLoading:(val:boolean) => void;
}
const MessageRoom = ({ messages,setIsLoading }: MessageRoomProps) => {
  const messageRoomRef:any = useRef(null);
  useEffect(() => {
    if (messageRoomRef.current) {
      messageRoomRef.current?.scrollTo({
        top: messageRoomRef.current?.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  return (
    <div className="flex-1 px-2 pt-3">
      <div
        ref={messageRoomRef}
        className="h-[460px] overflow-auto flex flex-col gap-[10px]"
      >
        {messages.map((msg, index) => (
          <ChatMessage setIsLoading={setIsLoading} message={msg} key={index} messageRoomRef={messageRoomRef}  />
        ))}
      </div>
    </div>
  );
};

export default MessageRoom;
