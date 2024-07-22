'use client';

import React, { useState } from 'react';
import axios from 'axios';
import ChatMessage, { formatText } from './ChatMessage';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const predefinedPrompts = [
    "What could be causing my headache?",
    "Why do I have a sore throat?",
    "What are the symptoms of the flu?",
    "Why am I feeling dizzy?",
    "What can cause chest pain?",
    "Why do I have a fever?",
    "What are the symptoms of COVID-19?",
    "Why do I have stomach pain?",
    "What are common allergy symptoms?",
    "Why do I feel tired all the time?"
  ];

  const handleSendMessage = async () => {
    if (!input) return;
    const newMessages = [...messages, { type: 'user', text: input }];
    setMessages(newMessages);

    try {
      const response = await axios.post('/api/chat', { message: input });
      setMessages([...newMessages, { type: 'bot', text: response.data.reply }]);
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setInput('');
  };

  const handlePromptClick = (prompt) => {
    setInput(prompt);
  };

  return (
    <>
    <div style={{ maxWidth: '1000px', margin: 'auto', padding: '2rem' }}>
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
      Symptom Checker Chatbot
    </h1>
      <div className='m-4'>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight"> Predefined Prompts:</h3>
        <ul className="my-6 ml-6 list-disc flex flex-wrap">
        {predefinedPrompts.map((prompt, index) => (
            <li 
            key={index} 
            onClick={() => handlePromptClick(prompt)} 
            style={{ 
                cursor: 'pointer', 
                color: 'blue', 
                marginBottom: '0.5rem', 
                flex: '0 0 calc(50% - 1rem)',
                marginRight: '1rem' 
            }}
            >
            {prompt}
            </li>
        ))}
        </ul>

      </div>
      <div className='flex flex-row'>
      <Textarea 
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <Button className="px-12 py-6 ml-4" onClick={handleSendMessage} >Send</Button>
      </div>
      <div className="border border-gray-300 p-4 rounded-lg mt-4 h-96 w-full overflow-y-scroll text-black bg-white shadow-lg">
        {messages.map((msg, index) => (
          <ChatMessage key={index} type={msg.type} text={msg.text} />
        ))}
      </div>
    </div>
    </>
  );
};

export default ChatBot;
