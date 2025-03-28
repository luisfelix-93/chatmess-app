import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Join: React.FC = () => {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('')
    const [rooms, setRooms] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('http://localhost:8080/Room');
                const data = await response.json();

                if (data.success) {
                    const roomNames = data.resultObject.map((roomObj: {room: string}) => roomObj.room);
                    setRooms(roomNames);
                } else {
                    console.error("Erro na resposta da API:", data.message);
                }
            } catch (error) {
                console.error("Erro ao buscar salas:", error);
            }
        };

        fetchRooms();
    }, []);
    
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
                        <select name="room" id="room" value={room} onChange={(e) => setRoom(e.target.value)}>
                            <option value="" disabled>Selecione uma sala</option>
                                {rooms.map((roomName) => (
                                <option key={roomName} value={roomName}>{roomName}</option>
                            ))}
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