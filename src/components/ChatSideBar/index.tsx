// src/components/ChatSideBar/index.tsx
import React from "react";
import "./styles.css";

interface User {
  username: string;
}

interface ChatSidebarProps {
  room: string;
  users: User[];
}

const ChatSideBar: React.FC<ChatSidebarProps> = ({ room, users }) => {
  console.log("ChatSideBar", room, JSON.stringify(users));
  return (
    <div className="chat-sidebar">
      <h3>
        <i className="fas fa-comments"></i> Sala: {room}
      </h3>
      <ul>
        {users.map((user, index) => (
          <li key={index} className="user-item">
            <span className="status-icon online"></span>
          {user.username}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatSideBar;
