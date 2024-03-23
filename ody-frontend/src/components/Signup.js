import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import FloatingLabelInput from './FloatingLabelInput'; // Ensure this is the correct path

function Signup(props) {
    // Use props if they are provided, otherwise use local state
    const [localEmail, setLocalEmail] = useState('');
    const [localUsername, setLocalUsername] = useState('');
    const [localPassword, setLocalPassword] = useState('');
    const [localFirstName, setLocalFirstName] = useState('');
    const [localLastName, setLocalLastName] = useState('');
    const [error, setError] = useState('');

    // Determine whether to use local state or props for username and password
    const email = props.email !== undefined ? props.email : localEmail;
    const username = props.username !== undefined ? props.username : localUsername;
    const password = props.password !== undefined ? props.password : localPassword;
    const first_name = props.first_name !== undefined ? props.first_name : localFirstName;
    const last_name = props.last_name !== undefined ? props.last_name : localLastName;
    const setEmail = props.setEmail || setLocalEmail;
    const setUsername = props.setUsername || setLocalUsername;
    const setPassword = props.setPassword || setLocalPassword;
    const setFirstName = props.setFirstName || setLocalFirstName;
    const setLastName = props.setLastName || setLocalLastName;
    const router = useRouter();

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://localhost:5000/auth/signup', { username, password, email });
            router.push('/journal');
        } catch (error) {
            setError('Signup error');
        }
    };

    return (
        <div className="flex justify-center items-center bg-gray-100">
            <div className="max-w-sm w-full bg-white p-8 border rounded-lg shadow-lg">
                <h2 className="mb-4 text-xl font-bold text-center">Sign Up</h2>
                <form onSubmit={handleSignup} className="space-y-2">
                    <FloatingLabelInput
                        id="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        label="Email"
                    />
                    <FloatingLabelInput
                        id="first_name"
                        type="txt"
                        value={first_name}
                        onChange={e => setFirstName(e.target.value)}
                        label="First Name"
                    />
                    <FloatingLabelInput
                        id="last_name"
                        type="txt"
                        value={last_name}
                        onChange={e => setLastName(e.target.value)}
                        label="Last Name"
                    />
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
                        Sign Up
                    </button>
                    {error && <p className="mt-2 text-center text-red-500">{error}</p>}
                </form>
            </div>
        </div>
    );
}

export default Signup;
