// src/components/ChatInput.jsx
import React from 'react'; 
import { useState } from 'react';
import { useChat } from '../context/ChatContext';
import { fetchGeminiResponse } from '../utils/geminiAPI';

const ChatInput = () => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const { addMessage } = useChat();

  const handleSend = async () => {
    if (!text.trim()) return;
    const userMsg = { role: 'user', text };
    addMessage(userMsg);
    setText('');
    setLoading(true);

    try {
      const aiReply = await fetchGeminiResponse(text);
      addMessage({ role: 'assistant', text: aiReply });
    } catch {
      addMessage({ role: 'assistant', text: '❌ Error fetching response' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex p-4 border-t">
      <input
        className="flex-1 border px-4 py-2 rounded mr-2"
        placeholder="Ask something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        disabled={loading}
      />
      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? '...' : 'Send'}
      </button>
    </div>
  );
};

export default ChatInput;
