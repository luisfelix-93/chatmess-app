import './UserList.module.css';
export default function UserList({ users }) {
    return (
        <ul>
            {users.map((user, index) => (
                <li key={index}>{user.username}</li>
            ))}
        </ul>
    )
}