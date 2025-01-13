import React from 'react';

const Dropdown = () => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden">
      <button
        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
        onClick={() => alert('Logout')}
      >
        Logout
      </button>
      <button
        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
        onClick={() => alert('Chat History')}
      >
        Chat History
      </button>
      <button
        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
        onClick={() => alert('New Chat')}
      >
        New Chat
      </button>
    </div>
  );
};

export default Dropdown;
