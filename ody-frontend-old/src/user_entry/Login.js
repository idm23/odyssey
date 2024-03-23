import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login(props) {
    // Use props if they are provided, otherwise use local state
    const [localUsername, setLocalUsername] = useState('');
    const [localPassword, setLocalPassword] = useState('');
    const [error, setError] = useState('');

    // Determine whether to use local state or props for username and password
    const username = props.username !== undefined ? props.username : localUsername;
    const password = props.password !== undefined ? props.password : localPassword;
    const setUsername = props.setUsername || setLocalUsername;
    const setPassword = props.setPassword || setLocalPassword;

    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/auth/login', { username, password });
            navigate('/journal');
        } catch (error) {
            setError('Login error');
        }
    };

    return (
        <div className="p-4">
            <h2 className="mb-4">Log In</h2>
            <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                    <label className="absolute top-0 left-0 px-1 text-sm bg-gray-50" htmlFor="username">Username</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        className="w-full p-2 border rounded-sm bg-gray-100"
                        placeholder="Username"
                    />
                </div>
                <div className="relative">
                    <label className="absolute top-0 left-0 px-1 text-sm bg-gray-50" htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full p-2 border rounded-sm bg-gray-100"
                        placeholder="Password"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full p-2 border rounded-sm bg-black text-white"
                >
                    Log In
                </button>
            </form>
            {error && <p className="error text-red-500">{error}</p>}
        </div>
    );
}

export default Login;
