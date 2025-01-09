// 'use client';
// // import React, { useEffect, useState } from 'react';
// // import { MessageType } from './Chatbox';
// // import { FaRobot } from 'react-icons/fa6';

// // interface ChatMessageProps {
// //   message: MessageType;
// //   messageRoomRef: React.RefObject<HTMLDivElement>;
// // }

// // const ChatMessage = ({ message,messageRoomRef }: ChatMessageProps) => {
// //   const [displayedText, setDisplayedText] = useState(message.text);

// //   useEffect(() => {
// //     if (messageRoomRef.current) {
// //       messageRoomRef.current?.scrollTo({
// //         top: messageRoomRef.current?.scrollHeight,
// //         behavior: 'smooth',
// //       });
// //     }
// //   }, [displayedText]);

// //   useEffect(() => {
// //     // Handle "Thinking..." animation
// //     if (message.role === 'model' && message.text === 'Thinking...') {
// //       let dotCount = 0;
// //       const dotsAnimation = setInterval(() => {
// //         dotCount = (dotCount + 1) % 4; // Cycle through 0 to 3 dots
// //         setDisplayedText('Thinking' + '.'.repeat(dotCount));
// //       }, 500);
// //       return () => clearInterval(dotsAnimation);
// //     }

// //     // Handle typing animation for model's messages (excluding "Thinking...")
// //     if (message.role === 'model' && message.text !== 'Thinking...') {
// //       let currentIndex = -1;
// //       const fullMessage = message.text; // Use the full text from props
// //       setDisplayedText(''); // Reset displayed text for animation
// //       const typingAnimation = setInterval(() => {
// //         if (currentIndex < fullMessage.length - 1) {
// //           setDisplayedText((prev) => prev + fullMessage[currentIndex]);
// //           currentIndex++;
// //         } else {
// //           clearInterval(typingAnimation);
// //         }
// //       }, 50); // Adjust speed of typing animation
// //       return () => clearInterval(typingAnimation);
// //     }

// //     // Default case for static messages
// //     setDisplayedText(message.text);
// //   }, [message]);

// //   return (
// //     <div
// //       className={`flex gap-[10px] items-start ${
// //         message.role === 'user' ? 'justify-end' : 'justify-start'
// //       }`}
// //     >
// //       {message.role === 'model' && (
// //         <div className="w-[40px] h-[40px] rounded-[50%] flex items-center justify-center bg-[#420088]">
// //           <FaRobot color="#fff" />
// //         </div>
// //       )}
// //       <p
// //         className={`rounded p-2 w-[250px] break-words whitespace-normal overflow-hidden ${
// //           message.role === 'user'
// //             ? 'bg-[#593BAB] text-[#fff]'
// //             : 'bg-[#F6F2FF] text-black'
// //         }`}
// //       >
// //         {displayedText}
// //       </p>
// //     </div>
// //   );
// // };

// // export default ChatMessage;

// 'use client';
// import React, { useEffect, useState } from 'react';
// import { MessageType } from './Chatbox';
// import { FaRobot } from 'react-icons/fa6';

// interface ChatMessageProps {
//   message: MessageType;
//   messageRoomRef: React.RefObject<HTMLDivElement>;
// }

// const ChatMessage = ({ message, messageRoomRef }: ChatMessageProps) => {
//   const [displayedText, setDisplayedText] = useState(message.text);
//   const isCode = message.text.includes('```'); // Check if the message contains code (multiline code block)

//   useEffect(() => {
//     if (messageRoomRef.current) {
//       messageRoomRef.current?.scrollTo({
//         top: messageRoomRef.current?.scrollHeight,
//         behavior: 'smooth',
//       });
//     }
//   }, [displayedText]);

//   useEffect(() => {
//     // Handle "Thinking..." animation
//     if (message.role === 'model' && message.text === 'Thinking...') {
//       let dotCount = 0;
//       const dotsAnimation = setInterval(() => {
//         dotCount = (dotCount + 1) % 4; // Cycle through 0 to 3 dots
//         setDisplayedText('Thinking' + '.'.repeat(dotCount));
//       }, 500);
//       return () => clearInterval(dotsAnimation);
//     }

//     // Handle typing animation for model's messages (excluding "Thinking...")
//     if (message.role === 'model' && message.text !== 'Thinking...') {
//       let currentIndex = -1;
//       const fullMessage = message.text; // Use the full text from props
//       setDisplayedText(''); // Reset displayed text for animation
//       const typingAnimation = setInterval(() => {
//         if (currentIndex < fullMessage.length - 1) {
//           setDisplayedText((prev) => prev + fullMessage[currentIndex]);
//           currentIndex++;
//         } else {
//           clearInterval(typingAnimation);
//         }
//       }, 50); // Adjust speed of typing animation
//       return () => clearInterval(typingAnimation);
//     }

//     // Default case for static messages
//     setDisplayedText(message.text);
//   }, [message]);

