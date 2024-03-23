import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div>
      <h1>Welcome to Odyssey</h1>
      <p>This is the place to post your lifts and share your progress with friends.</p>
      <Link to="/login">Log In</Link>
    </div>
  );
}

export default LandingPage;
