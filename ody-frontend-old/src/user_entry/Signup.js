import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:5000/auth/signup', {
        email,
        username,
        password,
        first_name: firstName,
        last_name: lastName
      });
      navigate('/journal')
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setError('Email already exists.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <h2>Create Account</h2>
      <form onSubmit={handleSignup}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder="First Name" />
        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name" />
        <button type="submit">Create Account</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Signup;
