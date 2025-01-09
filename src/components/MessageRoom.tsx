import React from 'react';
import ChatMessage from './ChatMessage';
import { MessageType } from './Chatbox';
interface MessageRoomProps {
    messages: MessageType[]
}
const MessageRoom = ({messages}:MessageRoomProps) => {
  return (
    <div className="flex-1 px-2 pt-3">
      <div className="h-[460px] overflow-auto">
        {
            messages.map((msg,index) => (
                <ChatMessage message={msg} key={index} />
            ))
        }
      </div>
    </div>
  );
};

export default MessageRoom;
