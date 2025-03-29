import React from "react";
import './styles.css';
interface User {
    username: string;
}

interface ChatSideProps {
    room: string;
    users: User[];
}

const ChatSideBar: React.FC<ChatSideProps> = ({ room, users}) => {
    return (
        <div className="chat-side">
            <h3>
                <i className="fas fa-comments"></i> Sala: {room}
            </h3>
            <ul id="users">
                {users.map((user, index) => (
                    <li key={index}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default ChatSideBar;