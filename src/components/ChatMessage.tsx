'use client';
import React, { useEffect, useState, useRef } from 'react';
import { MessageType } from './Chatbox';
import { FaRobot } from 'react-icons/fa6';
import { FaCopy, FaCheck } from 'react-icons/fa6';
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
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const messageText = message.text || '';
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
    setDisplayedText('');
    setIsAnimationComplete(false);
    
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }

    if (message.role === 'model') {
      if (messageText === 'Thinking...') {
        let dotCount = 0;
        const interval = setInterval(() => {
          dotCount = (dotCount + 1) % 4;
          setDisplayedText('Thinking' + '.'.repeat(dotCount));
        }, 500);
        return () => clearInterval(interval);
      } else {
        const animateTyping = (index: number) => {
          if (index <= messageText.length) {
            setDisplayedText(messageText.slice(0, index));
            
            if (index === messageText.length) {
              setIsAnimationComplete(true);
              setIsLoading(false);
            } else {
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
      setDisplayedText(messageText);
      setIsAnimationComplete(true);
    }
  }, [message, messageText, setIsLoading]);

  useEffect(() => {
    if (hasCodeBlock && isAnimationComplete) {
      Prism.highlightAll();
    }
  }, [hasCodeBlock, isAnimationComplete, displayedText]);

  useEffect(() => {
    if (messageRoomRef.current && isUserAtBottom) {
      messageRoomRef.current.scrollTo({
        top: messageRoomRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [displayedText, isUserAtBottom]);

  const handleCopyCode = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const detectLanguage = (codeBlock: string): string => {
    // Extract language from code fence if present (e.g., ```python)
    const firstLine = codeBlock.split('\n')[0].trim().toLowerCase();
    if (firstLine) {
      // Common language aliases
      const languageMap: { [key: string]: string } = {
        'js': 'JavaScript',
        'ts': 'TypeScript',
        'py': 'Python',
        'rb': 'Ruby',
        'java': 'Java',
        'cpp': 'C++',
        'cs': 'C#',
        'php': 'PHP',
        'html': 'HTML',
        'css': 'CSS',
        'sql': 'SQL',
        'bash': 'Bash',
        'shell': 'Shell',
      };
      
      for (const [alias, fullName] of Object.entries(languageMap)) {
        if (firstLine.includes(alias)) {
          return fullName;
        }
      }
    }
    
    // Default to "Code" if language cannot be detected
    return "Code";
  };

  const renderContent = () => {
    if (!hasCodeBlock) {
      return <p className="whitespace-pre-wrap">{displayedText}</p>;
    }

    const segments = displayedText.split('```');
    return segments.map((segment, index) => {
      if (index % 2 === 0) {
        return <p key={index} className="whitespace-pre-wrap">{segment}</p>;
      } else {
        const language = detectLanguage(segment);
        const codeContent = segment.replace(/^.*\n/, ''); // Remove the language identifier line
        
        return (
          <div key={index} className="relative bg-[#2d2d2d] rounded-lg my-2">
            {/* Language badge and copy button container */}
            <div className="flex justify-between items-center px-4 py-2 bg-[#1e1e1e] rounded-t-lg border-b border-[#3d3d3d]">
              <span className="text-sm text-gray-300">{language}</span>
              <button
                onClick={() => handleCopyCode(codeContent, index)}
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                title="Copy code"
              >
                {copiedIndex === index ? (
                  <><FaCheck className="w-4 h-4" /> Copied!</>
                ) : (
                  <><FaCopy className="w-4 h-4" /> Copy</>
                )}
              </button>
            </div>
            {/* Code content */}
            <pre className="p-4 overflow-auto whitespace-pre-wrap font-mono text-sm">
              <code className="language-javascript">{codeContent}</code>
            </pre>
          </div>
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