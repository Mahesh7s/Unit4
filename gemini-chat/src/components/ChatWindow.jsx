// src/components/ChatWindow.jsx
import { useEffect, useRef } from 'react';
import { useChat } from '../context/ChatContext';
import MessageBubble from './MessageBubble';
import React from 'react'; 

const ChatWindow = () => {
  const { messages } = useChat();
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-white">
      {messages.map((msg, i) => (
        <MessageBubble key={i} message={msg} />
      ))}
      <div ref={endRef} />
    </div>
  );
};

export default ChatWindow;
