import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Join: React.FC = () => {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('Javascript');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        //redireciona para a pagina de chat com os parâmetros na query string
        navigate(`/chat?username=${encodeURIComponent(username)}&room=${encodeURIComponent(room)}`);
    };

    return (
        <div className="join-container">
            <header className="join-header">
                <h1>
                    <i className="fas fa-smile"></i> ChatMess
                </h1>
            </header>
            <main className="join-main">
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label htmlFor="username">Nome do Usuário</label>
                        <input  
                            type="text"
                            name="username"
                            id="username"
                            placeholder="Digite o nome do usuário..."
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                         />
                    </div>
                    <div className="form-control">
                        <label htmlFor="room">Room</label>
                        <select 
                            name="room" 
                            id="room"
                            onChange={(e) => setRoom(e.target.value)}
                        >
                            <option value="JavaScript">JavaScript</option>
                            <option value="Python">Python</option>
                            <option value="PHP">PHP</option>
                            <option value="C#">C#</option>
                            <option value="Ruby">Ruby</option>
                            <option value="Java">Java</option>
                        </select>
                    </div>
                    <button type="submit" className="btn">
                        Join Chat
                    </button>
                </form>
            </main>
        </div>
    );
}

export default Join;