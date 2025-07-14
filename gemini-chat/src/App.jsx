// src/App.jsx
import React from 'react'; 
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import { ChatProvider } from './context/ChatContext';

function App() {
  return (
    <ChatProvider>
      <div className="max-w-md mx-auto h-screen flex flex-col border rounded shadow bg-gray-100">
        <header className="p-4 bg-blue-600 text-white text-center text-lg font-bold">
          Gemini Chat
        </header>
        <ChatWindow />
        <ChatInput />
      </div>
    </ChatProvider>
  );
}

export default App;
