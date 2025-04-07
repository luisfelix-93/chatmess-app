import QueryString from "qs";
import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './styles.css'
import { io, Socket } from "socket.io-client";
import ChatSideBar from "../../components/ChatSideBar";
import ChatMessage from "../../components/ChatMessage";

interface Message {
    username: string;
    room?: string;
    text: string;
}

interface User {
    username: string;
}

const ENDPOINT = process.env.URL_WEB_SOCKET || "http://localhost:3001"


const Chat: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [room, setRoom] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const chatMessagesRef = useRef<HTMLDivElement>(null);

    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        //Recupera os parâmetros da URL
        const { username, room } = QueryString.parse(location.search, {
            ignoreQueryPrefix: true,
        }) as {username: string, room: string};

        setUsername(username);
        setRoom(room);

        // Recupera ou gera um UUID único para o usuário


        // Inicia a conexão com o socket
        socketRef.current = io(ENDPOINT);

        socketRef.current.emit('joinRoom', username, room);

        // Desconecta o socket ao desmontar o component
        return () => {
            socketRef.current?.disconnect();
        };
    }, [location.search]);

    useEffect(() => {
        // Recebe as mensagens do servidor
        socketRef.current?.on('message', (message: Message) => {
            setMessages((prevMessages) => [...prevMessages, message])
            if (chatMessagesRef.current) {
                chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
            }            
        });

        // Atualiza a sala e os usuáarios
        socketRef.current?.on('roomUsers', ({ room, users }: { room: string; users: User[] }) => {
            setRoom(room);
            setUsers(users);
        });

        return () => {
            socketRef.current?.off('message');
            socketRef.current?.off('roomUsers');
        }
    }, [])

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (message.trim()) {
            // Envie o objeto completo de mensagem
            socketRef.current?.emit('chatMessage', {
                username: username,
                room: room,
                text: message
            });
            // Limpe o campo de mensagem
            setMessage('');
        }
    };

    console.log('Chat', room, JSON.stringify(users));

    const handleLeave = () => {
        if (window.confirm('Tem certeza que quer deixar a sala de chat')) {
            navigate('/');
        }
        socketRef.current?.emit('onDisconnect', username, room);
        socketRef.current?.disconnect();
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
                <ChatSideBar room={room} users={users} />
                <div className="chat-messages" ref={chatMessagesRef}>
                    {messages.map((message, index) => (
                        <ChatMessage key={index} message={message} />
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