// src/context/ChatContext.jsx
import React from 'react'; 
import { createContext, useContext, useEffect, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('chat');
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('chat', JSON.stringify(messages));
  }, [messages]);

  const addMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  const clearChat = () => setMessages([]);

  return (
    <ChatContext.Provider value={{ messages, addMessage, clearChat }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);

