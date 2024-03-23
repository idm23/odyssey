import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './user_entry/Signup';
import Login from './user_entry/Login';
import LandingPage from './user_entry/LandingPage';
import Journal from './workouts/Journal';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} exact />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/journal" element={<Journal />} />
      </Routes>
    </Router>
  );
}

export default App;
