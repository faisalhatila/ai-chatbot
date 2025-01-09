import React from 'react'
import { MessageType } from './Chatbox';
import { FaRobot } from 'react-icons/fa6';

interface ChatMessageProps {
    message:MessageType;
}

const ChatMessage = ({message}:ChatMessageProps) => {
  return (
    <div className={`flex gap-[10px] items-center ${message.sendBy === 'user'? 'justify-end' : 'justify-start'}`}>
        {
            message.sendBy === 'bot' && <div className='w-[40px] h-[40px] rounded-[50%] flex items-center justify-center bg-[#420088]'>
                <FaRobot color='#fff' />
            </div>
        }
        <p className={`rounded p-2 w-[250px] ${message.sendBy === 'user' ?' bg-[#593BAB] text-[#fff]' :'bg-[#F6F2FF] text-black'}`}>{message.message}</p>
    </div>
  )
}

export default ChatMessage