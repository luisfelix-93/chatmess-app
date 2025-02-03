import './Message.module.css'
export default function Message({message}) {
    return(
        <div className="message">
            <p className="meta">{message.username}</p>
            <p className="text">{message.text}</p>
        </div>
    )
}