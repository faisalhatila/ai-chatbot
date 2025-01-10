'use client';
import React, { useEffect, useState, useRef } from 'react';
import { MessageType } from './Chatbox';
import { FaRobot } from 'react-icons/fa6';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';

interface ChatMessageProps {
  message: MessageType;
  messageRoomRef: React.RefObject<HTMLDivElement | null>;
  setIsLoading: (val: boolean) => void;
}

const ChatMessage = ({ message, messageRoomRef, setIsLoading }: ChatMessageProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const [isUserAtBottom, setIsUserAtBottom] = useState(true);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const messageText = message.text || ''; // Ensure messageText is never undefined

  // Detect if message contains code blocks
  const hasCodeBlock = messageText.includes('```');
  
  useEffect(() => {
    const handleScroll = () => {
      if (messageRoomRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = messageRoomRef.current;
        setIsUserAtBottom(Math.abs(scrollHeight - scrollTop - clientHeight) < 10);
      }
    };

    messageRoomRef.current?.addEventListener('scroll', handleScroll);
    return () => messageRoomRef.current?.removeEventListener('scroll', handleScroll);
  }, [messageRoomRef]);

  useEffect(() => {
    // Reset state when message changes
    setDisplayedText('');
    setIsAnimationComplete(false);
    
    // Cleanup previous animation
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }

    if (message.role === 'model') {
      if (messageText === 'Thinking...') {
        // Handle thinking animation
        let dotCount = 0;
        const interval = setInterval(() => {
          dotCount = (dotCount + 1) % 4;
          setDisplayedText('Thinking' + '.'.repeat(dotCount));
        }, 500);
        return () => clearInterval(interval);
      } else {
        // Improved typing animation
        const animateTyping = (index: number) => {
          if (index <= messageText.length) {
            setDisplayedText(messageText.slice(0, index));
            
            if (index === messageText.length) {
              setIsAnimationComplete(true);
              setIsLoading(false);
            } else {
              // Calculate delay based on character type
              const delay = messageText[index - 1] === '\n' ? 100 : 30;
              animationRef.current = setTimeout(() => animateTyping(index + 1), delay);
            }
          }
        };

        animateTyping(0);
        return () => {
          if (animationRef.current) {
            clearTimeout(animationRef.current);
          }
        };
      }
    } else {
      // For user messages, show immediately
      setDisplayedText(messageText);
      setIsAnimationComplete(true);
    }
  }, [message, messageText, setIsLoading]);

  // Syntax highlighting
  useEffect(() => {
    if (hasCodeBlock && isAnimationComplete) {
      Prism.highlightAll();
    }
  }, [hasCodeBlock, isAnimationComplete, displayedText]);

  // Scroll handling
  useEffect(() => {
    if (messageRoomRef.current && isUserAtBottom) {
      messageRoomRef.current.scrollTo({
        top: messageRoomRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [displayedText, isUserAtBottom]);

  // Process code blocks
  const renderContent = () => {
    if (!hasCodeBlock) {
      return <p className="whitespace-pre-wrap">{displayedText}</p>;
    }

    const segments = displayedText.split('```');
    return segments.map((segment, index) => {
      if (index % 2 === 0) {
        return <p key={index} className="whitespace-pre-wrap">{segment}</p>;
      } else {
        return (
          <pre key={index} className="bg-[#2d2d2d] text-white p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono text-sm my-2">
            <code className="language-javascript">{segment}</code>
          </pre>
        );
      }
    });
  };

  return (
    <div className={`flex gap-[10px] items-start ${
      message.role === 'user' ? 'justify-end' : 'justify-start'
    }`}>
      {message.role === 'model' && (
        <div className="w-[40px] h-[40px] rounded-[50%] flex items-center justify-center bg-[#420088] flex-shrink-0">
          <FaRobot color="#fff" />
        </div>
      )}
      
      <div className={`p-2 rounded max-w-[80%] break-words ${
        message.role === 'user' ? 'bg-[#593BAB] text-[#fff]' : 'bg-[#F6F2FF] text-black'
      }`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default ChatMessage;