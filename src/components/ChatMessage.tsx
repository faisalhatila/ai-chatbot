import React from 'react'
import { MessageType } from './Chatbox';

interface ChatMessageProps {
    message:MessageType;
}

const ChatMessage = ({message}:ChatMessageProps) => {
  return (
    <div className='bg-[#ccc]'>{message.message}</div>
  )
}

export default ChatMessage