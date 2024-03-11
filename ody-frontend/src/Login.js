import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Adjust the URL according to your API endpoint
      const response = await axios.post('http://localhost:8000/login/', {
        username,
        password,
      });
      console.log('Login response:', response);
      // Save the token, redirect or inform the user of success
    } catch (error) {
      console.error('There was an error logging in:', error);
      // Inform the user of the error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
