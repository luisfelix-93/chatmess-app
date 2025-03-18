import QueryString from "qs";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { io, Socket } from "socket.io-client";

interface Message {
    username: string;
    room: string;
    text: string;
}

interface User {
    username: string;
}

const ENDPOINT = "http://localhost:3000"

let socket: Socket;

const Chat: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [room, setRoom] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const chatMessagesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        //Recupera os parâmetros da URL
        const { username, room } = QueryString.parse(location.search, {
            ignoreQueryPrefix: true,
        }) as {username: string, room: string};

        setUsername(username);
        setRoom(room);

        // Inicia a conexão com o socket
        socket = io(ENDPOINT);

        socket.emit('joinRoom', username, room);

        // Desconecta o socket ao desmontar o component
        return () => {
            socket.disconnect();
        };
    }, [location.search]);

    useEffect(() => {
        // Recebe as mensagens do servidor
        socket.on('message', (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message])
            if (chatMessagesRef.current) {
                chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
            }            
        });

        // Atualiza a sala e os usuáarios
        socket.on('roomUsers', ({ room, users }: { room: string; users: User[] }) => {
            setRoom(room);
            setUsers(users);
        });

        return () => {
            socket.off('message');
            socket.off('roomUsers');
        }
    }, [])

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            // Envie o objeto completo de mensagem
            socket.emit('chatMessage', {
                username: username,
                room: room,
                text: message
            });
            // Limpe o campo de mensagem
            setMessage('');
        }
    };

    const handleLeave = () => {
        if (window.confirm('Tem certeza que quer deixar a sala de chat')) {
            navigate('/');
        }
    };
    return (
        <div className="chat-container">
            <header className="chat-header">
                <h1>
                    <i className="fas fa-smile">ChatMess</i>
                </h1>
                <button onClick={handleLeave} id="leave-btn" className="btn">
                    Deixar Sala
                </button>
            </header>
            <main className="chat-main">
                <div className="chat-sidebar">
                    <h3>
                        <i className="fas fa-comments"></i> Sala:
                    </h3>
                    <ul id="users">
                        {users.map((user, index) => (
                            <li key={index}>{user.username}</li>
                        ))}
                    </ul>
                </div>
                <div className="chat-message" ref={chatMessagesRef}>
                {messages.map((msg, index) => (
                    <div key={index} className="message">
                        <p className="meta">
                            {msg.username}
                        </p>
                        <p className="text">{msg.text}</p>
                    </div>
                ))}
                </div>
            </main>
            <div className="chat-form-container">
                <form id="chat-form" onSubmit={sendMessage}>
                    <input
                        id="msg"
                        type="text"
                        placeholder="Enter Message"
                        required
                        autoComplete="off"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                <button className="btn">
                    <i className="fas fa-paper-plane"></i> Send
                </button>
                </form>
            </div>
        </div>
    )
}

export default Chat;