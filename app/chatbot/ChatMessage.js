import React from 'react';

const ChatMessage = ({ type, text }) => (
  <div style={{ textAlign: type === 'user' ? 'right' : 'left', margin: '10px 0' }}>
    <p className="leading-7 [&:not(:first-child)]:mt-6"> <strong>{type === 'user' ? 'You' : 'Bot'}:</strong> {text}</p>
  </div>
);

export default ChatMessage;
