// src/components/ChatMessage/index.tsx
import React from "react";
import "./styles.css";

interface Message {
  username: string;
  text: string;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className="message">
      <div className="balloon">
        <p className="meta">{message.username}</p>
        <p className="text">{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