//   return (
//     <div
//       className={`flex gap-[10px] items-start ${
//         message.role === 'user' ? 'justify-end' : 'justify-start'
//       }`}
//     >
//       {message.role === 'model' && (
//         <div className="w-[40px] h-[40px] rounded-[50%] flex items-center justify-center bg-[#420088]">
//           <FaRobot color="#fff" />
//         </div>
//       )}
      
//       {/* Check if the message contains code and render accordingly */}
//       <div
//         className={`p-2 rounded w-[250px] break-words overflow-hidden ${
//           message.role === 'user' ? 'bg-[#593BAB] text-[#fff]' : 'bg-[#F6F2FF] text-black'
//         }`}
//       >
//         {/* Render the message content */}
//         {isCode ? (
//           <pre className="bg-black text-white p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono text-sm">
//             <code>{displayedText}</code>
//           </pre>
//         ) : (
//           <p>{displayedText}</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatMessage;

'use client';
import React, { useEffect, useState, useRef } from 'react';
import { MessageType } from './Chatbox';
import { FaRobot } from 'react-icons/fa6';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // This theme gives a nice dark background with colored syntax

interface ChatMessageProps {
  message: MessageType;
  messageRoomRef: React.RefObject<HTMLDivElement>;
  setIsLoading:(val:boolean) => void;
}

const ChatMessage = ({ message, messageRoomRef,setIsLoading }: ChatMessageProps) => {
  const [displayedText, setDisplayedText] = useState(message.text);
  const isCode = message.text.includes('```'); // Check if the message contains code (multiline code block)

  const [isUserAtBottom, setIsUserAtBottom] = useState(true); // Track if the user is at the bottom
  const lastScrollTop = useRef(0); // Store the last scroll position

  useEffect(() => {
    // Detect if the user is at the bottom or has scrolled up
    const handleScroll = () => {
      if (messageRoomRef.current) {
        const scrollTop = messageRoomRef.current.scrollTop;
        const scrollHeight = messageRoomRef.current.scrollHeight;
        const clientHeight = messageRoomRef.current.clientHeight;

        // Check if the user is at the bottom or has scrolled up
        setIsUserAtBottom(scrollHeight - scrollTop === clientHeight);
      }
    };

    // Attach scroll event listener to track the scroll position
    messageRoomRef.current?.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on unmount
    return () => {
      if (messageRoomRef.current) {
        messageRoomRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [messageRoomRef]);

  useEffect(() => {
    // Handle "Thinking..." animation
    if (message.role === 'model' && message.text === 'Thinking...') {
      let dotCount = 0;
      const dotsAnimation = setInterval(() => {
        dotCount = (dotCount + 1) % 4; // Cycle through 0 to 3 dots
        setDisplayedText('Thinking' + '.'.repeat(dotCount));
      }, 500);
      return () => clearInterval(dotsAnimation);
    }

    // Handle typing animation for model's messages (excluding "Thinking...")
    if (message.role === 'model' && message.text !== 'Thinking...') {
      let currentIndex = -1;
      const fullMessage = message.text; // Use the full text from props
      setDisplayedText(''); // Reset displayed text for animation
      const typingAnimation = setInterval(() => {
        if (currentIndex < fullMessage.length - 1) {
          setDisplayedText((prev) => prev + fullMessage[currentIndex]);
          currentIndex++;
          if(currentIndex >= fullMessage.length - 1){
            setIsLoading(false)
          }
        } else {
          clearInterval(typingAnimation);
        }
      }, 30); // Adjust speed of typing animation
      return () => clearInterval(typingAnimation);
    }

    // Default case for static messages
    setDisplayedText(message.text);
  }, [message]);

  // Call Prism.js to highlight the code block
  useEffect(() => {
    if (isCode) {
      Prism.highlightAll(); // Highlight all code blocks in the component
    }
  }, [displayedText, isCode]);

  // Auto-scroll logic
  useEffect(() => {
    if (messageRoomRef.current) {
      if (isUserAtBottom) {
        messageRoomRef.current.scrollTo({
          top: messageRoomRef.current.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, [displayedText, isUserAtBottom]);

  return (
    <div
      className={`flex gap-[10px] items-start ${
        message.role === 'user' ? 'justify-end' : 'justify-start'
      }`}
    >
      {message.role === 'model' && (
        <div className="w-[40px] h-[40px] rounded-[50%] flex items-center justify-center bg-[#420088]">
          <FaRobot color="#fff" />
        </div>
      )}
      
      {/* Check if the message contains code and render accordingly */}
      <div
        className={`p-2 rounded w-[250px] break-words overflow-hidden ${
          message.role === 'user' ? 'bg-[#593BAB] text-[#fff]' : 'bg-[#F6F2FF] text-black'
        }`}
      >
        {/* Render the message content */}
        {isCode ? (
          <pre className="bg-[#2d2d2d] text-white p-4 rounded-lg overflow-auto whitespace-pre-wrap font-mono text-sm">
            <code className="language-javascript">{displayedText}</code>
          </pre>
        ) : (
          <p>{displayedText}</p>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
