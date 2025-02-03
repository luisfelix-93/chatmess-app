import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faComments, faUsers, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Message from "../../components/Message";
import UserList from "../../components/UsersList";
import './Chat.module.css';

export default function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const { state } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if(!state?.username || !state?.room) {
            navigate('/');
        }
        // implementar conexão com socket
    }, [state, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim()) {
            // enviar mensagem para o servidor
            setMessage('');
        }
    };
    return(
        <div className="chat-container">
            <header className="chat-header">
                <h1><FontAwesomeIcon icon={faSmile}/>ChatMess</h1>
                <button className="btn" onClick={() => navigate('/')}>Leave Room</button>
            </header>
            <main className="chat-main">
                <div className="chat-sidebar">
                    <h3><FontAwesomeIcon icon={faComments} /> Room Name:</h3>
                    <h2>{state?.room}</h2>
                    <h3><FontAwesomeIcon icon={faUsers} /> Users</h3>
                    <UserList users={users} />
                </div>
                <div className="chat-messages">
                    {messages.map((msg, i) => (
                    <Message key={i} message={msg} />
                    ))}
                </div>
            </main>
            <div className="chat-form-container">
                <form onSubmit={handleSubmit}>
                    <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter Message"
                    required
                    />
                    <button className="btn"><FontAwesomeIcon icon={faPaperPlane} /></button>
                </form>
            </div>
        </div>
    );
}