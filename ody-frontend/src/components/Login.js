import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import FloatingLabelInput from './FloatingLabelInput'; // Import the component

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
    const router = useRouter();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/auth/login', { username, password });
            router.push('/journal');
        } catch (error) {
            setError('Login error');
        }
    };

    return (
        <div className="flex justify-center items-center bg-gray-100 space-y-1">
            <div className="max-w-sm w-full bg-white p-8 border rounded-lg shadow-lg">
                <h2 className="mb-4 text-xl font-bold text-center">Log In</h2>
                <form onSubmit={handleLogin} className="space-y-2">
                    <FloatingLabelInput
                        id="username"
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        label="Username"
                    />
                    <FloatingLabelInput
                        id="password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        label="Password"
                    />
                    <button
                        type="submit"
                        className="w-full p-2 border rounded-sm bg-black text-white"
                    >
                        Log In
                    </button>
                    {error && <p className="mt-2 text-center text-red-500">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default Login;
