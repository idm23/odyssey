import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';

function UserAuth() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md">
                <div className="w-full">  {/* Ensure full width for the form container */}
                    {isLogin ? (
                        <>
                            <Login
                                username={username}
                                password={password}
                                setUsername={setUsername}
                                setPassword={setPassword}
                            />
                            <button
                                onClick={toggleForm}
                                className="mt-4 w-full bg-black text-white py-2 px-4 rounded-sm hover:bg-gray-800"
                            >
                                Need an account? Sign up
                            </button>
                        </>
                    ) : (
                        <>
                            <Signup
                                username={username}
                                password={password}
                                email={email}
                                setUsername={setUsername}
                                setPassword={setPassword}
                                setEmail={setEmail}
                            />
                            <button
                                onClick={toggleForm}
                                className="mt-4 w-full bg-black text-white py-2 px-4 rounded-sm hover:bg-gray-800"
                            >
                                Have an account? Log in
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default UserAuth;
