import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-regular-svg-icons';
import './Join.module.css';
export default function Join() {
    const [username, setUsername] = useState('');
    const [room, setRoom] = useState('Javascript');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/chat', {state: {username, room}});
    };

    return (
        <div className='join-container'>
            <header><FontAwesomeIcon icon={faSmile}/>
            <h1>Chatmess</h1>
            </header>
            <main className='join-main'>
                <form onSubmit={handleSubmit}>
                    <div className='form-control'>
                        <label htmlFor="username">Username</label>
                        <input 
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter username"
                            required
                        />
                    </div>
                    <div className='form-control'>
                        <label htmlFor="room">Room</label>
                        <select
                            id="room"
                            value={room}
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
                    <button type="submit" className="btn">Join Chat</button>
                </form>
            </main>

        </div>
    )
}