// src/components/MessageBubble.jsx
import React from 'react'; 
const MessageBubble = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg shadow ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
        }`}
      >
        {message.text}
      </div>
    </div>
  );
};

export default MessageBubble;
