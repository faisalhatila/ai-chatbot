import React from 'react';
interface MessageRoomProps {
    messages: string[]
}
const MessageRoom = ({messages}:MessageRoomProps) => {
  return (
    <div className="flex-1 px-2 pt-3">
      <div className="h-[100%]">
        {
            messages.map((msg,index) => (
                <p key={index}>{msg}</p>
            ))
        }
      </div>
    </div>
  );
};

export default MessageRoom;
